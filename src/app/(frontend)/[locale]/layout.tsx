/**
 * The frame around every website page: <html>, fonts, header, footer and analytics.
 * Page content lives in the page.tsx files next to this file.
 */
import '@/styles/globals.css'

import type { Metadata } from 'next'

import { Analytics } from '@/components/analytics/Analytics'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { JsonLd } from '@/components/seo/JsonLd'
import { defaultLocale, isLocale, languageTags, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getSiteSettings } from '@/lib/cms'
import { siteUrl } from '@/lib/paths'
import { organizationSchema } from '@/lib/seo'
import { bodyFont, displayFont } from '@/styles/fonts'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === 'production'
const gaId = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '')
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  : undefined

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const { seo } = await getSiteSettings(locale)
  return {
    metadataBase: new URL(siteUrl()),
    title: seo.siteName,
    description: seo.defaultDescription,
    applicationName: seo.siteName,
    // Staging and local copies must never appear in Google.
    robots: isProductionSite ? { index: true, follow: true } : { index: false, follow: false },
    verification: seo.googleSiteVerification ? { google: seo.googleSiteVerification } : undefined,
  }
}

export default async function SiteLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const settings = await getSiteSettings(locale)
  const dict = getDictionary(locale)

  return (
    <html lang={languageTags[locale]} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <Header settings={settings} locale={locale} dict={dict} />
        {children}
        <Footer settings={settings} locale={locale} dict={dict} />
        <JsonLd data={organizationSchema(settings)} />
        <Analytics measurementId={gaId} />
      </body>
    </html>
  )
}
