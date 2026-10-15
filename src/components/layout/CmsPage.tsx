/**
 * Renders any CMS page (Pages collection) by its slug.
 * Used by the page files in src/app/(frontend)/[locale]/…/page.tsx
 */
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { JsonLd } from '@/components/seo/JsonLd'
import { defaultLocale, isLocale, type Locale } from '@/i18n/config'
import { getDictionary, type Dictionary } from '@/i18n/dictionaries'
import { findPublished, getPage, getSiteSettings, type SiteSettings } from '@/lib/cms'
import { contactLinks } from '@/lib/contact'
import { resolveLink, type ResolvedLink } from '@/lib/links'
import { pagePath } from '@/lib/paths'
import { breadcrumbSchema, buildMetadata, personSchema, serviceSchema, type Crumb } from '@/lib/seo'
import type { Page } from '@/payload-types'

import { Breadcrumbs } from './Breadcrumbs'
import { LivePreviewListener } from './LivePreviewListener'
import { MobileActionBar } from './MobileActionBar'

export const toLocale = (value: string): Locale => (isLocale(value) ? value : defaultLocale)

type Block = NonNullable<Page['layout']>[number]

/**
 * The page's main action, used by the phone action bar and repeated between sections:
 * - pages with an enquiry form jump to it, using the hero's button label when it points there
 *   (e.g. "Request a proposal", "Check availability");
 * - other pages use the header button (e.g. "Let's Talk").
 */
function mainAction(
  blocks: Block[],
  firstBlock: Block | undefined,
  settings: SiteSettings,
  locale: Locale,
  dict: Dictionary,
): ResolvedLink | null {
  const form = blocks.find((block) => block.blockType === 'enquiryForm' && !block.hidden)
  if (form) {
    const anchor = `#${form.anchorId ?? 'enquire'}`
    const heroButton = firstBlock?.blockType === 'hero' ? resolveLink(firstBlock.primaryButton, locale) : null
    const label = heroButton?.href.endsWith(anchor) ? heroButton.label : dict.form.jumpToForm
    return { href: anchor, label, external: false }
  }
  return resolveLink(settings.header.ctaButton, locale)
}

/** Pages where the founder's Person structured data is useful. */
const founderPages = ['home', 'about', 'corporate-emcee', 'wedding-emcee', 'dinner-and-dance-emcee']

export async function CmsPage({ slug, locale: rawLocale }: { slug: string; locale: string }) {
  const locale = toLocale(rawLocale)
  const page = await getPage(slug, locale)
  if (!page) notFound()

  const { isEnabled: isDraft } = await draftMode()
  // Chinese pages are only public once the translation is approved.
  if (locale === 'zh' && page.chineseTranslation !== 'approved' && !isDraft) redirect(pagePath(slug))

  const [settings, linkedServices] = await Promise.all([
    getSiteSettings(locale),
    findPublished('services', { locale, where: { page: { equals: page.id } }, limit: 1, depth: 0 }),
  ])
  const dict = getDictionary(locale)
  const path = pagePath(slug)
  const breadcrumbs: Crumb[] = slug === 'home' ? [] : [{ name: dict.common.home, path: '/' }, { name: page.title, path }]
  const blocks = page.layout ?? []
  const firstBlock = blocks.find((block) => !block.hidden)
  const startsWithHero = firstBlock?.blockType === 'hero'
  const service = linkedServices[0]
  const action = mainAction(blocks, firstBlock, settings, locale, dict)
  const whatsapp = contactLinks(settings.contact).whatsapp

  return (
    <main id="main" data-theme={page.theme ?? 'corporate'} className="bg-surface">
      {isDraft && <LivePreviewListener />}

      {!startsWithHero && (
        <header className="border-b border-line">
          <div className="container-site pb-12 pt-8 lg:pb-16 lg:pt-12">
            <Breadcrumbs crumbs={breadcrumbs} locale={locale} label={dict.common.breadcrumb} />
            <h1 className="heading-xl mt-8 max-w-4xl">{page.title}</h1>
          </div>
        </header>
      )}

      <RenderBlocks
        blocks={blocks}
        context={{ locale, dict, settings, pageTitle: page.title, breadcrumbs }}
        pageAction={action}
      />
      {action && (
        <MobileActionBar action={action} whatsapp={whatsapp && { href: whatsapp.href, label: dict.common.whatsapp }} />
      )}

      {breadcrumbs.length > 0 && <JsonLd data={breadcrumbSchema(breadcrumbs)} />}
      {service && <JsonLd data={serviceSchema({ name: service.title, description: service.summary, path })} />}
      {founderPages.includes(slug) && <JsonLd data={personSchema(settings)} />}
    </main>
  )
}

export async function generateCmsMetadata(slug: string, rawLocale: string): Promise<Metadata> {
  const locale = toLocale(rawLocale)
  const [page, settings] = await Promise.all([getPage(slug, locale), getSiteSettings(locale)])
  if (!page) return {}
  return buildMetadata({
    locale,
    path: pagePath(slug),
    title: page.title,
    meta: page.meta,
    seo: settings.seo,
    hasChinese: page.chineseTranslation === 'approved',
  })
}
