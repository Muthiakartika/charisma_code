/**
 * Fills the CMS with starting content (run with: npm run seed).
 *
 * Safe to run more than once: existing items are updated, not duplicated.
 * It never touches users, enquiries or freelancer applications.
 * Photos are downloaded from the existing WordPress website (cached in .seed-cache/).
 */
import config from '@payload-config'
import path from 'path'
import { getPayload } from 'payload'

import {
  categories,
  clients,
  founderUpdates,
  projects,
  services,
  teamBuildingFaqs,
  teamBuildingPrograms,
  testimonials,
} from './data'
import { clientLogos } from './client-logos'
import { decodeEntities, htmlToLexical, importImage, importLocalImage, seedContext, upsert } from './helpers'
import { seedImages, type SeedImageKey } from './media'
import { instagramPosts } from './instagram-posts'
import { buildPages, withBlockNames, type SeedIds } from './pages'

const published = { _status: 'published' as const }
const review = { reviewStatus: 'needs-client-review' as const }

const payload = await getPayload({ config })
const log = (message: string) => payload.logger.info(`[seed] ${message}`)

// 1. Photos ───────────────────────────────────────────────────────────────
log('Importing photos from the existing website…')
const media = {} as Record<SeedImageKey, number>
for (const [key, spec] of Object.entries(seedImages) as Array<[SeedImageKey, (typeof seedImages)[SeedImageKey]]>) {
  media[key] = await importImage(payload, spec)
}

// 2. Blog categories ──────────────────────────────────────────────────────
log('Categories…')
for (const category of categories) {
  await upsert(payload, 'categories', { slug: { equals: category.slug } }, { ...category, generateSlug: false })
}

// 3. Services (landing pages are linked after pages exist) ─────────────────
log('Services…')
const serviceIds: Record<string, number> = {}
for (const service of services) {
  serviceIds[service.key] = await upsert(
    payload,
    'services',
    { key: { equals: service.key } },
    {
      key: service.key,
      title: service.title,
      priority: service.priority,
      audience: service.audience,
      summary: service.summary,
      image: media[service.image],
      showInEnquiryForm: true,
      ...review,
      ...published,
    },
  )
}

// 4. Testimonials (public Google reviews) ──────────────────────────────────
log('Testimonials…')
const testimonialIds: Record<string, number> = {}
for (const item of testimonials) {
  testimonialIds[item.key] = await upsert(
    payload,
    'testimonials',
    { authorName: { equals: item.authorName } },
    {
      quote: item.quote,
      authorName: item.authorName,
      authorRole: item.authorRole,
      category: item.category,
      source: 'google-review',
      permission: 'public-review',
      ...published,
    },
  )
}

// 5. Clients (from the old website, awaiting confirmation) ─────────────────
log('Clients…')
for (const [index, name] of clients.entries()) {
  const logoFile = clientLogos[name]?.file
  const logo = logoFile
    ? await importLocalImage(payload, path.resolve(process.cwd(), 'src/seed/logos', logoFile), `${name} logo`)
    : null
  await upsert(payload, 'clients', { name: { equals: name } }, {
    name,
    logo,
    confirmation: 'needs-confirmation',
    showOnWebsite: true,
    order: index + 1,
  })
}

// 6. Team building programmes and FAQs ─────────────────────────────────────
log('Programmes and FAQs…')
for (const [index, program] of teamBuildingPrograms.entries()) {
  await upsert(payload, 'programs', { title: { equals: program.title } }, {
    title: program.title,
    service: serviceIds['team-building'],
    summary: program.summary,
    highlights: program.highlights.map((text) => ({ text })),
    // Programme cards are text-only: one strong photo per section reads better than repeats.
    image: null,
    order: index + 1,
    ...review,
    ...published,
  })
}
const faqIds: number[] = []
for (const [index, faq] of teamBuildingFaqs.entries()) {
  faqIds.push(
    await upsert(payload, 'faqs', { question: { equals: faq.question } }, {
      ...faq,
      services: [serviceIds['team-building']],
      order: index + 1,
      ...review,
      ...published,
    }),
  )
}

// 7. Founder's updates ───────────────────────────────────────────────────
log("Founder's updates…")
for (const update of founderUpdates) {
  await upsert(payload, 'founder-updates', { title: { equals: update.title } }, {
    title: update.title,
    description: update.description,
    date: update.date,
    image: media[update.image],
    link: update.link,
    featured: true,
    ...published,
  })
}

