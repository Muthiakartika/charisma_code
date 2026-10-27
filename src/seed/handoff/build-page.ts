/**
 * Builds one page's layout from its brief and recipe: parses the brief, maps each section to
 * blocks, points "#anchor" buttons at the right sections and keeps the highlighted words the
 * page already had in the CMS.
 */
import { parseBrief, withoutCharacterCount, type BriefPage } from './parse-brief'
import type { PageRecipe, RecipeContext } from './recipes'
import {
  chunkToBlocks,
  helpersFor,
  splitAtH2,
  withBlockName,
  type Block,
  type MapperContext,
} from './to-blocks'

/** Buttons such as "SEE HOW IT WORKS → #how-it-works" jump to the section with a matching name. */
const ANCHOR_SECTIONS: Record<string, RegExp> = {
  'how-it-works': /how booking works|how it works|how we/i,
  'how-booking-works': /how booking works/i,
  reel: /reel|video/i,
  video: /video|reel/i,
  'case-study': /case study/i,
  topics: /topics/i,
  'recent-work': /recent work/i,
  packages: /^packages/i,
  formats: /formats/i,
  highlights: /highlights|proof|showcase/i,
}

/** Pages without their own reel send "Watch the hosting reel" to the reel on the emcee hub. */
const FALLBACK_TARGETS: Record<string, string> = { reel: '/emcee#reel' }

function retarget(value: unknown, from: string, to: string) {
  if (Array.isArray(value)) value.forEach((entry) => retarget(entry, from, to))
  else if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    if (record.type === 'custom' && record.url === from) record.url = to
    Object.values(record).forEach((entry) => retarget(entry, from, to))
  }
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .split('-')
    .slice(0, 4)
    .join('-')

const normalise = (text: string) =>
  text
    .replace(/\*/g, '')
    .replace(/[.!?]+$/, '')
    .trim()
    .toLowerCase()

/** Re-applies *highlighted* words from the old layout when a heading kept its wording. */
function keepHighlights(blocks: Block[], previous: Block[]) {
  const highlighted = new Map<string, string[]>()
  const phrasesByType = new Map<string, string[]>()
  for (const block of previous) {
    const heading = typeof block.heading === 'string' ? block.heading : ''
    const phrases = [...heading.matchAll(/\*([^*]+)\*/g)].map((match) => match[1])
    if (!phrases.length) continue
    highlighted.set(normalise(heading), phrases)
    phrasesByType.set(block.blockType, [...(phrasesByType.get(block.blockType) ?? []), ...phrases])
  }
  for (const block of blocks) {
    if (typeof block.heading !== 'string' || block.heading.includes('*')) continue
    // Same heading as before: the same words; a reworded heading: an old highlighted phrase it still contains
    const text = block.heading
    const phrases =
      highlighted.get(normalise(text)) ??
      (phrasesByType.get(block.blockType) ?? [])
        .filter((phrase) => phrase.length > 3 && text.includes(phrase))
        .slice(0, 1)
    let heading = text
    for (const phrase of phrases) heading = heading.replace(phrase, `*${phrase}*`)
    block.heading = heading
  }
}

function collectLinks(value: unknown, found: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((entry) => collectLinks(entry, found))
  else if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    if (record.type === 'custom' && typeof record.url === 'string') found.push(record.url)
    Object.values(record).forEach((entry) => collectLinks(entry, found))
  }
  return found
}

export type BuiltPage = {
  brief: BriefPage
  layout: Block[]
  meta: { title?: string; description?: string }
  warnings: string[]
}

