package main

import (
	"context"
	"github.com/alvalea/wapp/server"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/net/websocket"
	"html/template"
	"log"
	"net/http"
	"net/rpc"
	"net/rpc/jsonrpc"
	"os"
)

type mongoDatabase struct {
	collection *mongo.Collection
}

func (m *mongoDatabase) Insert(args *server.Args) error {
	insertResult, err := m.collection.InsertOne(context.TODO(), args)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Inserted a Single Document: ", insertResult.InsertedID)

	return err
}

func dbConnect() *mongo.Collection {
	clientOptions := options.Client().ApplyURI("mongodb://mongo:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	} else {
		log.Println("Connected to MongoDB!")
	}

	return client.Database("mydb").Collection("mycollection")
}

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
	collection := dbConnect()
	mongoDB := &mongoDatabase{collection}

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
