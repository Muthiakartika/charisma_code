/**
 * sitemap.xml — every published page, project, article and category.
 * Chinese URLs are only included when their translation is approved.
 */
import type { MetadataRoute } from 'next'

import { languageTags } from '@/i18n/config'
import { getPayloadClient } from '@/lib/cms'
import { absoluteUrl, categoryPath, localizePath, pagePath, postPath, projectPath } from '@/lib/paths'

export const revalidate = 3600

type Entry = { path: string; updatedAt?: string | null; hasChinese?: boolean; priority?: number }

const PRIORITY: Record<string, number> = {
  '/': 1,
  '/corporate-team-building': 0.95,
  '/corporate-emcee': 0.9,
  '/dinner-and-dance-emcee': 0.9,
  '/chinese-new-year-emcee': 0.85,
  '/corporate-workshops': 0.85,
}

const toSitemap = ({ path, updatedAt, hasChinese, priority }: Entry): MetadataRoute.Sitemap => {
  const languages: Record<string, string> = { [languageTags.en]: absoluteUrl(path) }
  if (hasChinese) languages[languageTags.zh] = absoluteUrl(localizePath(path, 'zh'))
  const base = {
    lastModified: updatedAt ? new Date(updatedAt) : undefined,
    priority: priority ?? PRIORITY[path] ?? 0.6,
    alternates: { languages },
  }
  const entries: MetadataRoute.Sitemap = [{ url: absoluteUrl(path), ...base }]
  if (hasChinese) entries.push({ url: absoluteUrl(localizePath(path, 'zh')), ...base })
  return entries
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const query = { limit: 1000, depth: 0, overrideAccess: false, pagination: false } as const

  const [pages, posts, projects, categories] = await Promise.all([
    payload.find({ collection: 'pages', ...query, select: { slug: true, updatedAt: true, chineseTranslation: true } }),
    payload.find({ collection: 'posts', ...query, select: { slug: true, updatedAt: true, chineseTranslation: true } }),
    payload.find({
      collection: 'projects',
      ...query,
      where: { hasDetailPage: { not_equals: false } },
      select: { slug: true, updatedAt: true, chineseTranslation: true },
    }),
    payload.find({ collection: 'categories', ...query, select: { slug: true, updatedAt: true } }),
  ])

  return [
    ...pages.docs.flatMap((doc) =>
      toSitemap({ path: pagePath(doc.slug), updatedAt: doc.updatedAt, hasChinese: doc.chineseTranslation === 'approved' }),
    ),
    ...projects.docs.flatMap((doc) =>
      toSitemap({ path: projectPath(doc.slug), updatedAt: doc.updatedAt, hasChinese: doc.chineseTranslation === 'approved', priority: 0.6 }),
    ),
    ...posts.docs.flatMap((doc) =>
      toSitemap({ path: postPath(doc.slug), updatedAt: doc.updatedAt, hasChinese: doc.chineseTranslation === 'approved', priority: 0.5 }),
    ),
    ...categories.docs.flatMap((doc) => toSitemap({ path: categoryPath(doc.slug), updatedAt: doc.updatedAt, priority: 0.4 })),
  ]
}
