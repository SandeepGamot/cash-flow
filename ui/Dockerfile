FROM node:lts-alpine as base

WORKDIR /cashflow/app/ui

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json vite.config.ts ./

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]