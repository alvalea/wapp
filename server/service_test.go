package server

import (
	"testing"
)

type mockDatabase struct {
}

func (m *mockDatabase) Find(args *Args, res *Result) error {
	res.Page = args.Page
	return nil
}

func TestDatabaseInsert(t *testing.T) {
	mockDB := &mockDatabase{}

	service := &Service{mockDB}

	args := &Args{1, 5}
	res := &Result{}

	err := service.Find(args, res)
	if err != nil {
		t.Fatal("Error calling service.Find")
	}

	if res.Page != args.Page {
		t.Errorf("res.Page:%d != args.Page:%d",
			res.Page, args.Page)
	}
}
