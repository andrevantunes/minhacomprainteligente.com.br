-- AlterTable
ALTER TABLE "wallet_moviments" ADD COLUMN     "fee" INTEGER,
ADD COLUMN     "withdraw_id" INTEGER;

-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "advance_fee" DOUBLE PRECISION NOT NULL DEFAULT 2.5;

-- AddForeignKey
ALTER TABLE "wallet_moviments" ADD CONSTRAINT "wallet_moviments_withdraw_id_fkey" FOREIGN KEY ("withdraw_id") REFERENCES "withdraws"("id") ON DELETE SET NULL ON UPDATE CASCADE;
