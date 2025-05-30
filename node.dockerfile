FROM node:18-alpine

WORKDIR /app

COPY ./source/package.json .

RUN npm install

COPY ./source .

EXPOSE 80

EXPOSE 443

EXPOSE 5173

CMD [ "npm", "run", "dev","--","--host" ]