/**
 * Turns the sections of a page brief (see parse-brief.ts) into page-builder blocks.
 *
 * Every heading, paragraph, button and price is copied word for word. What this file decides is
 * only the presentation: which existing block shows a section (a list of objectives becomes a
 * feature grid, numbered steps become the run-of-show cue sheet, questions become the FAQ…).
 * A page recipe (recipes.ts) can choose photos and override the block for any section.
 */
import type { BriefItem, BriefSection } from './parse-brief'

export type Block = { blockType: string; [field: string]: unknown }
export type Link = { label: string; type: 'custom'; url: string }

/** What the mapper needs from the database, filled in by import.ts. */
export type MapperContext = {
  /** Portfolio projects by slug, for "Recent work" sections. */
  projects: Record<string, number>
  /** Returns the id of a testimonial with this quote (created when missing). */
  testimonial: (quote: { text: string; author: string; sample: boolean }) => Promise<number>
  /** The anchor the page's enquiry form uses (all "#enquiry" and "#quote" buttons point to it). */
  formAnchor: string
}

// ── Text helpers ─────────────────────────────────────────────────────────────

/** Words that keep their capitals when an ALL-CAPS button label becomes sentence case. */
const KEEP_CASE = [
  'De Zhong',
  'WhatsApp',
  'D&D',
  'Google',
  'Mandarin',
  'English',
  'SOMA',
  'Chinese New Year',
  'CNY',
  'Instagram',
  'YouTube',
  'IMDb',
  'SoundCloud',
  'Lectrix',
  'Banyan',
  'Sheraton',
  'Maris Stella',
  'Channel 8',
  'MediaCorp',
  'PDF',
  'Christmas',
  'I',
]

/**
 * The briefs write button labels in capitals (the Figma style). The website's buttons are
 * sentence case, so "WHATSAPP DE ZHONG" becomes "WhatsApp De Zhong". The words stay the same.
 */
