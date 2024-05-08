FROM node:20.10

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

RUN npx prisma init

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build

CMD ["npm", "run", "start:migrate:prod"]
