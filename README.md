## local 에서 실행방법

- docker로 DB세팅

1. docker pull postgres:16
   - 위 명령어가 안될 경우
   * docker logout
   * docker pull postgres:16
   * 또는 docker pull docker.io/library/postgres:16
2. docker run --name mustit-blog -e POSTGRES_PASSWORD=1033 -p 5432:5432 -d postgres:16

- 프로젝트 세팅

1. .env에 아래 내용 추가
   DATABASE_URL="postgresql://postgres:1033@localhost:5432/mustit?schema=public"
2. npm install
3. npm run dev
4. npx prisma generate
5. npx prisma migrate dev --name init
6. 브라우저에 localhost:9900/api 입력 -> swagger 문서가 보이면 실행이 잘 된것입니다.

## prod 모드로 실행방법 (docker-compose 사용)

1. .env 수정
   DATABASE_URL="postgresql://postgres:1033@mustit-blog-db:5432/mustit?schema=public"
2. docker compose up
