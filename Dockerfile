FROM nginx:alpine
COPY ./src/html /usr/share/nginx/html

EXPOSE 8080