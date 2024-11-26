-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('pending', 'completed', 'cancelled');

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "status" "CartStatus" NOT NULL DEFAULT 'pending';
