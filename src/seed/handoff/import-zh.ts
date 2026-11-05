/**
 * Loads the Chinese draft (docs/zh-draft, 4 Nov 2026) into the CMS as the 中文 version of the
 * pages, the header, menu and footer, the services and the case studies, and marks each page and
 * case study "Draft — needs native-speaker review". Nothing becomes public: /zh/… only shows a page
 * once an editor sets its Chinese translation to "Approved". To see a page before that, open it in
 * the CMS, pick Locale: 中文 at the top and press Preview.
 *
 * How texts are matched: each English brief and its Chinese file have the same items in the same
 * order (scripts/check-zh-draft.ts checks this), so every English text in a brief has a Chinese
 * twin. The English content already in the CMS is then walked field by field, and every
 * translatable text that matches an English text from the briefs, shared.md or the glossary gets
 * the Chinese one. The layout, photos and links stay as they are. Texts without a match keep their
 * English wording and are listed at the end.
 *
 * Run it with:  npm run import:zh            (every page with a Chinese file)
 *               npm run import:zh -- home about
 */
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload, type Block, type Field, type GlobalSlug, type Payload } from 'payload'

import { projects } from '../data'
import { seedContext } from '../helpers'
import { parseBrief, withoutCharacterCount, type BriefItem, type BriefPage } from './parse-brief'
import { recipes } from './recipes'
import { linkPaths } from './to-blocks'

const ZH_DIR = path.resolve(process.cwd(), 'docs/zh-draft')
/** parseBrief() reads from docs/handoff/pages, so the Chinese files are reached relative to it. */
const ZH_FROM_HANDOFF = path.relative(
  path.resolve(process.cwd(), 'docs/handoff/pages'),
  path.join(ZH_DIR, 'pages'),
)

const CJK = /[㐀-鿿]/g
const countCjk = (text: string) => text.match(CJK)?.length ?? 0

/** How texts are compared: case, *highlight* marks, markdown links and spacing do not matter. */
const keyOf = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .trim()
    .toLowerCase()

/** English text → Chinese text. The first pair added for a text wins. */
class Memory {
  private pairs = new Map<string, string>()

  add(en: string | undefined, zh: string | undefined) {
    if (!en?.trim() || !zh?.trim()) return
    const key = keyOf(en)
    if (!this.pairs.has(key)) this.pairs.set(key, zh.trim())
  }

  get(en: string) {
    return this.pairs.get(keyOf(en))
  }
}

/**
 * "详见 /event-planning" → "详见 [活动策划](/event-planning)", as linkPaths() does for the English
 * ("see [Event Planning](/event-planning)"), with the Chinese page names from `names`.
 */
const linkChinesePaths = (zh: string, names: Memory) =>
  zh.replace(/(^|\s)(\/[a-z0-9-]+)(?=$|[\s,.，。])/g, (match, space: string, href: string) => {
    const englishName = linkPaths(href).match(/^\[([^\]]+)\]/)?.[1]
    const chineseName = englishName && names.get(englishName)
    return chineseName ? `${space}[${chineseName}](${href})` : match
  })

/** A text, plus the parts the importer may split it into: "situation → page", "Title: price", "a · b". */
function addText(memory: Memory, en: string, zh: string, names?: Memory) {
  memory.add(en, zh)
  if (names && linkPaths(en) !== en) memory.add(linkPaths(en), linkChinesePaths(zh, names))
  const splits: [RegExp, RegExp][] = [
    [/\s+→\s+/, /\s+→\s+/],
    [/:\s+/, /[：:]\s*/],
    [/\s+·\s+/, /\s*·\s*/],
  ]
  for (const [enSplit, zhSplit] of splits) {
    const enParts = en.split(enSplit)
    const zhParts = zh.split(zhSplit)
    if (enParts.length > 1 && enParts.length === zhParts.length)
      enParts.forEach((part, index) => addText(memory, part, zhParts[index], names))
  }
  // Step headings lose their number ("1. Your objectives"), card headings their arrow ("Wedding Emcee →")
  const bare = (text: string) => text.replace(/^\d+\.\s+/, '').replace(/\s*[↓→]$/, '')
  if (bare(en) !== en) memory.add(bare(en), bare(zh))
}