export function buttonLabel(label: string) {
  if (label !== label.toUpperCase()) return label
  if (/^LET'S TALK$/.test(label)) return "Let's Talk"
  let text = label.toLowerCase()
  text = text.charAt(0).toUpperCase() + text.slice(1)
  for (const word of KEEP_CASE) {
    text = text.replace(
      new RegExp(`(^|[^\\w@])${word.replace(/[.*+?^${}()|[\]\\&]/g, '\\$&')}(?=$|[^\\w])`, 'gi'),
      `$1${word}`,
    )
  }
  return text.replace(/@\w+/g, (handle) => handle.toLowerCase())
}

const paragraphs = (items: BriefItem[]) =>
  items
    .filter((item): item is Extract<BriefItem, { kind: 'paragraph' }> => item.kind === 'paragraph')
    .map((item) => item.text)

const joinParagraphs = (texts: string[]) => texts.filter(Boolean).join('\n\n')

/** "Banquet Emcee — From S$588" → { title: "Banquet Emcee", price: "From S$588" } */
function splitTitlePrice(text: string) {
  const match = text.match(/^(.+?)(?: — |: )((?:From |S\$).+)$/)
  return match ? { title: match[1], price: match[2] } : { title: text, price: undefined }
}

/** Clips text to a field's limit without cutting a word (only used as a last resort; logged). */
export function fit(text: string | undefined, max: number, warn: (message: string) => void) {
  if (!text || text.length <= max) return text
  warn(`text shortened to ${max} characters: "${text.slice(0, 60)}…"`)
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

export function makeLinkFactory(formAnchor: string) {
  return (label: string, href: string): Link => {
    let url = href
    if (/^#(enquiry|quote|enquire)$/.test(url)) url = `#${formAnchor}`
    return { label: buttonLabel(label), type: 'custom', url }
  }
}

/** Splits a section where a new H2 starts (e.g. "Clients and reviews" holds the logo strip and the reviews). */
export function splitAtH2(section: BriefSection): BriefSection[] {
  const chunks: BriefSection[] = []
  // An H2 right under the H1 belongs to the hero (shown under it), so the hero keeps its intro, ticks and buttons.
  const heroH2 = section.items.findIndex((item, index) => {
    const previous = section.items[index - 1]
    return (
      item.kind === 'heading' &&
      item.level === 2 &&
      previous?.kind === 'heading' &&
      previous.level === 1
    )
  })
  let current: BriefSection | null = null
  for (const [index, item] of section.items.entries()) {
    if (item.kind === 'heading' && item.level === 2 && index !== heroH2) {
      current = { ...section, items: [item] }
      chunks.push(current)
    } else {
      if (!current) {
        current = { ...section, items: [] }
        chunks.push(current)
      }
      current.items.push(item)
    }
  }
  return chunks.filter((chunk) => chunk.items.length > 0)
}

const headingOf = (section: BriefSection, level: 1 | 2) =>
  section.items.find(
    (item): item is Extract<BriefItem, { kind: 'heading' }> =>
      item.kind === 'heading' && item.level === level,
  )?.text

// ── Groups: an H3 (or H4 / bold label) and everything under it ──────────────

type Group = {
  title: string
  /** The brief marks cards that lead to a band further down with "↓". */
  jump?: boolean
  badge?: string
  priceLine?: string
  idealFor?: string
  text: string[]
  pointsHeading?: string
  points: string[]
  note?: string
  link?: Link
}

type Grouped = {
  intro: string[]
  introPrice?: string
  groups: Group[]
  footnote: string[]
  buttons: Link[]
}

/**
 * Collects the items of a section under its sub-headings. A button that follows an item which
 * already has one, or follows the closing text, belongs to the whole section.
 */
function group(
  items: BriefItem[],
  startsGroup: (item: BriefItem) => boolean,
  link: ReturnType<typeof makeLinkFactory>,
): Grouped {
  const result: Grouped = { intro: [], groups: [], footnote: [], buttons: [] }
  let current: Group | null = null
  let inFootnote = false

  for (const item of items) {
    if (item.kind === 'heading' && item.level <= 2) continue
    if (startsGroup(item) && !inFootnote) {
      const raw =
        item.kind === 'heading' || item.kind === 'label' ? item.text.replace(/\s*[↓→]$/, '') : ''
      const { title, price } = splitTitlePrice(raw)
      current = {
        title,
        priceLine: price,
        text: [],
        points: [],
        jump:
          /↓$/.test(item.kind === 'heading' || item.kind === 'label' ? item.text : '') || undefined,
      }
      result.groups.push(current)
      continue
    }
    if (!current) {
      if (item.kind === 'paragraph') result.intro.push(item.text)
      else if (item.kind === 'price') result.introPrice = item.text
      else if (item.kind === 'button') result.buttons.push(link(item.label, item.href))
      continue
    }
    // A question in bold after the items ("Not sure which one fits?") starts the closing text.
    if (item.kind === 'label' && item.text.endsWith('?')) inFootnote = true
    if (inFootnote || (current.link && (item.kind === 'paragraph' || item.kind === 'label'))) {
      inFootnote = true
      if (item.kind === 'paragraph' || item.kind === 'label') result.footnote.push(item.text)
      else if (item.kind === 'button') result.buttons.push(link(item.label, item.href))
      continue
    }
    switch (item.kind) {
      case 'paragraph':
        current.text.push(item.text)
        break
      case 'price':
        current.priceLine = item.text
        break
      case 'badge':
        current.badge = item.text
        break
      case 'idealFor':
        current.idealFor = item.text
        break
      case 'heading':
        current.pointsHeading = item.text
        break
      case 'tick':
      case 'bullet':
        current.points.push(item.text)
        break
      case 'label':
        current.note = item.text
        break
      case 'button':
        if (current.link) result.buttons.push(link(item.label, item.href))
        else current.link = link(item.label, item.href)
        break
    }
  }

  // One button after the last item only, with none on the others: it is the section's button.
  const withLinks = result.groups.filter((entry) => entry.link)
  const last = result.groups[result.groups.length - 1]
  if (result.groups.length > 1 && withLinks.length === 1 && last?.link) {
    result.buttons.unshift(last.link)
    delete last.link
  }
  return result
}

const isH3 = (item: BriefItem) => item.kind === 'heading' && item.level === 3
const isH4 = (item: BriefItem) => item.kind === 'heading' && item.level === 4

// ── Section → block ──────────────────────────────────────────────────────────

export type SectionPlan = {
  /** Photo for a text section (makes it a text-and-image section). */
  image?: number
  imagePosition?: 'left' | 'right'
  imageShape?: 'landscape' | 'portrait'
  tone?: 'light' | 'tinted' | 'dark'
  /** Feature grid style or columns, when the default guess is not right. */
  style?: 'list' | 'numbered' | 'strip' | 'cards' | 'checklist' | 'match' | 'notes'
  columns?: '2' | '3' | '4'
  /** Replace the generated block(s) entirely. */
  replace?: (chunk: BriefSection, helpers: Helpers) => Block[] | Promise<Block[]>
  /** Change fields of the generated block. */
  patch?: Record<string, unknown>
  /** Leave this section out (e.g. a duplicate the page already has). */
  skip?: boolean
  /** Show this section as a video (YouTube link), when the brief does not name one. */
  video?: string
  /** Extra blocks placed right after this section (e.g. the hosting reel). */
  after?: Block[]
}

export type Helpers = {
  link: ReturnType<typeof makeLinkFactory>
  paragraphs: typeof paragraphs
  group: (items: BriefItem[], startsGroup: (item: BriefItem) => boolean) => Grouped
  headingOf: typeof headingOf
  warn: (message: string) => void
}

/** Page names used in the briefs' "quick match" lists, and where they live. */
const PAGE_PATHS: Record<string, string> = {
  'Dinner & Dance Emcee': '/dinner-and-dance-emcee',
  'D&D Emcee': '/dinner-and-dance-emcee',
  'D&D Planning': '/dinner-and-dance-planning',
  'Dinner & Dance Planning': '/dinner-and-dance-planning',
  'Corporate Emcee': '/corporate-emcee',
  'Product Launch Events': '/product-launch-events',
  'Conference Emcee': '/conference-emcee',
  'Conference & Seminar Emcee': '/conference-emcee',
  'Corporate Team Building': '/corporate-team-building',
  'Event Planning': '/event-planning',
  'Wedding Emcee': '/wedding-emcee',
  'Kids & Youth Programs': '/kids-youth-programs',
  'School & Family Emcee': '/school-family-emcee',
  'School, Kids & Family Emcee': '/school-family-emcee',
  'Communication Coaching': '/communication-coaching',
  'Creative Campaigns': '/creative-campaigns',
  'Event Support': '/event-support',
  'Corporate Workshops': '/corporate-workshops',
  'Roadshow Emcee': '/roadshow-emcee',
  'Roadshow & Exhibition Emcee': '/roadshow-emcee',
  'Government & Community Emcee': '/government-community-emcee',
  'Chinese New Year Emcee': '/chinese-new-year-emcee',
  'All emcee services': '/emcee',
}

/** "Dinner & Dance Emcee, or D&D Planning for the whole night" → the same words, with the page names as links. */
/** Bare paths ("see /event-planning") become links named after their page. */
export const linkPaths = (text: string) =>
  text.replace(/(^|\s)(\/[a-z0-9-]+)(?=$|[\s,.])/g, (match, space: string, href: string) => {
    const name = Object.keys(PAGE_PATHS).find((key) => PAGE_PATHS[key] === href)
    return name ? `${space}[${name}](${href})` : match
  })

export function linkPageNames(text: string) {
  const names = Object.keys(PAGE_PATHS).sort((a, b) => b.length - a.length)
  let result = linkPaths(text)
  const used: string[] = []
  for (const name of names) {
    const pattern = new RegExp(
      `(^|[^\\w\\[])(${name.replace(/[.*+?^${}()|[\]\\&]/g, '\\$&')})(?![\\w\\]])`,
    )
    if (pattern.test(result) && !used.some((longer) => longer.includes(name))) {
      result = result.replace(pattern, `$1[$2](${PAGE_PATHS[name]})`)
      used.push(name)
    }
  }
  return result
}

const LOGO_STRIP = /^(Youth Olympic Games, Singapore Sports Council|Logo strip)/

const toPoints = (texts: string[]) => texts.map((text) => ({ text }))
const toLinks = (links: Link[]) => links.map((entry) => ({ ...entry }))

/** Builds the block (or blocks) for one H2 chunk of a section. */
export async function chunkToBlocks(
  chunk: BriefSection,
  plan: SectionPlan,
  ctx: MapperContext,
  helpers: Helpers,
): Promise<Block[]> {
  if (plan.skip) return []
  if (plan.replace) return plan.replace(chunk, helpers)

  const { link, warn } = helpers
  const items = chunk.items
  const name = chunk.name
  const h1 = headingOf(chunk, 1)
  const heading = (h1 ? undefined : headingOf(chunk, 2)) ?? h1 ?? ''
  const texts = paragraphs(items)
  const buttons = items
    .filter((item): item is Extract<BriefItem, { kind: 'button' }> => item.kind === 'button')
    .map((item) => link(item.label, item.href))
  const ticks = items
    .filter((item) => item.kind === 'tick' || item.kind === 'bullet')
    .map((item) => (item as { text: string }).text)
  const prices = items
    .filter((item): item is Extract<BriefItem, { kind: 'price' }> => item.kind === 'price')
    .map((item) => item.text)
  const quotes = items.filter(
    (item): item is Extract<BriefItem, { kind: 'quote' }> => item.kind === 'quote',
  )
  const labels = items.filter(
    (item): item is Extract<BriefItem, { kind: 'label' }> => item.kind === 'label',
  )
  const h3s = items.filter(isH3)
  const h4s = items.filter(isH4)
  const withPlan = (block: Block): Block[] => [{ ...block, ...(plan.patch ?? {}) }]

  // Hero: the page's H1, its intro, trust ticks, price line and up to three buttons
  if (h1) {
    const [primaryButton, secondaryButton, tertiaryButton] = buttons
    return withPlan({
      blockType: 'hero',
      variant: plan.image ? 'split' : 'simple',
      heading: h1,
      secondHeading: headingOf(chunk, 2),
      subheading: fit(joinParagraphs(texts), 600, warn),
      priceLine: prices[0]?.replace(/see all rates$/, '[see all rates](/rates)'),
      primaryButton,
      secondaryButton,
      tertiaryButton,
      highlights: toPoints(ticks.slice(0, 6)),
    })
  }

  if (/quote form|enquiry form/i.test(name)) {
    return withPlan({
      blockType: 'enquiryForm',
      anchorId: ctx.formAnchor,
      heading,
      intro: fit(texts[0], 360, warn),
    })
  }

  if (/final cta/i.test(name)) {
    // Every priced line of the closing band ("Banquet Emcee — From S$588", …), shown together
    const priceLabel = labels
      .filter((label) => /S\$|quoted/i.test(label.text))
      .map((label) => label.text)
      .join('  ·  ')
    return withPlan({
      blockType: 'cta',
      heading,
      text: fit(joinParagraphs(texts).replace(/\n\n/g, ' '), 400, warn),
      priceLine: prices[0] ?? (priceLabel || undefined),
      primaryButton: buttons[0],
      secondaryButton: buttons[1],
      showContactDetails: true,
      style: 'spark',
    })
  }

  if (/^instagram$/i.test(name)) {
    return withPlan({
      blockType: 'founderUpdates',
      heading,
      intro: texts[0],
      source: 'instagram',
      limit: 6,
      instagramLabel: buttons[0]?.label,
    })
  }

  if (
    /logo strip/i.test(name) ||
    (h3s.length === 0 && quotes.length === 0 && texts.length === 1 && LOGO_STRIP.test(texts[0]))
  ) {
    return withPlan({ blockType: 'clientLogos', heading, tone: plan.tone ?? 'tinted' })
  }

  if (/^faq/i.test(name)) {
    const grouped = group(items, isH3, link)
    return withPlan({
      blockType: 'faq',
      heading,
      intro: grouped.intro[0],
      items: grouped.groups
        .filter((entry) => entry.text.length)
        .map((entry) => ({ question: entry.title, answer: joinParagraphs(entry.text) })),
      buttons: toLinks([
        ...grouped.groups.flatMap((entry) => (entry.link ? [entry.link] : [])),
        ...grouped.buttons,
      ]),
    })
  }

  // Reviews: the brief's quotes become (or reuse) testimonials. Sample quotes stay hidden until real ones arrive.
  if (quotes.length && h3s.length === 0 && !/founder|why/i.test(name)) {
    const ids: number[] = []
    for (const quote of quotes) ids.push(await ctx.testimonial(quote))
    return withPlan({
      blockType: 'testimonials',
      heading,
      source: 'manual',
      testimonials: ids,
      buttons: toLinks(buttons),
    })
  }

  // Quick match: "A wedding → Wedding Emcee" bullets
  const arrows = items.filter((item) => item.kind === 'bullet' && item.text.includes(' → '))
  if (arrows.length >= 3 && h3s.length === 0) {
    return withPlan({
      blockType: 'featureGrid',
      heading,
      intro: fit(joinParagraphs(texts), 600, warn),
      items: arrows.map((item) => {
        const [title, target] = (item as { text: string }).text.split(' → ')
        return { title, text: linkPageNames(target) }
      }),
      style: 'match',
      columns: '2',
      buttons: toLinks(buttons),
      tone: plan.tone ?? 'tinted',
    })
  }

  // Numbered steps ("1. Discovery call") → the run-of-show cue sheet
  if (h3s.length >= 3 && h3s.every((item) => /^\d+\.\s/.test((item as { text: string }).text))) {
    const grouped = group(items, isH3, link)
    return withPlan({
      blockType: 'processSteps',
      heading,
      intro: fit(joinParagraphs(grouped.intro), 360, warn),
      steps: grouped.groups.map((entry) => ({
        title: entry.title.replace(/^\d+\.\s*/, ''),
        text: fit(joinParagraphs([...entry.text, ...entry.points]), 280, warn),
      })),
      buttons: toLinks([
        ...grouped.groups.flatMap((entry) => (entry.link ? [entry.link] : [])),
        ...grouped.buttons,
      ]),
      tone: plan.tone ?? 'tinted',
    })
  }

  // A video named in the brief (or chosen in the recipe), with the section's text and buttons
  const video =
    plan.video ??
    items.find((item): item is Extract<BriefItem, { kind: 'video' }> => item.kind === 'video')?.url
  if (video && h3s.length === 0) {
    return withPlan({
      blockType: 'video',
      heading,
      intro: fit(joinParagraphs(texts), 600, warn),
      youtubeUrl: video,
      buttons: toLinks(buttons.filter((entry) => !/^#(video|reel)$/.test(entry.url))),
      tone: plan.tone ?? 'dark',
    })
  }

  // Case studies, when every one of them is in the portfolio
  if (h3s.length >= 2) {
    const grouped = group(items, isH3, link)
    const slugs = grouped.groups.map((entry) => entry.link?.url.match(/^\/our-work\/([\w-]+)/)?.[1])
    if (slugs.length <= 6 && slugs.every((slug) => slug && ctx.projects[slug])) {
      return withPlan({
        blockType: 'featuredProjects',
        heading,
        category: 'all',
        projects: slugs.map((slug) => ctx.projects[slug!]),
        limit: Math.min(slugs.length, 6),
        button: grouped.buttons[0],
      })
    }
  }

  const gridFrom = (grouped: Grouped, defaultStyle: SectionPlan['style']): Block[] => {
    // Cards that jump to a band further down stay a plain list (as on the Figma boards)
    const jumps = grouped.groups.some((entry) => entry.jump)
    const style = plan.style ?? (jumps ? 'list' : defaultStyle)
    const count = grouped.groups.length
    return withPlan({
      blockType: 'featureGrid',
      heading,
      intro: fit(
        joinParagraphs([...grouped.intro, ...(grouped.introPrice ? [grouped.introPrice] : [])]),
        600,
        warn,
      ),
      items: grouped.groups.map((entry) => ({
        title: entry.title,
        badge: entry.badge,
        priceLine: entry.priceLine,
        idealFor: entry.idealFor,
        text: fit(joinParagraphs(entry.text), 900, warn),
        pointsHeading: entry.pointsHeading,
        points: toPoints(entry.points),
        note: entry.note,
        link: entry.link,
        jump: entry.jump,
      })),
      style,
      columns:
        plan.columns ??
        (style === 'cards' && count % 3 !== 0 && count % 2 === 0
          ? '2'
          : count === 4 && style !== 'cards'
            ? '2'
            : '3'),
      footnote: fit(joinParagraphs(grouped.footnote), 500, warn),
      buttons: toLinks(grouped.buttons),
      tone: plan.tone ?? 'light',
    })
  }

  if (h3s.length) return gridFrom(group(items, isH3, link), 'cards')
  // "Which package suits you?" rows and "Please read before booking" notes sit in a soft panel
  if (h4s.length >= 2 && !ticks.length) return gridFrom(group(items, isH4, link), 'notes')

  // "Please read before booking": bold labels, each with a short paragraph
  if (labels.length >= 2 && !ticks.length) {
    const grouped = group(items, (item) => item.kind === 'label' && !item.text.endsWith('?'), link)
    grouped.groups = grouped.groups.filter((entry) => entry.text.length)
    return gridFrom(grouped, 'notes')
  }

  // Everything else: a text section, with a photo when the recipe gives one
  const body = items
    .filter(
      (item) => item.kind === 'paragraph' || (item.kind === 'label' && !/S\$/.test(item.text)),
    )
    .map((item) => (item as { text: string }).text)
  const quote = quotes[0]
  const table = items.find(
    (item): item is Extract<BriefItem, { kind: 'table' }> => item.kind === 'table',
  )
  return withPlan({
    blockType: 'textImage',
    heading,
    priceLine: prices[0],
    table: table?.rows.map((cells) => cells.map(linkPageNames).join(' | ')).join('\n'),
    body: fit(
      joinParagraphs(quote ? [...body, `“${quote.text}”, ${quote.author}`] : body),
      2000,
      warn,
    ),
    pointsHeading: (h4s[0] as { text?: string } | undefined)?.text,
    points: toPoints(ticks.slice(0, 10)),
    image: plan.image,
    imagePosition: plan.imagePosition ?? 'right',
    imageShape: plan.imageShape ?? 'landscape',
    buttons: toLinks(buttons),
    // Left open so a run of text sections can alternate backgrounds (build-page.ts)
    tone: plan.tone,
  })
}

export const helpersFor = (formAnchor: string, warn: (message: string) => void): Helpers => {
  const link = makeLinkFactory(formAnchor)
  return {
    link,
    paragraphs,
    group: (items, startsGroup) => group(items, startsGroup, link),
    headingOf,
    warn,
  }
}

/** The editor label on each section in the admin (from its heading). */
export const withBlockName = (block: Block): Block => {
  const label = String(block.heading ?? block.blockType)
    .replaceAll('*', '')
    .slice(0, 60)
  return { blockName: label, ...block }
}
