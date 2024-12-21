FROM node:lts-alpine

WORKDIR /src/ui

COPY package.json .

RUN npm install

COPY tsconfig.json .
COPY vite.config.ts .

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]