// 7b. Latest Instagram posts (by hand until the Instagram API is connected) ──
log('Instagram posts…')
for (const post of instagramPosts) {
  const permalink = `https://www.instagram.com/deprinceofzhong/reel/${post.code}/`
  const image = await importLocalImage(
    payload,
    path.resolve(process.cwd(), 'src/seed/instagram', `ig-${post.code}.jpg`),
    post.alt,
  )
  // Matched by link, so a later API sync can update these instead of adding duplicates.
  await upsert(payload, 'instagram-posts', { permalink: { equals: permalink } }, {
    image,
    permalink,
    postedAt: post.postedAt,
    mediaType: 'video',
    showOnWebsite: true,
    source: 'manual',
  })
}

// 8. Portfolio projects ──────────────────────────────────────────────────
log('Portfolio projects…')
const projectIds: Record<string, number> = {}
for (const project of projects) {
  projectIds[project.slug] = await upsert(payload, 'projects', { slug: { equals: project.slug } }, {
    slug: project.slug,
    generateSlug: false,
    title: project.title,
    category: project.category,
    clientName: project.clientName,
    venue: project.venue,
    eventDate: project.eventDate,
    summary: project.summary,
    objective: project.objective,
    solution: project.solution,
    execution: project.execution,
    outcomes: project.outcomes,
    coverImage: media[project.cover],
    gallery: (project.gallery ?? []).map((key) => media[key]),
    videoUrl: project.videoUrl,
    featured: Boolean(project.featured),
    hasDetailPage: true,
    legacyUrl: project.legacyUrl,
    ...review,
    ...published,
  })
}

// 9. Pages: first create empty pages (so pages can link to each other), then fill them ──
log('Pages…')
const pageIds: Record<string, number> = {}
const placeholderIds: SeedIds = {
  media,
  pages: new Proxy({}, { get: () => undefined }) as Record<string, number>,
  services: serviceIds,
  testimonials: testimonialIds,
  projects: projectIds,
  faqs: faqIds,
}
for (const pageData of [...buildPages(placeholderIds), { slug: 'legal', title: 'Terms & Privacy' }]) {
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: pageData.slug } }, limit: 1, depth: 0, draft: true })
  pageIds[pageData.slug] =
    existing.docs[0]?.id ??
    (
      await payload.create({
        collection: 'pages',
        context: seedContext,
        data: { title: pageData.title, slug: pageData.slug, generateSlug: false, ...published },
      })
    ).id
}

const ids: SeedIds = { ...placeholderIds, pages: pageIds }
for (const pageData of buildPages(ids)) {
  await payload.update({
    collection: 'pages',
    id: pageIds[pageData.slug],
    context: seedContext,
    draft: false,
    data: {
      title: pageData.title,
      theme: pageData.theme as 'corporate' | 'wedding' | 'kids',
      layout: withBlockNames(pageData.layout) as never,
      meta: pageData.meta,
      chineseTranslation: 'not-started',
      ...review,
      ...published,
    },
  })
}

// The legal page keeps the existing Terms & Privacy text from WordPress (needs a PDPA review).
log('Legal page (from WordPress)…')
try {
  const response = await fetch('https://www.thecharismacode.co/wp-json/wp/v2/pages?slug=legal')
  const [legal] = (await response.json()) as Array<{ content: { rendered: string } }>
  const html = legal.content.rendered.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '')
  await payload.update({
    collection: 'pages',
    id: pageIds.legal,
    context: seedContext,
    draft: false,
    data: {
      title: 'Terms & Privacy',
      theme: 'corporate',
      layout: [{ blockType: 'richText', content: (await htmlToLexical(payload, decodeEntities(html))) as never }],
      meta: { title: 'Terms & Privacy | The Charisma Code', description: 'Terms and conditions, privacy policy and cookie notice of The Charisma Code.' },
      ...review,
      ...published,
    },
  })
} catch (error) {
  payload.logger.warn({ err: error }, '[seed] Could not import the legal page from WordPress; add it manually in the CMS.')
}

// 10. Link services to their landing pages ─────────────────────────────────
for (const service of services) {
  await payload.update({
    collection: 'services',
    id: serviceIds[service.key],
    context: seedContext,
    draft: false,
    data: { page: pageIds[service.pageSlug], ...published },
  })
}

// 11. Site settings ──────────────────────────────────────────────────────
log('Site settings…')
const pageLink = (label: string, slug: string) => ({ label, type: 'page' as const, page: pageIds[slug] })

await payload.updateGlobal({
  slug: 'header',
  context: seedContext,
  data: {
    ctaButton: pageLink("Let's Talk", 'contact'),
    // D&D season message, ready but switched off until the client approves it (tick "enabled" in Header)
    announcement: {
      enabled: false,
      text: 'Planning a year-end or Chinese New Year dinner? Popular dates go early.',
      link: { label: 'Check your date', type: 'custom', url: '/dinner-and-dance-emcee#enquire' },
    },
  },
})

