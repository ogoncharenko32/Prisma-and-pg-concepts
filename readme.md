npm i express prisma @prisma/client dotenv
npx prisma init

npx prisma migrate dev --name init

npx prisma generate

//update models
npx prisma migrate dev --name author

docker-compose up -d --build

docker exec -it express-api npx prisma generate
docker exec -it express-api npx prisma migrate dev --name init
docker exec -it express-api npx prisma db pull
