-- CreateEnum
CREATE TYPE "WithdrawStatus" AS ENUM ('pending', 'paid', 'refused');

-- CreateTable
CREATE TABLE "withdraws" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "status" "WithdrawStatus" NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'BRL',
    "company_id" INTEGER NOT NULL,
    "user_requester_id" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "withdraws_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "withdraws" ADD CONSTRAINT "withdraws_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdraws" ADD CONSTRAINT "withdraws_user_requester_id_fkey" FOREIGN KEY ("user_requester_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
