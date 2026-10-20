/**
 * Imports the 70 blog posts from the existing WordPress website into "Blog Posts"
 * (run with: npm run migrate:wordpress). Safe to run more than once: existing posts are updated.
 * The import itself lives in ./wordpress-posts.ts.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { importWordPressPosts } from './wordpress-posts'

const payload = await getPayload({ config })
await importWordPressPosts(payload)
process.exit(0)
