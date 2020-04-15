# build environment
FROM node:12-alpine as build
RUN apk add g++ make python
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn cache clean
RUN yarn --pure-lockfile --network-timeout 1000000
RUN yarn global add react-scripts@3.4.1
COPY . ./

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/.docker/raspberry/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
