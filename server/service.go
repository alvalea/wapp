package server

type Database interface {
	Find(*Args, *Result) error
	Search(*SearchArgs, *SearchResult) error
}

type Service struct {
	DB Database
}

type Score struct {
	Score float64 `bson:"score"`
	Type  string  `bson:"type"`
}

type Student struct {
	Name   string  `bson:"name"`
	Scores []Score `bson:"scores"`
}

type Args struct {
	Page     int
	PageSize int
}

type Result struct {
	Page     int
	Students []Student
}

func (s *Service) Find(args *Args, res *Result) error {
	res.Page = args.Page
	return s.DB.Find(args, res)
}

type SearchArgs struct {
	Input string
}

type SearchResult struct {
	Students []Student
}

func (s *Service) Search(args *SearchArgs, res *SearchResult) error {
	return s.DB.Search(args, res)
}
