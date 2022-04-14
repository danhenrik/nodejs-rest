FROM node:16-alpine3.14
COPY ./hapi /hapi-api
WORKDIR /hapi-api
RUN npm install
RUN npm audit fix