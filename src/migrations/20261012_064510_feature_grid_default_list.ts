import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// Runs after 20261012_064509_design_stage_blocks has committed the new 'list' enum value
// (Postgres does not allow a new enum value to be used in the transaction that adds it).
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list';
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'numbered';
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'numbered';`)
}
