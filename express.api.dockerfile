FROM node:16.14.2-alpine
COPY ./express /express-api
WORKDIR /express-api
RUN npm install --production
RUN npm audit fix

CMD [ "npm","start" ]