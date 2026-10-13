import Link from 'next/link'

import type { Where } from 'payload'

import { PostCard } from '@/components/insights/PostCard'
import { findPublished } from '@/lib/cms'
import { categoryPath, localizePath } from '@/lib/paths'
import type { PostArchiveBlock as PostArchiveData } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

export async function PostArchiveBlock({ block, context }: { block: PostArchiveData; context: BlockContext }) {
  const { locale, dict } = context
  const categoryId = block.category && typeof block.category === 'object' ? block.category.id : block.category
  const where: Where | undefined = categoryId ? { categories: { in: [categoryId] } } : undefined

  const [posts, categories] = await Promise.all([
    findPublished('posts', { locale, where, sort: '-publishedAt', limit: block.limit ?? 12 }),
    block.showCategoryLinks ? findPublished('categories', { locale, sort: 'order', depth: 0 }) : Promise.resolve([]),
  ])
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId} labelledBy={block.heading ? titleId : undefined}>
      <div className="container-site">
        <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} />

        {categories.length > 0 && (
          <nav aria-label={dict.insights.allArticles} className={block.heading ? 'mt-10' : ''}>
            <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
              {categories.map((category) => (
                <li key={category.id} className="shrink-0">
                  <Link
                    href={localizePath(categoryPath(category.slug), locale)}
                    className="inline-block rounded-full border border-ink/20 px-4 py-2 text-[0.95rem] font-medium hover:border-ink"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {posts.length ? (
          <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id} className="reveal">
                <PostCard post={post} locale={locale} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-ink-soft">{dict.insights.noPosts}</p>
        )}
      </div>
    </Section>
  )
}
