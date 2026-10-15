/**
 * Homepage colour options: an overview with a link to each option (preview for the client, not indexed).
 */
import { ArrowRight } from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'

import { colourOptions } from '@/components/colour-options/HomeColourOption'
import { toLocale } from '@/components/layout/CmsPage'
import { CmsImage } from '@/components/ui/CmsImage'
import { getPage } from '@/lib/cms'
import { localizePath } from '@/lib/paths'
import type { HeroBlock, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Homepage colour options',
  robots: { index: false, follow: false },
}

type Colours = (typeof colourOptions)[number]['colours']

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

  return (
    <main id="main" data-theme="corporate" className="bg-surface">
      <section className="section-space">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">For review</p>
            <h1 className="heading-xl">
              The homepage in <em className="text-highlight">three colours</em>.
            </h1>
            <p className="lead mt-6 text-ink-soft">
              Same design, same content. Only the accent colour changes: buttons, highlighted words, the stage light and the
              coloured sections. The current orange is included for comparison.
            </p>
          </div>

          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {colourOptions.map((option) => (
              <li key={option.slug}>
                <Link
                  href={localizePath(`/colour-options/${option.slug}`, locale)}
                  className="lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper"
                >
                  <Thumbnail colours={option.colours} photo={photo} />
                  <span className="flex flex-1 flex-col p-6">
                    <span aria-hidden className="flex gap-1.5">
                      {[option.colours.fill, option.colours.bright, option.colours.tint].map((colour) => (
                        <span key={colour} className="h-5 w-5 rounded-full border border-ink/10" style={{ backgroundColor: colour }} />
                      ))}
                    </span>
                    <span className="heading-md mt-4 block">{option.name}</span>
                    <span className="mt-2 block flex-1 text-[0.95rem] text-ink-soft">{option.summary}</span>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent">
                      View homepage
                      <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
