package server

type Database interface {
	Insert(*Args) error
}

type Service struct {
	DB Database
}

type Args struct {
	Number int    `bson:"number"`
	Text   string `bson:"text"`
}

type Result struct {
	Number int    `bson:"number"`
	Text   string `bson:"text"`
}

func (s *Service) Echo(args *Args, res *Result) error {
	res.Number = args.Number
	res.Text = args.Text

	return s.DB.Insert(args)
}
