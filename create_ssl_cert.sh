#!/bin/zsh

CERT_DIR=cert

if [ ! -d $CERT_DIR ];then
	mkdir $CERT_DIR;
fi

openssl genrsa -out $CERT_DIR/privkey.pem 2048
openssl req -new -x509 -key $CERT_DIR/privkey.pem -out $CERT_DIR/cacert.pem -days 1095

