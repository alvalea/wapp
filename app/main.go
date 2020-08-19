package main

import (
	"github.com/alvalea/wapp/app/mongo"
	"github.com/alvalea/wapp/app/server"
	"golang.org/x/net/websocket"
	"html/template"
	"log"
	"net/http"
	"net/rpc"
	"net/rpc/jsonrpc"
	"os"
)

func serveWS(server *rpc.Server) http.Handler {
	return websocket.Handler(func(ws *websocket.Conn) {
		jsonrpcCodec := jsonrpc.NewServerCodec(ws)
		server.ServeCodec(jsonrpcCodec)
	})
}

func compileTemplates() *template.Template {
	var t *template.Template
	var err error
	t, err = template.ParseGlob("web/templates/*")
	if err != nil {
		log.Println("Cannot parse templates:", err)
		os.Exit(1)
	}
	return t
}

func servePage(t *template.Template) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		t.ExecuteTemplate(w, "app", nil)
	}
}

func main() {
	mongoDB, err := mongo.NewDB("mongodb://mongo:27017",
		"sample_school", "students")
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}

	service := &server.Service{mongoDB}
	wsServer := rpc.NewServer()
	wsServer.Register(service)

	t := compileTemplates()

	mux := http.NewServeMux()
	mux.Handle("/service", serveWS(wsServer))
	mux.Handle("/", http.FileServer(http.Dir("web")))
	mux.HandleFunc("/app", servePage(t))
	http.ListenAndServe(":8080", mux)
}
