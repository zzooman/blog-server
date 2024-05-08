FROM node:20.10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g prisma

RUN npx prisma generate

# RUN npx prisma migrate deploy

RUN npm run build
