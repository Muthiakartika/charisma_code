import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

import { applyClientFeedbackContent } from '../seed/client-feedback-2026-10-20'

/**
 * Content only, no schema change: applies the client-feedback copy (20 Oct 2026) to a database
 * that was seeded earlier, during the Vercel deploy. Skipped on a new, empty database.
 * See src/seed/client-feedback-2026-10-20.ts.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await applyClientFeedbackContent(payload, req)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Content changes are not undone automatically. Edit the pages in the CMS if needed.')
}
