FROM node:lts-alpine

COPY package.json ./

RUN npm install --only=development

COPY . .

EXPOSE 8080

RUN npm run build

CMD npm run start:prod