/**
 * Each colour's own link, e.g. /colour-options/yellow: opens the whole website in that colour
 * (/?palette=yellow). /colour-options/current goes back to the current orange.
 */
import { notFound, redirect } from 'next/navigation'

import { toLocale } from '@/components/layout/CmsPage'
import { isPaletteSlug, paletteHref } from '@/components/palette/palettes'
import { localizePath } from '@/lib/paths'

type Props = { params: Promise<{ locale: string; palette: string }> }

export default async function ColourOptionRedirect({ params }: Props) {
  const { locale, palette } = await params
  const home = localizePath('/', toLocale(locale))
  if (palette === 'current') redirect(paletteHref(null, home))
  if (!isPaletteSlug(palette)) notFound()
  redirect(paletteHref(palette, home))
}
