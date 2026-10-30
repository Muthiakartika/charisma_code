/**
 * One recipe per page in the developer handoff (docs/handoff/README.md §4): which brief it
 * reads, the page's title in the CMS, its photos, and the few sections whose presentation is
 * chosen by hand. Everything else is mapped automatically by to-blocks.ts.
 */
import type { SeedImageKey } from '../media'
import type { BriefItem } from './parse-brief'
import type { Block, Helpers, SectionPlan } from './to-blocks'

export type RecipeContext = {
  /** Media id of a seeded photo (src/seed/media.ts) or a downloaded Instagram photo. */
  img: (key: SeedImageKey | string) => number | undefined
  /** Service id by tracking key (e.g. "team-building"). */
  service: (key: string) => number | undefined
}

export type PageRecipe = {
  slug: string
  file: string
  /** Title in the CMS and in breadcrumbs (README §4 "Page" column). */
  title: string
  theme?: 'corporate' | 'wedding' | 'kids'
  phase: 1 | 2 | 3 | 4 | 5
  /** The service this page sells: pre-selected in its enquiry form and used for its Service structured data. */
  serviceKey?: string
  /**
   * A service of its own for this page's Service structured data (summary = the page's meta description),
   * kept out of the enquiry form's service list. Used by the emcee pages for each occasion.
   */
  ownService?: { key: string; title: string }
  /** Hero photos (the first is the largest). Without them the page keeps its current hero photos. */
  heroImages?: string[]
  heroVariant?: 'split' | 'stage' | 'colourBlock' | 'photo' | 'simple'
  /**
   * Photos for the text bands (sections with a heading, text and ticks), given out in order and
   * alternating sides, as on the Figma boards. Bands left over stay text-only.
   */
  bandPhotos?: string[]
  /** A chosen photo for a text band, by the start of its heading: { 'Onboarding': 'photo key' } */
  photoFor?: Record<string, string>
  /** Words to highlight in a heading: { 'Full heading text': 'words' } */
  highlight?: Record<string, string>
  /** Per section (by number, "number.chunk" for a second H2 in the same section, or name for unnumbered ones). */
  sections?: (ctx: RecipeContext) => Record<string | number, SectionPlan>
  /** Only build these section numbers (used while a page is still partly built). */
  onlySections?: number[]
  /** Extra briefs that add sections to this page: { file, after: { additionNumber: 'section name' } } */
  additions?: { file: string; after: Record<number, string> }[]
  /** Only build the sections whose name matches (e.g. one "Part" of a brief that holds two pages). */
  onlySectionNames?: RegExp
  /**
   * Saved as an unpublished draft: the brief is a template filled with sample people, dates or prices
   * (README §6). Editors see it in the CMS and its preview; visitors get "page not found" until it is published.
   */
  draft?: boolean
}

const ticksOf = (items: BriefItem[]) =>
  items
    .filter((item) => item.kind === 'tick' || item.kind === 'bullet')
    .map((item) => ({ text: (item as { text: string }).text }))

const buttonsOf = (items: BriefItem[], helpers: Helpers) =>
  items
    .filter((item): item is Extract<BriefItem, { kind: 'button' }> => item.kind === 'button')
    .map((item) => helpers.link(item.label, item.href))

/** A "Founder" or "Why De Zhong" section as the founder band: photo, story, credentials, quote and button. */
const founderBand =
  (portrait: number | undefined, mood: 'stage' | 'warm' = 'stage'): SectionPlan['replace'] =>
  (chunk, helpers) => {
    const quote = chunk.items.find(
      (item): item is Extract<BriefItem, { kind: 'quote' }> => item.kind === 'quote',
    )
    return [
      {
        blockType: 'founderIntro',
        heading: helpers.headingOf(chunk, 2),
        body: helpers.paragraphs(chunk.items).join('\n\n'),
        portrait,
        quote: quote?.text,
        credentials: ticksOf(chunk.items).slice(0, 6),
        button: buttonsOf(chunk.items, helpers)[0],
        mood,
      } satisfies Block,
    ]
  }

