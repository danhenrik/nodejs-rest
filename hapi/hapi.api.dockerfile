FROM node:16-alpine3.14
COPY ./ /hapi-api
WORKDIR /hapi-api
RUN npm install --production
RUN npm audit fix