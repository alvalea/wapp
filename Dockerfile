FROM golang:latest

RUN mkdir /app

ADD . /app/

WORKDIR /app

RUN go build -o wapp .

CMD ["/app/wapp"]

EXPOSE 8080
