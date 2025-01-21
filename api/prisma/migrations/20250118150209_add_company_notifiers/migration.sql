-- CreateEnum
CREATE TYPE "CompanyNotifiers" AS ENUM ('email', 'sms', 'whatsapp');

-- CreateTable
CREATE TABLE "company_notifiers" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "type" "CompanyNotifiers" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "company_notifiers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_notifiers" ADD CONSTRAINT "company_notifiers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
