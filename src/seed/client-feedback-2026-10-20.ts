/**
 * Brings a database seeded before 20 Oct 2026 up to date with the content from the client's
 * WhatsApp feedback, without running the whole seed. The migration
 * 20261020_032234_client_feedback_content calls it, so Vercel applies it during a deploy and
 * nobody needs the database password on a laptop.
 *
 * It only touches what changed: 7 pages (the Chinese New Year page is created), 3 service
 * summaries, the Emceeing menu, the footer and the announcement bar text (left switched off).
 * Everything else, such as clients, Instagram posts, blog posts and enquiries, is left alone.
 */
import type { CollectionSlug, Payload, PayloadRequest } from 'payload'

import { projects, services, teamBuildingFaqs, testimonials } from './data'
import { seedFileName, seedImages, type SeedImageKey } from './media'
import { buildPages, withBlockNames, type SeedIds } from './pages'

const CHANGED_PAGES = [
  'home',
  'corporate-team-building',
  'corporate-emcee',
  'dinner-and-dance-emcee',
  'chinese-new-year-emcee',
  'kids-youth-programs',
  'about',
]
const CHANGED_SERVICES = ['team-building', 'corporate-emcee', 'dinner-and-dance']
const NEW_PAGE = { slug: 'chinese-new-year-emcee', title: 'Chinese New Year Emcee' }

/** Runs outside Next.js, so cache revalidation is switched off. A new object per call (see seedContext in helpers.ts). */
const context = () => ({ disableRevalidate: true })
const published = { _status: 'published' as const }

type MenuLink = { page?: number | { id: number } | null }
const linksTo = (link: MenuLink | undefined, pageId: number) =>
  Boolean(link?.page) && (typeof link?.page === 'object' ? link.page?.id : link?.page) === pageId

