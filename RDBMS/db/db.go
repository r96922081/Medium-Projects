package db

import (
	"io"
	"path"
	"rdbms/dsa"
	"rdbms/util"
	"strconv"
)

const (
	IntColumn    int = 0
	StringColumn     = 1
)

type Table struct {
	tableName            string
	rowSize              int
	columnNames          []string
	columnTypes          []int
	columnNameToTypeMap  map[string]int
	columnNameToIndexMap map[string]int
	indexBTrees          map[string]*dsa.BTreeDisk
}

var FileFolder string = "tables"

func CreateTable(tableName string, columns []string, columnTypes []int, primaryKeyColumnIndex int) error {
	util.NewFileSerializer(path.Join(FileFolder, tableName)).CreateDirIfNotExist()

	tablePath := path.Join(FileFolder, tableName, "table")

	f := util.NewFileSerializer(tablePath)
	f.CreateFileIfNotExist()
	f.OpenForWriteTruncate()

	for i := 0; i < len(columnTypes); i++ {
		// column name, column type
		f.WriteString(columns[i])
		f.WriteInt(columnTypes[i])
	}

	f.Close()

	for i, column := range columns {
		if columnTypes[i] == IntColumn {
			dsa.NewBTreeDisk(3, path.Join(FileFolder, tableName, "index-"+tableName+"-"+column), IntIndex{-1, -1})
		} else {
			dsa.NewBTreeDisk(3, path.Join(FileFolder, tableName, "index-"+tableName+"-"+column), StringIndex{"", -1})
		}

	}

	return nil
}

func OpenTable(tableName string) *Table {
	tablePath := path.Join("tables", tableName, "table")
	f := util.NewFileSerializer(tablePath)
	f.OpenForRead()

	table := &Table{}
	table.tableName = tableName
	table.indexBTrees = make(map[string]*dsa.BTreeDisk)
	table.columnNameToTypeMap = make(map[string]int)
	table.columnNameToIndexMap = make(map[string]int)

	for i := 0; ; i++ {
		// column name, column type
		columnName, err := f.ReadString()
		if err == io.EOF {
			break
		}

		table.columnNames = append(table.columnNames, columnName)

		columnType, _ := f.ReadInt()

		table.columnTypes = append(table.columnTypes, columnType)

		table.columnNameToTypeMap[columnName] = columnType
		table.columnNameToIndexMap[columnName] = i
	}

	table.rowSize = 0
	for i := 0; i < len(table.columnTypes); i++ {
		if table.columnTypes[i] == IntColumn {
			table.rowSize += 4
		} else if table.columnTypes[i] == StringColumn {
			table.rowSize += 8
		}
	}

	f.Close()

	for i, column := range table.columnNames {
		if table.columnTypes[i] == IntColumn {
			tree := dsa.ReadBTreeFromFile(path.Join(FileFolder, tableName, "index-"+tableName+"-"+column), IntIndex{})
			table.indexBTrees[column] = tree
		} else {
			tree := dsa.ReadBTreeFromFile(path.Join(FileFolder, tableName, "index-"+tableName+"-"+column), StringIndex{})
			table.indexBTrees[column] = tree
		}

	}

	return table
}

func (t *Table) InsertRow(r *Row) {
	rowFilePath := path.Join(FileFolder, t.tableName, "rows")
	f := util.NewFileSerializer(rowFilePath)
	f.OpenForAppend()
	defer f.Close()
	offset := f.GetOffset()

	r.WriteToDisk(f, t)

	for i, columnName := range t.columnNames {
		if t.columnTypes[i] == IntColumn {
			t.indexBTrees[columnName].Insert(IntIndex{r.intColumns[i], offset})
		} else {
			t.indexBTrees[columnName].Insert(StringIndex{r.stringColumns[i], offset})
		}
	}
}

func (t *Table) GetRow(columnName string, keyValue interface{}) ([]*Row, error) {
	v, _ := t.columnNameToTypeMap[columnName]
	ret := make([]*Row, 0)

	tree := t.indexBTrees[columnName]
	rowOffsets := make([]int, 0)

	if v == IntColumn {
		result := tree.Find(IntIndex{keyValue.(int), -1})
		for _, r := range result {
			rowOffsets = append(rowOffsets, r.(IntIndex).rowOffset)
		}
	} else {
		result := tree.Find(StringIndex{keyValue.(string), -1})
		for _, r := range result {
			rowOffsets = append(rowOffsets, r.(StringIndex).rowOffset)
		}
	}

	rowFilePath := path.Join(FileFolder, t.tableName, "rows")
	f := util.NewFileSerializer(rowFilePath)
	f.OpenForRead()
	defer f.Close()

	for _, rowOffset := range rowOffsets {
		f.Seek(rowOffset)
		row, err := ReadFromDisk(f, t)
		if err != nil {
			return nil, err
		}

		ret = append(ret, row)
	}

	return ret, nil
}

type Row struct {
	intColumns    map[int]int
	stringColumns map[int]string
}

func NewRow() *Row {
	r := &Row{}
	r.intColumns = make(map[int]int)
	r.stringColumns = make(map[int]string)
	return r
}

func (r *Row) SetInt(index int, i int) {
	r.intColumns[index] = i
}

func (r *Row) SetString(index int, s string) {
	r.stringColumns[index] = s
}

func ReadFromDisk(f *util.FileSerializer, table *Table) (*Row, error) {
	ret := NewRow()

	for i, columnType := range table.columnTypes {
		if columnType == IntColumn {
			x, err := f.ReadInt()
			if err != nil {
				return nil, err
			}
			ret.intColumns[i] = x
		} else if columnType == StringColumn {
			x, err := f.ReadString()
			if err != nil {
				return nil, err
			}
			ret.stringColumns[i] = x
		}
	}

	return ret, nil
}

func (r *Row) WriteToDisk(f *util.FileSerializer, gv interface{}) error {
	table := gv.(*Table)

	for i, columnType := range table.columnTypes {
		if columnType == IntColumn {
			err := f.WriteInt(r.intColumns[i])
			if err != nil {
				return err
			}
		} else if columnType == StringColumn {
			err := f.WriteString(r.stringColumns[i])
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func (r *Row) ToString() string {
	ret := "["

	for i := 0; i < len(r.intColumns)+len(r.stringColumns); i++ {
		if i != 0 {
			ret += ", "
		}

		_, ok := r.intColumns[i]
		if ok {
			ret += strconv.Itoa(r.intColumns[i])
		} else {
			ret += r.stringColumns[i]
		}
	}

	ret += "]"
	return ret
}
