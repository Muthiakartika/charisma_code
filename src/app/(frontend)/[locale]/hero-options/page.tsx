/**
 * Light hero options: an overview with a link to the homepage in each option
 * (preview for the client, not indexed). See src/components/hero-options/hero-options.ts.
 */
import { ArrowRight } from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'

import { heroOptions, previousHero, type HeroPreviewSlug } from '@/components/hero-options/hero-options'
import { toLocale } from '@/components/layout/CmsPage'
import { originalPalette, paletteHref, palettes } from '@/components/palette/palettes'
import { CmsImage } from '@/components/ui/CmsImage'
import { getPage } from '@/lib/cms'
import { localizePath } from '@/lib/paths'
import type { HeroBlock, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Homepage hero options',
  robots: { index: false, follow: false },
}

/** Text lines and a button, as drawn in every sketch */
function SketchText({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="absolute bottom-6 left-6 grid gap-2">
      <span className={`block h-2.5 w-28 rounded-full ${onDark ? 'bg-paper/85' : 'bg-ink/85'}`} />
      <span className="block h-2.5 w-20 rounded-full bg-highlight" />
      <span className="mt-2 block h-4 w-16 rounded-full bg-action" />
    </span>
  )
}

/** A small sketch of the homepage's first screen in each option, using the real photo. */
function Sketch({ option, photo }: { option: HeroPreviewSlug; photo: Media | null }) {
  const image = <CmsImage media={photo} sizes="128px" className="object-cover" />

  if (option === 'daylight') {
    return (
      <span aria-hidden className="relative block h-48 overflow-hidden bg-paper">
        <span className="absolute -right-10 -top-12 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--color-peach),transparent_68%)]" />
        <span className="absolute right-4 top-4 block h-36 w-36 rounded-full border-2 border-action" />
        <span className="absolute right-6 top-6 block h-32 w-32 overflow-hidden rounded-full">{image}</span>
        <SketchText />
      </span>
    )
  }
  if (option === 'spotlight-beam') {
    return (
      <span aria-hidden className="relative block h-48 overflow-hidden bg-surface-alt">
        <span className="absolute -top-6 bottom-2 right-0 w-44 bg-[conic-gradient(from_158deg_at_50%_0%,transparent_0deg,var(--color-field-bg)_7deg,var(--color-field-bg)_37deg,transparent_44deg)] [mask-image:linear-gradient(to_bottom,transparent,black_60%)]" />
        <span className="absolute bottom-5 right-10 block h-36 w-24 overflow-hidden rounded-t-full rounded-b-md">{image}</span>
        <SketchText />
      </span>
    )
  }
  if (option === 'colour-block') {
    return (
      <span aria-hidden className="relative block h-48 overflow-hidden bg-paper">
        <span className="absolute inset-y-0 right-0 w-[34%] bg-action" />
        <span className="absolute right-10 top-6 block h-32 w-32 overflow-hidden rounded-full">{image}</span>
        <SketchText />
      </span>
    )
  }
  return (
    <span aria-hidden className="tone-dark relative block h-48 overflow-hidden">
      <span className="absolute -right-8 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-flame)_40%,transparent),transparent_65%)]" />
      <span className="absolute right-6 top-6 block h-32 w-32 overflow-hidden rounded-full">{image}</span>
      <SketchText onDark />
    </span>
  )
}

export default async function HeroOptionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale)
  const home = await getPage('home', locale)
  const hero = home?.layout?.find((block): block is HeroBlock => block.blockType === 'hero')
  const photo = hero?.images?.find((image): image is Media => typeof image === 'object' && image !== null) ?? null
  const overviewPath = localizePath('/hero-options', locale)
  const cards = [
    ...heroOptions.map((option, index) => ({
      slug: option.slug,
      name: `${index + 1}. ${option.name}`,
      summary: option.summary,
      href: localizePath(`/hero-options/${option.slug}`, locale),
    })),
    {
      slug: previousHero.slug,
      name: previousHero.name,
      summary: previousHero.summary,
      href: localizePath(`/hero-options/${previousHero.slug}`, locale),
    },
  ]
  const colours = [
    ...palettes.map((palette) => ({ name: palette.name, fill: palette.colours.fill, href: paletteHref(palette.slug, overviewPath) })),
    { name: originalPalette.name, fill: originalPalette.colours.fill, href: paletteHref(null, overviewPath) },
  ]

  return (
    <main id="main" data-theme="corporate" className="bg-surface">
      <section className="section-space">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">For review</p>
            <h1 className="heading-xl">
              A <em className="text-highlight">lighter</em> first screen.
            </h1>
            <p className="lead mt-6 text-ink-soft">
              Three light versions of the homepage hero, with the same headline, photos and buttons. Option 3 is now live on
              the homepage, and the previous dark stage is kept here for reference. Each one opens the full homepage.
            </p>
          </div>

          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <li key={card.slug}>
                <Link
                  href={card.href}
                  className="lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper"
                >
                  <Sketch option={card.slug} photo={photo} />
                  <span className="flex flex-1 flex-col p-6">
                    <span className="heading-md block">{card.name}</span>
                    <span className="mt-2 block flex-1 text-[0.95rem] text-ink-soft">{card.summary}</span>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent">
                      View the homepage
                      <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-8 text-[0.95rem]">
            <span className="font-semibold">See every option in another colour:</span>
            <ul className="flex flex-wrap gap-2">
              {colours.map((colour) => (
                <li key={colour.name}>
                  {/* A full page load, so the colour is applied before the page is drawn */}
                  <a
                    href={colour.href}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    <span aria-hidden className="h-3 w-3 rounded-full" style={{ backgroundColor: colour.fill }} />
                    {colour.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
