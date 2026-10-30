import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_feature_grid_style" ADD VALUE 'credentials';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_grid_style" ADD VALUE 'credentials';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list'::text;
  DROP TYPE "public"."enum_pages_blocks_feature_grid_style";
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_style" AS ENUM('list', 'numbered', 'strip', 'cards', 'checklist', 'match', 'notes');
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list'::"public"."enum_pages_blocks_feature_grid_style";
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_feature_grid_style" USING "style"::"public"."enum_pages_blocks_feature_grid_style";
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list'::text;
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_style";
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_style" AS ENUM('list', 'numbered', 'strip', 'cards', 'checklist', 'match', 'notes');
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list'::"public"."enum__pages_v_blocks_feature_grid_style";
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE "public"."enum__pages_v_blocks_feature_grid_style" USING "style"::"public"."enum__pages_v_blocks_feature_grid_style";`)
}