/** The twelve services in the briefs' order, each card with its price (Services collection). */
const SERVICE_ORDER = [
  'team-building',
  'corporate-emcee',
  'dinner-and-dance',
  'event-planning',
  'dinner-and-dance-planning',
  'product-launch-events',
  'corporate-workshops',
  'communication-coaching',
  'wedding-emcee',
  'kids-youth',
  'creative-campaigns',
  'event-support',
]

const serviceGrid =
  (
    service: RecipeContext['service'],
    layout: 'priority' | 'grid' | 'cards',
  ): SectionPlan['replace'] =>
  (chunk, helpers) => {
    const grouped = helpers.group(
      chunk.items,
      (item) => item.kind === 'heading' && item.level === 3,
    )
    return [
      {
        blockType: 'serviceCards',
        heading: helpers.headingOf(chunk, 2),
        intro: grouped.intro.join(' '),
        layout,
        services: SERVICE_ORDER.map(service).filter(Boolean),
        footnote: grouped.footnote.join(' '),
        buttons: grouped.buttons,
      },
    ]
  }

/** The hosting reel (De Zhong's emcee showreel), placed where a page's "Watch the hosting reel" button lands. */
const hostingReel: Block = {
  blockType: 'video',
  anchorId: 'reel',
  heading: 'Hosting reel',
  youtubeUrl: 'https://youtu.be/Wo9XVBQohEg',
  tone: 'dark',
}

/**
 * About, section 03 on the Figma board (30 Oct 2026): De Zhong's credentials, each organisation
 * linked to its website. Shown as a credentials grid: the first one large beside the heading.
 * The two finalist years (2015, 2018) are dummy content on the board, so they are left out until
 * the client confirms them.
 */
const credentials: Block = {
  blockType: 'featureGrid',
  anchorId: 'credentials',
  heading: 'Credentials and recognition',
  style: 'credentials',
  items: [
    {
      badge: 'Hosting',
      title: 'Hosted at the inaugural Singapore Youth Olympic Games, 2010',
      text: '[Singapore Youth Olympic Games](https://en.wikipedia.org/wiki/2010_Summer_Youth_Olympics)',
    },
    {
      badge: 'Education',
      title: 'Corporate Communications graduate, Singapore Management University',
      text: '[Singapore Management University](https://www.smu.edu.sg)',
    },
    {
      badge: 'Training',
      title: 'Trainer with Zenitant, Edublitz and Aktivate',
      text: '[Zenitant](https://www.zenitanteducation.com) [Edublitz](https://www.edublitz.com/sg/) [Aktivate](https://www.aktivate.sg)',
    },
    {
      badge: 'Theatre',
      title: 'Performed at the Esplanade Theatre Studio and the Drama Centre Theatre',
      text: '[Esplanade Theatre Studio](https://www.esplanade.com/visit/venues-and-spaces/venues/theatre-studio) [Drama Centre Theatre](https://www.nlb.gov.sg/main/visit-us/drama-centre)',
    },
    {
      badge: 'Music',
      title: 'ABRSM Grade 8 Piano, with Merit',
      text: '[ABRSM](https://www.abrsm.org)',
    },
    {
      badge: 'Busking',
      title: 'Busker endorsed by the National Arts Council, to November 2028',
      text: '[National Arts Council](https://eservices.nac.gov.sg/Busking/busker/profile/175a3ecb-a79f-4962-b04b-e94bcc808eda)',
    },
    {
      badge: 'Competition',
      title: "Finalist, SAFRA's The Ultimate Talent",
      text: "[SAFRA's The Ultimate Talent](https://www.safra.sg)",
    },
    {
      badge: 'Competition',
      title: "Finalist, UFM100.3's The Wedding Singer",
      text: '[UFM100.3](https://audio.sph.com.sg/ufm1003/)',
    },
    {
      badge: 'Recognition',
      title:
        'Invited to the COMPASS Awards Presentation for several consecutive years, including the 28th in 2025',
      text: '[COMPASS Awards Presentation](https://www.compass.org.sg)',
    },
  ],
}