function addItem(memory: Memory, en: BriefItem, zh: BriefItem | undefined, names: Memory) {
  if (!zh || zh.kind !== en.kind) return
  if (en.kind === 'button' && zh.kind === 'button') memory.add(en.label, zh.label)
  else if (en.kind === 'quote' && zh.kind === 'quote') {
    memory.add(en.text, zh.text)
    memory.add(en.author, zh.author)
  } else if (en.kind === 'table' && zh.kind === 'table') {
    en.rows.forEach((row, r) => row.forEach((cell, c) => memory.add(cell, zh.rows[r]?.[c])))
  } else if (en.kind === 'idealFor' && zh.kind === 'idealFor') {
    // The "Ideal for:" marker stays in English in the Chinese file
    addText(memory, en.text, zh.text.replace(/^Ideal for:\s*/, '适合：'), names)
  } else if ('text' in en && 'text' in zh) addText(memory, en.text, zh.text, names)
}

function addBrief(memory: Memory, en: BriefPage, zh: BriefPage, names: Memory) {
  en.sections.forEach((section, index) => {
    const other = zh.sections[index]
    if (!other) return
    section.items.forEach((item, position) => addItem(memory, item, other.items[position], names))
    // Recipes sometimes join a section's paragraphs into one text
    const paragraphs = (items: BriefItem[]) =>
      items.flatMap((item) => (item.kind === 'paragraph' ? [item.text] : []))
    const enParagraphs = paragraphs(section.items)
    const zhParagraphs = paragraphs(other.items)
    if (enParagraphs.length !== zhParagraphs.length) return
    for (let start = 0; start < enParagraphs.length; start++) {
      for (let end = start + 2; end <= enParagraphs.length; end++) {
        const enRun = enParagraphs.slice(start, end)
        const zhRun = zhParagraphs.slice(start, end)
        memory.add(enRun.join(' '), zhRun.join(''))
        memory.add(enRun.join('\n\n'), zhRun.join('\n\n'))
      }
    }
  })
  for (const field of ['SEO title', 'Meta description']) {
    const enValue = withoutCharacterCount(en.seo[field])
    const zhValue = withoutCharacterCount(zh.seo[field])
    memory.add(enValue, zhValue)
    // A service keeps the first 200 characters of its page's meta description as its summary
    memory.add(enValue.slice(0, 200), zhValue)
  }
}

/**
 * Pairs from the tables in shared.md and glossary.md: an English cell followed by its Chinese cell.
 * "Emcee (hub) / All emcee services" gives each name; "Conference (& Seminar) Emcee" both spellings.
 */
function addTables(memory: Memory, file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')
  const isEnglish = (cell: string) => countCjk(cell) <= 2 && /[a-z]{3}/i.test(cell)
  const variants = (name: string) => {
    const optional = name.match(/\s*\(([^)]+)\)\s*/)
    if (!optional) return [name]
    return [
      name.replace(optional[0], ' ').trim(),
      name.replace(optional[0], ` ${optional[1]} `).trim(),
    ]
  }
  lines.forEach((line, index) => {
    if (!line.startsWith('|') || /^\|[\s|:-]+\|?$/.test(lines[index + 1] ?? '')) return
    const cells = line
      .replace(/^\||\|$/g, '')
      .split(/(?<!\\)\|/)
      .map((cell) => cell.trim().replace(/\\\|/g, '|').replace(/^·\s*/, ''))
    for (let i = 0; i + 1 < cells.length; i++) {
      const en = cells[i]
      // "常年晚宴 (kept apart from 年终晚宴 …)": the note in brackets is not part of the term
      const zh = cells[i + 1].replace(/\s*\([^)]*[a-z][^)]*\)\s*$/i, '')
      if (!isEnglish(en) || countCjk(zh) === 0 || isEnglish(zh)) continue
      const enNames = en.split(' / ')
      const zhNames = zh.split(' / ')
      enNames.forEach((name, n) => {
        for (const variant of variants(name)) addText(memory, variant, zhNames[n] ?? zhNames[0])
      })
    }
  })
}

