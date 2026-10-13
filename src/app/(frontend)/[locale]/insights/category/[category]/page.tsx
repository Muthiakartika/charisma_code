/**
 * Articles in one category, e.g. /insights/category/team-building
 * Categories are managed in CMS → Insights (Blog) → Categories.
 */
import { notFound } from 'next/navigation'

import { PostCard } from '@/components/insights/PostCard'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { toLocale } from '@/components/layout/CmsPage'
import { JsonLd } from '@/components/seo/JsonLd'
import { getDictionary } from '@/i18n/dictionaries'
import { findPublished, getSiteSettings } from '@/lib/cms'
import { categoryPath } from '@/lib/paths'
import { breadcrumbSchema, buildMetadata, type Crumb } from '@/lib/seo'

const getCategory = async (slug: string, locale: ReturnType<typeof toLocale>) =>
  (await findPublished('categories', { locale, where: { slug: { equals: slug } }, limit: 1, depth: 0 }))[0] ?? null

export default async function CategoryPage({ params }: PageProps<'/[locale]/insights/category/[category]'>) {
  const { locale: raw, category: slug } = await params
  const locale = toLocale(raw)
  const category = await getCategory(decodeURIComponent(slug), locale)
  if (!category) notFound()

  const dict = getDictionary(locale)
  const posts = await findPublished('posts', {
    locale,
    where: { categories: { in: [category.id] } },
    sort: '-publishedAt',
    limit: 60,
  })
  const crumbs: Crumb[] = [
    { name: dict.common.home, path: '/' },
    { name: dict.insights.title, path: '/insights' },
    { name: category.title, path: categoryPath(category.slug) },
  ]

  return (
    <main id="main" className="bg-surface">
      <header className="border-b border-line">
        <div className="container-site pb-12 pt-8 lg:pb-16 lg:pt-12">
          <Breadcrumbs crumbs={crumbs} locale={locale} label={dict.common.breadcrumb} />
          <h1 className="heading-xl mt-10 max-w-4xl">{category.title}</h1>
          {category.description && <p className="lead mt-6 text-ink-soft">{category.description}</p>}
        </div>
      </header>
      <section className="container-site py-16">
        {posts.length ? (
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <PostCard post={post} locale={locale} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-soft">{dict.insights.noPosts}</p>
        )}
      </section>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </main>
  )
}

export async function generateMetadata({ params }: PageProps<'/[locale]/insights/category/[category]'>) {
  const { locale: raw, category: slug } = await params
  const locale = toLocale(raw)
  const [category, settings] = await Promise.all([getCategory(decodeURIComponent(slug), locale), getSiteSettings(locale)])
  if (!category) return {}
  return buildMetadata({
    locale,
    path: categoryPath(category.slug),
    title: `${category.title} articles`,
    fallbackDescription: category.description,
    seo: settings.seo,
    // Category listing pages stay English-only until Chinese articles exist.
    hasChinese: false,
  })
}
