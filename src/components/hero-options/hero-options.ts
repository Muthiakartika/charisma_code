/**
 * Homepage hero options (preview pages for the client, not part of the live navigation).
 *
 * /hero-options shows an overview; /hero-options/{slug} shows the whole homepage with that
 * hero. The content still comes from the CMS (Pages → "home" → Hero).
 *
 * The client chose option 3, Colour block: it is now a Hero layout of the website itself
 * (src/components/blocks/Hero.tsx) and the homepage uses it. The previous dark stage
 * homepage stays viewable at /hero-options/dark-stage, and the "Stage" layout can still be
 * chosen in the CMS.
 *
 * To remove the previews: delete this folder and src/app/(frontend)/[locale]/hero-options/.
 */

export const heroOptions = [
  {
    slug: 'daylight',
    name: 'Daylight',
    summary:
      'Today’s layout on ivory. The photos stay in spotlight circles, and a ring of colour traces around them as the page opens.',
  },
  {
    slug: 'spotlight-beam',
    name: 'Spotlight beam',
    summary:
      'A soft peach stage with a beam of light falling on the host, like a follow-spot finding its subject. The most theatrical option.',
  },
  {
    slug: 'colour-block',
    name: 'Colour block',
    summary:
      'A tall block of brand colour on the right, with the photos stepping out of it and a soft line drawing behind them. Now live on the homepage.',
  },
] as const

/** The homepage hero before the redesign, kept for reference */
export const previousHero = {
  slug: 'dark-stage',
  name: 'Previous: Dark stage',
  summary: 'The homepage before the redesign: a dark stage with the photos in spotlight circles.',
} as const

export type HeroOptionSlug = (typeof heroOptions)[number]['slug']
export type HeroPreviewSlug = HeroOptionSlug | typeof previousHero.slug

export const findHeroPreview = (slug: string) =>
  [...heroOptions, previousHero].find((option) => option.slug === slug)
