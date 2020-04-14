FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./app/package.json


RUN yarn
RUN yarn add global react-scripts@3.4.1 react-app-rewired customize-cra

COPY . ./app

CMD ["yarn", "start"]
