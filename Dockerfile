FROM node:18-alpine

WORKDIR /home/app/clean_api

COPY package*.json .

RUN npm install

EXPOSE 3036
