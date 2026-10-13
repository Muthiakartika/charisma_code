'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

import { languageTags, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

/** Re-check whenever Next.js updates the <head> (e.g. after navigating to another page). */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.head, { childList: true, subtree: true, attributes: true })
  return () => observer.disconnect()
}

/**
 * Shows a link to the same page in the other language.
 *
 * A page only has a Chinese version when its translation is "Approved" in the CMS.
 * The page then lists it in <link rel="alternate" hreflang="zh-SG">, which this
 * component reads. Without it, the Chinese option is shown as "coming soon".
 */
export function LanguageSwitcher({ locale, labels }: { locale: Locale; labels: Dictionary['nav'] }) {
  const target: Locale = locale === 'en' ? 'zh' : 'en'

  const alternateHref = useSyncExternalStore(
    subscribe,
    () => document.querySelector(`link[rel="alternate"][hreflang="${languageTags[target]}"]`)?.getAttribute('href') ?? null,
    () => null,
  )
  const href = alternateHref ? new URL(alternateHref, 'https://example.com').pathname : null
  const label = target === 'zh' ? '中文' : 'EN'

  if (!href) {
    return (
      <span
        className="cursor-not-allowed rounded-full px-3 py-2 text-[0.95rem] font-medium text-muted/70"
        title={target === 'zh' ? labels.chineseComingSoon : undefined}
        aria-disabled="true"
      >
        {label}
      </span>
    )
  }

  return (
    <Link
      href={href}
      hrefLang={languageTags[target]}
      lang={languageTags[target]}
      className="rounded-full px-3 py-2 text-[0.95rem] font-medium text-ink-soft hover:text-ink"
      aria-label={`${labels.languageLabel}: ${target === 'zh' ? '中文' : 'English'}`}
    >
      {label}
    </Link>
  )
}