/** The case studies in shared.md §7, in the same order as `projects` in src/seed/data.ts. */
function addCaseStudies(memory: Memory) {
  const fields: Record<string, keyof (typeof projects)[number]> = {
    Title: 'title',
    Summary: 'summary',
    Objective: 'objective',
    'Our approach': 'solution',
    'On the day': 'execution',
    Outcomes: 'outcomes',
  }
  const source = fs.readFileSync(path.join(ZH_DIR, 'shared.md'), 'utf-8')
  const part = source.split(/\n## 7\. /)[1]?.split(/\n## /)[0] ?? ''
  part
    .split(/\n### /)
    .slice(1)
    .forEach((study, index) => {
      const project = projects[index]
      if (!project) return
      for (const [, label, text] of study.matchAll(/^- \*\*([^:*]+):\*\* (.+)$/gm)) {
        const field = fields[label]
        if (field) memory.add(project[field] as string | undefined, text)
      }
    })
}

// ── Walking the CMS content ──────────────────────────────────────────────────

type Translate = (text: string) => string | undefined
type Data = Record<string, unknown>

/** Changes every translatable text in `data` (a page, a service, a global…) to Chinese, in place. */
function translateFields(
  payload: Payload,
  fields: Field[],
  data: Data,
  translate: Translate,
  inLocalized = false,
) {
  const blockConfig = (field: Field, slug: unknown): Block | undefined => {
    if (field.type !== 'blocks') return undefined
    const candidates = [...(field.blocks ?? []), ...(field.blockReferences ?? [])].map((entry) =>
      typeof entry === 'string' ? payload.config.blocks?.find((block) => block.slug === entry) : entry,
    )
    return candidates.find((block) => block?.slug === slug)
  }

  for (const field of fields) {
    const localized = inLocalized || ('localized' in field && Boolean(field.localized))
    if (field.type === 'tabs') {
      for (const tab of field.tabs) {
        const named = 'name' in tab && tab.name
        const tabData = named ? (data[tab.name] as Data | undefined) : data
        if (tabData) translateFields(payload, tab.fields, tabData, translate, localized)
      }
      continue
    }
    if (!('name' in field)) {
      // Rows and collapsibles only group fields on screen
      if ('fields' in field) translateFields(payload, field.fields, data, translate, localized)
      continue
    }
    const value = data[field.name]
    if (value == null) continue
    if ((field.type === 'text' || field.type === 'textarea') && localized) {
      if (typeof value === 'string') data[field.name] = translate(value) ?? value
    } else if (field.type === 'richText' && localized) {
      translateRichText(value, translate)
    } else if (field.type === 'group' && typeof value === 'object') {
      translateFields(payload, field.fields, value as Data, translate, localized)
    } else if (field.type === 'array' && Array.isArray(value)) {
      for (const row of value) translateFields(payload, field.fields, row as Data, translate, localized)
    } else if (field.type === 'blocks' && Array.isArray(value)) {
      for (const row of value as Data[]) {
        const block = blockConfig(field, row.blockType)
        if (block) translateFields(payload, block.fields, row, translate, localized)
      }
    }
  }
}

type LexicalNode = { type?: string; text?: unknown; children?: LexicalNode[] }

/** Lexical rich text: each text node on its own. */
function translateRichText(state: unknown, translate: Translate) {
  const visit = (node: LexicalNode) => {
    if (node.type === 'text' && typeof node.text === 'string') node.text = translate(node.text) ?? node.text
    node.children?.forEach(visit)
  }
  const root = (state as { root?: LexicalNode } | null)?.root
  if (root) visit(root)
}

/** A document as read, ready to save again: without the fields Payload fills in itself. */
const withoutSystemFields = (doc: Data) => {
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, globalType: _globalType, ...rest } = doc
  return rest
}

/**
 * Looks a text up in the memories, in order. Page links inside the English text ("[Wedding
 * Emcee](/wedding-emcee)") are put back around the Chinese page name. Texts the importer built
 * from several brief items (a price table, "Banquet Emcee: From S$588 · …", two sentences from
 * two items) are translated part by part.
 */
function translator(memories: Memory[], misses: Set<string>): Translate {
  const lookup = (text: string) => {
    for (const memory of memories) {
      const found = memory.get(text)
      if (found !== undefined) return found
    }
    return undefined
  }
  // The links follow the English text in the CMS, not the brief: a plain title stays plain even when
  // the same words are linked in another brief.
  const relink = (en: string, found: string) => {
    let zh = found.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    for (const [, name, href] of en.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
      const zhName = lookup(name) ?? name
      if (zh.includes(zhName) && !zh.includes(`](${href})`))
        zh = zh.replace(zhName, `[${zhName}](${href})`)
    }
    return zh
  }

  const attempt = (text: string): string | undefined => {
    // A price or a number reads the same in Chinese
    if (!/[a-z]/i.test(text)) return text
    const found = lookup(text)
    if (found !== undefined) return relink(text, found)

    // Only links ("[Zenitant](…) [Edublitz](…)"): each name on its own; names without a Chinese one stay
    if (/^(\s*\[[^\]]+\]\([^)]+\)\s*)+$/.test(text))
      return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (link, name: string, href: string) => {
        const zhName = lookup(name)
        return zhName ? `[${zhName}](${href})` : link
      })

    // A review written out as text: “quote”, name, role
    const review = text.match(/^“(.+)”, (.+)$/s)
    if (review) {
      const [quote, author] = [attempt(review[1]), attempt(review[2])]
      return quote !== undefined && author !== undefined ? `“${quote}”，${author}` : undefined
    }

    // Paragraphs from several brief items, each on its own
    if (text.includes('\n\n') && !text.includes('|')) {
      const paragraphs = text.split(/\n{2,}/).map(attempt)
      return paragraphs.every((part) => part !== undefined) ? paragraphs.join('\n\n') : undefined
    }

    // A table: cell by cell
    if (text.includes('\n') && text.includes('|')) {
      let complete = true
      const lines = text.split('\n').map((line) =>
        /^[\s|:-]*$/.test(line)
          ? line
          : line
              .split('|')
              .map((cell) => {
                const content = cell.trim()
                const zh = content ? attempt(content) : content
                if (zh === undefined) complete = false
                return content ? cell.replace(content, zh ?? content) : cell
              })
              .join('|'),
      )
      return complete ? lines.join('\n') : undefined
    }

    // "Banquet Emcee: From S$588 · Emcee & Live Singer: From S$888"
    const joins: [RegExp, string][] = [
      [/\s+·\s+/, '  ·  '],
      [/:\s+/, '：'],
    ]
    for (const [split, join] of joins) {
      const parts = text.split(split)
      if (parts.length < 2) continue
      const zhParts = parts.map(attempt)
      if (zhParts.every((part) => part !== undefined)) return zhParts.join(join)
    }

    // Sentences from several brief items ("Not sure which one fits? Send your date …")
    const sentences = text.split(/(?<=[.?!])\s+/)
    if (sentences.length < 2) return undefined
    const zhSentences: string[] = []
    for (let start = 0; start < sentences.length; ) {
      let end = sentences.length
      let zh: string | undefined
      for (; end > start; end--) {
        zh = lookup(sentences.slice(start, end).join(' '))
        if (zh !== undefined) break
      }
      if (zh === undefined) return undefined
      zhSentences.push(zh)
      start = end
    }
    return zhSentences.join('')
  }

  return (text) => {
    // Nothing to translate in an empty text, a price or a number
    if (!/[a-z]/i.test(text)) return undefined
    const zh = attempt(text)
    if (zh === undefined) misses.add(text.replace(/\s+/g, ' ').slice(0, 120))
    return zh
  }
}

