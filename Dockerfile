FROM node:18-alpine as node

FROM node as buildclient
WORKDIR /client
COPY ./frontend/ ./
RUN yarn
RUN yarn run build

FROM node as buildserver
WORKDIR /server
COPY ./backend/ ./
RUN yarn
RUN yarn run build

FROM node
WORKDIR /app
COPY --from=buildserver /server/node_modules ./node_modules
COPY --from=buildserver /server/dist ./
COPY --from=buildclient /client/build ./client/
ENTRYPOINT [ "node", "main.js" ]