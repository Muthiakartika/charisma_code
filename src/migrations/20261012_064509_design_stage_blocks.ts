import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// New enum values cannot be used in the same transaction that adds them,
// so the new "list" default is set in the next migration.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_client_logos_display" AS ENUM('marquee', 'static');
  CREATE TYPE "public"."enum__pages_v_blocks_client_logos_display" AS ENUM('marquee', 'static');
  ALTER TYPE "public"."enum_pages_blocks_hero_variant" ADD VALUE 'stage' BEFORE 'photo';
  ALTER TYPE "public"."enum_pages_blocks_feature_grid_style" ADD VALUE 'list' BEFORE 'numbered';
  ALTER TYPE "public"."enum_pages_blocks_feature_grid_style" ADD VALUE 'strip' BEFORE 'cards';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_variant" ADD VALUE 'stage' BEFORE 'photo';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_grid_style" ADD VALUE 'list' BEFORE 'numbered';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_grid_style" ADD VALUE 'strip' BEFORE 'cards';
  ALTER TABLE "pages_blocks_client_logos" ADD COLUMN "display" "enum_pages_blocks_client_logos_display" DEFAULT 'marquee';
  ALTER TABLE "pages_blocks_client_logos" ADD COLUMN "limit" numeric DEFAULT 12;
  ALTER TABLE "pages_blocks_client_logos" ADD COLUMN "testimonial_id" integer;
  ALTER TABLE "_pages_v_blocks_client_logos" ADD COLUMN "display" "enum__pages_v_blocks_client_logos_display" DEFAULT 'marquee';
  ALTER TABLE "_pages_v_blocks_client_logos" ADD COLUMN "limit" numeric DEFAULT 12;
  ALTER TABLE "_pages_v_blocks_client_logos" ADD COLUMN "testimonial_id" integer;
  ALTER TABLE "pages_blocks_client_logos" ADD CONSTRAINT "pages_blocks_client_logos_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_client_logos" ADD CONSTRAINT "_pages_v_blocks_client_logos_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_client_logos_testimonial_idx" ON "pages_blocks_client_logos" USING btree ("testimonial_id");
  CREATE INDEX "_pages_v_blocks_client_logos_testimonial_idx" ON "_pages_v_blocks_client_logos" USING btree ("testimonial_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_client_logos" DROP CONSTRAINT "pages_blocks_client_logos_testimonial_id_testimonials_id_fk";
  
  ALTER TABLE "_pages_v_blocks_client_logos" DROP CONSTRAINT "_pages_v_blocks_client_logos_testimonial_id_testimonials_id_fk";
  
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'split'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('split', 'photo', 'simple');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'split'::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_hero_variant" USING "variant"::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'numbered'::text;
  DROP TYPE "public"."enum_pages_blocks_feature_grid_style";
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_style" AS ENUM('numbered', 'cards', 'checklist');
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'numbered'::"public"."enum_pages_blocks_feature_grid_style";
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_feature_grid_style" USING "style"::"public"."enum_pages_blocks_feature_grid_style";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'split'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('split', 'photo', 'simple');
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'split'::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_hero_variant" USING "variant"::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'numbered'::text;
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_style";
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_style" AS ENUM('numbered', 'cards', 'checklist');
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'numbered'::"public"."enum__pages_v_blocks_feature_grid_style";
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE "public"."enum__pages_v_blocks_feature_grid_style" USING "style"::"public"."enum__pages_v_blocks_feature_grid_style";
  DROP INDEX "pages_blocks_client_logos_testimonial_idx";
  DROP INDEX "_pages_v_blocks_client_logos_testimonial_idx";
  ALTER TABLE "pages_blocks_client_logos" DROP COLUMN "display";
  ALTER TABLE "pages_blocks_client_logos" DROP COLUMN "limit";
  ALTER TABLE "pages_blocks_client_logos" DROP COLUMN "testimonial_id";
  ALTER TABLE "_pages_v_blocks_client_logos" DROP COLUMN "display";
  ALTER TABLE "_pages_v_blocks_client_logos" DROP COLUMN "limit";
  ALTER TABLE "_pages_v_blocks_client_logos" DROP COLUMN "testimonial_id";
  DROP TYPE "public"."enum_pages_blocks_client_logos_display";
  DROP TYPE "public"."enum__pages_v_blocks_client_logos_display";`)
}
