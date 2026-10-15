/**
 * Homepage design options (preview pages for the client, not part of the live navigation).
 *
 * Every option shows the same homepage content from the CMS (Pages → "home");
 * only the presentation changes: the hero layout, which sections are orange,
 * ivory, peach or dark, and a few option-only details (see design-options.css).
 *
 * To remove the options after the client has chosen: delete this folder and
 * src/app/(frontend)/[locale]/design-options/.
 */
import { Sparkle } from '@phosphor-icons/react/ssr'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Fragment, type CSSProperties } from 'react'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { mainAction, toLocale } from '@/components/layout/CmsPage'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { HighlightText } from '@/components/ui/HighlightText'
import { Marquee } from '@/components/ui/Marquee'
import { getDictionary, type Dictionary } from '@/i18n/dictionaries'
import { findPublished, getPage, getSiteSettings } from '@/lib/cms'
import { contactLinks } from '@/lib/contact'
import { resolveLink } from '@/lib/links'
import { localizePath } from '@/lib/paths'
import type { Locale } from '@/i18n/config'
import type { HeroBlock, Media, Page } from '@/payload-types'

import './design-options.css'

type LayoutBlock = NonNullable<Page['layout']>[number]

export const homeOptions = [
  {
    slug: 'stage',
    name: 'Stage',
    summary: 'A dark stage with the photos in spotlight circles. Orange marks every action and highlight.',
  },
  {
    slug: 'colour',
    name: 'Colour',
    summary: 'Light and warm, with a photo collage and bold orange colour blocks. The most colourful option.',
  },
  {
    slug: 'action',
    name: 'Action',
    summary: 'A full-screen crowd photo and a moving band of what we do. The most energetic option.',
  },
] as const

export type HomeOptionSlug = (typeof homeOptions)[number]['slug']

export const findHomeOption = (slug: string) => homeOptions.find((option) => option.slug === slug)

/** The same CMS blocks, restyled for each option. */
function restyle(block: LayoutBlock, option: HomeOptionSlug): LayoutBlock {
  if (option === 'colour') {
    if (block.blockType === 'hero') return { ...block, variant: 'split' }
    if (block.blockType === 'clientLogos' || block.blockType === 'processSteps') {
      return { ...block, tone: 'spark' } as unknown as LayoutBlock
    }
  }
  if (option === 'action') {
    if (block.blockType === 'clientLogos') return { ...block, tone: 'light' }
    if (block.blockType === 'textImage') return { ...block, tone: 'tinted' }
    if (block.blockType === 'processSteps') return { ...block, tone: 'dark' }
  }
  return block
}

