/*
  Warnings:

  - You are about to drop the column `price` on the `orders` table. All the data in the column will be lost.
  - Added the required column `acquirer` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquirer_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquirer_metadata` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'authorized', 'completed', 'failed', 'refunded', 'cancelled', 'chargeback');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('BRL', 'USD', 'MXN', 'CLP', 'COP', 'PEN', 'ARS', 'CRC', 'DOP', 'PAB', 'UYU', 'GTQ', 'PYG');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "price",
ADD COLUMN     "acquirer" TEXT NOT NULL,
ADD COLUMN     "acquirer_id" TEXT NOT NULL,
ADD COLUMN     "acquirer_metadata" JSONB NOT NULL,
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL,
ADD COLUMN     "status" "OrderStatus";
