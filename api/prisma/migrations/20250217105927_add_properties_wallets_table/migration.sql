-- CreateTable
CREATE TABLE "properties_wallets" (
    "id" SERIAL NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "property_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "properties_wallets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "properties_wallets" ADD CONSTRAINT "properties_wallets_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties_wallets" ADD CONSTRAINT "properties_wallets_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
