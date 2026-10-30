/**
 * Writes the developer handoff (docs/handoff, 26 Oct 2026) into the CMS, page by page:
 * the services and their prices, the reviews quoted in the briefs, and each page's sections,
 * SEO title and meta description.
 *
 * Re-running it is safe: pages, services and reviews are matched by slug, key and name.
 * Run it with:  npm run import:handoff -- home corporate-team-building   (or a phase: -- phase=2)
 */
import type { Payload, PayloadRequest } from 'payload'

import path from 'path'

import { importLocalImage, seedContext } from '../helpers'
import { seedFileName, seedImages } from '../media'
import { buildPageLayout } from './build-page'
import { parseBrief, withoutCharacterCount } from './parse-brief'
import { recipes, type PageRecipe } from './recipes'
import type { Block } from './to-blocks'

const published = { _status: 'published' as const }

/** Service tracking keys for the pages in the handoff (existing keys are kept, see src/seed/data.ts). */
export const SERVICE_KEYS: Record<string, string> = {
  'corporate-team-building': 'team-building',
  'corporate-emcee': 'corporate-emcee',
  'dinner-and-dance-emcee': 'dinner-and-dance',
  'event-planning': 'event-planning',
  'dinner-and-dance-planning': 'dinner-and-dance-planning',
  'product-launch-events': 'product-launch-events',
  'corporate-workshops': 'corporate-workshops',
  'communication-coaching': 'communication-coaching',
  'wedding-emcee': 'wedding-emcee',
  'kids-youth-programs': 'kids-youth',
  'creative-campaigns': 'creative-campaigns',
  'event-support': 'event-support',
}

/** Photos for the services the handoff adds (existing services keep theirs). */
const SERVICE_IMAGES: Record<string, string> = {
  'event-planning': 'corporateChristmasBallroom',
  'dinner-and-dance-planning': 'banyanDnd',
  'product-launch-events': 'somaProducts',
}

/** De Zhong's own CVs, sent by him on WhatsApp (Oct 2026). Replace the files in src/seed/documents/ to update them. */
const FOUNDER_DOCUMENTS = [
  { file: 'chia-de-zhong-emcee-cv-2026.pdf', alt: 'Chia De Zhong emcee CV, October 2026 (PDF)' },
  { file: 'chia-de-zhong-acting-cv-2026.pdf', alt: 'Chia De Zhong acting CV, October 2026 (PDF)' },
]

/** Photos downloaded from @deprinceofzhong on Instagram for the new pages (27 Oct 2026; low resolution, to swap). */
const INSTAGRAM_PHOTOS: { file: string; alt: string }[] = [
  {
    file: 'ig-Cp9pHxrBonZ.jpg',
    alt: 'De Zhong hosting with a microphone at a banquet in Singapore',
  },
  {
    file: 'ig-DejQffWzh7R-stage.jpg',
    alt: 'De Zhong in a red jacket bringing energy to the stage at a corporate event in a hotel ballroom',
  },
  // Frames from his reels (hosting reel Cp9pHxrBonZ, gala DejQffWzh7R, community event Ddq-VlETFpi),
  // so no page shows the same photo twice. Low resolution: replace with the original photos when sent.
  {
    file: 'ig-Cp9pHxrBonZ-podium.jpg',
    alt: 'De Zhong speaking from the podium at a corporate event at Resorts World Sentosa',
  },
  {
    file: 'ig-Cp9pHxrBonZ-seminar-stage.jpg',
    alt: 'De Zhong at the lectern hosting a prize presentation at a seminar',
  },
  {
    file: 'ig-Cp9pHxrBonZ-game-booth.jpg',
    alt: 'De Zhong hosting a game with guests at a brand event in a hotel foyer',
  },
  {
    file: 'ig-Cp9pHxrBonZ-game-booth-2.jpg',
    alt: 'De Zhong getting guests moving at a brand event game wall',
  },
  {
    file: 'ig-Cp9pHxrBonZ-large-audience.jpg',
    alt: 'De Zhong on stage in front of a large seated audience',
  },
  {
    file: 'ig-Cp9pHxrBonZ-store-event.jpg',
    alt: 'De Zhong hosting an in-store product event with a live cooking demonstration',
  },
  {
    file: 'ig-Cp9pHxrBonZ-live-selling.jpg',
    alt: 'De Zhong presenting gift sets on camera for a live-selling video',
  },
  {
    file: 'ig-Cp9pHxrBonZ-wedding-banquet.jpg',
    alt: 'De Zhong hosting a wedding banquet with the couple on stage',
  },
  {
    file: 'ig-Cp9pHxrBonZ-family-day.jpg',
    alt: 'De Zhong hosting a family event in an open atrium as parents and children line up',
  },
  {
    file: 'ig-DejQffWzh7R-gala-stage.jpg',
    alt: 'De Zhong hosting a brand gala on stage with performers in a hotel ballroom',
  },
  {
    file: 'ig-Ddq-VlETFpi-mall-stage.jpg',
    alt: 'De Zhong singing on a mall atrium stage as shoppers watch from the escalator',
  },
  {
    file: 'ig-Ddq-VlETFpi-community-crowd.jpg',
    alt: 'De Zhong hosting a community event in a mall atrium with a seated audience',
  },
]

