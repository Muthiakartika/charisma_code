/**
 * Brings a database seeded before 22 Oct 2026 up to date with De Zhong's request to look more
 * corporate: the company should not read like a freelancer's profile. The homepage
 * "What is The Charisma Code?" section now lists what the company does, and his performer
 * roles (singer, pianist, actor) move to his own profile on the About page.
 *
 * The migration 20261022_010825_corporate_positioning calls it, so Vercel applies it during a deploy.
 * Only the changed sections are touched; other CMS edits on these pages are kept.
 */
import type { Payload, PayloadRequest } from 'payload'

import { buildPages, withBlockNames, type SeedIds } from './pages'

/** Runs outside Next.js, so cache revalidation is switched off. A new object per call (see seedContext in helpers.ts). */
const context = () => ({ disableRevalidate: true })
const published = { _status: 'published' as const }

type Block = { blockType: string; [field: string]: unknown }

export async function applyCorporatePositioningContent(payload: Payload, req?: PayloadRequest) {
  const log = (message: string) => payload.logger.info(`[corporate positioning content] ${message}`)

  const allPages = await payload.find({ collection: 'pages', limit: 500, depth: 0, pagination: false, req })
  const pageIds: Record<string, number> = Object.fromEntries(allPages.docs.map((doc) => [doc.slug, doc.id]))
  if (!pageIds.home) {
    log('skipped: no content yet (run the seed instead)')
    return
  }

  // Only text is copied from the seed, so the other ids can stay empty.
  const ids = { media: {}, pages: pageIds, services: {}, testimonials: {}, projects: {}, faqs: [] } as unknown as SeedIds
  const seedPages = buildPages(ids)
  const seedBlock = (slug: string, blockType: string, heading?: string) =>
    (seedPages.find((page) => page.slug === slug)!.layout as Block[]).find(
      (block) => block.blockType === blockType && (!heading || block.heading === heading),
    )!

  /** Copies the given fields from the seed onto the first matching section of a page. */
  const fromSeed = (slug: string, blockType: string, fields: string[], heading?: string) => () => {
    const source = seedBlock(slug, blockType, heading)
    return Object.fromEntries(fields.map((field) => [field, source[field]]))
  }

  type Change = { blockType: string; heading?: string; update: (block: Block) => Record<string, unknown> }

  const savePage = async (slug: string, changes: Change[], extra?: (layout: Block[]) => Block[]) => {
    const doc = allPages.docs.find((page) => page.slug === slug)
    if (!doc) return
    let layout = [...((doc.layout ?? []) as Block[])]
    for (const change of changes) {
      const index = layout.findIndex(
        (block) => block.blockType === change.blockType && (!change.heading || block.heading === change.heading),
      )
      if (index >= 0) layout[index] = { ...layout[index], ...change.update(layout[index]) }
    }
    if (extra) layout = extra(layout)
    await payload.update({
      collection: 'pages',
      id: doc.id,
      data: { layout: layout as never, reviewStatus: 'needs-client-review', ...published },
      draft: false,
      context: context(),
      req,
    })
    log(`updated ${slug}`)
  }

  // 1. Homepage: the statement describes the company; founder section kept to hosting and training
  await savePage('home', [
    { blockType: 'statement', update: fromSeed('home', 'statement', ['body', 'roles']) },
    { blockType: 'founderIntro', update: fromSeed('home', 'founderIntro', ['body', 'credentials']) },
  ])

  // 2. About: the founder's profile gets his roles as a lit-up bill, right after his introduction
  await savePage('about', [{ blockType: 'founderIntro', update: () => ({ mood: 'warm' }) }], (layout) => {
    if (layout.some((block) => block.blockType === 'statement')) return layout
    const founder = layout.findIndex((block) => block.blockType === 'founderIntro')
    const statement = withBlockNames([seedBlock('about', 'statement')] as never)[0] as unknown as Block
    layout.splice(founder >= 0 ? founder + 1 : layout.length, 0, statement)
    return layout
  })
}
