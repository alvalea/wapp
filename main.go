package main

import (
	"os"
	"fmt"
	"log"
	"context"
	"net/http"
	"net/rpc"
	"net/rpc/jsonrpc"
	"golang.org/x/net/websocket"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

)

var collection	*mongo.Collection

type Service struct{}

type Args struct {
        Number	int	`bson:"number"`
	Text	string	`bson:"text"`
}

type Result struct {
	Number	int	`bson:"number"`
	Text	string	`bson:"text"`
}

func (t *Service) Echo(args *Args, res *Result) error {
	res.Number = args.Number
	res.Text = args.Text

	insertResult, err := collection.InsertOne(context.TODO(), args)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a Single Document: ", insertResult.InsertedID)

	return err
}

func serveWS(server *rpc.Server) http.Handler {
	return websocket.Handler(func(ws *websocket.Conn) {
		jsonrpcCodec := jsonrpc.NewServerCodec(ws)
		server.ServeCodec(jsonrpcCodec)
	})
}

func dbConnect() {
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
		fmt.Println("Connected to MongoDB!")
	}

	collection = client.Database("mydb").Collection("mycollection")
}

func main() {
	dbConnect()

	var service Service
	wsServer := rpc.NewServer()
	wsServer.Register(&service)

	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("web")))
	mux.Handle("/ws", serveWS(wsServer))
	http.ListenAndServe(":8080", mux)
}
