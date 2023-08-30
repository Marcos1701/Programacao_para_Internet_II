FROM node:lts-alpine

COPY package.json ./

RUN npm install --only=development

COPY . .

EXPOSE 3000

CMD npm install --save @nestjs/swagger

RUN npm run build

CMD npm run start:prod