export async function buildPageLayout(
  recipe: PageRecipe,
  ctx: MapperContext,
  recipeContext: RecipeContext,
  previousLayout: Block[] = [],
): Promise<BuiltPage> {
  const brief = parseBrief(recipe.file)
  const warnings: string[] = []
  const warn = (message: string) => warnings.push(message)
  const helpers = helpersFor(ctx.formAnchor, warn)
  const plans = recipe.sections?.(recipeContext) ?? {}

  // Sections from an "additions" brief, placed after the section they belong to
  const additions = new Map<string, Block[]>()
  for (const extra of recipe.additions ?? []) {
    for (const section of parseBrief(extra.file).sections) {
      const number = Number(section.name.match(/^Addition (\d+)/)?.[1])
      const target = extra.after[number]
      if (!target) continue
      for (const chunk of splitAtH2(section)) {
        const blocks = (await chunkToBlocks(chunk, {}, ctx, helpers)).map((block) =>
          // Dummy content (highlighted in the brief) is built but hidden until the client confirms it
          section.sample && !recipe.draft ? { ...block, hidden: true } : block,
        )
        additions.set(target, [...(additions.get(target) ?? []), ...blocks])
      }
    }
  }

  const built: { block: Block; section: string }[] = []
  for (const section of brief.sections) {
    if (recipe.onlySections && !recipe.onlySections.includes(section.number ?? -1)) continue
    if (recipe.onlySectionNames && !recipe.onlySectionNames.test(section.name)) continue
    const chunks = splitAtH2(section)
    for (const [index, chunk] of chunks.entries()) {
      const key =
        section.number === null
          ? section.name
          : index === 0
            ? section.number
            : `${section.number}.${index}`
      const plan = plans[key] ?? (section.number === null ? undefined : plans[section.name]) ?? {}
      const blocks = await chunkToBlocks(chunk, plan, ctx, helpers)
      for (const block of [...blocks, ...(plan.after ?? [])])
        built.push({ block, section: section.name })
    }
    for (const block of additions.get(section.name) ?? [])
      built.push({ block, section: section.name })
    additions.delete(section.name)
  }
  for (const target of additions.keys()) warn(`addition not placed: no section named "${target}"`)

  // A run of text sections alternates between ivory and a soft tint, so each one reads as its own band
  let run = 0
  for (const entry of built) {
    const isBand = entry.block.blockType === 'textImage'
    run = isBand ? run + 1 : 0
    if (isBand && entry.block.tone === undefined) {
      const next = built[built.indexOf(entry) + 1]
      const inRun = run > 1 || next?.block.blockType === 'textImage'
      if (inRun) entry.block.tone = run % 2 === 1 ? 'tinted' : 'light'
    }
  }

  // Cards marked "↓" jump to the bands that follow them, in order
  built.forEach((entry, index) => {
    const items = entry.block.items as
      { title: string; jump?: boolean; jumpTo?: string }[] | undefined
    if (entry.block.blockType !== 'featureGrid' || !items?.some((item) => item.jump)) return
    const bands = built
      .slice(index + 1)
      .filter((next) => next.block.blockType === 'textImage' && !next.block.anchorId)
    for (const item of items.filter((candidate) => candidate.jump)) {
      const band = bands.shift()
      if (!band) break
      band.block.anchorId = slugify(item.title)
      item.jumpTo = band.block.anchorId as string
    }
  })
  for (const entry of built) {
    for (const item of (entry.block.items as { jump?: boolean }[] | undefined) ?? [])
      delete item.jump
  }

  // Anchors used by buttons on this page
  const anchors = new Set(
    collectLinks(built.map((entry) => entry.block))
      .filter((url) => url.startsWith('#'))
      .map((url) => url.slice(1)),
  )
  anchors.delete(ctx.formAnchor)
  for (const anchor of anchors) {
    if (built.some((entry) => entry.block.anchorId === anchor)) continue
    const pattern = ANCHOR_SECTIONS[anchor]
    const target =
      pattern && built.find((entry) => pattern.test(entry.section) && !entry.block.anchorId)
    if (target) target.block.anchorId = anchor
    else if (FALLBACK_TARGETS[anchor])
      retarget(
        built.map((entry) => entry.block),
        `#${anchor}`,
        FALLBACK_TARGETS[anchor],
      )
    else warn(`no section found for the button link #${anchor}`)
  }
  if (
    collectLinks(built.map((entry) => entry.block)).includes(`#${ctx.formAnchor}`) &&
    !built.some((entry) => entry.block.anchorId === ctx.formAnchor)
  ) {
    warn(`buttons point to #${ctx.formAnchor} but the page has no form`)
  }

  const layout = built.map((entry) => withBlockName(entry.block))
  keepHighlights(layout, previousLayout)
  for (const [heading, phrase] of Object.entries(recipe.highlight ?? {})) {
    const block = layout.find(
      (entry) =>
        typeof entry.heading === 'string' && normalise(entry.heading) === normalise(heading),
    )
    if (block && typeof block.heading === 'string' && !block.heading.includes('*')) {
      block.heading = block.heading.replace(phrase, `*${phrase}*`)
    } else if (!block) warn(`highlight: heading not found "${heading}"`)
  }

  return {
    brief,
    layout,
    meta: {
      title: withoutCharacterCount(brief.seo['SEO title']) || undefined,
      description: withoutCharacterCount(brief.seo['Meta description']) || undefined,
    },
    warnings,
  }
}
