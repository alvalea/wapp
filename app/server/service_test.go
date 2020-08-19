package server

import (
	"github.com/golang/mock/gomock"
	"testing"
)

func TestFind(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockDB := NewMockDatabase(ctrl)

	args := Args{"john", 1, 5}
	res := Result{1, []Student{Student{"john", []Score{Score{9.0, "exam"}}}}}
	mockDB.EXPECT().Find(&args, &res).Return(nil)

	service := &Service{mockDB}
	err := service.Find(&args, &res)
	if err != nil {
		t.Fatal("Error calling service.Find")
	}

	if res.Page != args.Page {
		t.Errorf("res.Page:%d != args.Page:%d",
			res.Page, args.Page)
	}
}

func TestSearch(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockDB := NewMockDatabase(ctrl)

	args := SearchArgs{"john"}
	res := SearchResult{[]Student{Student{"john", []Score{Score{9.0, "exam"}}}}}
	mockDB.EXPECT().Search(&args, &res).Return(nil)

	service := &Service{mockDB}
	err := service.Search(&args, &res)
	if err != nil {
		t.Fatal("Error calling service.Find")
	}

	if len(res.Students) < 1 {
		t.Errorf("Error, number of returned students: %d", len(res.Students))
	}
}
