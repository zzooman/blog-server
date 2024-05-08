FROM node:20.10

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate

RUN npm run build
