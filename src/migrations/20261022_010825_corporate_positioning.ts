import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

import { applyCorporatePositioningContent } from '../seed/corporate-positioning-2026-10-22'

/**
 * Content only, no schema change (client, 22 Oct 2026): the homepage describes the company and
 * De Zhong's performer roles move to his profile on About. Skipped on a new, empty database.
 * See src/seed/corporate-positioning-2026-10-22.ts.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await applyCorporatePositioningContent(payload, req)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Content changes are not undone automatically. Edit the pages in the CMS if needed.')
}
