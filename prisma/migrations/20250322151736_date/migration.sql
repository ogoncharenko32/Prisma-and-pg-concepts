-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "publishedDate" DROP NOT NULL,
ALTER COLUMN "publishedDate" SET DATA TYPE DATE;
