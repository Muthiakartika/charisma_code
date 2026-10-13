/**
 * Where each type of content lives on the website.
 * Used by the website AND by the CMS (preview buttons, SEO plugin, sitemap).
 */
import { defaultLocale, type Locale } from '@/i18n/config'

/** The homepage is the Page with slug "home". */
export const pagePath = (slug?: string | null) => (!slug || slug === 'home' ? '/' : `/${slug}`)
export const postPath = (slug?: string | null) => `/insights/${slug ?? ''}`
export const projectPath = (slug?: string | null) => `/our-work/${slug ?? ''}`
export const categoryPath = (slug?: string | null) => `/insights/category/${slug ?? ''}`

/** English URLs have no prefix; Chinese URLs start with /zh. */
export const localizePath = (path: string, locale: Locale | string = defaultLocale) => {
  if (locale === defaultLocale) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

export const siteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export const absoluteUrl = (path: string) => `${siteUrl()}${path === '/' ? '' : path}` || siteUrl()

/** Link used by the CMS "Preview" and "Live Preview" buttons. */
export const previewUrl = (path: string, locale?: string) => {
  const params = new URLSearchParams({
    path: localizePath(path, locale ?? defaultLocale),
    secret: process.env.PREVIEW_SECRET || '',
  })
  return `/next/preview?${params.toString()}`
}