export const recipes: PageRecipe[] = [
  // ── Phase 1 ────────────────────────────────────────────────────────────────
  {
    slug: 'home',
    file: 'home.md',
    title: 'Home',
    phase: 1,
    heroVariant: 'colourBlock',
    highlight: { 'A Singapore event company that gets the whole room involved.': 'the whole room' },
    sections: ({ img, service }) => ({
      // "What is The Charisma Code?" stays the H2; the brand line is shown large under it.
      3: {
        replace: (chunk, helpers) => {
          const [tagline, ...body] = helpers.paragraphs(chunk.items)
          return [
            {
              blockType: 'statement',
              heading: helpers.headingOf(chunk, 2),
              tagline: tagline.replace('a code', 'a *code*'),
              body: body.join('\n\n'),
              roles: ticksOf(chunk.items),
              button: buttonsOf(chunk.items, helpers)[0],
            },
          ]
        },
      },
      4: { image: img('largeGroupCarnival'), imagePosition: 'left' },
      // The twelve service cards, in the brief's order, each with its price (Services collection)
      5: { replace: serviceGrid(service, 'cards') },
      9: { replace: founderBand(img('eveningPartyCrowd')) },
      13: {
        replace: (chunk, helpers) => [
          {
            blockType: 'cta',
            anchorId: 'join-our-database',
            heading: helpers.headingOf(chunk, 2),
            text: helpers.paragraphs(chunk.items).join(' '),
            primaryButton: buttonsOf(chunk.items, helpers)[0],
            showContactDetails: false,
            // A quieter card with a crew photo, so it does not repeat the orange closing band below it
            style: 'card',
            image: img('somaGroup'),
          },
        ],
      },
    }),
  },

  // ── Phase 2: service pages that already existed ───────────────────────────
  {
    slug: 'corporate-team-building',
    // The ballroom photo, the Banyan and the CWA photos are the project cards' covers on this page
    heroImages: ['communityEventCrowd', 'ig-Cp9pHxrBonZ-game-booth.jpg'],
    photoFor: {
      'Clearer communication': 'ig-Cp9pHxrBonZ-seminar-stage.jpg',
      Onboarding: 'ig-Cp9pHxrBonZ-game-booth-2.jpg',
    },
    bandPhotos: [
      'communityEventCrowd',
      'corporateChristmasBallroom',
      'festiveTeamSelfie',
      'banyanDnd',
      'cwaEvent',
      'eveningPartyCrowd',
      'largeGroupCarnival',
      'somaGroup',
      'compassAwards',
    ],
    file: 'corporate-team-building.md',
    title: 'Corporate Team Building',
    phase: 2,
    serviceKey: 'team-building',
  },
  {
    slug: 'corporate-emcee',
    heroImages: ['founderHeadshot', 'ig-Cp9pHxrBonZ-podium.jpg'],
    bandPhotos: [
      'compassAwards',
      'ig-Cp9pHxrBonZ.jpg',
      'corporateChristmasBallroom',
      'eveningPartyCrowd',
    ],
    file: 'corporate-emcee.md',
    title: 'Corporate Emcee',
    phase: 2,
    serviceKey: 'corporate-emcee',
    // "Two case-study cards …, then the hosting reel" (layout instructions)
    sections: () => ({ 6: { after: [hostingReel] } }),
  },
  {
    slug: 'dinner-and-dance-emcee',
    bandPhotos: ['banyanDnd', 'ig-DejQffWzh7R-stage.jpg', 'eveningPartyCrowd', 'festiveTeamSelfie'],
    file: 'dinner-and-dance-emcee.md',
    title: 'Dinner & Dance Emcee',
    phase: 2,
    serviceKey: 'dinner-and-dance',
  },
  {
    slug: 'chinese-new-year-emcee',
    bandPhotos: [
      'tvStudio',
      'eveningPartyCrowd',
      'corporateChristmasBallroom',
      'communityEventCrowd',
      'ig-Cp9pHxrBonZ.jpg',
    ],
    file: 'chinese-new-year-emcee.md',
    title: 'Chinese New Year Emcee',
    phase: 2,
    sections: () => ({ 10: { after: [hostingReel] } }),
  },
  {
    slug: 'wedding-emcee',
    bandPhotos: [
      'weddingStage',
      'weddingSinging',
      'weddingSelfie',
      'weddingSheraton',
      'weddingTuxedo',
    ],
    file: 'wedding-emcee.md',
    title: 'Wedding Emcee',
    theme: 'wedding',
    phase: 2,
    serviceKey: 'wedding-emcee',
    sections: () => ({
      // "Reuse the existing video band"
      5: { video: 'https://youtu.be/ANC2fV9moMw', tone: 'tinted' },
      // "…then the existing enquiry form"
      14: { after: [{ blockType: 'enquiryForm', anchorId: 'quote', heading: '' }] },
    }),
  },
  {
    slug: 'corporate-workshops',
    bandPhotos: ['largeGroupCarnival', 'cwaEvent', 'communityEventCrowd', 'compassAwards'],
    file: 'corporate-workshops.md',
    title: 'Corporate Workshops',
    phase: 2,
    serviceKey: 'corporate-workshops',
  },
  {
    slug: 'communication-coaching',
    heroImages: ['founderHeadshot', 'mediacorpInterview'],
    photoFor: { 'Confidence for nervous speakers': 'ig-Cp9pHxrBonZ-large-audience.jpg' },
    bandPhotos: [
      'founderWhiteShirt',
      'tvStudio',
      'mediacorpInterview',
      'ig-Cp9pHxrBonZ.jpg',
      'founderBowTie',
      'compassAwards',
    ],
    file: 'communication-coaching.md',
    title: 'Communication Coaching',
    phase: 2,
    serviceKey: 'communication-coaching',
    // Sample reviews, hidden until real ones arrive (the sample third course card is not added)
    additions: [
      { file: 'future-communication-coaching-additions.md', after: { 2: 'Why De Zhong' } },
    ],
  },
  {
    slug: 'kids-youth-programs',
    // The Maris Stella photo belongs to the case study further down
    heroImages: ['kidsPartyHosting', 'ig-Cp9pHxrBonZ-family-day.jpg'],
    bandPhotos: [
      'kidsPartyHosting',
      'marisStellaClass',
      'princessParty',
      'costumeGroup',
      'costumePerformers',
    ],
    file: 'kids-youth-programs.md',
    title: 'Kids & Youth Programs',
    theme: 'kids',
    phase: 2,
    serviceKey: 'kids-youth',
    // Sample parent and teacher reviews, hidden until real ones arrive (sample camp dates are not added)
    additions: [{ file: 'future-kids-youth-programs-additions.md', after: { 1: 'Case study' } }],
  },
  {
    slug: 'creative-campaigns',
    heroImages: ['somaGroup', 'somaProducts'],
    photoFor: {
      'Strategy before production': 'ig-Cp9pHxrBonZ-store-event.jpg',
      'Short-form content creation': 'ig-Cp9pHxrBonZ-live-selling.jpg',
    },
    bandPhotos: ['somaLaughing', 'somaGroup', 'somaGuests', 'somaProducts', 'tvStudio'],
    file: 'creative-campaigns.md',
    title: 'Creative Campaigns',
    phase: 2,
    serviceKey: 'creative-campaigns',
  },
  {
    slug: 'event-support',
    heroImages: ['costumeGroup', 'weddingStage'],
    photoFor: {
      'Highlight videos': 'ig-Cp9pHxrBonZ-wedding-banquet.jpg',
      'Why one point of contact': 'ig-DejQffWzh7R-gala-stage.jpg',
    },
    bandPhotos: [
      'costumePerformers',
      'corporateChristmasBallroom',
      'weddingStage',
      'banyanDnd',
      'costumeGroup',
      'somaGroup',
    ],
    file: 'event-support.md',
    title: 'Event Support',
    phase: 2,
    serviceKey: 'event-support',
  },

  // ── Phase 3: new pages ─────────────────────────────────────────────────────
  {
    slug: 'emcee',
    bandPhotos: ['tvStudio'],
    file: 'emcee.md',
    title: 'Emcee',
    phase: 3,
    serviceKey: 'corporate-emcee',
    ownService: { key: 'emcee', title: 'Emcee Services' },
    heroImages: ['ig-Cp9pHxrBonZ.jpg', 'eveningPartyCrowd', 'weddingSinging'],
    sections: () => ({ 'Hosting reel': { video: 'https://youtu.be/Wo9XVBQohEg' } }),
  },
  {
    slug: 'conference-emcee',
    bandPhotos: [
      'compassAwards',
      'tvStudio',
      'corporateChristmasBallroom',
      'eveningPartyCrowd',
      'mediacorpInterview',
    ],
    file: 'conference-emcee.md',
    title: 'Conference & Seminar Emcee',
    phase: 3,
    serviceKey: 'corporate-emcee',
    ownService: { key: 'conference-emcee', title: 'Conference Emcee' },
    heroImages: ['ig-Cp9pHxrBonZ.jpg', 'compassAwards'],
  },
  {
    slug: 'roadshow-emcee',
    bandPhotos: [
      'somaProducts',
      'somaGroup',
      'communityEventCrowd',
      'marisStellaClass',
      'festiveTeamSelfie',
    ],
    file: 'roadshow-emcee.md',
    title: 'Roadshow & Exhibition Emcee',
    phase: 3,
    serviceKey: 'corporate-emcee',
    ownService: { key: 'roadshow-emcee', title: 'Roadshow & Exhibition Emcee' },
    // A mall atrium stage from his Instagram, until the client sends a roadshow photo (README §6)
    heroImages: ['ig-Ddq-VlETFpi-mall-stage.jpg', 'somaGuests'],
  },
  {
    slug: 'government-community-emcee',
    bandPhotos: [
      'communityEventCrowd',
      'compassAwards',
      'largeGroupCarnival',
      'eveningPartyCrowd',
      'cwaEvent',
    ],
    file: 'government-community-emcee.md',
    title: 'Government & Community Emcee',
    phase: 3,
    serviceKey: 'corporate-emcee',
    ownService: { key: 'government-community-emcee', title: 'Government & Community Emcee' },
    heroImages: ['cwaEvent', 'communityEventCrowd'],
  },
  {
    slug: 'school-family-emcee',
    bandPhotos: [
      'marisStellaClass',
      'costumeGroup',
      'kidsPartyHosting',
      'princessParty',
      'communityEventCrowd',
      'largeGroupCarnival',
    ],
    file: 'school-family-emcee.md',
    title: 'School, Kids & Family Emcee',
    theme: 'kids',
    phase: 3,
    serviceKey: 'kids-youth',
    ownService: { key: 'school-family-emcee', title: 'School, Kids & Family Emcee' },
    heroImages: ['kidsPartyHosting', 'princessParty', 'communityEventCrowd'],
  },
  {
    slug: 'dinner-and-dance-planning',
    bandPhotos: ['eveningPartyCrowd', 'festiveTeamSelfie'],
    file: 'dinner-and-dance-planning.md',
    title: 'Dinner & Dance Planning',
    phase: 3,
    serviceKey: 'dinner-and-dance-planning',
    heroImages: ['banyanDnd', 'ig-DejQffWzh7R-stage.jpg'],
    // The Banyan Group highlights reel (same video as on the D&D emcee page)
    sections: () => ({ Highlights: { video: 'https://youtu.be/uIiigFk9yzY' } }),
  },
  {
    slug: 'event-planning',
    bandPhotos: [
      'communityEventCrowd',
      'corporateChristmasBallroom',
      'festiveTeamSelfie',
      'costumePerformers',
    ],
    file: 'event-planning.md',
    title: 'Event Planning',
    phase: 3,
    serviceKey: 'event-planning',
    heroImages: ['ig-DejQffWzh7R-gala-stage.jpg', 'communityEventCrowd', 'festiveTeamSelfie'],
  },
  {
    slug: 'product-launch-events',
    bandPhotos: ['somaGuests', 'somaLaughing'],
    file: 'product-launch-events.md',
    title: 'Product Launch Events',
    phase: 3,
    serviceKey: 'product-launch-events',
    heroImages: ['somaProducts', 'somaGroup', 'somaLaughing'],
  },
  {
    slug: 'rates',
    file: 'rates.md',
    title: 'Rates',
    phase: 3,
    heroImages: ['ig-Cp9pHxrBonZ.jpg', 'weddingSinging', 'corporateChristmasBallroom'],
  },

  // ── Phase 4: services, our work, about, contact ────────────────────────────
  {
    slug: 'services',
    heroImages: ['largeGroupCarnival', 'weddingSinging', 'ig-Ddq-VlETFpi-community-crowd.jpg'],
    file: 'services.md',
    title: 'Services',
    phase: 4,
    sections: ({ service }) => ({ 2: { replace: serviceGrid(service, 'grid') } }),
  },
  {
    slug: 'our-work',
    // Not the project covers: the archive below shows those
    heroImages: [
      'ig-DejQffWzh7R-gala-stage.jpg',
      'ig-Cp9pHxrBonZ-wedding-banquet.jpg',
      'ig-Ddq-VlETFpi-mall-stage.jpg',
    ],
    file: 'our-work.md',
    title: 'Our Work',
    phase: 4,
    sections: () => ({
      // All seven case studies, with the category filters the page already had
      2: {
        replace: (chunk, helpers) => [
          { blockType: 'projectArchive', heading: helpers.headingOf(chunk, 2), showFilters: true },
        ],
      },
    }),
  },
  {
    slug: 'about',
    bandPhotos: ['founderWhiteShirt', 'founderBowTie', 'eveningPartyCrowd'],
    file: 'about.md',
    title: 'About',
    phase: 4,
    additions: [
      { file: 'future-about-additions.md', after: { 1: 'Founder', 2: 'Reel', 3: 'Acting reel' } },
    ],
    sections: ({ img }) => ({
      // The portrait stays the one already chosen in the CMS
      Founder: {
        // His CVs to download, in his founder profile (De Zhong's request, Oct 2026)
        replace: async (chunk, helpers) =>
          (await founderBand(undefined, 'warm')!(chunk, helpers)).map((block) => ({
            ...block,
            downloadsHeading: "Download De Zhong's CV",
            downloads: [
              { label: 'Emcee CV', file: img('chia-de-zhong-emcee-cv-2026.pdf') },
              { label: 'Acting CV', file: img('chia-de-zhong-acting-cv-2026.pdf') },
            ],
          })),
        after: [credentials],
      },
      // His roles, billed like the names outside a theatre; the languages close the bill
      'Many stages': {
        replace: (chunk, helpers) => {
          const ticks = ticksOf(chunk.items)
          const languages = ticks.find((tick) => /English and Mandarin/.test(tick.text))
          return [
            {
              blockType: 'statement',
              heading: helpers.headingOf(chunk, 2),
              body: helpers.paragraphs(chunk.items).join('\n\n'),
              roles: ticks.filter((tick) => tick !== languages).slice(0, 6),
              languages: languages?.text,
            },
          ]
        },
      },
      Reel: { video: 'https://youtu.be/Wo9XVBQohEg', patch: { anchorId: 'reel' } },
    }),
  },
  {
    slug: 'contact',
    file: 'contact.md',
    title: 'Contact',
    phase: 4,
    heroImages: ['founderBowTie', 'ig-Cp9pHxrBonZ.jpg'],
  },

  // ── Phase 5: future pages (README §4, last rows). Drafts until the client confirms the content ──
  { slug: 'videos', file: 'future-videos.md', title: 'Videos', phase: 5, draft: true },
  { slug: 'press', file: 'future-press.md', title: 'In the Press', phase: 5, draft: true },
  {
    slug: 'insights-lo-hei-phrases',
    file: 'future-insights-lo-hei-phrases.md',
    title: 'Lo Hei Phrases',
    phase: 5,
    draft: true,
  },
  {
    slug: 'insights-resources',
    file: 'future-insights-resources.md',
    title: 'Free Event Planning Guides',
    phase: 5,
    draft: true,
  },
  {
    slug: 'events-public-speaking-teens-dec-2026',
    file: 'future-events-public-sessions.md',
    title: 'Public Speaking for Teens',
    theme: 'kids',
    phase: 5,
    draft: true,
    onlySectionNames: /^Part 1/,
  },
  {
    slug: 'events-holiday-camp-dec-2026',
    file: 'future-events-public-sessions.md',
    title: 'School-Holiday Confidence Camp',
    theme: 'kids',
    phase: 5,
    draft: true,
    onlySectionNames: /^Part 2/,
  },
  {
    slug: 'crew-daniel-tan',
    file: 'future-about-crew-profile.md',
    title: 'Crew Profile (sample)',
    phase: 5,
    draft: true,
  },
  {
    slug: 'jobs-event-facilitator',
    file: 'future-work-with-us-job.md',
    title: 'Event Facilitator (sample role)',
    phase: 5,
    draft: true,
  },
]
