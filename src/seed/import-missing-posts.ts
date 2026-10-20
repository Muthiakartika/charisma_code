/**
 * Runs on every deploy (npm run ci, after the migrations): imports the WordPress blog posts that
 * are not in the database yet, so a database seeded without them catches up without anyone needing
 * the database password. Once every post is there it only checks and finishes in a few seconds.
 *
 * Each post is saved on its own. (As a migration this failed: Neon closes a database transaction
 * that stays open while photos upload, error 25P03.) Posts edited in the CMS are never touched.
 *
 * It never fails the deploy: when WordPress cannot be reached or something goes wrong, it logs a
 * warning and the next deploy continues where it stopped. After the launch, when the WordPress
 * website is gone, it simply skips; it can then be removed from "ci" in package.json.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { importWordPressPosts } from './wordpress-posts'

const stop = (error: unknown) => {
  console.warn('[wordpress] import stopped, the next deploy continues where it left off:', error)
  process.exit(0)
}
process.on('uncaughtException', stop)
process.on('unhandledRejection', stop)

try {
  const payload = await getPayload({ config })
  await importWordPressPosts(payload, { onlyMissing: true, skipWhenUnreachable: true })
} catch (error) {
  stop(error)
}
process.exit(0)
