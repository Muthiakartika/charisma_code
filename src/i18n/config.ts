/**
 * Website languages.
 *  - English is the default and has no URL prefix:  /corporate-team-building
 *  - Simplified Chinese lives under /zh:              /zh/corporate-team-building
 */
export const locales = ['en', 'zh'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as readonly string[]).includes(value)

/** Values for <html lang> and hreflang (Singapore audience). */
export const languageTags: Record<Locale, string> = {
  en: 'en-SG',
  zh: 'zh-SG',
}

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
}

/**
 * Whether the Chinese version of a page, project or article can be opened. On the real website
 * (NEXT_PUBLIC_SITE_ENV=production) only once its translation is "Approved". On staging and on a
 * developer's computer, drafts waiting for native-speaker review open too, so the client can
 * review them in place (the sitemap still lists approved pages only).
 */
export const showsChinese = (status?: string | null) =>
  status === 'approved' ||
  (process.env.NEXT_PUBLIC_SITE_ENV !== 'production' && status === 'needs-review')
