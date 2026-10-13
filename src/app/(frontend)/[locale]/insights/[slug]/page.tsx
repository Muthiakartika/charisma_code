/**
 * One blog article. Content: CMS → Blog Posts.
 */
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft } from '@phosphor-icons/react/ssr'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { PostCard, formatDate } from '@/components/insights/PostCard'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { toLocale } from '@/components/layout/CmsPage'
import { ContactBand } from '@/components/layout/ContactBand'
import { LivePreviewListener } from '@/components/layout/LivePreviewListener'
import { JsonLd } from '@/components/seo/JsonLd'
import { CmsImage } from '@/components/ui/CmsImage'
import { getDictionary } from '@/i18n/dictionaries'
import { findPublished, getPayloadClient, getPost, getSiteSettings } from '@/lib/cms'
import { categoryPath, localizePath, postPath } from '@/lib/paths'
import { articleSchema, breadcrumbSchema, buildMetadata, type Crumb } from '@/lib/seo'
import type { Category } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    limit: 1000,
    depth: 0,
    overrideAccess: false,
    select: { slug: true },
  })
  return docs.filter((doc) => doc.slug).map((doc) => ({ slug: doc.slug as string }))
}

export default async function PostPage({ params }: PageProps<'/[locale]/insights/[slug]'>) {
  const { locale: raw, slug } = await params
  const locale = toLocale(raw)
  const post = await getPost(decodeURIComponent(slug), locale)
  if (!post) notFound()

  const { isEnabled: isDraft } = await draftMode()
  if (locale === 'zh' && post.chineseTranslation !== 'approved' && !isDraft) redirect(postPath(post.slug))

  const dict = getDictionary(locale)
  const categories = (post.categories ?? []).filter((item): item is Category => typeof item === 'object' && item !== null)
  const primaryCategory = categories[0]
  const crumbs: Crumb[] = [
    { name: dict.common.home, path: '/' },
    { name: dict.insights.title, path: '/insights' },
    { name: post.title, path: postPath(post.slug) },
  ]
  const related = primaryCategory
    ? (
        await findPublished('posts', {
          locale,
          where: { and: [{ categories: { in: [primaryCategory.id] } }, { id: { not_equals: post.id } }] },
          sort: '-publishedAt',
          limit: 3,
        })
      ).filter((item) => item.id !== post.id)
    : []

  return (
    <main id="main" className="bg-surface">
      {isDraft && <LivePreviewListener />}
      <article>
        <header className="container-site pb-10 pt-8 lg:pt-12">
          <Breadcrumbs crumbs={crumbs} locale={locale} label={dict.common.breadcrumb} />
          <div className="mx-auto mt-12 max-w-3xl">
            <p className="text-sm">
              {primaryCategory && (
                <Link href={localizePath(categoryPath(primaryCategory.slug), locale)} className="font-semibold text-accent hover:underline">
                  {primaryCategory.title}
                </Link>
              )}
              {post.publishedAt && (
                <>
                  {primaryCategory && <span className="text-muted"> / </span>}
                  <time dateTime={post.publishedAt} className="text-muted">
                    {formatDate(post.publishedAt, locale)}
                  </time>
                </>
              )}
            </p>
            <h1 className="heading-xl mt-4 !text-[clamp(2.2rem,3vw+1rem,3.6rem)]">{post.title}</h1>
            <p className="lead mt-6 text-ink-soft">{post.excerpt}</p>
            {post.authorName && (
              <p className="mt-6 text-[0.95rem] text-muted">
                {dict.insights.by} <span className="font-semibold text-ink">{post.authorName}</span>
              </p>
            )}
          </div>
        </header>

        {post.coverImage && typeof post.coverImage === 'object' && (
          <div className="container-site">
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[var(--radius-media)] bg-paper-deep">
              <CmsImage media={post.coverImage} sizes="(min-width: 1100px) 1024px, 100vw" priority className="object-cover" />
            </div>
          </div>
        )}

        <div className="container-site py-16">
          <RichText data={post.content} className="prose-body mx-auto text-[1.0938rem] text-ink-soft [&_h2]:text-ink [&_h3]:text-ink [&_strong]:text-ink" />
          <div className="mx-auto mt-14 max-w-[68ch]">
            <Link href={localizePath('/insights', locale)} className="inline-flex items-center gap-2 font-semibold hover:text-accent">
              <ArrowLeft size={18} aria-hidden /> {dict.insights.backToInsights}
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-site border-t border-line py-20">
          <h2 className="heading-lg">{dict.common.readMore}</h2>
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.id}>
                <PostCard post={item} locale={locale} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ContactBand locale={locale} dict={dict} />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          path: postPath(post.slug),
          image: post.coverImage,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          authorName: post.authorName,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </main>
  )
}

export async function generateMetadata({ params }: PageProps<'/[locale]/insights/[slug]'>) {
  const { locale: raw, slug } = await params
  const locale = toLocale(raw)
  const [post, settings] = await Promise.all([getPost(decodeURIComponent(slug), locale), getSiteSettings(locale)])
  if (!post) return {}
  return buildMetadata({
    locale,
    path: postPath(post.slug),
    title: post.title,
    meta: post.meta,
    fallbackDescription: post.excerpt,
    fallbackImage: post.coverImage,
    seo: settings.seo,
    hasChinese: post.chineseTranslation === 'approved',
    type: 'article',
    publishedTime: post.publishedAt,
  })
}
