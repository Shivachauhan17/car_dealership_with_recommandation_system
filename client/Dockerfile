FROM node:20 AS build-stage

WORKDIR ./

COPY . .

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage dist  /usr/share/nginx/html