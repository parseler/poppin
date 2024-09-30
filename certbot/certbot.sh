#!bin/bash
data_path="/etc/letsencrypt/live"
if [ ! -d "$data_path/$DOMAIN_NAME" ]; then
  certbot certonly --webroot -w /var/www/certbot --rsa-key-size 4096 -d $DOMAIN_NAME --email $EMAIL --agree-tos --force-renewal --non-interactive
fi
(
  crontab -l 2>/dev/null
  echo "*/1 * * * * /usr/bin/certbot renew"
) | crontab -
crond -f
