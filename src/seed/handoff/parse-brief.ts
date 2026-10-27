/**
 * Reads a page brief from the developer handoff (docs/handoff/pages/*.md, 26 Oct 2026) into
 * plain data: the page sections in order, plus the developer tables (SEO title, meta, images).
 *
 * The brief format is explained in docs/handoff/README.md §2. Text the brief marks as
 * "not for publishing" (> **Note:** and > _italic_ lines) is left out here, so it can never
 * reach the website.
 */
import fs from 'fs'
import path from 'path'

export const HANDOFF_DIR = path.resolve(process.cwd(), 'docs/handoff/pages')

export type BriefButton = { label: string; href: string }

export type BriefItem =
  | { kind: 'heading'; level: 1 | 2 | 3 | 4; text: string }
  | { kind: 'paragraph'; text: string }
  /** A bold line on its own, e.g. "**Your date is confirmed in writing**" */
  | { kind: 'label'; text: string }
  | { kind: 'tick'; text: string }
  | { kind: 'bullet'; text: string }
  | { kind: 'button'; label: string; href: string }
  | { kind: 'price'; text: string }
  | { kind: 'badge'; text: string }
  | { kind: 'idealFor'; text: string }
  | { kind: 'quote'; text: string; author: string; sample: boolean }
  /** A table in the brief: first row is the header */
  | { kind: 'table'; rows: string[][] }
  /** "> **Note:** Developer: embed https://youtu.be/…": the video to show in this section */
  | { kind: 'video'; url: string }
  | { kind: 'break' }

export type BriefSection = {
  /** e.g. 3 for "## Section 3 — What we are"; null for unnumbered sections such as "## Logo strip (existing)" */
  number: number | null
  name: string
  items: BriefItem[]
  /** The brief highlights dummy or unconfirmed text in this section (<mark>): not to be published as written. */
  sample?: boolean
}

export type BriefPage = {
  file: string
  sections: BriefSection[]
  /** "Website developer — SEO and back-end instructions" table, by field name */
  seo: Record<string, string>
  /** "Form back-end" table */
  form: Record<string, string>
  images: { file: string; alt: string }[]
  stickyBar: string | null
}

/** Sections at the end of each brief that are instructions for us, not page content. */
const DEVELOPER_SECTIONS =
  /^(Website developer|Page layout instructions|Mobile conversion|Form back-end|Image SEO|Wording to avoid|Most important message|Client to confirm|Remove or rewrite|Booking form)/i

const WHATSAPP_NUMBER = '6594378083'

/** Where the brief's descriptive link targets go. */
const NAMED_TARGETS: Record<string, string> = {
  'Google Business Profile reviews link':
    'https://www.google.com/search?q=The+Charisma+Code+Singapore+reviews',
  'Instagram profile link': 'https://www.instagram.com/deprinceofzhong',
}

/** Removes the brief's markdown emphasis and the <mark> tags around dummy content. */
export const cleanText = (text: string) =>
  text
    .replace(/<\/?mark>/g, '')
    .replace(/==([^=]+)==/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|\s)_([^_]+)_(?=\s|$|[.,])/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    // House rule: no dashes as punctuation. "2010 — hosts" → "2010: hosts", "S$88–128" → "S$88-128"
    .replace(/\s+—\s+/g, ': ')
    .replace(/\s*–\s*/g, '-')
    .replace(/—/g, ', ')
    .replace(/\s+/g, ' ')
    .trim()

/**
 * "Trainer with **Zenitant** and **Aktivate** → https://a · https://b": the brief underlines names
 * that link somewhere, with the targets after the arrow. They become [Zenitant](https://a) links.
 */
function linkNamedTargets(raw: string) {
  const [left, right] = raw.split(' → ')
  const urls = right?.match(/https?:\/\/[^\s·()]+/g)
  if (!urls) return raw
  let next = 0
  const linked = left.replace(/\*\*([^*]+)\*\*/g, (_, name: string) =>
    urls[next] ? `[${name}](${urls[next++]})` : name,
  )
  return next ? linked : `[${left.replace(/\*\*/g, '')}](${urls[0]})`
}

/**
 * "https://wa.me/6594378083 (pre-filled message)" → the WhatsApp link with the page's message;
 * "#enquiry, package pre-selected" → "#enquiry"; "submit" → null (form buttons are built in).
 */
