/**
 * Runs on every deploy (npm run ci, after the migrations): applies the developer handoff of
 * 26 Oct 2026 to a database that does not have it yet, so staging catches up without anyone
 * needing the database password. It runs once: a marker in Payload's key-value store records
 * that it was applied, and later deploys only check it, so edits made in the CMS afterwards are
 * never overwritten. Change HANDOFF_VERSION to apply an updated handoff again.
 *
 * Each page and photo is saved on its own (no long database transaction: Neon closes one that
 * stays open while photos upload, error 25P03). It never fails the deploy: when something goes
 * wrong it logs a warning, and the next deploy runs it again from the start (the import can be
 * repeated safely). On an empty database it skips: the seed fills it instead.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { importHandoff } from './import'

const HANDOFF_VERSION = '2026-10-27'
const MARKER = 'content:dev-handoff'

const stop = (error: unknown) => {
  console.warn('[handoff] not applied, the next deploy tries again:', error)
  process.exit(0)
}
process.on('uncaughtException', stop)
process.on('unhandledRejection', stop)

try {
  const payload = await getPayload({ config })
  const applied = await payload.kv.get<{ version: string }>(MARKER)
  const { totalDocs } = await payload.count({ collection: 'pages' })
  if (applied?.version === HANDOFF_VERSION) {
    payload.logger.info('[handoff] already applied')
  } else if (!totalDocs) {
    payload.logger.info('[handoff] empty database, skipped (run the seed first)')
  } else {
    await importHandoff(payload, {})
    await payload.kv.set(MARKER, { version: HANDOFF_VERSION, appliedAt: new Date().toISOString() })
    payload.logger.info(`[handoff] applied (version ${HANDOFF_VERSION})`)
  }
} catch (error) {
  stop(error)
}
process.exit(0)
