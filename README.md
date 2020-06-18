**web**  
![Web](https://github.com/alvalea/wapp/workflows/Web/badge.svg)
[![codecov](https://codecov.io/gh/alvalea/wapp/branch/master/graph/badge.svg)](https://codecov.io/gh/alvalea/wapp)

**server**  
![Server](https://github.com/alvalea//workflows/Server/badge.svg)
[![Go Report Card](https://goreportcard.com/badge/github.com/alvalea/wapp)](https://goreportcard.com/report/github.com/alvalea/wapp)

# Golang WebSockets MongoDB #

Example of a web app implemented in Go using WebSockets and MongoDB

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
