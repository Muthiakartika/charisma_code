/**
 * Functions that read content from Payload CMS for the website.
 *
 * They use Payload's "Local API" (direct database access, no HTTP request) and
 * always respect access rules (`overrideAccess: false`), so visitors only ever
 * receive published content. In draft/preview mode, logged-in editors see drafts.
 */
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'

import type { Locale } from '@/i18n/config'
import type { Config } from '@/payload-types'

import { pagePath, postPath, projectPath } from './paths'

export const getPayloadClient = () => getPayload({ config: configPromise })

const isDraftMode = async () => {
  try {
    return (await draftMode()).isEnabled
  } catch {
    // draftMode() is not available outside of a request (e.g. sitemap generation)
    return false
  }
}

/** One page by slug, e.g. getPage('corporate-team-building', 'en') */
export const getPage = cache(async (slug: string, locale: Locale) => {
  const draft = await isDraftMode()
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale,
    fallbackLocale: 'en',
    draft,
    overrideAccess: draft,
    depth: 2,
    limit: 1,
    pagination: false,
  })
  return result.docs[0] ?? null
})

export const getPost = cache(async (slug: string, locale: Locale) => {
  const draft = await isDraftMode()
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    locale,
    fallbackLocale: 'en',
    draft,
    overrideAccess: draft,
    depth: 2,
    limit: 1,
    pagination: false,
  })
  return result.docs[0] ?? null
})

export const getProject = cache(async (slug: string, locale: Locale) => {
  const draft = await isDraftMode()
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    locale,
    fallbackLocale: 'en',
    draft,
    overrideAccess: draft,
    depth: 2,
    limit: 1,
    pagination: false,
  })
  return result.docs[0] ?? null
})

type GlobalSlug = keyof Config['globals']

const getGlobal = cache(async <T extends GlobalSlug>(slug: T, locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug, locale, fallbackLocale: 'en', depth: 1, overrideAccess: false })
})

/** Everything the header, footer and SEO tags need, fetched together. */
export const getSiteSettings = cache(async (locale: Locale) => {
  const [header, navigation, footer, contact, social, seo] = await Promise.all([
    getGlobal('header', locale),
    getGlobal('navigation', locale),
    getGlobal('footer', locale),
    getGlobal('contact-information', locale),
    getGlobal('social-links', locale),
    getGlobal('seo-defaults', locale),
  ])
  return { header, navigation, footer, contact, social, seo }
})

export type SiteSettings = Awaited<ReturnType<typeof getSiteSettings>>

/**
 * Redirects created by editors in CMS → Settings → Redirects.
 * (Old WordPress URLs are handled earlier, in src/proxy.ts.)
 */
export const getCmsRedirect = cache(async (path: string) => {
  const payload = await getPayloadClient()
  const variants = [path, `${path}/`]
  const { docs } = await payload.find({
    collection: 'redirects',
    where: { from: { in: variants } },
    depth: 1,
    limit: 1,
    overrideAccess: false,
  })
  const item = docs[0]
  if (!item) return null

  let url: string | null = null
  if (item.to?.type === 'custom') {
    url = item.to.url ?? null
  } else {
    const reference = item.to?.reference
    const doc = reference && typeof reference.value === 'object' ? reference.value : null
    if (doc && 'slug' in doc && doc.slug) {
      url =
        reference?.relationTo === 'posts'
          ? postPath(doc.slug)
          : reference?.relationTo === 'projects'
            ? projectPath(doc.slug)
            : pagePath(doc.slug)
    }
  }
  return url ? { url, permanent: item.type !== '302' } : null
})

/** Generic published-content query used by blocks (services, testimonials, projects…). */
export const findPublished = async <T extends keyof Config['collections']>(
  collection: T,
  options: { locale: Locale; where?: Where; sort?: string; limit?: number; depth?: number },
) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection,
    locale: options.locale,
    fallbackLocale: 'en',
    where: options.where,
    sort: options.sort,
    limit: options.limit ?? 50,
    depth: options.depth ?? 1,
    overrideAccess: false,
    pagination: false,
  })
  return result.docs
}
