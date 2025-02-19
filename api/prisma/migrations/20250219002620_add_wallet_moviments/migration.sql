-- CreateTable
CREATE TABLE "wallet_moviments" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "payment_id" INTEGER,
    "receivable_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "wallet_moviments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wallet_moviments" ADD CONSTRAINT "wallet_moviments_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_moviments" ADD CONSTRAINT "wallet_moviments_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_moviments" ADD CONSTRAINT "wallet_moviments_receivable_id_fkey" FOREIGN KEY ("receivable_id") REFERENCES "receivables"("id") ON DELETE SET NULL ON UPDATE CASCADE;
