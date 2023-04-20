FROM node:19-alpine AS build

WORKDIR /code

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install --loglevel warn --unsafe-perm

COPY . ./

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]