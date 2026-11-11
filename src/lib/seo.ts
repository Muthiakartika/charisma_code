/**
 * SEO helpers: page metadata (title, description, canonical, hreflang, Open Graph)
 * and structured data (JSON-LD) for Google.
 *
 * Only verified business facts from the CMS are used — never invented ones.
 */
import type { Metadata } from 'next'

import { chineseForVisitors, defaultLocale, languageTags, type Locale } from '@/i18n/config'
import type { Media, SeoDefault } from '@/payload-types'

import type { SiteSettings } from './cms'
import { absoluteUrl, localizePath, siteUrl } from './paths'

type MetaFields =
  | {
      title?: string | null
      description?: string | null
      image?: number | Media | null
    }
  | null
  | undefined

type BuildMetadataArgs = {
  locale: Locale
  /** Path WITHOUT locale prefix, e.g. "/corporate-team-building" */
  path: string
  title: string
  meta?: MetaFields
  fallbackDescription?: string | null
  fallbackImage?: number | Media | null
  seo: SeoDefault
  /** True when the Chinese translation of this page is approved. */
  hasChinese: boolean
  type?: 'website' | 'article'
  publishedTime?: string | null
}

const imageUrl = (media?: number | Media | null) => {
  if (!media || typeof media !== 'object') return undefined
  return media.sizes?.openGraph?.url || media.url || undefined
}

export function buildMetadata({
  locale,
  path,
  title,
  meta,
  fallbackDescription,
  fallbackImage,
  seo,
  hasChinese,
  type = 'website',
  publishedTime,
}: BuildMetadataArgs): Metadata {
  const suffix = seo.titleSuffix ?? ''
  const fullTitle = meta?.title?.trim() || `${title}${suffix}`
  const description =
    meta?.description?.trim() || fallbackDescription || seo.defaultDescription || undefined
  const canonicalPath = localizePath(path, locale)
  const ogImage = imageUrl(meta?.image) || imageUrl(fallbackImage) || imageUrl(seo.defaultImage)

  const languages: Record<string, string> = {
    [languageTags.en]: absoluteUrl(path),
    'x-default': absoluteUrl(path),
  }
  if (hasChinese && chineseForVisitors) languages[languageTags.zh] = absoluteUrl(localizePath(path, 'zh'))

  return {
    title: { absolute: fullTitle },
    description,
    // The Chinese version stays out of search until it is approved for visitors
    ...(locale !== defaultLocale && !chineseForVisitors ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages,
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: seo.siteName,
      locale: locale === defaultLocale ? 'en_SG' : 'zh_SG',
      images: ogImage ? [{ url: ogImage }] : undefined,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

// ── Structured data (JSON-LD) ───────────────────────────────────────────────

const organizationId = () => `${siteUrl()}/#organization`
const founderId = () => `${siteUrl()}/#founder`

export function organizationSchema(settings: SiteSettings) {
  const { contact, seo } = settings
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId(),
    name: seo.siteName,
    url: siteUrl(),
    logo: `${siteUrl()}/brand/logo-stacked-dark.png`,
    slogan: 'We Bring the Spark, You Shine.',
    description: seo.organizationDescription || seo.defaultDescription,
    email: contact.email,
    telephone: contact.phone,
    areaServed: { '@type': 'Country', name: 'Singapore' },
    founder: seo.founderName ? { '@id': founderId() } : undefined,
    // No sameAs: the company has no social profiles of its own yet, only the website (client,
    // 5 Nov 2026). The profiles in Social Links are De Zhong's own, so they belong to the founder.
  }
}

export function personSchema(settings: SiteSettings) {
  const { seo, social } = settings
  if (!seo.founderName) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': founderId(),
    name: seo.founderName,
    jobTitle: seo.founderJobTitle || undefined,
    alumniOf: seo.founderAlumniOf
      ? { '@type': 'CollegeOrUniversity', name: seo.founderAlumniOf }
      : undefined,
    knowsLanguage: ['English', 'Mandarin Chinese'],
    worksFor: { '@id': organizationId() },
    // @deprinceofzhong on every platform (client, 5 Nov 2026)
    sameAs: [
      social.instagram,
      social.facebook,
      social.linkedin,
      social.youtube,
      social.tiktok,
    ].filter(Boolean),
  }
}

/** The first price in a price line, e.g. "From S$88 per participant" → 88. */
export const firstPrice = (priceLine?: string | null) => {
  const match = priceLine?.match(/S\$\s?(\d[\d,]*)/)
  return match ? Number(match[1].replace(/,/g, '')) : null
}

export function serviceSchema({
  name,
  description,
  path,
  priceFrom,
}: {
  name: string
  description?: string | null
  path: string
  /** Only when that price is shown on the page. */
  priceFrom?: number | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: description || undefined,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { '@id': organizationId() },
    areaServed: { '@type': 'Country', name: 'Singapore' },
    offers: priceFrom
      ? {
          '@type': 'Offer',
          url: absoluteUrl(path),
          priceCurrency: 'SGD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: priceFrom,
            priceCurrency: 'SGD',
          },
        }
      : undefined,
  }
}

export function articleSchema(args: {
  title: string
  description?: string | null
  path: string
  image?: number | Media | null
  publishedAt?: string | null
  updatedAt?: string | null
  authorName?: string | null
}) {
  const image = imageUrl(args.image)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.title,
    description: args.description || undefined,
    mainEntityOfPage: absoluteUrl(args.path),
    image: image ? [image.startsWith('http') ? image : `${siteUrl()}${image}`] : undefined,
    datePublished: args.publishedAt || undefined,
    dateModified: args.updatedAt || args.publishedAt || undefined,
    author: args.authorName ? { '@type': 'Person', name: args.authorName } : undefined,
    publisher: { '@id': organizationId() },
  }
}

export type Crumb = { name: string; path: string }

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

/** FAQPage structured data: only for questions that are shown on the page. */
export function faqSchema(items: { question: string; answer: string }[]) {
  if (!items.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/\n\s*\n/g, ' ') },
    })),
  }
}
