/*
  Warnings:

  - You are about to drop the column `usersId` on the `wallets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_usersId_fkey";

-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "usersId",
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
