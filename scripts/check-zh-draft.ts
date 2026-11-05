/**
 * Checks that each Chinese draft page (docs/zh-draft/pages/*.md) has the same structure as its
 * English brief (docs/handoff/pages/*.md): the same sections, the same items in the same order,
 * and the same button targets. Only then can the translation be loaded into the CMS block by block.
 *
 * Usage: npx tsx scripts/check-zh-draft.ts [file.md ...]
 */
import fs from 'fs'
import path from 'path'

import { parseBrief, type BriefItem } from '../src/seed/handoff/parse-brief'

const ZH_DIR = path.resolve(process.cwd(), 'docs/zh-draft/pages')
const fromHandoff = path.relative(path.resolve(process.cwd(), 'docs/handoff/pages'), ZH_DIR)

const describe = (item: BriefItem) =>
  item.kind === 'heading'
    ? `H${item.level}`
    : // The WhatsApp message after "?text=" is translated too
      item.kind === 'button'
      ? `button ${item.href.split('?')[0]}`
      : item.kind

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(ZH_DIR).filter((file) => file.endsWith('.md'))

let failed = 0
for (const file of files) {
  const en = parseBrief(file)
  const zh = parseBrief(path.join(fromHandoff, file))
  const problems: string[] = []

  if (en.sections.length !== zh.sections.length)
    problems.push(`${en.sections.length} sections in English, ${zh.sections.length} in Chinese`)

  en.sections.forEach((section, index) => {
    const other = zh.sections[index]
    const label = `Section ${section.number ?? section.name}`
    if (!other) return
    if (other.number !== section.number || other.name !== section.name)
      problems.push(`${label}: Chinese file has "${other.number ?? ''} ${other.name}" here`)
    const a = section.items.map(describe)
    const b = other.items.map(describe)
    const length = Math.max(a.length, b.length)
    for (let i = 0; i < length; i++) {
      if (a[i] !== b[i]) {
        problems.push(`${label}, item ${i + 1}: English ${a[i] ?? '(none)'}, Chinese ${b[i] ?? '(none)'}`)
        break
      }
    }
  })

  for (const field of ['SEO title', 'Meta description'])
    if (en.seo[field] && !zh.seo[field]) problems.push(`missing ${field}`)
  if (en.form['WhatsApp pre-filled message'] && !zh.form['WhatsApp pre-filled message'])
    problems.push('missing WhatsApp pre-filled message')

  // Visible Chinese text should not use dashes as punctuation (house rule). Headings of the file
  // itself and the " — author" of quotes are part of the format, not visible text.
  const visible = fs
    .readFileSync(path.join(ZH_DIR, file), 'utf-8')
    .split('\n')
    .filter((line) => !/^#/.test(line))
    .map((line) => line.replace(/^> "(.+)" — .+$/, '$1'))
  const dashed = visible.find((line) => /[—–]/.test(line))
  if (dashed) problems.push(`uses a dash in: ${dashed.slice(0, 80)}`)

  if (problems.length) {
    failed++
    console.log(`✗ ${file}\n  - ${problems.join('\n  - ')}`)
  } else {
    console.log(`✓ ${file}`)
  }
}
process.exit(failed ? 1 : 0)
