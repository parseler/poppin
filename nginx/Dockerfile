FROM nginx:latest

ARG DOMAIN_NAME

RUN mkdir -p /certbot/live/$DOMAIN_NAME
RUN openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -subj "/C=KR/ST=Seoul/L=Yeoksam/O=Ssafy/CN=$DOMAIN_NAME" -out /certbot/live/$DOMAIN_NAME/fullchain.pem -keyout /certbot/live/$DOMAIN_NAME/privkey.pem

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
