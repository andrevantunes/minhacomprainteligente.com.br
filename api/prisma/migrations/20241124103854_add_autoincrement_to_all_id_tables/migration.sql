-- AlterTable
CREATE SEQUENCE addresses_id_seq;
ALTER TABLE "addresses" ALTER COLUMN "id" SET DEFAULT nextval('addresses_id_seq');
ALTER SEQUENCE addresses_id_seq OWNED BY "addresses"."id";

-- AlterTable
CREATE SEQUENCE carts_id_seq;
ALTER TABLE "carts" ALTER COLUMN "id" SET DEFAULT nextval('carts_id_seq');
ALTER SEQUENCE carts_id_seq OWNED BY "carts"."id";

-- AlterTable
CREATE SEQUENCE companies_id_seq;
ALTER TABLE "companies" ALTER COLUMN "id" SET DEFAULT nextval('companies_id_seq');
ALTER SEQUENCE companies_id_seq OWNED BY "companies"."id";

-- AlterTable
CREATE SEQUENCE orders_id_seq;
ALTER TABLE "orders" ALTER COLUMN "id" SET DEFAULT nextval('orders_id_seq');
ALTER SEQUENCE orders_id_seq OWNED BY "orders"."id";

-- AlterTable
CREATE SEQUENCE payments_id_seq;
ALTER TABLE "payments" ALTER COLUMN "id" SET DEFAULT nextval('payments_id_seq');
ALTER SEQUENCE payments_id_seq OWNED BY "payments"."id";

-- AlterTable
CREATE SEQUENCE products_id_seq;
ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT nextval('products_id_seq');
ALTER SEQUENCE products_id_seq OWNED BY "products"."id";

-- AlterTable
CREATE SEQUENCE properties_id_seq;
ALTER TABLE "properties" ALTER COLUMN "id" SET DEFAULT nextval('properties_id_seq');
ALTER SEQUENCE properties_id_seq OWNED BY "properties"."id";

-- AlterTable
CREATE SEQUENCE properties_managers_id_seq;
ALTER TABLE "properties_managers" ALTER COLUMN "id" SET DEFAULT nextval('properties_managers_id_seq');
ALTER SEQUENCE properties_managers_id_seq OWNED BY "properties_managers"."id";

-- AlterTable
CREATE SEQUENCE replacements_id_seq;
ALTER TABLE "replacements" ALTER COLUMN "id" SET DEFAULT nextval('replacements_id_seq');
ALTER SEQUENCE replacements_id_seq OWNED BY "replacements"."id";
