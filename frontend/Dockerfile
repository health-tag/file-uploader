FROM node:18-alpine as node
FROM node as buildclient
WORKDIR /src
COPY . .
RUN chmod +x dev.sh
CMD ./dev.sh