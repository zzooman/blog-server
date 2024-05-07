FROM node:20.10

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma init

RUN npx prisma migrate dev --name init

COPY . .

RUN npm run build

CMD ["npm", "start:prod"]
