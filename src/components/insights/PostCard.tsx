import Link from 'next/link'

import { CmsImage } from '@/components/ui/CmsImage'
import type { Locale } from '@/i18n/config'
import { localizePath, postPath } from '@/lib/paths'
import type { Post } from '@/payload-types'

export const formatDate = (date: string | null | undefined, locale: Locale) =>
  date
    ? new Intl.DateTimeFormat(locale === 'zh' ? 'zh-SG' : 'en-SG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Singapore' }).format(
        new Date(date),
      )
    : null

export function PostCard({ post, locale }: { post: Post; locale: Locale }) {
  const category = (post.categories ?? []).find((item) => typeof item === 'object' && item !== null)
  const date = formatDate(post.publishedAt, locale)

  return (
    <Link href={localizePath(postPath(post.slug), locale)} className="group block">
      <div className="zoom-on-hover relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] bg-paper-deep">
        <CmsImage media={post.coverImage} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <p className="mt-4 text-sm">
        {category && typeof category === 'object' && <span className="font-semibold text-accent">{category.title}</span>}
        {category && date && <span className="text-muted"> / </span>}
        {date && (
          <time dateTime={post.publishedAt ?? undefined} className="text-muted">
            {date}
          </time>
        )}
      </p>
      <h3 className="heading-md mt-2 group-hover:text-accent">{post.title}</h3>
      <p className="mt-2 line-clamp-3 text-ink-soft">{post.excerpt}</p>
    </Link>
  )
}
