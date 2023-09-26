FROM node:lts-alpine

COPY package.json ./

RUN npm install --only=development

COPY . .

EXPOSE 8080

RUN yarn build

CMD yarn dev