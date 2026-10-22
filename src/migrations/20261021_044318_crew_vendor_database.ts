import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

import { applyCrewDatabaseContent } from '../seed/crew-database-2026-10-21'

/**
 * Talent and vendor database (client request, 21 Oct 2026): three new roles on the freelancer
 * form (coach, partner vendor, fringe activity provider), then the new homepage section and the
 * updated Work With Us page. See src/seed/crew-database-2026-10-21.ts.
 */

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_freelancer_applications_role" ADD VALUE 'coach' BEFORE 'emcee';
  ALTER TYPE "public"."enum_freelancer_applications_role" ADD VALUE 'partner-vendor' BEFORE 'other';
  ALTER TYPE "public"."enum_freelancer_applications_role" ADD VALUE 'fringe-activity' BEFORE 'other';`)
  await applyCrewDatabaseContent(payload, req)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "freelancer_applications" ALTER COLUMN "role" SET DATA TYPE text;
  DROP TYPE "public"."enum_freelancer_applications_role";
  CREATE TYPE "public"."enum_freelancer_applications_role" AS ENUM('facilitator', 'emcee', 'host', 'performer', 'singer', 'event-crew', 'photographer', 'videographer', 'sound-crew', 'creative-partner', 'other');
  ALTER TABLE "freelancer_applications" ALTER COLUMN "role" SET DATA TYPE "public"."enum_freelancer_applications_role" USING "role"::"public"."enum_freelancer_applications_role";`)
}
