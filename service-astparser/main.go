package main

import (
	// "encoding/json"
	"encoding/json"
	"fmt"
	"github.com/pingcap/parser"
	"github.com/pingcap/parser/ast"
	_ "github.com/pingcap/tidb/types/parser_driver"
	"io/ioutil"
	"log"
	"net/http"
)

func handler(p *parser.Parser) func(w http.ResponseWriter, r *http.Request) {
	mmp := make(map[string]interface{})
	return func(w http.ResponseWriter, r *http.Request) {
		s, _ := ioutil.ReadAll(r.Body)
		stmtNode, err := p.ParseOneStmt(string(s), "", "")
		if err != nil {
			fmt.Println(err)
		}
		switch stmtNode.(type) {
		case *ast.AlterTableAlterColumn:
			mmp["alerttable"] = stmtNode
			x, _ := json.Marshal(mmp)
			w.Header().Set("Content-Type", "application/json")
			w.Write(x)
		default:

			fmt.Println(string("a"))
		}

	}
}

func digestHandler(w http.ResponseWriter, r *http.Request){
	w.
}

func main() {
	p := parser.New()
	http.HandleFunc("/", handler(p))
	http.HandleFunc("/digest", handler(p))
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}
