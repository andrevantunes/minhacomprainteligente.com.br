/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "token" TEXT,
ADD COLUMN     "token_expires" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");
