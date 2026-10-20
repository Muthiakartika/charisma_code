import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_statement_button_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_button_type" AS ENUM('page', 'custom');
  CREATE TABLE "pages_blocks_statement_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_statement_roles_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_type" "enum_pages_blocks_statement_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"hidden" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statement_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"languages" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_statement_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement_roles_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_type" "enum__pages_v_blocks_statement_button_type" DEFAULT 'page',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"hidden" boolean DEFAULT false,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"languages" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_statement_roles" ADD CONSTRAINT "pages_blocks_statement_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_roles_locales" ADD CONSTRAINT "pages_blocks_statement_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statement_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statement_locales" ADD CONSTRAINT "pages_blocks_statement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_roles" ADD CONSTRAINT "_pages_v_blocks_statement_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_roles_locales" ADD CONSTRAINT "_pages_v_blocks_statement_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statement_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_button_page_id_pages_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement_locales" ADD CONSTRAINT "_pages_v_blocks_statement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statement"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_statement_roles_order_idx" ON "pages_blocks_statement_roles" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_roles_parent_id_idx" ON "pages_blocks_statement_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_statement_roles_locales_locale_parent_id_unique" ON "pages_blocks_statement_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_statement_button_button_page_idx" ON "pages_blocks_statement" USING btree ("button_page_id");
  CREATE UNIQUE INDEX "pages_blocks_statement_locales_locale_parent_id_unique" ON "pages_blocks_statement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_roles_order_idx" ON "_pages_v_blocks_statement_roles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_roles_parent_id_idx" ON "_pages_v_blocks_statement_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_statement_roles_locales_locale_parent_id_uni" ON "_pages_v_blocks_statement_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statement_button_button_page_idx" ON "_pages_v_blocks_statement" USING btree ("button_page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_statement_locales_locale_parent_id_unique" ON "_pages_v_blocks_statement_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_statement_roles" CASCADE;
  DROP TABLE "pages_blocks_statement_roles_locales" CASCADE;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_statement_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_statement_roles" CASCADE;
  DROP TABLE "_pages_v_blocks_statement_roles_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_statement_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_statement_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_statement_button_type";`)
}
