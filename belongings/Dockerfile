FROM node:18-alpine

RUN npm install -g @sanity/cli pnpm
WORKDIR /studio

COPY package.json ./

RUN pnpm install

COPY . .

EXPOSE 3333

CMD ["sanity", "dev"]
