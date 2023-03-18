FROM node:16.19-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main.js" ]