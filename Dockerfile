FROM alpine:3.4

MAINTAINER Simon Delberghe

RUN apk add --update nginx
RUN mkdir -p /run/nginx

COPY nginx.conf /etc/nginx/

EXPOSE 8080

CMD exec nginx -g 'daemon off;'
