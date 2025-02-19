-- AlterTable
ALTER TABLE "receivables" ADD COLUMN     "payment_id" INTEGER;

-- AddForeignKey
ALTER TABLE "receivables" ADD CONSTRAINT "receivables_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
