/**
 * Homepage design options: an overview with a link to each option (preview for the client, not indexed).
 */
import { ArrowRight } from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'

import { homeOptions, type HomeOptionSlug } from '@/components/design-options/HomeOption'
import { toLocale } from '@/components/layout/CmsPage'
import { CmsImage } from '@/components/ui/CmsImage'
import { getPage } from '@/lib/cms'
import { localizePath } from '@/lib/paths'
import type { HeroBlock, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Homepage design options',
  robots: { index: false, follow: false },
}

/** Placeholder lines for the headline and a button, drawn in the option's colours. */
function Lines({ text, accent }: { text: string; accent: string }) {
  return (
    <span className="absolute bottom-6 left-6 grid gap-2">
      <span className={`block h-2.5 w-28 rounded-full ${text}`} />
      <span className={`block h-2.5 w-20 rounded-full ${accent}`} />
      <span className="mt-2 block h-4 w-16 rounded-full bg-flame" />
    </span>
  )
}

/** A small sketch of each option's first screen, using the real homepage photo. */
function Thumbnail({ option, photo }: { option: HomeOptionSlug; photo: Media | null }) {
  const image = <CmsImage media={photo} sizes="200px" className="object-cover" />
  if (option === 'stage') {
    return (
      <span aria-hidden className="relative block h-48 overflow-hidden bg-ink">
        <span className="absolute -right-6 -top-6 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(247,116,31,0.35),transparent_65%)]" />
        <span className="absolute right-6 top-6 block h-32 w-32 overflow-hidden rounded-full">{image}</span>
        <Lines text="bg-paper/85" accent="bg-flame" />
      </span>
    )
  }
  if (option === 'colour') {
    return (
      <span aria-hidden className="relative block h-48 overflow-hidden bg-peach">
        <span className="absolute -right-5 -top-8 h-36 w-36 rounded-full bg-flame" />
        <span className="absolute right-8 top-7 block h-32 w-28 overflow-hidden rounded-md">{image}</span>
        <Lines text="bg-ink" accent="bg-flame-text" />
      </span>
    )
  }
  return (
    <span aria-hidden className="relative block h-48 overflow-hidden bg-ink">
      {image}
      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 h-5 bg-flame" />
      <span className="absolute bottom-10 left-6 grid gap-2">
        <span className="block h-3 w-36 rounded-full bg-paper/90" />
        <span className="block h-3 w-24 rounded-full bg-spark-bright" />
      </span>
    </span>
  )
}

export default async function DesignOptionsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              Three directions for the <em className="text-highlight">homepage</em>.
            </h1>
            <p className="lead mt-6 text-ink-soft">
              The same content in three different looks. Open each one, scroll through, and tell us which direction you like,
              or which parts to combine.
            </p>
          </div>

          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {homeOptions.map((option, index) => (
              <li key={option.slug}>
                <Link
                  href={localizePath(`/design-options/${option.slug}`, locale)}
                  className="lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper"
                >
                  <Thumbnail option={option.slug} photo={photo} />
                  <span className="flex flex-1 flex-col p-7">
                    <span className="font-display text-[2.4rem] font-extrabold leading-none tracking-tight text-flame-text">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="heading-md mt-4 block">{option.name}</span>
                    <span className="mt-3 block flex-1 text-ink-soft">{option.summary}</span>
                    <span className="mt-7 inline-flex items-center gap-2 font-semibold text-accent">
                      View option
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
