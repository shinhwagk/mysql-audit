package main

import (
	"encoding/json"
	"fmt"
	"github.com/pingcap/parser"
	"github.com/pingcap/parser/ast"
	_ "github.com/pingcap/tidb/types/parser_driver"
)

func MergeAlterTables(sql string) (string, error) {
	var mergedAlterStr string
	var nonSqls string
	// table/column/index name can be quoted in back ticks

	p := parser.New()
	stmt, _, err := p.Parse(sql, "", "")
	if err != nil {
		return "", nil
	}
	for _, idx := range stmt {
		switch n := idx.(type) {
		case *ast.CreateTableStmt:
			// fmt.Println("create table.")
			// fmt.Println(n.Table.Name.O)
			// fmt.Println(n.Cols[0].Name)
			// fmt.Println(n.Cols[0].Tp.Flag)
			// fmt.Println(n.Cols[0].Tp.Flen)
			// fmt.Println(n.Cols[0].Tp.Decimal)
			// fmt.Println(n.Cols[0].Tp.Flen)
			// fmt.Println(n.Cols[0].Tp.Decimal)
			// fmt.Println(n.Cols[0].Tp.Charset)
			// fmt.Println(len(n.Cols))

			// fmt.Println(n.Cols[0].Options[0].Tp == ast.ColumnOptionPrimaryKey)

			b, err := json.Marshal(stmt)
			if err != nil {
				fmt.Println(err)
			}
			fmt.Println(string(b))

		default:
			nonSqls += n.Text() + ";\n"
		}

	}
	mergedAlterStr += nonSqls
	fmt.Printf(mergedAlterStr)
	return mergedAlterStr, nil
}

func main() {
	MergeAlterTables("create table abc(a int(2) primary key AUTO_INCREMENT ,b int NOT NULL)")
}
