/*
  Warnings:

  - The `token_expires` column on the `sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "token_expires",
ADD COLUMN     "token_expires" TIMESTAMP(3);
