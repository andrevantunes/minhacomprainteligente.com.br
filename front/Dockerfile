FROM node:16-slim

WORKDIR /app
COPY package.json .

RUN NODE_ENV=development yarn install

COPY . .
RUN NODE_ENV=production yarn build

ENV PORT=3000
EXPOSE 3000

CMD yarn start