const AUDIENCE: Record<string, 'corporate' | 'celebrations' | 'youth' | 'creative'> = {
  'wedding-emcee': 'celebrations',
  'kids-youth': 'youth',
  'creative-campaigns': 'creative',
  'event-support': 'creative',
  'product-launch-events': 'creative',
}

/** Presentation chosen earlier in the CMS that is kept when a section keeps its heading. */
const PRESENTATION_FIELDS = [
  'image',
  'imagePosition',
  'imageShape',
  'tone',
  'portrait',
  'mood',
  'display',
  'limit',
  'testimonial',
]

const normalise = (text: unknown) =>
  String(text ?? '')
    .replace(/\*/g, '')
    .replace(/[.!?]+$/, '')
    .trim()
    .toLowerCase()

export async function importHandoff(
  payload: Payload,
  options: { slugs?: string[]; phase?: number; req?: PayloadRequest },
) {
  const { req } = options
  const log = (message: string) => payload.logger.info(`[handoff] ${message}`)
  const chosen = recipes.filter(
    (recipe) =>
      (!options.slugs?.length || options.slugs.includes(recipe.slug)) &&
      (!options.phase || recipe.phase === options.phase),
  )
  if (!chosen.length) {
    log('nothing to import (check the slugs or phase)')
    return
  }

  // ── Lookups ───────────────────────────────────────────────────────────────
  const findAll = async <T extends 'pages' | 'projects' | 'media' | 'services' | 'testimonials'>(
    collection: T,
  ) =>
    (await payload.find({ collection, limit: 2000, depth: 0, pagination: false, draft: true, req }))
      .docs

  const [pages, projects, media, testimonials] = await Promise.all([
    findAll('pages'),
    findAll('projects'),
    findAll('media'),
    findAll('testimonials'),
  ])
  const pageBySlug = new Map(pages.map((page) => [page.slug, page]))
  const projectIds = Object.fromEntries(projects.map((project) => [project.slug, project.id]))
  // The cover photos a project section shows, so a text band never repeats one of them
  const coversOn = (block: Block) => {
    const cover = (project: (typeof projects)[number]) => project.coverImage as number
    if (block.blockType === 'projectArchive') return projects.map(cover)
    if (block.blockType !== 'featuredProjects') return []
    const chosen = (block.projects as number[] | undefined) ?? []
    return projects
      .filter((project) =>
        chosen.length
          ? chosen.includes(project.id)
          : block.category && block.category !== 'all'
            ? project.category === block.category
            : project.featured,
      )
      .map(cover)
  }
  const mediaByName = new Map(media.map((doc) => [doc.filename, doc.id]))
  // De Zhong's CVs (October 2026), offered on his founder profile at his request
  for (const document of FOUNDER_DOCUMENTS) {
    if (mediaByName.has(document.file)) continue
    const id = await importLocalImage(
      payload,
      path.resolve(process.cwd(), 'src/seed/documents', document.file),
      document.alt,
    )
    mediaByName.set(document.file, id)
    log(`added file ${document.file}`)
  }
  for (const photo of INSTAGRAM_PHOTOS) {
    if (mediaByName.has(photo.file)) continue
    const id = await importLocalImage(
      payload,
      path.resolve(process.cwd(), 'src/seed/instagram', photo.file),
      photo.alt,
    )
    await payload.update({
      collection: 'media',
      id,
      data: { needsReplacement: true },
      context: seedContext(),
      req,
    })
    mediaByName.set(photo.file, id)
    log(`added photo ${photo.file}`)
  }
  const img = (key: string) => {
    const spec = (seedImages as Record<string, { url: string }>)[key]
    return mediaByName.get(spec ? seedFileName(spec.url) : key) ?? undefined
  }

  // ── Services: titles, card text and prices come from the homepage service grid ──
  const services = await syncServices(payload, req, log, img)
  const service = (key: string) => services[key]

  // ── Reviews quoted in the briefs ──────────────────────────────────────────
  const testimonial =
    (category: string) =>
    async ({ text, author, sample }: { text: string; author: string; sample: boolean }) => {
      const google = /, Google review$/.test(author)
      const name = author
        .replace(/, Google review$/, '')
        .split(',')[0]
        .trim()
      const existing = testimonials.find((doc) => doc.authorName === name)
      if (existing) return existing.id
      const created = await payload.create({
        collection: 'testimonials',
        data: {
          quote: text,
          authorName: name,
          authorRole: google ? undefined : author.split(',').slice(1).join(',').trim() || undefined,
          category: category as never,
          source: google ? 'google-review' : 'feedback-form',
          // Sample quotes from the briefs stay hidden until the client sends real ones.
          permission: google && !sample ? 'public-review' : 'pending',
          ...published,
        },
        draft: false,
        context: seedContext(),
        req,
      })
      testimonials.push(created)
      log(`added review by ${name}${created.permission === 'pending' ? ' (sample, hidden)' : ''}`)
      return created.id
    }

  // Pages are created first (empty), so services and buttons can point to them.
  for (const recipe of chosen) {
    if (pageBySlug.has(recipe.slug)) continue
    const created = await payload.create({
      collection: 'pages',
      data: {
        title: recipe.title,
        slug: recipe.slug,
        theme: recipe.theme ?? 'corporate',
        layout: [],
        _status: recipe.draft ? 'draft' : 'published',
      },
      draft: Boolean(recipe.draft),
      context: seedContext(),
      req,
    })
    pageBySlug.set(recipe.slug, created)
    log(`created page /${recipe.slug}`)
  }
  await linkServicesToPages(payload, req, services, pageBySlug)

  // Pages with a service of their own (the emcee pages for each occasion), for their Service structured data
  for (const [index, recipe] of chosen.entries()) {
    if (!recipe.ownService) continue
    const brief = parseBrief(recipe.file)
    const summary = withoutCharacterCount(brief.seo['Meta description']).slice(0, 200)
    const data = {
      title: recipe.ownService.title,
      key: recipe.ownService.key,
      priority: 20 + index,
      summary,
      audience: recipe.theme === 'kids' ? ('youth' as const) : ('corporate' as const),
      page: pageBySlug.get(recipe.slug)!.id,
      showInEnquiryForm: false,
      reviewStatus: 'needs-client-review' as const,
      ...published,
    }
    if (services[data.key]) {
      await payload.update({
        collection: 'services',
        id: services[data.key],
        data,
        draft: false,
        context: seedContext(),
        req,
      })
    } else {
      services[data.key] = (
        await payload.create({
          collection: 'services',
          data,
          draft: false,
          context: seedContext(),
          req,
        })
      ).id
      log(`added service ${data.title}`)
    }
  }

  await updateMenus(payload, req, pageBySlug, log)

  for (const recipe of chosen) {
    const page = pageBySlug.get(recipe.slug)!
    const previous = (page.layout ?? []) as unknown as Block[]
    const category =
      recipe.theme === 'wedding' ? 'weddings' : recipe.theme === 'kids' ? 'kids-youth' : 'general'
    const built = await buildPageLayout(
      recipe,
      { projects: projectIds, testimonial: testimonial(category), formAnchor: 'quote' },
      { img, service },
      previous,
    )
    const layout = finishLayout(built.layout, previous, recipe, { img, service, coversOn })
    const hero = layout.find((block) => block.blockType === 'hero')
    const ogImage = Array.isArray(hero?.images) ? (hero.images[0] as number | undefined) : undefined

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: {
        title: recipe.title,
        theme: recipe.theme ?? page.theme ?? 'corporate',
        layout: layout as never,
        meta: { ...(page.meta ?? {}), ...built.meta, ...(ogImage ? { image: ogImage } : {}) },
        reviewStatus: 'needs-client-review',
        _status: recipe.draft ? 'draft' : 'published',
      },
      draft: Boolean(recipe.draft),
      context: seedContext(),
      req,
    })
    log(`updated /${recipe.slug}${recipe.draft ? ' (draft)' : ''}: ${layout.length} sections`)
    for (const warning of built.warnings) log(`  ! /${recipe.slug}: ${warning}`)
  }
}

