/*
  Warnings:

  - You are about to drop the column `company_id` on the `withdraws` table. All the data in the column will be lost.
  - Added the required column `wallet_id` to the `withdraws` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "withdraws" DROP CONSTRAINT "withdraws_company_id_fkey";

-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "usersId" INTEGER;

-- AlterTable
ALTER TABLE "withdraws" DROP COLUMN "company_id",
ADD COLUMN     "companiesId" INTEGER,
ADD COLUMN     "wallet_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "withdraws" ADD CONSTRAINT "withdraws_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdraws" ADD CONSTRAINT "withdraws_companiesId_fkey" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
