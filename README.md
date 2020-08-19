![Web](https://github.com/alvalea/wapp/workflows/Web/badge.svg)
![Server](https://github.com/alvalea/wapp/workflows/Server/badge.svg)
[![codecov](https://codecov.io/gh/alvalea/wapp/branch/master/graph/badge.svg)](https://codecov.io/gh/alvalea/wapp)
[![Go Report Card](https://goreportcard.com/badge/github.com/alvalea/wapp/app)](https://goreportcard.com/report/github.com/alvalea/wapp/app)

# Golang WebSockets MongoDB #

Example of a web app implemented in Go using WebSockets and MongoDB

## Web ##

Install karma
```
npm install karma karma-jasmine karma-firefox-launcher karma-coverage karma-spec-reporter jasmine-core --save-dev
```

Run Karma
```
./node_modules/karma/bin/karma start web/karma/karma.conf.js --browsers FirefoxHeadless --single-run
```

Install ESLint
```
npm init
npm install eslint --save-dev
```

Setup ESLint
```
npx eslint --init
```

Run ESLint
```
npx eslint --fix web/js/*
```

## Docker ##

Build docker image

```
sudo docker build -t wapp .
```

Run image

```
sudo docker run -p 8080:8080 -ti wapp
```

Build docker compose

```
sudo docker-compose build
```

Run docker compose

```
sudo docker-compose up
```

## MongoDB ##

Use mongo as hostname, so that the same code can be run using docker compose

```
>sudo vi /etc/hosts

127.0.1.1 mongo
```

Allow external access to mongoDB

```
>sudo vi /etc/mongodb.conf

bind_ip = 0.0.0.0
```

Import sample data

```
mongoimport --drop -c students --uri mongodb://mongo/sample_school students.json
```

## gomock ##

Install gomock

```
go get github.com/golang/mock/gomock
go get github.com/golang/mock/mockgen
```

Generate mocks

```
go generate ./...
```

## Sinon ##

Install sinon

```
npm install karma-sinon sinon --save-dev
```
