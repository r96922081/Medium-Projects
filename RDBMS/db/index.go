package db

import (
	"rdbms/dsa"
	"rdbms/util"
	"strconv"
)

type IntIndex struct {
	index     int
	rowOffset int
}

func (index IntIndex) Compare(k dsa.BTreeKeyDisk) int {
	index2 := k.(IntIndex)

	if index.index < index2.index {
		return -1
	} else if index.index == index2.index {
		return 0
	} else {
		return 1
	}
}

func (index IntIndex) ReadFromFile(f *util.FileSerializer) dsa.BTreeKeyDisk {
	ret := IntIndex{}

	x, err := f.ReadInt()
	if err != nil {
		return nil
	}
	ret.index = x

	x, err = f.ReadInt()
	if err != nil {
		return nil
	}
	ret.rowOffset = x

	return ret
}

func (index IntIndex) WriteToFile(f *util.FileSerializer) {
	f.WriteInt(index.index)
	f.WriteInt(index.rowOffset)
}

func (i IntIndex) ToString() string {
	ret := "["

	ret += strconv.Itoa(i.index) + "(" + strconv.Itoa(i.rowOffset) + ")"

	ret += "]"
	return ret
}

type StringIndex struct {
	index     string
	rowOffset int
}

func (index StringIndex) Compare(k dsa.BTreeKeyDisk) int {
	index2 := k.(StringIndex)

	if index.index < index2.index {
		return -1
	} else if index.index == index2.index {
		return 0
	} else {
		return 1
	}
}

func (index StringIndex) ReadFromFile(f *util.FileSerializer) dsa.BTreeKeyDisk {
	ret := StringIndex{}

	x, err := f.ReadString()
	if err != nil {
		return nil
	}
	ret.index = x

	y, err := f.ReadInt()
	if err != nil {
		return nil
	}
	ret.rowOffset = y

	return ret
}

func (index StringIndex) WriteToFile(f *util.FileSerializer) {
	f.WriteString(index.index)
	f.WriteInt(index.rowOffset)
}

func (i StringIndex) ToString() string {
	ret := "["

	ret += i.index + "(" + strconv.Itoa(i.rowOffset) + ")"

	ret += "]"
	return ret
}
