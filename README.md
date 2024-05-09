## local 에서 실행방법

- docker로 DB세팅

1. docker pull postgres:16
2. docker run --name mustit-blog -e POSTGRES_PASSWORD=1033 -p 5432:5432 -d postgres:16

- 프로젝트 세팅

1. .env에 아래 내용 추가
   DATABASE_URL="postgresql://postgres:1033@localhost:5432/mustit?schema=public"
1. npm install
1. npm run start:dev
1. npx prisma generate
1. npx prisma migrate dev --name init
