/*
  Warnings:

  - The values [completed] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [completed] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('paid', 'pending', 'authorized', 'failed', 'refunded', 'cancelled', 'chargeback');
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('paid', 'pending', 'authorized', 'failed', 'refunded', 'cancelled', 'chargeback');
ALTER TABLE "payments" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "currency" SET DEFAULT 'BRL';