/** A slim bar at the top of each option, to switch between them while presenting. */
function OptionSwitcher({ current, locale }: { current: HomeOptionSlug; locale: Locale }) {
  return (
    <nav aria-label="Homepage design options" className="design-switcher border-b border-line bg-paper-deep">
      <div className="container-site flex flex-wrap items-center gap-x-5 gap-y-2 py-2.5 text-sm">
        <Link href={localizePath('/design-options', locale)} className="font-semibold text-ink underline-offset-4 hover:underline">
          Homepage design options
        </Link>
        <ul className="flex flex-wrap gap-1.5">
          {homeOptions.map((option, index) => (
            <li key={option.slug}>
              <Link
                href={localizePath(`/design-options/${option.slug}`, locale)}
                aria-current={option.slug === current ? 'page' : undefined}
                className="inline-flex rounded-full border border-ink/15 px-3.5 py-1.5 font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
              >
                {index + 1}. {option.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const order = (n: number) => ({ '--rise-order': n }) as CSSProperties

/**
 * "Action" option hero: the crowd photo fills the left of the first screen and fades
 * into the dark stage, with the headline beside it (so it never covers a face).
 * On phones the photo sits on top and the text follows underneath.
 */
function ActionHero({ block, locale }: { block: HeroBlock; locale: Locale }) {
  const photo = (block.images ?? []).find((image): image is Media => typeof image === 'object' && image !== null)
  const primary = resolveLink(block.primaryButton, locale)
  const secondary = resolveLink(block.secondaryButton, locale)

  return (
    <section className="hero-action tone-dark relative isolate overflow-hidden">
      <div className="relative h-[54vh] min-h-[320px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[60%]">
        <CmsImage media={photo} sizes="(min-width: 1024px) 60vw, 100vw" priority className="object-cover" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/0 to-ink/0 lg:bg-gradient-to-r lg:via-ink/0 lg:from-ink/0 lg:to-ink"
        />
      </div>

      <div className="container-site relative grid lg:min-h-[calc(100dvh-72px-3rem)] lg:grid-cols-12 lg:items-center">
        <div className="-mt-20 pb-16 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:py-20 lg:pl-4">
          <h1 className="heading-xl rise" style={order(1)}>
            <HighlightText text={block.heading} />
          </h1>
          {block.subheading && (
            <p className="lead rise mt-6 text-paper/85" style={order(2)}>
              {block.subheading}
            </p>
          )}
          {(primary || secondary) && (
            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={order(3)}>
              <ButtonLink link={primary} />
              <ButtonLink link={secondary} variant="secondary" />
            </div>
          )}
          {block.highlights && block.highlights.length > 0 && (
            <ul className="rise mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.95rem] font-medium text-paper/80" style={order(4)}>
              {block.highlights.map((item, index) => (
                <li key={item.id ?? index} className="flex items-center gap-2.5">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-action" />
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

/** "Action" option: an orange band under the hero with the services running across it. */
async function Ticker({ locale, dict, extra }: { locale: Locale; dict: Dictionary; extra: string[] }) {
  const services = await findPublished('services', { locale, sort: 'priority', depth: 0 })
  const items = [...services.map((service) => service.title), ...extra]
  if (!items.length) return null

  const row = (duplicate = false) => (
    <ul
      className={`flex shrink-0 items-center gap-x-8 pr-8 sm:gap-x-10 sm:pr-10 ${duplicate ? 'marquee-duplicate' : ''}`}
      aria-hidden={duplicate || undefined}
    >
      {items.map((item) => (
        <Fragment key={item}>
          <li className="whitespace-nowrap">{item}</li>
          <li aria-hidden>
            <Sparkle size={26} weight="fill" />
          </li>
        </Fragment>
      ))}
    </ul>
  )

  return (
    <section aria-label="What we do" className="ticker tone-spark py-5 sm:py-6">
      <Marquee labels={{ pause: dict.common.pauseAnimation, play: dict.common.playAnimation }}>
        <div className="marquee-track flex w-max items-center font-display text-[clamp(1.35rem,1.4vw+1rem,2.1rem)] font-extrabold tracking-tight">
          {row()}
          {row(true)}
        </div>
      </Marquee>
    </section>
  )
}

export async function HomeOption({ option, locale: rawLocale }: { option: string; locale: string }) {
  const current = findHomeOption(option)
  const locale = toLocale(rawLocale)
  const page = await getPage('home', locale)
  if (!current || !page) notFound()

  const settings = await getSiteSettings(locale)
  const dict = getDictionary(locale)
  const blocks = (page.layout ?? []).filter((block) => !block.hidden).map((block) => restyle(block, current.slug))
  const [hero, ...rest] = blocks
  const action = mainAction(blocks, hero, settings, locale, dict)
  const whatsapp = contactLinks(settings.contact).whatsapp
  const context = { locale, dict, settings, pageTitle: page.title, breadcrumbs: [] }
  const heroHighlights = hero?.blockType === 'hero' ? (hero.highlights ?? []).map((item) => item.text) : []

  return (
    <main id="main" data-theme="corporate" data-option={current.slug} className="bg-surface">
      <OptionSwitcher current={current.slug} locale={locale} />

      {current.slug === 'action' && hero?.blockType === 'hero' ? (
        <>
          <ActionHero block={hero} locale={locale} />
          <Ticker locale={locale} dict={dict} extra={heroHighlights} />
          {/* The hero is drawn above, so the next block must not take the page's <h1>; none but the hero uses it. */}
          <RenderBlocks blocks={rest} context={context} pageAction={action} />
        </>
      ) : (
        <RenderBlocks blocks={blocks} context={context} pageAction={action} />
      )}

      {action && (
        <MobileActionBar action={action} whatsapp={whatsapp && { href: whatsapp.href, label: dict.common.whatsapp }} />
      )}
    </main>
  )
}
