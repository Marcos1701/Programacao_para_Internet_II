FROM node:lts-alpine

COPY package.json ./

RUN npm install --only=development

COPY . .

EXPOSE 3000

RUN npm run build

CMD killall node && npm run start:prod