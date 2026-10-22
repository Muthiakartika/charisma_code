/**
 * Brings a database seeded before 21 Oct 2026 up to date with the client's request to invite
 * event crew, freelancers, partner vendors, fringe activity providers, facilitators and coaches
 * into a talent and vendor database. The migration 20261021_044318_crew_vendor_database calls it,
 * so Vercel applies it during a deploy.
 *
 * - Homepage: adds the "Join our talent and vendor database" section before the closing
 *   call to action (only once; the rest of the homepage is left as it is in the CMS).
 * - Work With Us: hero, "Who we work with" and the form heading rebuilt from the seed.
 */
import type { Payload, PayloadRequest } from 'payload'

import { buildPages, withBlockNames, type SeedIds } from './pages'

const ANCHOR = 'join-our-database'

/** Runs outside Next.js, so cache revalidation is switched off. A new object per call (see seedContext in helpers.ts). */
const context = () => ({ disableRevalidate: true })
const published = { _status: 'published' as const }

export async function applyCrewDatabaseContent(payload: Payload, req?: PayloadRequest) {
  const log = (message: string) => payload.logger.info(`[crew database content] ${message}`)

  const allPages = await payload.find({ collection: 'pages', limit: 500, depth: 0, pagination: false, req })
  const pageIds: Record<string, number> = Object.fromEntries(allPages.docs.map((doc) => [doc.slug, doc.id]))
  if (!pageIds.home) {
    log('skipped: no content yet (run the seed instead)')
    return
  }

  // Both changes only use plain links, so the other ids can stay empty.
  const ids = { media: {}, pages: pageIds, services: {}, testimonials: {}, projects: {}, faqs: [] } as unknown as SeedIds
  const seedPages = buildPages(ids)
  const seedPage = (slug: string) => seedPages.find((page) => page.slug === slug)!

  // 1. Homepage: insert the new section before the closing call to action
  const home = allPages.docs.find((doc) => doc.slug === 'home')!
  const layout = [...(home.layout ?? [])]
  if (!layout.some((block) => 'anchorId' in block && block.anchorId === ANCHOR)) {
    const section = seedPage('home').layout.find((block) => 'anchorId' in block && block.anchorId === ANCHOR)!
    const last = layout.at(-1)
    layout.splice(last?.blockType === 'cta' ? layout.length - 1 : layout.length, 0, withBlockNames([section] as never)[0] as never)
    await payload.update({
      collection: 'pages',
      id: home.id,
      data: { layout, reviewStatus: 'needs-client-review', ...published },
      draft: false,
      context: context(),
      req,
    })
    log('added the talent and vendor database section to the homepage')
  }

  // 2. Work With Us, built exactly as the seed builds it
  if (pageIds['work-with-us']) {
    const page = seedPage('work-with-us')
    await payload.update({
      collection: 'pages',
      id: pageIds['work-with-us'],
      data: {
        layout: withBlockNames(page.layout) as never,
        meta: page.meta,
        reviewStatus: 'needs-client-review',
        ...published,
      },
      draft: false,
      context: context(),
      req,
    })
    log('updated Work With Us')
  }
}
