/*
  Warnings:

  - You are about to drop the column `acquirer_transaction_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `acquirer_transaction_metadata` on the `payments` table. All the data in the column will be lost.
  - Added the required column `acquirer_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquirer_metadata` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "payments_acquirer_transaction_id_idx";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "acquirer_transaction_id",
DROP COLUMN "acquirer_transaction_metadata",
ADD COLUMN     "acquirer_id" TEXT NOT NULL,
ADD COLUMN     "acquirer_metadata" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "payments_acquirer_id_idx" ON "payments"("acquirer_id");
