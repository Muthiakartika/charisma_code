/**
 * Colour previews for the whole website (for the client to compare, not a visitor feature).
 *
 * Each colour has its own link: /colour-options/orange-yellow (or yellow, purple, light-orange). It opens the
 * homepage in that colour, and every page from then on uses it until the browser is closed or
 * /colour-options/current is opened (back to the current orange). /colour-options lists them all.
 * Behind the scenes the link adds ?palette=…; the colours themselves are in palettes.css and
 * PaletteScript applies them before the page is drawn.
 *
 * To remove the previews after the client has chosen: delete this folder, remove
 * <PaletteScript /> from src/app/(frontend)/[locale]/layout.tsx,
 * and delete src/app/(frontend)/[locale]/colour-options/.
 */

export const PALETTE_COOKIE = 'tcc_palette'

/** `colours` are only used to draw the cards on /colour-options. */
export const palettes = [
  {
    slug: 'orange-yellow',
    name: 'Orange + yellow',
    summary: 'Orange for buttons and colour blocks, yellow for the light: the marker behind highlighted words and the glow of the stage lights.',
    colours: { fill: '#f7741f', bright: '#ffc93c' },
  },
  {
    slug: 'yellow',
    name: 'Yellow',
    summary: 'Warm golden yellow, with a yellow marker behind the highlighted words.',
    colours: { fill: '#ffc93c', bright: '#ffd15c' },
  },
  {
    slug: 'purple',
    name: 'Purple',
    summary: 'A rich violet with ivory text on the buttons, and lavender on the dark stage and behind highlighted words.',
    colours: { fill: '#7442d9', bright: '#b794ff' },
  },
  {
    slug: 'light-orange',
    name: 'Light orange',
    summary: 'A softer, sunnier orange for buttons, highlights and colour blocks.',
    colours: { fill: '#ff9a3d', bright: '#ffa652' },
  },
] as const

export const originalPalette = {
  name: 'Current orange',
  summary: 'The website as it is today, for comparison.',
  colours: { fill: '#f7741f', bright: '#ff8a3d' },
} as const

export type PaletteSlug = (typeof palettes)[number]['slug']

export const isPaletteSlug = (value: string): value is PaletteSlug => palettes.some((palette) => palette.slug === value)

/** The address that turns a colour preview on (or back to the current orange). */
export const paletteHref = (slug: PaletteSlug | null, path = '/') => `${path}?palette=${slug ?? 'off'}`

/** The link to share for each colour, e.g. /colour-options/yellow. "current" returns to the orange. */
export const colourOptionPath = (slug: PaletteSlug | 'current') => `/colour-options/${slug}`