// ── Run ──────────────────────────────────────────────────────────────────────

const payload = await getPayload({ config })
const log = (message: string) => payload.logger.info(`[zh] ${message}`)
const context = seedContext()
const wanted = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))

const zhFiles = new Set(fs.readdirSync(path.join(ZH_DIR, 'pages')))
const chosen = recipes.filter(
  (recipe) => zhFiles.has(recipe.file) && (!wanted.length || wanted.includes(recipe.slug)),
)

// Shared texts: the menus, footer, page names and case studies, plus every brief, so a text
// quoted on another page (a service card, a review) is found too.
const shared = new Memory()
addTables(shared, path.join(ZH_DIR, 'shared.md'))
addTables(shared, path.join(ZH_DIR, 'glossary.md'))
addCaseStudies(shared)
const pageMemories = new Map<string, Memory>()
for (const recipe of recipes.filter((entry) => zhFiles.has(entry.file))) {
  const memory = new Memory()
  // The page's own brief, plus the "future" briefs whose sections were merged into it
  const files = [recipe.file, ...(recipe.additions ?? []).map((addition) => addition.file)]
  for (const file of files.filter((name) => zhFiles.has(name)))
    addBrief(memory, parseBrief(file), parseBrief(path.join(ZH_FROM_HANDOFF, file)), shared)
  pageMemories.set(recipe.slug, memory)
}
const everyPage = [...pageMemories.values()]

