import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

import { importWordPressPosts } from '../seed/wordpress-posts'

/**
 * Content only, no schema change: imports the WordPress blog posts during the Vercel deploy, so
 * nobody needs the database password on a laptop. Only adds posts that are missing (posts edited
 * in the CMS are left alone); skipped on an empty database or when WordPress cannot be reached.
 * The work happens outside the migration's transaction, so a run that stops halfway keeps what it
 * imported: run `npm run migrate:wordpress` against the database to finish it.
 * See src/seed/wordpress-posts.ts.
 */
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await importWordPressPosts(payload, { onlyMissing: true, skipWhenUnreachable: true })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Imported blog posts are not removed automatically. Delete them in the CMS if needed.')
}
