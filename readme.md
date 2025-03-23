npm i express prisma @prisma/client dotenv
npx prisma init

npx prisma migrate dev --name init

npx prisma generate

//update models
npx prisma migrate dev --name author
