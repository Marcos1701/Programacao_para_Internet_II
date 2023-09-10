FROM node:lts-alpine

COPY package.json ./

RUN npm install --only=development

COPY . .

EXPOSE 3000

RUN npm run build

RUN killall node

CMD npm run start:prod
