import type { CSSProperties } from 'react'

import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { HighlightText, stripHighlight } from '@/components/ui/HighlightText'
import { resolveLink } from '@/lib/links'
import type { HeroBlock as HeroBlockData, Media } from '@/payload-types'

import { HeroLineArt } from './HeroLineArt'
import type { BlockContext } from './shared'

const order = (n: number) => ({ '--rise-order': n }) as CSSProperties

/** The follow-spot starts on the photo's focal point (set per photo in the CMS). */
const spotOrigin = (media: Media) =>
  ({ '--spot-x': `${media.focalX ?? 50}%`, '--spot-y': `${media.focalY ?? 44}%` }) as CSSProperties

export function HeroBlock({ block, context }: { block: HeroBlockData; context: BlockContext }) {
  const { locale, dict, breadcrumbs, isFirst } = context
  const Heading = isFirst ? 'h1' : 'h2'
  const primary = resolveLink(block.primaryButton, locale)
  const secondary = resolveLink(block.secondaryButton, locale)
  const images = (block.images ?? []).filter((image): image is Media => typeof image === 'object' && image !== null)
  const highlights = block.highlights ?? []
  const isLongHeading = stripHighlight(block.heading).length > 40
  const headingClass = isLongHeading ? 'heading-xl-long' : 'heading-xl'
  const crumbs = <Breadcrumbs crumbs={breadcrumbs} locale={locale} label={dict.common.breadcrumb} />

  const text = (onDark = false) => (
    <>
      {block.eyebrow && (
        <p className="eyebrow rise mb-5" style={order(0)}>
          {block.eyebrow}
        </p>
      )}
      <Heading className={`${headingClass} rise`} style={order(1)}>
        <HighlightText text={block.heading} />
      </Heading>
      {block.subheading && (
        <p className={`lead rise mt-6 ${onDark ? 'text-paper/85' : 'text-ink-soft'}`} style={order(2)}>
          {block.subheading}
        </p>
      )}
      {(primary || secondary) && (
        <div className="rise mt-9 flex flex-wrap items-center gap-3" style={order(3)}>
          <ButtonLink link={primary} />
          <ButtonLink link={secondary} variant="secondary" />
        </div>
      )}
      {highlights.length > 0 && (
        <ul
          className={`rise mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.95rem] font-medium ${onDark ? 'text-paper/80' : 'text-ink-soft'}`}
          style={order(4)}
        >
          {highlights.map((item, index) => (
            <li key={item.id ?? index} className="flex items-center gap-2.5">
              <span aria-hidden className="h-2 w-2 rounded-full bg-action" />
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </>
  )

  // ── Stage: a dark stage, the photos lit as spotlight circles ─
  if (block.variant === 'stage' && images[0]) {
    const [spot, smallSpot] = images
    return (
      <section id={block.anchorId ?? undefined} className="stage-hero tone-dark relative isolate overflow-hidden">
        <div className="container-site grid items-center gap-12 pb-8 pt-10 sm:pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-16">
          <div className="relative z-10 lg:col-span-7">
            {breadcrumbs.length > 1 && <div className="mb-10 [&_a]:text-paper/80 [&_span]:text-paper/80">{crumbs}</div>}
            {text(true)}
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[540px]">
              <div
                className="spotlight absolute right-0 top-0 aspect-square w-[86%] overflow-hidden rounded-full bg-ink-soft"
                style={spotOrigin(spot)}
              >
                <CmsImage media={spot} sizes="(min-width: 1024px) 34vw, 80vw" priority={isFirst} className="object-cover" />
              </div>
              {smallSpot && (
                <div
                  className="spotlight spotlight--small absolute bottom-0 left-0 aspect-square w-[40%] overflow-hidden rounded-full border-[6px] border-ink bg-ink-soft"
                  style={spotOrigin(smallSpot)}
                >
                  <CmsImage media={smallSpot} sizes="(min-width: 1024px) 16vw, 36vw" className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Colour block: light, photos stepping out of a block of brand colour ─
  if (block.variant === 'colourBlock' && images[0]) {
    const [main, second] = images
    return (
      <section id={block.anchorId ?? undefined} className="block-hero relative isolate overflow-hidden bg-surface">
        {/*
          Desktop: the block of colour runs from 40% into the photo column to the screen edge,
          full height, with the line art inside. Its left edge, worked out from the grid below
          (1320px container, 3rem padding, 2rem gaps): 50% + 254px on wide screens, 70% - 10px below 1320px.
        */}
        <div
          aria-hidden
          className="block-hero__panel absolute inset-y-0 right-0 -z-10 hidden overflow-hidden bg-action lg:left-[min(calc(50%+254px),calc(70%-10px))] lg:block"
        >
          <HeroLineArt art={block.lineArt ?? 'spotlight'} />
        </div>
        <div className="container-site grid items-center gap-12 pb-14 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-16">
          <div className="relative z-10 lg:col-span-6">
            {breadcrumbs.length > 1 && <div className="mb-10">{crumbs}</div>}
            {text()}
          </div>

          <div className="relative lg:col-span-6">
            {/* Phones and tablets: a band of colour behind the photos, reaching past the column to both screen edges */}
            <div
              aria-hidden
              className="block-hero__panel absolute -bottom-[50vh] -left-[50vw] -right-[50vw] top-[22%] -z-10 bg-action lg:hidden"
            />
            <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[560px]">
              <div aria-hidden className="block-hero__glow absolute left-[-31%] top-[-36%] aspect-square w-[140%] rounded-full" />
              <div
                className="block-hero__photo absolute left-[2%] top-0 aspect-square w-[74%] overflow-hidden rounded-full bg-paper-deep shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--color-ink)_55%,transparent)]"
                style={spotOrigin(main)}
              >
                <CmsImage media={main} sizes="(min-width: 1024px) 30vw, 74vw" priority={isFirst} className="object-cover" />
              </div>
              {second && (
                <div
                  className="block-hero__photo block-hero__photo--small absolute bottom-0 right-[4%] aspect-square w-[38%] overflow-hidden rounded-full border-[6px] border-surface bg-paper-deep"
                  style={spotOrigin(second)}
                >
                  <CmsImage media={second} sizes="(min-width: 1024px) 16vw, 38vw" className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Full photo ──────────────────────────────────────────────
  if (block.variant === 'photo' && images[0]) {
    return (
      <section id={block.anchorId ?? undefined} className="tone-dark relative isolate flex min-h-[78dvh] items-end overflow-hidden">
        <CmsImage media={images[0]} sizes="100vw" priority={isFirst} className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/5" />
        <div className="container-site pb-14 pt-40 lg:pb-20">
          <div className="mb-8 [&_a]:text-paper/80 [&_span]:text-paper/80">{crumbs}</div>
          <div className="max-w-3xl">{text(true)}</div>
        </div>
      </section>
    )
  }

  // ── Simple (text only) ──────────────────────────────────────
  if (block.variant === 'simple' || images.length === 0) {
    return (
      <section id={block.anchorId ?? undefined} className="border-b border-line bg-surface">
        <div className="container-site pb-14 pt-8 lg:pb-20 lg:pt-12">
          <div className="mb-10">{crumbs}</div>
          <div className="max-w-4xl">{text()}</div>
        </div>
      </section>
    )
  }

  // ── Split: text left, photo collage right ───────────────────
  const [main, second, third] = images
  return (
    <section id={block.anchorId ?? undefined} className="relative overflow-hidden bg-surface">
      <div className="container-site grid items-center gap-12 pb-14 pt-8 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-12">
        <div className={isLongHeading ? 'lg:col-span-7' : 'lg:col-span-6'}>
          {breadcrumbs.length > 1 && <div className="mb-10">{crumbs}</div>}
          {text()}
        </div>

        <div className={`relative lg:pl-6 ${isLongHeading ? 'lg:col-span-5' : 'lg:col-span-6'}`}>
          <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[600px]">
            {/* The "spark": a spotlight disc behind the main photo */}
            <div
              aria-hidden
              className="hero-spark rise absolute -right-3 -top-4 aspect-square w-[46%] rounded-full bg-action sm:-right-6 sm:-top-6"
              style={order(2)}
            />
            <div className="media-frame absolute bottom-[8%] right-0 top-0 w-[78%] overflow-hidden rounded-[var(--radius-media)] bg-paper-deep in-data-[theme=wedding]:rounded-t-full">
              <CmsImage
                media={main}
                sizes="(min-width: 1024px) 38vw, 72vw"
                priority={isFirst}
                className="object-cover"
              />
            </div>
            {second && (
              <div className="media-frame media-frame--tilt absolute bottom-0 left-0 aspect-[4/5] w-[42%] overflow-hidden rounded-[var(--radius-media)] border-[6px] border-surface bg-paper-deep">
                <CmsImage media={second} sizes="(min-width: 1024px) 22vw, 42vw" className="object-cover" />
              </div>
            )}
            {third && (
              <div className="absolute left-[6%] top-[10%] hidden aspect-square w-[24%] overflow-hidden rounded-[var(--radius-media)] border-[6px] border-surface bg-paper-deep sm:block">
                <CmsImage media={third} sizes="(min-width: 1024px) 14vw, 24vw" className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
