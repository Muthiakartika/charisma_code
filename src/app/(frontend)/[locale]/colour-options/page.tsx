/**
 * Colour previews: an overview with each colour's own link (/colour-options/yellow …), which opens
 * the whole website in that colour (preview for the client, not indexed). See src/components/palette/palettes.ts.
 */
import { ArrowRight } from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'

import { toLocale } from '@/components/layout/CmsPage'
import { colourOptionPath, originalPalette, palettes } from '@/components/palette/palettes'
import { CmsImage } from '@/components/ui/CmsImage'
import { getPage } from '@/lib/cms'
import { localizePath } from '@/lib/paths'
import type { HeroBlock, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Website colour options',
  robots: { index: false, follow: false },
}

type Colours = { fill: string; bright: string }

/** A small sketch of the homepage's first screen (the dark stage) in the option's colours. */
function Thumbnail({ colours, photo }: { colours: Colours; photo: Media | null }) {
  return (
    <span aria-hidden className="relative block h-48 overflow-hidden bg-ink">
      <span
        className="absolute -right-8 -top-10 h-56 w-56 rounded-full"
        style={{ backgroundImage: `radial-gradient(circle, ${colours.fill}66, transparent 65%)` }}
      />
      <span className="absolute right-6 top-6 block h-32 w-32 overflow-hidden rounded-full">
        <CmsImage media={photo} sizes="128px" className="object-cover" />
      </span>
      <span className="absolute bottom-6 left-6 grid gap-2">
        <span className="block h-2.5 w-28 rounded-full bg-paper/85" />
        <span className="block h-2.5 w-20 rounded-full" style={{ backgroundColor: colours.bright }} />
        <span className="mt-2 block h-4 w-16 rounded-full" style={{ backgroundColor: colours.fill }} />
      </span>
    </span>
  )
}

export default async function ColourOptionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale)
  const home = await getPage('home', locale)
  const hero = home?.layout?.find((block): block is HeroBlock => block.blockType === 'hero')
  const photo = hero?.images?.find((image): image is Media => typeof image === 'object' && image !== null) ?? null
  const cards = [
    ...palettes.map((palette) => ({ ...palette, href: localizePath(colourOptionPath(palette.slug), locale) })),
    { slug: 'current', ...originalPalette, href: localizePath(colourOptionPath('current'), locale) },
  ]

  return (
    <main id="main" data-theme="corporate" className="bg-surface">
      <section className="section-space">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">For review</p>
            <h1 className="heading-xl">
              The whole website in <em className="text-highlight">another colour</em>.
            </h1>
            <p className="lead mt-6 text-ink-soft">
              Each colour has its own link. Open one and click around: every page stays in that colour, from the homepage to
              weddings, workshops and articles. Open another colour&apos;s link to switch, or Current orange to go back.
            </p>
          </div>

          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <li key={card.slug}>
                {/* A full page load (not client navigation), so the colour is applied before the page is drawn */}
                <a
                  href={card.href}
                  className="lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper"
                >
                  <Thumbnail colours={card.colours} photo={photo} />
                  <span className="flex flex-1 flex-col p-6">
                    <span aria-hidden className="flex gap-1.5">
                      {[card.colours.fill, card.colours.bright].map((colour) => (
                        <span key={colour} className="h-5 w-5 rounded-full border border-ink/10" style={{ backgroundColor: colour }} />
                      ))}
                    </span>
                    <span className="heading-md mt-4 block">{card.name}</span>
                    <span className="mt-2 block flex-1 text-[0.95rem] text-ink-soft">{card.summary}</span>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent">
                      View the website
                      <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
