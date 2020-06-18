package server

import (
	"testing"
)

type mockDatabase struct {
}

func (m *mockDatabase) Insert(args *Args) error {
	return nil
}

func TestDatabaseInsert(t *testing.T) {
	mockDB := &mockDatabase{}

	service := &Service{mockDB}

	args := &Args{11, "hello"}
	res := &Result{}

	err := service.Echo(args, res)
	if err != nil {
		t.Fatal("Error calling service.Echo")
	}

	if res.Number != args.Number {
		t.Errorf("res.Number:%d != args.Number:%d",
			res.Number, args.Number)
	}

	if res.Text != args.Text {
		t.Errorf("res.Text:%s != args.Text:%s",
			res.Text, args.Text)
	}
}
