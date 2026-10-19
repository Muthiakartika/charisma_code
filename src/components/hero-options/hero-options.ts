/**
 * Light homepage hero options (preview pages for the client, not part of the live navigation).
 *
 * /hero-options shows an overview; /hero-options/{slug} shows the whole homepage with that
 * hero. The content still comes from the CMS (Pages → "home" → Hero), and every option also
 * works with the colour previews (?palette=yellow and so on).
 *
 * To remove the options after the client has chosen: delete this folder and
 * src/app/(frontend)/[locale]/hero-options/.
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
      'A tall block of brand colour on the right, with the photos stepping out of it and a soft line drawing behind them. The boldest option.',
  },
] as const

export type HeroOptionSlug = (typeof heroOptions)[number]['slug']

export const findHeroOption = (slug: string) => heroOptions.find((option) => option.slug === slug)
