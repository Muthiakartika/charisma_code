/**
 * Runs on every deploy (npm run ci, after the handoff step): writes the Chinese draft in
 * docs/zh-draft into a database that does not have it yet, so staging gets the 中文 pages without
 * anyone needing the database password. Each version in UPDATES runs once (a marker in Payload's
 * key-value store records the last one), so Chinese edits made in the CMS afterwards are kept. To
 * ship a reviewed draft, add a version. Pages an editor already approved stay approved.
 *
 * Like the handoff step it never fails the deploy: on an error it logs a warning and the next
 * deploy tries again (the import can be repeated safely). On an empty database it skips.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { importChinese } from './import-zh'

/** In order. Every version re-imports the whole draft. */
const UPDATES: { version: string; note: string }[] = [
  { version: '2026-11-05', note: 'Chinese draft, proofread on 5 Nov' },
  { version: '2026-11-09', note: 'Chinese draft updated with the client data of 5 Nov' },
]
const MARKER = 'content:zh-draft'

const stop = (error: unknown) => {
  console.warn('[zh] not applied, the next deploy tries again:', error)
  process.exit(0)
}
process.on('uncaughtException', stop)
process.on('unhandledRejection', stop)

try {
  const payload = await getPayload({ config })
  const applied = (await payload.kv.get<{ version: string }>(MARKER))?.version ?? ''
  const latest = UPDATES[UPDATES.length - 1]
  const { totalDocs } = await payload.count({ collection: 'pages' })
  if (latest.version <= applied) {
    payload.logger.info(`[zh] already applied (version ${applied})`)
  } else if (!totalDocs) {
    payload.logger.info('[zh] empty database, skipped (run the seed first)')
  } else {
    payload.logger.info(`[zh] applying: ${latest.note}`)
    await importChinese(payload)
    await payload.kv.set(MARKER, { version: latest.version, appliedAt: new Date().toISOString() })
    payload.logger.info(`[zh] applied (version ${latest.version})`)
  }
} catch (error) {
  stop(error)
}
process.exit(0)
