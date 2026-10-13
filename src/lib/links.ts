/**
 * Turns a CMS link field ({ type, page, url, label }) into a real website link.
 */
import type { Locale } from '@/i18n/config'
import type { Page } from '@/payload-types'

import { localizePath, pagePath } from './paths'

export type CmsLink =
  | {
      label?: string | null
      type?: 'page' | 'custom' | null
      page?: (number | null) | Page
      url?: string | null
    }
  | null
  | undefined

export type ResolvedLink = { href: string; label: string; external: boolean }

const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href)

export const resolveHref = (link: CmsLink, locale: Locale): string | null => {
  if (!link) return null
  if (link.type === 'custom') {
    const url = link.url?.trim()
    if (!url) return null
    // Internal custom links (e.g. "/our-work") get the /zh prefix on Chinese pages.
    return url.startsWith('/') ? localizePath(url, locale) : url
  }
  const page = link.page
  if (!page || typeof page !== 'object') return null
  return localizePath(pagePath(page.slug), locale)
}

/** Returns null when the link is incomplete, so empty buttons are never shown. */
export const resolveLink = (link: CmsLink, locale: Locale): ResolvedLink | null => {
  const href = resolveHref(link, locale)
  const label = link?.label?.trim()
  if (!href || !label) return null
  return { href, label, external: isExternal(href) && !href.startsWith('/') }
}