export async function applyClientFeedbackContent(payload: Payload, req?: PayloadRequest) {
  const log = (message: string) => payload.logger.info(`[client feedback content] ${message}`)
  const find = <T extends CollectionSlug>(collection: T) =>
    payload.find({ collection, limit: 500, depth: 0, pagination: false, draft: true, req })

  // A brand-new database has no content yet: the seed creates everything, already up to date.
  const allPages = await find('pages')
  const pageIds: Record<string, number> = Object.fromEntries(allPages.docs.map((doc) => [doc.slug, doc.id]))
  if (!pageIds.home) {
    log('skipped: no content yet (run the seed instead)')
    return
  }

  // 1. Find the ids the page layouts link to (photos, services, testimonials, projects, FAQs)
  const media = {} as Record<SeedImageKey, number>
  const allMedia = await find('media')
  const mediaByName = new Map(allMedia.docs.map((doc) => [doc.filename, doc.id]))
  for (const [key, spec] of Object.entries(seedImages) as Array<[SeedImageKey, { url: string }]>) {
    const id = mediaByName.get(seedFileName(spec.url))
    if (id) media[key] = id
  }

  const allServices = await find('services')
  const serviceIds: Record<string, number> = Object.fromEntries(allServices.docs.map((doc) => [doc.key, doc.id]))

  const allTestimonials = await find('testimonials')
  const testimonialIds: Record<string, number> = {}
  for (const item of testimonials) {
    const doc = allTestimonials.docs.find((candidate) => candidate.authorName === item.authorName)
    if (doc) testimonialIds[item.key] = doc.id
  }

  const allProjects = await find('projects')
  const projectIds: Record<string, number> = Object.fromEntries(
    projects.map((project) => [project.slug, allProjects.docs.find((doc) => doc.slug === project.slug)?.id ?? 0]),
  )

  const allFaqs = await find('faqs')
  const faqIds = teamBuildingFaqs
    .map((faq) => allFaqs.docs.find((doc) => doc.question === faq.question)?.id)
    .filter((id): id is number => Boolean(id))

  // 2. The new Chinese New Year page
  if (!pageIds[NEW_PAGE.slug]) {
    const created = await payload.create({
      collection: 'pages',
      data: { title: NEW_PAGE.title, slug: NEW_PAGE.slug, generateSlug: false, ...published },
      draft: false,
      context: context(),
      req,
    })
    pageIds[NEW_PAGE.slug] = created.id
    log(`created page ${NEW_PAGE.slug}`)
  }

  // 3. The changed pages, built exactly as the seed builds them
  const ids: SeedIds = {
    media,
    pages: pageIds,
    services: serviceIds,
    testimonials: testimonialIds,
    projects: projectIds,
    faqs: faqIds,
  }
  for (const pageData of buildPages(ids).filter((page) => CHANGED_PAGES.includes(page.slug))) {
    await payload.update({
      collection: 'pages',
      id: pageIds[pageData.slug],
      data: {
        title: pageData.title,
        theme: pageData.theme as 'corporate' | 'wedding' | 'kids',
        layout: withBlockNames(pageData.layout) as never,
        meta: pageData.meta,
        reviewStatus: 'needs-client-review',
        ...published,
      },
      draft: false,
      context: context(),
      req,
    })
    log(`updated page ${pageData.slug}`)
  }

  // 4. Service summaries shown on the service cards
  for (const service of services.filter((item) => CHANGED_SERVICES.includes(item.key))) {
    if (!serviceIds[service.key]) continue
    await payload.update({
      collection: 'services',
      id: serviceIds[service.key],
      data: { summary: service.summary, ...published },
      draft: false,
      context: context(),
      req,
    })
  }
  log('updated service summaries')

  // 5. Menu: "Chinese New Year" under Emceeing, after Dinner & Dance
  const newPageId = pageIds[NEW_PAGE.slug]
  const emceePageId = pageIds['corporate-emcee']
  const dinnerPageId = pageIds['dinner-and-dance-emcee']
  const navigation = await payload.findGlobal({ slug: 'navigation', depth: 0, req })
  const emceeing = navigation.mainMenu?.find((item) => linksTo(item.link, emceePageId))
  if (emceeing && !emceeing.children?.some((child) => linksTo(child.link, newPageId))) {
    const children = [...(emceeing.children ?? [])]
    const after = children.findIndex((child) => linksTo(child.link, dinnerPageId))
    children.splice(after === -1 ? children.length : after + 1, 0, {
      link: { label: 'Chinese New Year', type: 'page', page: newPageId },
      description: 'Annual dinners in English and 中文',
    })
    emceeing.children = children
    await payload.updateGlobal({ slug: 'navigation', data: { mainMenu: navigation.mainMenu }, context: context(), req })
    log('added Chinese New Year to the Emceeing menu')
  }

  // 6. Footer: "Chinese New Year Emcee" after "Dinner & Dance Emcee"
  const footer = await payload.findGlobal({ slug: 'footer', depth: 0, req })
  const column = footer.columns?.find((item) => item.links?.some((entry) => linksTo(entry.link, dinnerPageId)))
  if (column && !column.links?.some((entry) => linksTo(entry.link, newPageId))) {
    const links = [...(column.links ?? [])]
    const after = links.findIndex((entry) => linksTo(entry.link, dinnerPageId))
    links.splice(after + 1, 0, { link: { label: 'Chinese New Year Emcee', type: 'page', page: newPageId } })
    column.links = links
    await payload.updateGlobal({ slug: 'footer', data: { columns: footer.columns }, context: context(), req })
    log('added Chinese New Year Emcee to the footer')
  }

  // 7. Announcement bar text for the D&D season, still switched off until the client approves it
  const header = await payload.findGlobal({ slug: 'header', depth: 0, req })
  if (!header.announcement?.text) {
    await payload.updateGlobal({
      slug: 'header',
      data: {
        announcement: {
          enabled: false,
          text: 'Planning a year-end or Chinese New Year dinner? Popular dates go early.',
          link: { label: 'Check your date', type: 'custom', url: '/dinner-and-dance-emcee#enquire' },
        },
      },
      context: context(),
      req,
    })
    log('prepared the announcement bar (switched off)')
  }
}
