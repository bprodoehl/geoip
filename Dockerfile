#!/bin/sh

# GeoIP Server
#
# VERSION               0.0.1

FROM phusion/baseimage:0.9.16
MAINTAINER Brian Prodoehl <bprodoehl@connectify.me>

ENV HOME /root

CMD ["/sbin/my_init"]

RUN apt-get -q update && apt-get dist-upgrade -y -q

# install Node.js
ENV NODE_VERSION 0.12.7
RUN cd /usr/local && \
    curl -sL http://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz | \
    tar --strip-components 1 -xz

### Configure runit
RUN mkdir /etc/service/nodejs
ADD docker/runit/nodejs.sh /etc/service/nodejs/run

# install node dependencies
RUN mkdir -p /app/geoip
WORKDIR /app/geoip
ADD app/ /app/geoip/
RUN npm install && npm dedupe
RUN cd node_modules/geoip-lite && npm run-script updatedb

# expose the necessary ports
EXPOSE 80
