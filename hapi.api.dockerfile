FROM node:16.14.2-alpine
COPY ./hapi /hapi-api
WORKDIR /hapi-api
RUN npm install --production
RUN npm audit fix

CMD [ "npm","start" ]