/** Blocks whose background the importer may choose, and blocks with a fixed background. */
const TONED = new Set([
  'textImage',
  'featureGrid',
  'processSteps',
  'faq',
  'serviceCards',
  'clientLogos',
])
const FIXED_LIGHT = new Set([
  'richText',
  'testimonials',
  'featuredProjects',
  'founderUpdates',
  'enquiryForm',
  'projectArchive',
  'postArchive',
  'gallery',
])

/**
 * Sections alternate between ivory and the soft beige, as on the Figma boards; dark and coloured
 * sections (statement, founder, videos, call-to-action bands) break the rhythm and the next one starts ivory.
 */
function alternateBackgrounds(layout: Block[]) {
  // One "Brands and organisations" strip per page: the first one (under the hero when the brief has it there)
  const firstLogos = layout.findIndex((block) => block.blockType === 'clientLogos')
  layout = layout.filter(
    (block, index) => block.blockType !== 'clientLogos' || index === firstLogos,
  )
  let previous = 'light'
  layout.forEach((block, index) => {
    const next = layout[index + 1]
    if (block.blockType === 'hero') previous = 'light'
    else if (TONED.has(block.blockType) && block.tone !== 'dark') {
      let tone = previous === 'light' ? 'tinted' : 'light'
      // Never next to a beige call-to-action band
      if (tone === 'tinted' && next?.blockType === 'cta' && next.style === 'light') tone = 'light'
      block.tone = tone
      previous = tone
    } else if (FIXED_LIGHT.has(block.blockType)) previous = 'light'
    else if (block.blockType === 'video' && block.tone !== 'dark')
      previous = String(block.tone ?? 'light')
    else if (block.blockType === 'cta') {
      previous =
        block.style === 'light'
          ? 'tinted'
          : block.style === 'ivory' || block.style === 'card'
            ? 'light'
            : 'dark'
    } else previous = 'dark'
  })
  return layout
}

