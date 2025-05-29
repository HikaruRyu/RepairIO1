FROM node:18-alpine

WORKDIR /app

COPY ./interactive/package.json .

RUN npm install

COPY ./interactive .

EXPOSE 80

EXPOSE 8080


CMD [ "npm", "run", "dev","--","--host" ]