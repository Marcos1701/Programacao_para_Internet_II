FROM node:lts-alpine

COPY package.json ./

RUN yarn 

COPY . .

EXPOSE 5173

RUN yarn build

CMD yarn dev