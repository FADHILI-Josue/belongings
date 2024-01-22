FROM node:18-slim

RUN npm i -g pnpm

WORKDIR /app
COPY package.json ./
RUN pnpm install
COPY . .

EXPOSE 4200

CMD [ "pnpm", "start" ]



