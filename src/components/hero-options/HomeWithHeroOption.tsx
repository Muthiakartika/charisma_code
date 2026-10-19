import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { mainAction, toLocale } from '@/components/layout/CmsPage'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPage, getSiteSettings } from '@/lib/cms'
import { contactLinks } from '@/lib/contact'
import { localizePath } from '@/lib/paths'
import type { Page } from '@/payload-types'

import { findHeroOption, heroOptions, type HeroOptionSlug } from './hero-options'
import { LightHero } from './LightHero'
import { lineArts, toLineArt, type LineArtSlug } from './PanelLineArt'

import './hero-options.css'

type LayoutBlock = NonNullable<Page['layout']>[number]

/**
 * The client logos sit right under the hero on a dark band today. With a light hero they
 * turn light too, so the page does not flip from light to dark and back to light.
 */
const logoTone: Record<HeroOptionSlug, 'light' | 'tinted'> = {
  daylight: 'tinted',
  'spotlight-beam': 'light',
  'colour-block': 'tinted',
}

const restyle = (block: LayoutBlock, option: HeroOptionSlug): LayoutBlock =>
  block.blockType === 'clientLogos' && block.tone === 'dark' ? { ...block, tone: logoTone[option] } : block

const pill =
  'inline-flex rounded-full border border-ink/15 px-3.5 py-1.5 font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper'

/** A slim bar above the hero, to switch between the options while presenting. */
function OptionSwitcher({ current, art, locale }: { current: HeroOptionSlug; art: LineArtSlug; locale: Locale }) {
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
            <Link href={localizePath('/', locale)} className={pill}>
              Current (dark)
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

/** The whole homepage from the CMS, with the chosen light hero in place of today's dark one. */
export async function HomeWithHeroOption({ option, locale: rawLocale, art: rawArt }: Props) {
  const current = findHeroOption(option)
  const art = toLineArt(rawArt)
  const locale = toLocale(rawLocale)
  const page = await getPage('home', locale)
  if (!current || !page) notFound()

  const settings = await getSiteSettings(locale)
  const dict = getDictionary(locale)
  const blocks = (page.layout ?? []).filter((block) => !block.hidden).map((block) => restyle(block, current.slug))
  const [hero, ...rest] = blocks
  if (hero?.blockType !== 'hero') notFound()

  const action = mainAction(blocks, hero, settings, locale, dict)
  const whatsapp = contactLinks(settings.contact).whatsapp

  return (
    <main id="main" data-theme={page.theme ?? 'corporate'} className="bg-surface">
      <OptionSwitcher current={current.slug} art={art} locale={locale} />
      <LightHero option={current.slug} block={hero} locale={locale} art={art} />
      {/* The hero above renders the page's <h1>; the blocks below never use it */}
      <RenderBlocks
        blocks={rest}
        context={{ locale, dict, settings, pageTitle: page.title, breadcrumbs: [] }}
        pageAction={action}
      />
      {action && (
        <MobileActionBar action={action} whatsapp={whatsapp && { href: whatsapp.href, label: dict.common.whatsapp }} />
      )}
    </main>
  )
}
