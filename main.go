package main

import (
	"os"
	"log"
	"context"
	"net/http"
	"net/rpc"
	"net/rpc/jsonrpc"
	"golang.org/x/net/websocket"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"github.com/alvalea/wapp/server"
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

func dbConnect() *mongo.Collection{
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
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

func main() {
	collection := dbConnect()
	mongoDB := &mongoDatabase{collection}

	service := &server.Service{mongoDB}
	wsServer := rpc.NewServer()
	wsServer.Register(service)

	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("web")))
	mux.Handle("/ws", serveWS(wsServer))
	http.ListenAndServe(":8080", mux)
}
