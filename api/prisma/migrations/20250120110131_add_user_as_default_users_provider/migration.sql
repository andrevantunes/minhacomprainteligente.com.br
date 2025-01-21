/*
  Warnings:

  - You are about to drop the `company_notifiers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company_notifiers" DROP CONSTRAINT "company_notifiers_company_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "provider" SET DEFAULT 'user';

-- DropTable
DROP TABLE "company_notifiers";

-- DropEnum
DROP TYPE "CompanyNotifiers";
