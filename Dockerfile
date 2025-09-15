FROM node:19-alpine AS build

ARG GRPCUI_URL=http://127.0.0.1:8081
ENV GRPCUI_URL=$GRPCUI_URL

WORKDIR /code

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install --loglevel warn --unsafe-perm

COPY . ./

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