/** Hero photos, the enquiry form's service, and the photos and colours earlier sections already had. */
function finishLayout(
  layout: Block[],
  previous: Block[],
  recipe: PageRecipe,
  ctx: {
    img: (key: string) => number | undefined
    service: (key: string) => number | undefined
    coversOn: (block: Block) => number[]
  },
) {
  const previousHero = previous.find((block) => block.blockType === 'hero')
  const unused = [...previous]

  const done = layout.map((block) => {
    const next: Block = { ...block }

    if (next.blockType === 'hero') {
      const images =
        recipe.heroImages?.map(ctx.img).filter(Boolean) ??
        (previousHero?.images as number[] | undefined) ??
        []
      if (!next.images && images.length) next.images = images
      if (!('variant' in (block as object)) || next.variant === 'simple') {
        next.variant =
          recipe.heroVariant ??
          (images.length
            ? previousHero?.variant && previousHero.variant !== 'simple'
              ? (previousHero.variant as string)
              : 'split'
            : 'simple')
      }
      if (next.variant === 'colourBlock') next.lineArt = previousHero?.lineArt ?? 'spotlight'
      return next
    }

    if (next.blockType === 'enquiryForm') {
      // The form keeps its service and "what happens next" points; the brief gives its heading and intro.
      const oldForm = previous.find((old) => old.blockType === 'enquiryForm')
      next.defaultService =
        (recipe.serviceKey && ctx.service(recipe.serviceKey)) || oldForm?.defaultService
      next.nextSteps = oldForm?.nextSteps ?? next.nextSteps
      next.heading = next.heading || oldForm?.heading
      next.intro = next.intro ?? oldForm?.intro
      return next
    }

    // A section that was a video before (same heading) stays a video, with the brief's text.
    const oldVideo = previous.find(
      (old) => old.blockType === 'video' && normalise(old.heading) === normalise(next.heading),
    )
    if (oldVideo && next.blockType === 'textImage') {
      return {
        blockType: 'video',
        blockName: next.blockName,
        anchorId: next.anchorId,
        heading: next.heading,
        intro: next.body,
        youtubeUrl: oldVideo.youtubeUrl,
        poster: oldVideo.poster,
        buttons: ((next.buttons as { url: string }[]) ?? []).filter(
          (entry) => !/^#(video|reel)$/.test(entry.url),
        ),
        tone: oldVideo.tone ?? 'dark',
      }
    }

    // Keep the photo, background and style of a section whose heading did not change.
    const index = unused.findIndex(
      (old) =>
        old.blockType === next.blockType && normalise(old.heading) === normalise(next.heading),
    )
    if (index >= 0) {
      const old = unused.splice(index, 1)[0]
      for (const field of PRESENTATION_FIELDS) {
        if (next[field] === undefined && old[field] !== undefined && old[field] !== null)
          next[field] = old[field]
      }
      if (next.blockType === 'textImage' && old.image && !block.image) {
        next.image = old.image
        next.imagePosition = old.imagePosition
        next.imageShape = old.imageShape
        if (old.tone) next.tone = old.tone
      }
      // A comparison strip chosen earlier (e.g. group sizes) stays a strip
      if (next.blockType === 'featureGrid' && old.style === 'strip') next.style = 'strip'
    }
    if (next.blockType === 'textImage' && !next.tone) next.tone = 'light'
    return next
  })

  // A photo appears once per page: the hero and the project cards keep theirs, and a text band
  // that would repeat one of them (or an earlier band) gets another photo
  const hero = done.find((block) => block.blockType === 'hero')
  const shown = new Set<number>([
    ...((hero?.images as number[] | undefined) ?? []),
    ...done.flatMap(ctx.coversOn),
  ])
  const chosenFor = Object.entries(recipe.photoFor ?? {})
  for (const block of done) {
    if (block.blockType !== 'textImage') continue
    const pick = chosenFor.find(([start]) => normalise(block.heading).startsWith(normalise(start)))
    const chosen = pick && ctx.img(pick[1])
    if (chosen) block.image = chosen
    if (!block.image) continue
    if (shown.has(block.image as number)) block.image = undefined
    else shown.add(block.image as number)
  }

  // Text bands without a photo get the recipe's photos, alternating sides
  const photos = (recipe.bandPhotos ?? [])
    .map(ctx.img)
    .filter((id): id is number => typeof id === 'number' && !shown.has(id))
  // The photos alternate sides down the page, the first on the right (a photo the recipe chose
  // for a section keeps the side chosen with it), so the result is the same on every database
  const chosenSide = new Set(done.filter((block, index) => layout[index].image))
  let lastSide = 'left'
  for (const block of done) {
    const isBand =
      block.blockType === 'textImage' &&
      !block.table &&
      ((block.points as unknown[]) ?? []).length > 0
    if (!isBand) continue
    if (!block.image) {
      const photo = photos.shift()
      if (!photo) continue
      block.image = photo
      block.imageShape = 'landscape'
    }
    if (!chosenSide.has(block)) block.imagePosition = lastSide === 'right' ? 'left' : 'right'
    lastSide = String(block.imagePosition ?? 'right')
  }

  return alternateBackgrounds(done)
}

