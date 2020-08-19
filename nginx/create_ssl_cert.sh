#!/bin/zsh

CERT_DIR=cert

if [ ! -d $CERT_DIR ];then
	mkdir $CERT_DIR;
fi

openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out cert/example.crt \
            -keyout cert/example.key \
            -subj "/C=SI/ST=Ljubljana/L=Ljubljana/O=Security/OU=IT Department/CN=www.example.com"