function parseTarget(raw: string, whatsappMessage: string | null): string | null {
  const target = cleanText(raw)
  if (/^submit\b/i.test(target)) return null
  for (const [name, url] of Object.entries(NAMED_TARGETS)) if (target.startsWith(name)) return url
  const first = target.split(/[\s,]+/)[0]
  if (first.startsWith(`https://wa.me/${WHATSAPP_NUMBER}`)) {
    return whatsappMessage
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
      : first
  }
  if (/^(\/|#|https?:\/\/|mailto:|tel:)/.test(first)) return first
  return null
}

function parseTable(lines: string[]): Record<string, string> {
  const table: Record<string, string> = {}
  for (const line of lines) {
    const cells = line.split(/(?<!\\)\|/).map((cell) => cell.trim())
    if (cells.length < 4) continue
    const [, field, value] = cells
    if (!field || field === 'Field' || /^-+$/.test(field)) continue
    table[field] = value.replace(/\\\|/g, '|')
  }
  return table
}

export function parseBrief(file: string): BriefPage {
  const source = fs.readFileSync(path.join(HANDOFF_DIR, file), 'utf-8')
  const blocks = source.split(/\n(?=## )/)

  // The developer tables come first, because the WhatsApp message they hold goes into the buttons.
  const developer: Record<string, string[]> = {}
  for (const block of blocks) {
    const heading = block.match(/^## (.+)/)?.[1]?.trim()
    if (heading && DEVELOPER_SECTIONS.test(heading)) developer[heading] = block.split('\n').slice(1)
  }
  const findDeveloper = (pattern: RegExp) =>
    Object.entries(developer).find(([heading]) => pattern.test(heading))?.[1] ?? []

  const seo = parseTable(findDeveloper(/^Website developer — SEO/))
  const form = parseTable(findDeveloper(/^Form back-end/))
  const whatsappMessage = form['WhatsApp pre-filled message']?.trim() || null
  const images = Object.entries(parseTable(findDeveloper(/^Image SEO/)))
    .filter(([fileName]) => /\.(jpe?g|png|webp|avif)$/i.test(fileName))
    .map(([fileName, alt]) => ({ file: fileName, alt: alt.replace(/^ALT:\s*/i, '') }))
  const mobile = findDeveloper(/^Mobile conversion/).join(' ')
  const stickyBar = mobile.match(/Sticky bar:\s*\*\*([^*]+)\*\*/)?.[1]?.trim() ?? null

  const sections: BriefSection[] = []
  for (const [index, block] of blocks.entries()) {
    // Briefs for new pages put the page straight under the title, before any "## " section.
    const leading = index === 0 && /\*\*H[12] ·\*\*/.test(block)
    const headingMatch = leading ? ['', 'Page'] : block.match(/^## (.+)/)
    if (!headingMatch) continue
    const heading = headingMatch[1].trim()
    if (DEVELOPER_SECTIONS.test(heading)) continue
    const numbered = heading.match(/^Section (\d+)[a-z]? — (.+)$/)
    const section: BriefSection = {
      number: numbered ? Number(numbered[1]) : null,
      name: (numbered ? numbered[2] : heading).trim(),
      items: [],
      sample: /<mark>|==[^=\s][^=]*==/.test(block) || undefined,
    }

    for (const rawLine of block.split('\n').slice(1)) {
      const line = rawLine.trim()
      if (!line || /^\[(Photo|Embedded YouTube video|Image)[^\]]*\]$/.test(line)) continue
      const captioned = line.match(/^> _Caption:.*?(https:\/\/youtu\.be\/[\w-]+)/)
      if (captioned) {
        section.items.push({ kind: 'video', url: captioned[1] })
        continue
      }
      const embed = line.match(
        /^> \*\*Note:\*\*.*\bembed (https:\/\/(?:youtu\.be|www\.youtube\.com)\/[^\s)]+)/,
      )
      if (embed) {
        section.items.push({ kind: 'video', url: embed[1] })
        continue
      }
      // Instructions and context for the developer or the client: never published.
      if (/^> (\*\*Note|_)/.test(line) || /^_.*_$/.test(line) || /^Source:/.test(line)) continue
      if (line === '· · ·') {
        section.items.push({ kind: 'break' })
        continue
      }
      let match: RegExpMatchArray | null
      if ((match = line.match(/^\*\*H([1-4]) ·\*\*\s*(.+)$/))) {
        section.items.push({
          kind: 'heading',
          level: Number(match[1]) as 1 | 2 | 3 | 4,
          text: cleanText(match[2]),
        })
      } else if ((match = line.match(/^\*\*Button:\*\*\s*`([^`]+)`\s*→\s*(.+)$/))) {
        const href = parseTarget(match[2], whatsappMessage)
        if (href) section.items.push({ kind: 'button', label: cleanText(match[1]), href })
      } else if ((match = line.match(/^\*\*Price line:\*\*\s*(.+)$/))) {
        section.items.push({ kind: 'price', text: cleanText(match[1]) })
      } else if ((match = line.match(/^\*\*Badge:\*\*\s*(.+)$/))) {
        section.items.push({ kind: 'badge', text: cleanText(match[1]) })
      } else if ((match = line.match(/^\*\*(Ideal for:)\*\*\s*(.+)$/))) {
        section.items.push({ kind: 'idealFor', text: `${match[1]} ${cleanText(match[2])}` })
      } else if ((match = line.match(/^- ✓\s*(.+)$/))) {
        section.items.push({ kind: 'tick', text: cleanText(match[1]) })
      } else if ((match = line.match(/^- (.+)$/))) {
        section.items.push({ kind: 'bullet', text: cleanText(linkNamedTargets(match[1])) })
      } else if ((match = line.match(/^> "(.+)" — (.+)$/))) {
        section.items.push({
          kind: 'quote',
          text: cleanText(match[1]),
          author: cleanText(match[2]),
          sample: /<mark>|==/.test(line),
        })
      } else if (line.startsWith('>')) {
        // Other quoted lines (e.g. a tagline in quotes) are treated as normal text.
        section.items.push({
          kind: 'paragraph',
          text: cleanText(line.replace(/^>\s*/, '').replace(/^"|"$/g, '')),
        })
      } else if ((match = line.match(/^\*\*([^*]+)\*\*$/))) {
        section.items.push({ kind: 'label', text: cleanText(match[1]) })
      } else if (line.startsWith('|')) {
        const cells = line
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((cell) => cleanText(cell))
        if (cells.every((cell) => /^:?-+:?$/.test(cell))) continue
        const last = section.items[section.items.length - 1]
        if (last?.kind === 'table') last.rows.push(cells)
        else section.items.push({ kind: 'table', rows: [cells] })
      } else {
        section.items.push({ kind: 'paragraph', text: cleanText(line) })
      }
    }
    sections.push(section)
  }

  return { file, sections, seo, form, images, stickyBar }
}

/** "Event Management Company Singapore \| The Charisma Code  (54 characters)" → the title only. */
export const withoutCharacterCount = (value?: string) =>
  (value ?? '')
    .replace(/\s*\(\d+ characters\)\s*$/, '')
    .replace(/\\\|/g, '|')
    .trim()
