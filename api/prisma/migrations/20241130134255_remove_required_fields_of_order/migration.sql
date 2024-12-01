/*
  Warnings:

  - You are about to drop the column `value` on the `payments` table. All the data in the column will be lost.
  - Added the required column `amount` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "document_number" DROP NOT NULL,
ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "acquirer" DROP NOT NULL,
ALTER COLUMN "acquirer_id" DROP NOT NULL,
ALTER COLUMN "acquirer_metadata" DROP NOT NULL,
ALTER COLUMN "currency" SET DEFAULT 'BRL';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "value",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL;
