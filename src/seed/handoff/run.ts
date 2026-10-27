/**
 * npm run import:handoff -- home corporate-team-building   → those pages
 * npm run import:handoff -- phase=2                         → every page of phase 2 (see recipes.ts)
 * npm run import:handoff                                    → every page in the handoff
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { importHandoff } from './import'

const args = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))
const phase = args.find((arg) => arg.startsWith('phase='))
const payload = await getPayload({ config })
await importHandoff(payload, {
  phase: phase ? Number(phase.split('=')[1]) : undefined,
  slugs: args.filter((arg) => !arg.startsWith('phase=')),
})
process.exit(0)
