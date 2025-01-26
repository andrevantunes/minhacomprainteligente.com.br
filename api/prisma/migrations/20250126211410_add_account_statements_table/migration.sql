-- CreateTable
CREATE TABLE "account_statements" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'BRL',
    "payment_id" INTEGER,
    "wallet_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "account_statements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "account_statements" ADD CONSTRAINT "account_statements_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_statements" ADD CONSTRAINT "account_statements_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
