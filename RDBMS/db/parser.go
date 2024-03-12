package db

import (
	"strconv"
	"strings"
)

func CreateTableSql(sql string) ([]*Row, error) {
	tableName := ""
	types := make([]int, 0)
	columns := make([]string, 0)
	tableName = sql[len("CREATE TABLE "):strings.Index(sql, "(")]
	tableName = strings.Trim(tableName, " ")

	declare := sql[strings.Index(sql, "(")+1 : strings.Index(sql, ")")]
	declare = strings.Trim(declare, " ")

	tokens := strings.Split(declare, ",")
	primaryKeyColumnIndex := -1
	for i := 0; i < len(tokens); i++ {
		token := strings.Trim(tokens[i], " ")
		token2 := strings.Split(token, " ")
		columnName := token2[0]
		strType := token2[1]

		columns = append(columns, columnName)
		if strType == "INT" {
			types = append(types, IntColumn)
		} else if strType == "VARCHAR" {
			types = append(types, StringColumn)
		}

	}

	return nil, CreateTable(tableName, columns, types, primaryKeyColumnIndex)
}

func InsertIntoSql(sql string) ([]*Row, error) {
	tableName := ""
	tableName = sql[len("INSERT INTO "):strings.Index(sql, "VALUES")]
	tableName = strings.Trim(tableName, " ")

	values := sql[strings.Index(sql, "(")+1 : strings.Index(sql, ")")]
	values = strings.Trim(values, " ")
	tokens := strings.Split(values, ",")

	r := NewRow()

	for i := 0; i < len(tokens); i++ {
		token := strings.Trim(tokens[i], " ")
		if strings.HasPrefix(token, "'") {
			token = token[1 : len(token)-1]
			r.SetString(i, token)
		} else {
			intValue, _ := strconv.Atoi(token)
			r.SetInt(i, intValue)
		}
	}

	table := OpenTable(tableName)
	table.InsertRow(r)

	return nil, nil
}

func SelectSql(sql string) ([]*Row, error) {
	tableName := ""
	tableName = sql[strings.Index(sql, "FROM ")+len("FROM ") : strings.Index(sql, "WHERE")]
	tableName = strings.Trim(tableName, " ")
	table := OpenTable(tableName)

	where := sql[strings.Index(sql, "WHERE ")+len("WHERE "):]
	tokens := strings.Split(where, "=")
	column := strings.TrimSpace(tokens[0])
	value := strings.TrimSpace(tokens[1])

	columnType := 0
	for i := 0; i < len(table.columnNames); i++ {
		if table.columnNames[i] == column {
			columnType = table.columnTypes[i]
		}
	}

	if columnType == StringColumn {
		return table.GetRow(column, value)
	} else {
		intValue, _ := strconv.Atoi(value)
		return table.GetRow(column, intValue)
	}
}

func ParseSql(sql string) ([]*Row, error) {
	sql = strings.ToUpper(sql)

	if strings.HasPrefix(sql, "CREATE TABLE ") {
		return CreateTableSql(sql)
	} else if strings.HasPrefix(sql, "INSERT INTO ") {
		return InsertIntoSql(sql)
	} else if strings.HasPrefix(sql, "SELECT ") {
		return SelectSql(sql)
	}

	return nil, nil
}
