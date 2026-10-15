'use client'

import { X } from '@phosphor-icons/react'
import { useSyncExternalStore } from 'react'

import { PALETTE_COOKIE, palettes, type PaletteSlug } from './palettes'

/** Follows <html data-palette>, which PaletteScript sets before the page is drawn. */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette'] })
  return () => observer.disconnect()
}
const activePalette = () => document.documentElement.getAttribute('data-palette')

function choose(slug: PaletteSlug | null) {
  const root = document.documentElement
  if (slug) {
    root.setAttribute('data-palette', slug)
    document.cookie = `${PALETTE_COOKIE}=${slug}; path=/; SameSite=Lax`
  } else {
    root.removeAttribute('data-palette')
    document.cookie = `${PALETTE_COOKIE}=; path=/; max-age=0; SameSite=Lax`
  }
}

/**
 * A small floating switcher, shown only while a colour preview is on
 * (normal visitors never see it): change colour on any page, or leave the preview.
 */
export function PalettePreview() {
  const active = useSyncExternalStore(subscribe, activePalette, () => null)
  if (!active) return null

  return (
    <div
      role="region"
      aria-label="Colour preview"
      className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-3 z-50 md:bottom-5 md:right-5"
    >
      <div className="flex items-center gap-1 rounded-full bg-ink p-1.5 text-sm text-paper shadow-[0_14px_34px_-12px_rgba(30,35,34,0.55)] ring-1 ring-white/20">
        <span className="hidden pl-3 pr-1 font-semibold lg:inline">Colour preview</span>
        {palettes.map((palette) => (
          <button
            key={palette.slug}
            type="button"
            aria-pressed={active === palette.slug}
            onClick={() => choose(palette.slug)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-paper/80 transition-colors hover:text-paper aria-pressed:bg-paper aria-pressed:text-ink"
          >
            <span aria-hidden className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.colours.fill }} />
            {palette.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => choose(null)}
          aria-label="Leave the colour preview"
          title="Back to the current orange"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-paper/70 transition-colors hover:bg-white/10 hover:text-paper"
        >
          <X size={16} weight="bold" aria-hidden />
        </button>
      </div>
    </div>
  )
}
