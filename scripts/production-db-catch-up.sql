-- ─────────────────────────────────────────────────────────────────────────
-- ONE-OFF FIX for the production database (run once in the Neon/Supabase SQL editor).
--
-- Why: the production database was first filled with `npm run seed` from a local
-- computer, which creates the tables in "dev push" mode instead of through migrations.
-- `payload migrate` (run by every Vercel build) then stops to ask "Would you like to
-- proceed?", nobody can answer on Vercel, and the build hangs.
--
-- What it does:
--   1. Adds the Colour block hero fields (the same as migration
--      20261019_024755_hero_colour_block). Safe to run twice.
--   2. Records every migration as done and removes the "dev push" marker, so later
--      builds only run new migrations and never ask again.
--
-- After running it: redeploy on Vercel.
-- ─────────────────────────────────────────────────────────────────────────

-- 1. Colour block hero: the "Line art" field and the "Colour block" layout
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_hero_line_art" AS ENUM('spotlight', 'curtain', 'skyline', 'none');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_hero_line_art" AS ENUM('spotlight', 'curtain', 'skyline', 'none');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
ALTER TYPE "public"."enum_pages_blocks_hero_variant" ADD VALUE IF NOT EXISTS 'colourBlock' BEFORE 'photo';
ALTER TYPE "public"."enum__pages_v_blocks_hero_variant" ADD VALUE IF NOT EXISTS 'colourBlock' BEFORE 'photo';
ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "line_art" "public"."enum_pages_blocks_hero_line_art" DEFAULT 'spotlight';
ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "line_art" "public"."enum__pages_v_blocks_hero_line_art" DEFAULT 'spotlight';

-- 2. Mark the database as migrated
DELETE FROM "payload_migrations" WHERE "batch" = -1;
INSERT INTO "payload_migrations" ("name", "batch", "updated_at", "created_at")
SELECT m.name, 1, now(), now()
FROM (
  VALUES
    ('20261012_060329_initial'),
    ('20261012_064509_design_stage_blocks'),
    ('20261012_064510_feature_grid_default_list'),
    ('20261012_083622_instagram_posts'),
    ('20261019_024755_hero_colour_block')
) AS m(name)
WHERE NOT EXISTS (SELECT 1 FROM "payload_migrations" p WHERE p."name" = m.name);

-- Check: should list the five migrations above, and no row named "dev"
SELECT "name", "batch" FROM "payload_migrations" ORDER BY "id";