await payload.updateGlobal({
  slug: 'navigation',
  context: seedContext,
  data: {
    mainMenu: [
      { link: pageLink('Team Building', 'corporate-team-building'), children: [] },
      {
        link: pageLink('Emceeing', 'corporate-emcee'),
        children: [
          { link: pageLink('Corporate Emcee', 'corporate-emcee'), description: 'Conferences, launches and award nights' },
          { link: pageLink('Dinner & Dance', 'dinner-and-dance-emcee'), description: 'Annual D&Ds, games and lucky draws' },
          { link: pageLink('Chinese New Year', 'chinese-new-year-emcee'), description: 'Annual dinners in English and 中文' },
          { link: pageLink('Weddings', 'wedding-emcee'), description: 'Bilingual hosting with live singing' },
        ],
      },
      {
        link: pageLink('Workshops', 'corporate-workshops'),
        children: [
          { link: pageLink('Corporate Workshops', 'corporate-workshops'), description: 'Facilitated sessions for teams' },
          { link: pageLink('Communication Coaching', 'communication-coaching'), description: 'Public speaking and stage presence' },
          { link: pageLink('Kids & Youth', 'kids-youth-programs'), description: 'School programmes and camps' },
        ],
      },
      { link: pageLink('Our Work', 'our-work'), children: [] },
      { link: pageLink('About', 'about'), children: [] },
      { link: pageLink('Insights', 'insights'), children: [] },
    ],
  },
})

await payload.updateGlobal({
  slug: 'footer',
  context: seedContext,
  data: {
    tagline: 'We Bring the Spark, You Shine.',
    blurb:
      'A Singapore-based experiential and events studio. Team building, emceeing, workshops and celebrations, designed around your people.',
    columns: [
      {
        title: 'Corporate',
        links: [
          { link: pageLink('Team Building', 'corporate-team-building') },
          { link: pageLink('Corporate Emcee', 'corporate-emcee') },
          { link: pageLink('Dinner & Dance Emcee', 'dinner-and-dance-emcee') },
          { link: pageLink('Chinese New Year Emcee', 'chinese-new-year-emcee') },
          { link: pageLink('Corporate Workshops', 'corporate-workshops') },
          { link: pageLink('Communication Coaching', 'communication-coaching') },
        ],
      },
      {
        title: 'Celebrations & more',
        links: [
          { link: pageLink('Wedding Emcee', 'wedding-emcee') },
          { link: pageLink('Kids & Youth Programs', 'kids-youth-programs') },
          { link: pageLink('Creative Campaigns', 'creative-campaigns') },
          { link: pageLink('Event Support', 'event-support') },
          { link: pageLink('All services', 'services') },
        ],
      },
      {
        title: 'Studio',
        links: [
          { link: pageLink('Our Work', 'our-work') },
          { link: pageLink('About', 'about') },
          { link: pageLink('Insights', 'insights') },
          { link: pageLink('Work With Us', 'work-with-us') },
          { link: pageLink('Contact', 'contact') },
        ],
      },
    ],
    legalLinks: [{ link: pageLink('Terms & Privacy', 'legal') }],
  },
})

await payload.updateGlobal({
  slug: 'contact-information',
  context: seedContext,
  data: {
    email: 'hello@thecharismacode.co',
    phone: '+65 9437 8083',
    whatsappNumber: '6594378083',
    uen: '53505860L',
    serviceArea: 'Singapore',
    notificationEmails: [{ email: 'hello@thecharismacode.co' }],
  },
})

await payload.updateGlobal({
  slug: 'social-links',
  context: seedContext,
  data: {
    instagram: 'https://www.instagram.com/deprinceofzhong',
    facebook: 'https://www.facebook.com/deprinceofzhong',
    linkedin: 'https://www.linkedin.com/in/deprinceofzhong/',
    youtube: 'https://www.youtube.com/channel/UCO1HATBRkqep-BbWmwh0hHQ',
  },
})

await payload.updateGlobal({
  slug: 'seo-defaults',
  context: seedContext,
  data: {
    siteName: 'The Charisma Code',
    titleSuffix: ' | The Charisma Code',
    defaultDescription:
      'Singapore experiential studio for corporate team building, bilingual emceeing, workshops and celebrations, designed around your people and objectives.',
    defaultImage: media.corporateChristmasBallroom,
    organizationDescription:
      'The Charisma Code is a Singapore-based experiential and events studio offering corporate team building, bilingual corporate and wedding emceeing, workshops, communication coaching, youth programmes, creative campaigns and event support.',
    founderName: 'Chia De Zhong',
    founderJobTitle: 'Founder, bilingual emcee and facilitator',
    founderAlumniOf: 'Singapore Management University',
  },
})

log('Done. Open http://localhost:3000 and http://localhost:3000/admin')
process.exit(0)
