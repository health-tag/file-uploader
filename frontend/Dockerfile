FROM node:18-alpine as node
FROM node as buildserver
WORKDIR /src
COPY . .
RUN yarn