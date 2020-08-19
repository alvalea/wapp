package mongo

import (
	"context"
	"github.com/alvalea/wapp/app/server"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
)

type MongoDatabase struct {
	collection *mongo.Collection
}

func (m *MongoDatabase) retrieveStudents(input string, opts *options.FindOptions,
	result *[]server.Student) error {
	filter := bson.M{"name": bson.M{"$regex": input}}
	cursor, err := m.collection.Find(context.TODO(), filter, opts)
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(context.TODO(), result); err != nil {
		log.Fatal(err)
	}
	return err
}

func (m *MongoDatabase) Find(args *server.Args, res *server.Result) error {
	skip := int64(0)
	if args.Page > 0 {
		skip = int64((args.Page - 1) * args.PageSize)
	}
	limit := int64(args.PageSize)

	opts := options.FindOptions{
		Skip:  &skip,
		Limit: &limit,
	}
	return m.retrieveStudents(args.Input, &opts, &res.Students)
}

func (m *MongoDatabase) Search(args *server.SearchArgs, res *server.SearchResult) error {
	limit := int64(5)
	opts := options.FindOptions{
		Projection: bson.D{{"name", 1}},
		Limit:      &limit,
	}
	return m.retrieveStudents(args.Input, &opts, &res.Students)
}

func NewDB(uri string, db string, col string) (*MongoDatabase, error) {
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, err
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
	}

	collection := client.Database(db).Collection(col)

	return &MongoDatabase{collection}, err
}
