APP_NAME=wapp

all:	go_build

test:	go_test

clean:
	rm ./$(APP_NAME)

go_build:
	cd app; \
	go build -v .; \
	mv app ../$(APP_NAME); \
	cd ..

go_mock:
	cd app; \
	go generate ./...; \
	cd ..

go_test:
	cd app; \
	go test -v ./...; \
	cd ..

go_test_coverage:
	cd app; \
	go test -v -coverprofile=../coverage.out ./...; \
	cd ..

go_fmt:
	cd app; \
	go fmt ./...; \
	cd ..

js_test:
	./node_modules/karma/bin/karma start web/karma/karma.conf.js --browsers FirefoxHeadless --single-run

js_fmt:
	npx eslint --fix web/js/*

production:
	sed -i 's/ws:\/\/localhost:8080\/service/wss:\/\/192.168.140.128\/service/g' ./web/js/main.js
