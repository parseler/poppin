FROM alpine

ARG DOMAIN_NAME
ARG EMAIL
COPY ./certbot.sh .
RUN apk update
RUN apk add certbot

CMD ["sh", "./certbot.sh"]