/** Creates or updates the services listed in the homepage brief's service grid (Section 5), in that order. */
async function syncServices(
  payload: Payload,
  req: PayloadRequest | undefined,
  log: (message: string) => void,
  img: (key: string) => number | undefined,
) {
  const brief = parseBrief('home.md')
  const section = brief.sections.find((entry) => entry.name === 'Services')
  const ids: Record<string, number> = {}
  const existing = (
    await payload.find({
      collection: 'services',
      limit: 200,
      depth: 0,
      pagination: false,
      draft: true,
      req,
    })
  ).docs
  for (const doc of existing) ids[doc.key] = doc.id
  if (!section) return ids

  type Card = { title: string; priceLine?: string; summary?: string; slug?: string }
  const cards: Card[] = []
  for (const item of section.items) {
    if (item.kind === 'heading' && item.level === 3) cards.push({ title: item.text })
    const card = cards[cards.length - 1]
    if (!card) continue
    if (item.kind === 'price') card.priceLine = item.text
    if (item.kind === 'paragraph' && !card.summary) card.summary = item.text
    if (item.kind === 'button' && !card.slug) card.slug = item.href.replace(/^\//, '')
  }

  for (const [index, card] of cards.entries()) {
    const key = card.slug && SERVICE_KEYS[card.slug]
    if (!key || !card.summary) continue
    const data = {
      title: card.title,
      key,
      priority: index + 1,
      summary: card.summary,
      priceLine: card.priceLine,
      audience: AUDIENCE[key] ?? 'corporate',
      reviewStatus: 'needs-client-review' as const,
      ...published,
    }
    const image =
      existing.find((doc) => doc.key === key)?.image ??
      (SERVICE_IMAGES[key] ? img(SERVICE_IMAGES[key]) : undefined)
    if (ids[key]) {
      await payload.update({
        collection: 'services',
        id: ids[key],
        data: { ...data, image },
        draft: false,
        context: seedContext(),
        req,
      })
    } else {
      const created = await payload.create({
        collection: 'services',
        data: { ...data, image },
        draft: false,
        context: seedContext(),
        req,
      })
      ids[key] = created.id
      log(`added service ${card.title}`)
    }
  }
  return ids
}

/**
 * Header and footer as the Figma boards show them (home board 5:228, 26 Oct 2026): "Event Planning"
 * leads the header, the new emcee pages join the Emceeing menu, and the footer lists every service page.
 * Only runs once every page in it exists; menu items edited in the CMS since are replaced.
 */
async function updateMenus(
  payload: Payload,
  req: PayloadRequest | undefined,
  pageBySlug: Map<string, { id: number }>,
  log: (message: string) => void,
) {
  const footerSlugs = [
    ['corporate-team-building', 'Team Building'],
    ['event-planning', 'Event Planning'],
    ['corporate-emcee', 'Corporate Emcee'],
    ['conference-emcee', 'Conference Emcee'],
    ['roadshow-emcee', 'Roadshow & Exhibition Emcee'],
    ['government-community-emcee', 'Government & Community Emcee'],
    ['dinner-and-dance-emcee', 'Dinner & Dance Emcee'],
    ['dinner-and-dance-planning', 'Dinner & Dance Planning'],
    ['product-launch-events', 'Product Launch Events'],
    ['chinese-new-year-emcee', 'Chinese New Year Emcee'],
    ['corporate-workshops', 'Corporate Workshops'],
    ['communication-coaching', 'Communication Coaching'],
  ]
  const celebrations = [
    ['wedding-emcee', 'Wedding Emcee'],
    ['kids-youth-programs', 'Kids & Youth Programs'],
    ['school-family-emcee', 'School & Family Emcee'],
    ['creative-campaigns', 'Creative Campaigns'],
    ['event-support', 'Event Support'],
    ['emcee', 'All emcee services'],
    ['services', 'All services'],
  ]
  const studio = [
    ['our-work', 'Our Work'],
    ['rates', 'Rates'],
    ['about', 'About'],
    ['insights', 'Insights'],
    ['work-with-us', 'Work With Us'],
    ['contact', 'Contact'],
  ]
  const all = [...footerSlugs, ...celebrations, ...studio].map(([slug]) => slug)
  if (all.some((slug) => !pageBySlug.has(slug))) return

  const link = (slug: string, label: string) => ({
    label,
    type: 'page' as const,
    page: pageBySlug.get(slug)!.id,
  })
  const column = (title: string, entries: string[][]) => ({
    title,
    links: entries.map(([slug, label]) => ({ link: link(slug, label) })),
  })

  const footer = await payload.findGlobal({ slug: 'footer', depth: 0, req })
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      ...footer,
      columns: [
        column('Corporate', footerSlugs),
        column('Celebrations & more', celebrations),
        column('Studio', studio),
      ],
    },
    context: seedContext(),
    req,
  })

  const navigation = await payload.findGlobal({ slug: 'navigation', depth: 0, req })
  const menu = navigation.mainMenu ?? []
  const emceeing = menu.find((item) => item.link?.label === 'Emceeing')
  const newEmceePages = [
    ['conference-emcee', 'Conferences & seminars', 'Seminars, forums and town halls'],
    ['roadshow-emcee', 'Roadshows & exhibitions', 'Mall roadshows, trade shows and activations'],
    [
      'government-community-emcee',
      'Government & community',
      'Ministry, grassroots and charity events',
    ],
    ['school-family-emcee', 'Schools & families', 'Assemblies, parties and family days'],
    ['emcee', 'All emcee services', 'Find the right host for your date'],
  ]
  if (emceeing) {
    const children = emceeing.children ?? []
    for (const [slug, label, description] of newEmceePages) {
      const id = pageBySlug.get(slug)!.id
      if (!children.some((child) => child.link?.page === id))
        children.push({ link: link(slug, label), description })
    }
    emceeing.children = children
  }
  const eventPlanning = pageBySlug.get('event-planning')!.id
  if (!menu.some((item) => item.link?.page === eventPlanning)) {
    menu.unshift({ link: link('event-planning', 'Event Planning'), children: [] })
  }
  await payload.updateGlobal({
    slug: 'navigation',
    data: { mainMenu: menu },
    context: seedContext(),
    req,
  })
  log('updated the header menu and the footer')
}

/** Points each service at its landing page (when that page exists). */
async function linkServicesToPages(
  payload: Payload,
  req: PayloadRequest | undefined,
  services: Record<string, number>,
  pageBySlug: Map<string, { id: number }>,
) {
  for (const [slug, key] of Object.entries(SERVICE_KEYS)) {
    const page = pageBySlug.get(slug)
    if (!page || !services[key]) continue
    await payload.update({
      collection: 'services',
      id: services[key],
      data: { page: page.id, ...published },
      draft: false,
      context: seedContext(),
      req,
    })
  }
}
