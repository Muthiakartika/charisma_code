import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_founder_updates_source" AS ENUM('instagram', 'updates');
  CREATE TYPE "public"."enum__pages_v_blocks_founder_updates_source" AS ENUM('instagram', 'updates');
  CREATE TYPE "public"."enum_instagram_posts_media_type" AS ENUM('video', 'image', 'carousel');
  CREATE TYPE "public"."enum_instagram_posts_source" AS ENUM('manual', 'api');
  CREATE TABLE "instagram_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer NOT NULL,
  	"permalink" varchar NOT NULL,
  	"posted_at" timestamp(3) with time zone NOT NULL,
  	"media_type" "enum_instagram_posts_media_type" DEFAULT 'video',
  	"caption" varchar,
  	"show_on_website" boolean DEFAULT true,
  	"source" "enum_instagram_posts_source" DEFAULT 'manual',
  	"instagram_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_founder_updates" ADD COLUMN "source" "enum_pages_blocks_founder_updates_source" DEFAULT 'instagram';
  ALTER TABLE "pages_blocks_founder_updates" ADD COLUMN "limit" numeric DEFAULT 6;
  ALTER TABLE "_pages_v_blocks_founder_updates" ADD COLUMN "source" "enum__pages_v_blocks_founder_updates_source" DEFAULT 'instagram';
  ALTER TABLE "_pages_v_blocks_founder_updates" ADD COLUMN "limit" numeric DEFAULT 6;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "instagram_posts_id" integer;
  ALTER TABLE "instagram_posts" ADD CONSTRAINT "instagram_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "instagram_posts_image_idx" ON "instagram_posts" USING btree ("image_id");
  CREATE UNIQUE INDEX "instagram_posts_instagram_id_idx" ON "instagram_posts" USING btree ("instagram_id");
  CREATE INDEX "instagram_posts_updated_at_idx" ON "instagram_posts" USING btree ("updated_at");
  CREATE INDEX "instagram_posts_created_at_idx" ON "instagram_posts" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_instagram_posts_fk" FOREIGN KEY ("instagram_posts_id") REFERENCES "public"."instagram_posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_instagram_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("instagram_posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "instagram_posts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "instagram_posts" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_instagram_posts_fk";
  
  DROP INDEX "payload_locked_documents_rels_instagram_posts_id_idx";
  ALTER TABLE "pages_blocks_founder_updates" DROP COLUMN "source";
  ALTER TABLE "pages_blocks_founder_updates" DROP COLUMN "limit";
  ALTER TABLE "_pages_v_blocks_founder_updates" DROP COLUMN "source";
  ALTER TABLE "_pages_v_blocks_founder_updates" DROP COLUMN "limit";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "instagram_posts_id";
  DROP TYPE "public"."enum_pages_blocks_founder_updates_source";
  DROP TYPE "public"."enum__pages_v_blocks_founder_updates_source";
  DROP TYPE "public"."enum_instagram_posts_media_type";
  DROP TYPE "public"."enum_instagram_posts_source";`)
}
