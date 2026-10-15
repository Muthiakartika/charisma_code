/**
 * Homepage colour options (preview pages for the client, not part of the live navigation).
 *
 * Every option is the live homepage (CMS → Pages → "home") with a different accent colour.
 * The colours are set in colour-options.css on <main data-palette="…">, and the header
 * and footer follow them too.
 *
 * To remove the options after the client has chosen: delete this folder and
 * src/app/(frontend)/[locale]/colour-options/.
 */
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { mainAction, toLocale } from '@/components/layout/CmsPage'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import { getDictionary } from '@/i18n/dictionaries'
import { getPage, getSiteSettings } from '@/lib/cms'
import { contactLinks } from '@/lib/contact'
import { localizePath } from '@/lib/paths'
import type { Locale } from '@/i18n/config'

import './colour-options.css'

/** `colours` are only used to draw the preview cards on the overview page. */
export const colourOptions = [
  {
    slug: 'current',
    name: 'Current orange',
    summary: 'The homepage as it is today, for comparison.',
    colours: { fill: '#f7741f', onFill: '#1e2322', bright: '#ff8a3d', tint: '#fde6d2' },
  },
  {
    slug: 'light-orange',
    name: 'Light orange',
    summary: 'A softer, sunnier orange for buttons, highlights and colour blocks.',
    colours: { fill: '#ff9a3d', onFill: '#1e2322', bright: '#ffa652', tint: '#ffeedd' },
  },
  {
    slug: 'yellow',
    name: 'Yellow',
    summary: 'Warm golden yellow. On light sections the highlighted words get a yellow marker.',
    colours: { fill: '#ffc93c', onFill: '#1e2322', bright: '#ffd15c', tint: '#fff4d1' },
  },
  {
    slug: 'purple',
    name: 'Purple',
    summary: 'A rich violet with ivory text on the buttons, and lavender on the dark stage.',
    colours: { fill: '#7442d9', onFill: '#f9f3ea', bright: '#b794ff', tint: '#f0eafc' },
  },
] as const

export type ColourOptionSlug = (typeof colourOptions)[number]['slug']

export const findColourOption = (slug: string) => colourOptions.find((option) => option.slug === slug)

/** A slim bar at the top of each option, to switch between them while presenting. */
function OptionSwitcher({ current, locale }: { current: ColourOptionSlug; locale: Locale }) {
  return (
    <nav aria-label="Homepage colour options" className="border-b border-line bg-paper-deep">
      <div className="container-site flex flex-wrap items-center gap-x-5 gap-y-2 py-2.5 text-sm">
        <Link href={localizePath('/colour-options', locale)} className="font-semibold text-ink underline-offset-4 hover:underline">
          Homepage colour options
        </Link>
        <ul className="flex flex-wrap gap-1.5">
          {colourOptions.map((option) => (
            <li key={option.slug}>
              <Link
                href={localizePath(`/colour-options/${option.slug}`, locale)}
                aria-current={option.slug === current ? 'page' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
              >
                <span aria-hidden className="h-3 w-3 rounded-full" style={{ backgroundColor: option.colours.fill }} />
                {option.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export async function HomeColourOption({ option, locale: rawLocale }: { option: string; locale: string }) {
  const current = findColourOption(option)
  const locale = toLocale(rawLocale)
  const page = await getPage('home', locale)
  if (!current || !page) notFound()

  const settings = await getSiteSettings(locale)
  const dict = getDictionary(locale)
  const blocks = (page.layout ?? []).filter((block) => !block.hidden)
  const action = mainAction(blocks, blocks[0], settings, locale, dict)
  const whatsapp = contactLinks(settings.contact).whatsapp

  return (
    <main id="main" data-theme="corporate" data-palette={current.slug} className="bg-surface">
      <OptionSwitcher current={current.slug} locale={locale} />
      <RenderBlocks
        blocks={blocks}
        context={{ locale, dict, settings, pageTitle: page.title, breadcrumbs: [] }}
        pageAction={action}
      />
      {action && (
        <MobileActionBar action={action} whatsapp={whatsapp && { href: whatsapp.href, label: dict.common.whatsapp }} />
      )}
    </main>
  )
}
