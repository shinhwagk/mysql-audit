package main

import (
	"encoding/json"
	"fmt"
	"github.com/pingcap/parser"
	"github.com/pingcap/parser/ast"
	_ "github.com/pingcap/tidb/types/parser_driver"
	"io/ioutil"
	"log"
	"net/http"
)

type AstParser struct {
	Kind string
	Ast  ast.StmtNode
}

func astParserHandler(p *parser.Parser) func(w http.ResponseWriter, r *http.Request) {
	// mmp := make(map[string]interface{})
	return func(w http.ResponseWriter, r *http.Request) {
		s, _ := ioutil.ReadAll(r.Body)
		stmtNode, err := p.ParseOneStmt(string(s), "", "")
		if err != nil {
			fmt.Println(err)
		}
		// _, isDDL := stmtNode.(ast.DDLNode)
		// fmt.Println((isDDL))
		switch stmtNode.(type) {
		case *ast.CreateTableStmt:
			x, _ := json.Marshal(AstParser{Kind: "CreateTableStmt", Ast: stmtNode})
			w.Header().Set("Content-Type", "application/json")
			w.Write(x)
		default:
			fmt.Println(string("a"))
		}
	}
}

func digestHandler(w http.ResponseWriter, r *http.Request) {
	s, _ := ioutil.ReadAll(r.Body)
	digest := parser.DigestHash(string(s))
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(digest))
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)
}

func main() {
	p := parser.New()
	http.HandleFunc("/", handler)
	http.HandleFunc("/digest", digestHandler)
	http.HandleFunc("/astparser", astParserHandler(p))
	log.Fatal(http.ListenAndServe("0.0.0.0:7000", nil))
}
