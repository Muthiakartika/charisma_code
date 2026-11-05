/**
 * npm run import:zh                 → the Chinese draft for every page that has a Chinese file
 * npm run import:zh -- home about   → those pages (plus the menus, services and case studies)
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { importChinese, printMisses } from './import-zh'

const slugs = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))
const payload = await getPayload({ config })
printMisses(await importChinese(payload, { slugs }))
process.exit(0)
