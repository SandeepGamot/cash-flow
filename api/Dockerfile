FROM node:lts-alpine

WORKDIR /src/api

COPY package.json .

RUN npm install

COPY tsconfig.json .

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]