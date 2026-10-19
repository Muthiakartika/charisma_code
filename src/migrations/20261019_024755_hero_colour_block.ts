import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_line_art" AS ENUM('spotlight', 'curtain', 'skyline', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_line_art" AS ENUM('spotlight', 'curtain', 'skyline', 'none');
  ALTER TYPE "public"."enum_pages_blocks_hero_variant" ADD VALUE 'colourBlock' BEFORE 'photo';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_variant" ADD VALUE 'colourBlock' BEFORE 'photo';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "line_art" "enum_pages_blocks_hero_line_art" DEFAULT 'spotlight';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "line_art" "enum__pages_v_blocks_hero_line_art" DEFAULT 'spotlight';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'split'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('split', 'stage', 'photo', 'simple');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'split'::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_hero_variant" USING "variant"::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'split'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('split', 'stage', 'photo', 'simple');
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'split'::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_hero_variant" USING "variant"::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "line_art";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "line_art";
  DROP TYPE "public"."enum_pages_blocks_hero_line_art";
  DROP TYPE "public"."enum__pages_v_blocks_hero_line_art";`)
}
