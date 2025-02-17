-- AlterTable
ALTER TABLE "receivables" ALTER COLUMN "settled_at" DROP NOT NULL,
ALTER COLUMN "settled_at" DROP DEFAULT;
