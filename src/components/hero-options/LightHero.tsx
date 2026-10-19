import type { CSSProperties } from 'react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { HighlightText, stripHighlight } from '@/components/ui/HighlightText'
import type { Locale } from '@/i18n/config'
import { resolveLink } from '@/lib/links'
import type { HeroBlock, Media } from '@/payload-types'

import type { HeroOptionSlug } from './hero-options'

const order = (n: number) => ({ '--rise-order': n }) as CSSProperties

/** The follow-spot starts on the photo's focal point (set per photo in the CMS). */
const spotOrigin = (media: Media) =>
  ({ '--spot-x': `${media.focalX ?? 50}%`, '--spot-y': `${media.focalY ?? 44}%` }) as CSSProperties

/** Headline, intro, buttons and highlights: the same CMS content in every option. */
function HeroText({ block, locale }: { block: HeroBlock; locale: Locale }) {
  const primary = resolveLink(block.primaryButton, locale)
  const secondary = resolveLink(block.secondaryButton, locale)
  const highlights = block.highlights ?? []
  const headingClass = stripHighlight(block.heading).length > 40 ? 'heading-xl-long' : 'heading-xl'

  return (
    <>
      {block.eyebrow && (
        <p className="eyebrow rise mb-5" style={order(0)}>
          {block.eyebrow}
        </p>
      )}
      <h1 className={`${headingClass} rise`} style={order(1)}>
        <HighlightText text={block.heading} />
      </h1>
      {block.subheading && (
        <p className="lead rise mt-6 text-ink-soft" style={order(2)}>
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
          className="rise mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.95rem] font-medium text-ink-soft"
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
}

type Props = {
  /** Option 3, Colour block, is the website's own Hero layout now (src/components/blocks/Hero.tsx) */
  option: Exclude<HeroOptionSlug, 'colour-block'>
  block: HeroBlock
  locale: Locale
}

/** Light hero options 1 and 2, for comparison (see hero-options.css). */
export function LightHero({ option, block, locale }: Props) {
  const [main, second] = (block.images ?? []).filter(
    (image): image is Media => typeof image === 'object' && image !== null,
  )
  const id = block.anchorId ?? undefined

  // ── 1. Daylight: today's spotlight circles on ivory, with a ring that traces around them ─
  if (option === 'daylight') {
    return (
      <section id={id} className="hero-daylight relative isolate overflow-hidden bg-paper">
        <div className="container-site grid items-center gap-12 pb-14 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-16">
          <div className="relative z-10 lg:col-span-7">
            <HeroText block={block} locale={locale} />
          </div>

          <div className="relative lg:col-span-5">
            {/* 90% on phones, so the ring around the photo never touches the screen edge */}
            <div className="relative mx-auto aspect-square w-[90%] max-w-[540px] lg:w-full">
              <svg aria-hidden viewBox="0 0 100 100" className="daylight-ring absolute left-[14%] top-[-6%] w-[92%]">
                <circle cx="50" cy="50" r="49" pathLength={100} />
              </svg>
              {main && (
                <div
                  className="light-spot absolute right-0 top-0 aspect-square w-[86%] overflow-hidden rounded-full bg-paper-deep"
                  style={spotOrigin(main)}
                >
                  <CmsImage media={main} sizes="(min-width: 1024px) 34vw, 80vw" priority className="object-cover" />
                </div>
              )}
              {second && (
                <div
                  className="light-spot light-spot--small absolute bottom-0 left-0 aspect-square w-[40%] overflow-hidden rounded-full border-[6px] border-paper bg-paper-deep"
                  style={spotOrigin(second)}
                >
                  <CmsImage media={second} sizes="(min-width: 1024px) 16vw, 36vw" className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── 2. Spotlight beam: a beam of light from above, landing on the host on a peach stage ─
  return (
    <section id={id} className="hero-beam relative isolate overflow-hidden bg-surface-alt">
      <div className="container-site grid items-center gap-12 pb-14 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-14">
        <div className="relative z-10 lg:col-span-7">
          <HeroText block={block} locale={locale} />
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[5/6] w-full max-w-[460px]">
            <div aria-hidden className="beam-light absolute -top-[70%] bottom-[4%] left-[-40%] right-[-40%]" />
            <div aria-hidden className="beam-pool absolute bottom-0 left-[-6%] right-[-6%] h-[20%] rounded-[50%]" />
            {main && (
              <div
                className="light-spot absolute bottom-[11%] left-[17%] right-[17%] top-[3%] overflow-hidden rounded-t-full rounded-b-[var(--radius-media)] bg-paper-deep"
                style={spotOrigin(main)}
              >
                <CmsImage media={main} sizes="(min-width: 1024px) 28vw, 70vw" priority className="object-cover" />
              </div>
            )}
            {second && (
              <div
                className="light-spot light-spot--small absolute bottom-[3%] left-0 aspect-square w-[36%] overflow-hidden rounded-full border-[6px] border-surface-alt bg-paper-deep"
                style={spotOrigin(second)}
              >
                <CmsImage media={second} sizes="(min-width: 1024px) 14vw, 32vw" className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
