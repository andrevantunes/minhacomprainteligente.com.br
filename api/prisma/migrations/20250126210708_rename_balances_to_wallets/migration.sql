/*
  Warnings:

  - You are about to drop the `balances` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "balances" DROP CONSTRAINT "balances_company_id_fkey";

-- DropTable
DROP TABLE "balances";

-- CreateTable
CREATE TABLE "wallets" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'BRL',
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
