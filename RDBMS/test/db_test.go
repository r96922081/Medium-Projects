package test

import (
	"fmt"
	"rdbms/db"
	"rdbms/util"
	"testing"
)

func TestDb(*testing.T) {
	util.NewFileSerializer("tables").DeleteFileIfExist()

	db.ParseSql("CREATE TABLE  MyTable ( C1 INT, C2 VARCHAR, C3 VARCHAR)")
	db.ParseSql("INSERT INTO  MyTable  VALUES (11, 'ABC', 'DE')")
	db.ParseSql("INSERT INTO  MyTable  VALUES (11, 'ABC', 'YY')")
	db.ParseSql("INSERT INTO  MyTable  VALUES (22, 'DEF', 'XX')")

	rows, _ := db.ParseSql("SELECT * FROM MyTable WHERE C1 = 11")
	for _, r := range rows {
		fmt.Println(r.ToString())
	}
}
