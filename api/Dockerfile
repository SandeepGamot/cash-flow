FROM node:lts-alpine

WORKDIR /api

COPY package.json .

RUN npm install

COPY tsconfig.json .

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]