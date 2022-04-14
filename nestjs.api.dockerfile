FROM node:16.14.2-alpine    
COPY ./nestjs /nestjs-api
WORKDIR /nestjs-api
RUN npm install --production
RUN npm audit fix

CMD [ "npm","run","start:prod" ]