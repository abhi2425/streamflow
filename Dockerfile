FROM node:16-alpine

WORKDIR /usr/local/server

COPY package.json /usr/local/server/package.json

RUN npm install

EXPOSE 3000

COPY . /usr/local/server

CMD ["npm", "start"]

