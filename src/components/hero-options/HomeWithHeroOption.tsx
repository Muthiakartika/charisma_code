import Link from 'next/link'
import { notFound } from 'next/navigation'

import { lineArts } from '@/components/blocks/HeroLineArt'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { mainAction, toLocale } from '@/components/layout/CmsPage'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPage, getSiteSettings } from '@/lib/cms'
import { contactLinks } from '@/lib/contact'
import { localizePath } from '@/lib/paths'
import type { HeroBlock, Page } from '@/payload-types'

import { findHeroPreview, heroOptions, previousHero, type HeroPreviewSlug } from './hero-options'
import { LightHero } from './LightHero'

import './hero-options.css'

type LayoutBlock = NonNullable<Page['layout']>[number]
type LineArt = NonNullable<HeroBlock['lineArt']>

/** The client logos sit right under the hero: light under a light hero, dark under the dark stage. */
const logoTone: Record<HeroPreviewSlug, 'light' | 'tinted' | 'dark'> = {
  daylight: 'tinted',
  'spotlight-beam': 'light',
  'colour-block': 'tinted',
  'dark-stage': 'dark',
}

/** Options 3 and the previous dark stage are Hero layouts of the website, so they only switch the layout */
const heroLayout = (hero: HeroBlock, option: HeroPreviewSlug, art: LineArt | undefined): HeroBlock => {
  if (option === 'colour-block') return { ...hero, variant: 'colourBlock', lineArt: art ?? hero.lineArt ?? 'spotlight' }
  if (option === 'dark-stage') return { ...hero, variant: 'stage' }
  return hero
}

const pill =
  'inline-flex rounded-full border border-ink/15 px-3.5 py-1.5 font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper'

/** A slim bar above the hero, to switch between the options while presenting. */
function OptionSwitcher({ current, art, locale }: { current: HeroPreviewSlug; art: LineArt; locale: Locale }) {
  return (
    <nav aria-label="Homepage hero options" className="border-b border-line bg-paper-deep">
      <div className="container-site flex flex-wrap items-center gap-x-5 gap-y-2 py-2.5 text-sm">
        <Link href={localizePath('/hero-options', locale)} className="font-semibold text-ink underline-offset-4 hover:underline">
          Hero options
        </Link>
        <ul className="flex flex-wrap gap-1.5">
          {heroOptions.map((option, index) => (
            <li key={option.slug}>
              <Link
                href={localizePath(`/hero-options/${option.slug}`, locale)}
                aria-current={option.slug === current ? 'page' : undefined}
                className={pill}
              >
                {index + 1}. {option.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={localizePath(`/hero-options/${previousHero.slug}`, locale)}
              aria-current={current === previousHero.slug ? 'page' : undefined}
              className={pill}
            >
              {previousHero.name}
            </Link>
          </li>
        </ul>

        {/* The Colour block option also offers a choice of line art (shown on desktop screens) */}
        {current === 'colour-block' && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:ml-auto">
            <span className="font-semibold text-ink">Line art</span>
            <ul className="flex flex-wrap gap-1.5">
              {lineArts.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`${localizePath('/hero-options/colour-block', locale)}?art=${item.slug}`}
                    aria-current={item.slug === art ? 'page' : undefined}
                    scroll={false}
                    className={pill}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

type Props = {
  option: string
  locale: string
  /** ?art=… from the address (Colour block option only) */
  art?: string | string[]
}

/** The whole homepage from the CMS, with the chosen hero option in place of the live one. */
export async function HomeWithHeroOption({ option, locale: rawLocale, art: rawArt }: Props) {
  const current = findHeroPreview(option)
  const locale = toLocale(rawLocale)
  const page = await getPage('home', locale)
  if (!current || !page) notFound()

  const settings = await getSiteSettings(locale)
  const dict = getDictionary(locale)
  const visible = (page.layout ?? []).filter((block) => !block.hidden)
  const hero = visible[0]
  if (hero?.blockType !== 'hero') notFound()

  const art = lineArts.find((item) => item.slug === rawArt)?.slug
  const logosIndex = visible.findIndex((block) => block.blockType === 'clientLogos')
  const blocks: LayoutBlock[] = visible.map((block, index) => {
    if (index === 0) return heroLayout(hero, current.slug, art)
    if (index === logosIndex && block.blockType === 'clientLogos') return { ...block, tone: logoTone[current.slug] }
    return block
  })
  const [, ...rest] = blocks

  const action = mainAction(blocks, hero, settings, locale, dict)
  const whatsapp = contactLinks(settings.contact).whatsapp
  const context = { locale, dict, settings, pageTitle: page.title, breadcrumbs: [] }
  const lightOption = current.slug === 'daylight' || current.slug === 'spotlight-beam' ? current.slug : null
  const shownArt = blocks[0].blockType === 'hero' ? (blocks[0].lineArt ?? 'spotlight') : 'spotlight'

  return (
    <main id="main" data-theme={page.theme ?? 'corporate'} className="bg-surface">
      <OptionSwitcher current={current.slug} art={shownArt} locale={locale} />
      {lightOption ? (
        <>
          <LightHero option={lightOption} block={hero} locale={locale} />
          {/* The hero above renders the page's <h1>; the blocks below never use it */}
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
