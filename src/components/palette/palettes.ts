/**
 * Colour previews for the whole website (for the client to compare, not a visitor feature).
 *
 * Add ?palette=yellow (or purple, light-orange) to any address and every page from then on
 * uses that colour, until the browser is closed or ?palette=off is opened. The colours
 * themselves are in palettes.css; PaletteScript applies them before the page is drawn.
 *
 * To remove the previews after the client has chosen: delete this folder, remove
 * <PaletteScript /> and <PalettePreview /> from src/app/(frontend)/[locale]/layout.tsx,
 * and delete src/app/(frontend)/[locale]/colour-options/.
 */

export const PALETTE_COOKIE = 'tcc_palette'

/** `colours` are only used to draw the switcher dots and the overview cards. */
export const palettes = [
  {
    slug: 'yellow',
    name: 'Yellow',
    summary: 'Warm golden yellow. On light sections the highlighted words get a yellow marker.',
    colours: { fill: '#ffc93c', bright: '#ffd15c', tint: '#fff4d1' },
  },
  {
    slug: 'purple',
    name: 'Purple',
    summary: 'A rich violet with ivory text on the buttons, and lavender on the dark stage.',
    colours: { fill: '#7442d9', bright: '#b794ff', tint: '#f0eafc' },
  },
  {
    slug: 'light-orange',
    name: 'Light orange',
    summary: 'A softer, sunnier orange for buttons, highlights and colour blocks.',
    colours: { fill: '#ff9a3d', bright: '#ffa652', tint: '#ffeedd' },
  },
] as const

export const originalPalette = {
  name: 'Current orange',
  summary: 'The website as it is today, for comparison.',
  colours: { fill: '#f7741f', bright: '#ff8a3d', tint: '#fde6d2' },
} as const

export type PaletteSlug = (typeof palettes)[number]['slug']

export const isPaletteSlug = (value: string): value is PaletteSlug => palettes.some((palette) => palette.slug === value)

/** A link that opens a page in a colour (or back in the original orange). */
export const paletteHref = (slug: PaletteSlug | null, path = '/') => `${path}?palette=${slug ?? 'off'}`
