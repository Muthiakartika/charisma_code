/**
 * Runs on every deploy (npm run ci, after the migrations): applies the developer handoff of
 * 26 Oct 2026, and later changes to it, to a database that does not have them yet, so staging
 * catches up without anyone needing the database password. Each update in UPDATES runs once:
 * a marker in Payload's key-value store records the last one applied, and later deploys only
 * check it, so edits made in the CMS afterwards are kept (except on the pages a new update
 * re-imports). To ship a change made through the importer, add an update with its pages.
 *
 * Each page and photo is saved on its own (no long database transaction: Neon closes one that
 * stays open while photos upload, error 25P03). It never fails the deploy: when something goes
 * wrong it logs a warning, and the next deploy runs it again from the start (the import can be
 * repeated safely). On an empty database it skips: the seed fills it instead.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { importHandoff } from './import'

/** In order. Every import also refreshes the header, footer and services from the briefs. */
const UPDATES: { version: string; note: string; slugs?: string[] }[] = [
  { version: '2026-10-27', note: 'the developer handoff of 26 Oct' },
  { version: '2026-10-30', note: 'About: credentials and recognition', slugs: ['about'] },
]
const MARKER = 'content:dev-handoff'

const stop = (error: unknown) => {
  console.warn('[handoff] not applied, the next deploy tries again:', error)
  process.exit(0)
}
process.on('uncaughtException', stop)
process.on('unhandledRejection', stop)

try {
  const payload = await getPayload({ config })
  const applied = (await payload.kv.get<{ version: string }>(MARKER))?.version ?? ''
  const pending = UPDATES.filter((update) => update.version > applied)
  const latest = UPDATES[UPDATES.length - 1].version
  const { totalDocs } = await payload.count({ collection: 'pages' })
  if (!pending.length) {
    payload.logger.info(`[handoff] already applied (version ${applied})`)
  } else if (!totalDocs) {
    payload.logger.info('[handoff] empty database, skipped (run the seed first)')
  } else {
    // The whole handoff already includes every later change; otherwise only the changed pages
    const slugs = pending.some((update) => !update.slugs)
      ? undefined
      : [...new Set(pending.flatMap((update) => update.slugs ?? []))]
    payload.logger.info(`[handoff] applying: ${pending.map((update) => update.note).join('; ')}`)
    await importHandoff(payload, { slugs })
    await payload.kv.set(MARKER, { version: latest, appliedAt: new Date().toISOString() })
    payload.logger.info(`[handoff] applied (version ${latest})`)
  }
} catch (error) {
  stop(error)
}
process.exit(0)
