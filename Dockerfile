FROM nginx:1.19.5-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html