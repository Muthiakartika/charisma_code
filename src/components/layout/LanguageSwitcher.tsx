'use client'

import { CaretDown, Check } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'

import { languageTags, localeLabels, locales, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

import { LanguageFlag } from './LanguageFlag'

/** Re-check whenever Next.js updates the <head> (e.g. after navigating to another page). */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.head, { childList: true, subtree: true, attributes: true })
  return () => observer.disconnect()
}

/** The address of this page in every other language, one per line in `locales` order ('' = none). */
const readAlternates = (current: Locale) =>
  locales
    .map((other) =>
      other === current
        ? ''
        : (document.querySelector(`link[rel="alternate"][hreflang="${languageTags[other]}"]`)?.getAttribute('href') ?? ''),
    )
    .join('\n')

const row = 'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[0.95rem]'

/**
 * Language menu: a round button with the current flag opens a small card listing every language
 * (flag + its own name), with a tick next to the one being read.
 *
 * A page only has a Chinese version when its translation is "Approved" in the CMS.
 * The page then lists it in <link rel="alternate" hreflang="zh-SG">, which this
 * component reads. Without it, the Chinese option is shown greyed out as "coming soon".
 *
 * `opens="up"` is for the mobile menu, where the button sits at the bottom of the screen.
 */
export function LanguageSwitcher({
  locale,
  labels,
  opens = 'down',
}: {
  locale: Locale
  labels: Dictionary['nav']
  opens?: 'down' | 'up'
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  const alternates = useSyncExternalStore(subscribe, () => readAlternates(locale), () => '').split('\n')

  // Escape or a click elsewhere closes the menu.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative"
      // Tabbing out of the menu closes it too.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${labels.languageLabel}: ${localeLabels[locale]}`}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line bg-paper px-3 text-ink-soft transition-colors hover:border-ink-soft/40 hover:text-ink aria-expanded:border-ink-soft/40 aria-expanded:text-ink"
      >
        <LanguageFlag locale={locale} />
        <CaretDown
          aria-hidden="true"
          size={12}
          weight="bold"
          className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={`absolute right-0 z-50 w-56 ${opens === 'up' ? 'bottom-full pb-2' : 'top-full pt-2'}`}
      >
        <ul className="rounded-[var(--radius-card)] bg-paper p-1.5 shadow-[0_18px_40px_-14px_rgba(30,35,34,0.4),0_2px_6px_rgba(30,35,34,0.08)]">
          {locales.map((language, index) => {
            const name = (
              <span lang={languageTags[language]} className="min-w-0">
                {localeLabels[language]}
              </span>
            )

            if (language === locale) {
              return (
                <li key={language}>
                  <button
                    type="button"
                    aria-current="true"
                    onClick={() => setOpen(false)}
                    className={`${row} font-semibold text-ink`}
                  >
                    <LanguageFlag locale={language} />
                    {name}
                    <Check aria-hidden="true" size={16} weight="bold" className="ml-auto shrink-0 text-accent" />
                  </button>
                </li>
              )
            }

            const alternate = alternates[index]
            if (!alternate) {
              return (
                <li key={language}>
                  <span aria-disabled="true" className={`${row} cursor-not-allowed text-muted`}>
                    <span className="opacity-50">
                      <LanguageFlag locale={language} />
                    </span>
                    <span className="grid">
                      {name}
                      {language === 'zh' && <span className="text-xs leading-snug">{labels.chineseComingSoon}</span>}
                    </span>
                  </span>
                </li>
              )
            }

            return (
              <li key={language}>
                <Link
                  href={new URL(alternate, 'https://example.com').pathname}
                  hrefLang={languageTags[language]}
                  onClick={() => setOpen(false)}
                  className={`${row} font-medium text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink`}
                >
                  <LanguageFlag locale={language} />
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
