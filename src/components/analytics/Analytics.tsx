'use client'

import Script from 'next/script'
import { useEffect } from 'react'

import { rememberAttribution, trackEvent, type AnalyticsEvent } from '@/lib/analytics'

/** Which link clicks are tracked (no code needed on individual links). */
const clickRules: Array<{ test: (href: string) => boolean; event: AnalyticsEvent }> = [
  { test: (href) => href.startsWith('tel:'), event: 'contact_phone_click' },
  { test: (href) => href.startsWith('mailto:'), event: 'contact_email_click' },
  { test: (href) => /wa\.me|api\.whatsapp\.com/.test(href), event: 'contact_whatsapp_click' },
  { test: (href) => /instagram\.com/.test(href), event: 'social_instagram_click' },
]

/**
 * Loads Google Analytics 4 (only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set)
 * and tracks clicks on phone, email, WhatsApp and Instagram links.
 */
export function Analytics({ measurementId }: { measurementId?: string }) {
  useEffect(() => {
    rememberAttribution()

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a')
      const href = anchor?.getAttribute('href')
      if (!href) return
      const rule = clickRules.find((item) => item.test(href))
      if (rule) {
        trackEvent(rule.event, {
          page_path: window.location.pathname,
          link_location: anchor?.closest('header') ? 'header' : anchor?.closest('footer') ? 'footer' : 'page',
        })
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (!measurementId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
    </>
  )
}