const report: { name: string; misses: Set<string> }[] = []

// 1. Pages
const pages = await payload.find({
  collection: 'pages',
  where: { slug: { in: chosen.map((recipe) => recipe.slug) } },
  locale: 'en',
  depth: 0,
  limit: 200,
  pagination: false,
})
const pageFields = payload.collections.pages.config.fields
for (const page of pages.docs) {
  const misses = new Set<string>()
  const doc = structuredClone(page) as unknown as Data
  const memories = [pageMemories.get(page.slug)!, shared, ...everyPage]
  translateFields(payload, pageFields, doc, translator(memories, misses))
  try {
    await payload.update({
      collection: 'pages',
      id: page.id,
      locale: 'zh',
      data: {
        title: doc.title as string,
        layout: doc.layout as never,
        meta: doc.meta as never,
        chineseTranslation: 'needs-review',
        _status: 'published',
      },
      draft: false,
      context,
    })
  } catch (error) {
    // One page the CMS refuses (e.g. a text too long for its field) does not stop the others
    payload.logger.error(`[zh] /${page.slug} NOT saved: ${(error as Error).message}`)
    continue
  }
  report.push({ name: `/zh/${page.slug === 'home' ? '' : page.slug}`, misses })
  log(`/${page.slug}: Chinese saved (${misses.size} texts still in English)`)
}

// 2. Services and case studies
for (const collection of ['services', 'projects'] as const) {
  const fields = payload.collections[collection].config.fields
  const { docs } = await payload.find({ collection, locale: 'en', depth: 0, limit: 200, pagination: false })
  const misses = new Set<string>()
  for (const entry of docs) {
    const doc = structuredClone(entry) as unknown as Data
    translateFields(payload, fields, doc, translator([shared, ...everyPage], misses))
    await payload.update({
      collection,
      id: entry.id,
      locale: 'zh',
      data: {
        ...withoutSystemFields(doc),
        ...(collection === 'projects' ? { chineseTranslation: 'needs-review' } : {}),
        _status: 'published',
      } as never,
      draft: false,
      context,
    })
  }
  report.push({ name: collection, misses })
  log(`${collection}: Chinese saved for ${docs.length} entries`)
}

// 3. Header, menu, footer and site-wide SEO
for (const slug of ['header', 'navigation', 'footer', 'seo-defaults'] as GlobalSlug[]) {
  const global = payload.config.globals.find((entry) => entry.slug === slug)!
  const doc = structuredClone(
    await payload.findGlobal({ slug, locale: 'en', depth: 0 }),
  ) as unknown as Data
  const misses = new Set<string>()
  translateFields(payload, global.fields, doc, translator([shared, ...everyPage], misses))
  await payload.updateGlobal({ slug, locale: 'zh', data: withoutSystemFields(doc) as never, context })
  report.push({ name: slug, misses })
  log(`${slug}: Chinese saved`)
}

// What is still in English (on the Chinese pages, these show in English)
for (const { name, misses } of report) {
  if (!misses.size) continue
  console.log(`\n${name}: ${misses.size} texts kept in English`)
  for (const text of [...misses].slice(0, 15)) console.log(`  - ${text}`)
  if (misses.size > 15) console.log(`  … and ${misses.size - 15} more`)
}
process.exit(0)
