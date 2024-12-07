FROM node:lts-alpine AS base
WORKDIR /cashflow/app/api
COPY tsconfig.json package.json ./

FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS prod
RUN npm install --production && npm run build
COPY . .
CMD ["node", "dist/main.js"]
