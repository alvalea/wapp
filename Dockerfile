FROM golang:latest

RUN mkdir /wapp

COPY ./Makefile /wapp
COPY ./app /wapp/app
COPY ./web /wapp/web
COPY ./nginx /wapp/nginx

WORKDIR /wapp

RUN make go_build

RUN make url

CMD ["/wapp/wapp"]

EXPOSE 8080
