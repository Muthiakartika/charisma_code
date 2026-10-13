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
