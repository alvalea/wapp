all:
	go build
	./wapp

clean:
	rm ./wapp

go_test:
	go test ./...

js_test:
	./node_modules/karma/bin/karma start web/karma/karma.conf.js --browsers FirefoxHeadless --single-run

go_fmt:
	go fmt ./...

js_fmt:
	npx eslint --fix web/js/*
