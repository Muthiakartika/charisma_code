import { ArrowUpRight, Copy, InstagramLogo, Play } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import { CmsImage } from '@/components/ui/CmsImage'
import { findPublished } from '@/lib/cms'
import { localizePath } from '@/lib/paths'
import type { FounderUpdate, FounderUpdatesBlock as FounderUpdatesData, InstagramPost } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

const formatDate = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale === 'zh' ? 'zh-SG' : 'en-SG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Singapore' }).format(
    new Date(date),
  )

function UpdateCard({ update, context, large }: { update: FounderUpdate; context: BlockContext; large?: boolean }) {
  const { locale, dict } = context
  const href = update.link ? localizePath(update.link, locale) : update.instagramUrl
  const external = !update.link && Boolean(update.instagramUrl)

  const content = (
    <>
      <div className={`zoom-on-hover relative overflow-hidden rounded-[var(--radius-media)] bg-paper-deep ${large ? 'aspect-[4/3]' : 'aspect-square'}`}>
        <CmsImage media={update.image} sizes={large ? '(min-width: 1024px) 45vw, 100vw' : '(min-width: 1024px) 25vw, 100vw'} className="object-cover" />
      </div>
      <time dateTime={update.date} className="mt-4 block text-sm text-muted">
        {formatDate(update.date, locale)}
      </time>
      <h3 className="mt-1.5 text-lg font-semibold leading-snug group-hover:text-accent">{update.title}</h3>
      <p className="mt-2 text-[0.95rem] text-ink-soft">{update.description}</p>
      {external && (
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {dict.common.viewOnInstagram} <ArrowUpRight size={14} weight="bold" aria-hidden />
        </span>
      )}
    </>
  )

  if (!href) return <article>{content}</article>
  return (
    <article>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
          {content}
        </a>
      ) : (
        <Link href={href} className="group block">
          {content}
        </Link>
      )}
    </article>
  )
}

/**
 * The latest Instagram posts as a strip of reel covers, like frames on a film strip.
 * Each one opens the post on Instagram. Phones scroll the strip sideways.
 */
function InstagramStrip({ posts, context }: { posts: InstagramPost[]; context: BlockContext }) {
  const { locale, dict } = context
  return (
    <ul
      aria-label={dict.common.instagramPosts}
      tabIndex={0}
      className="ig-strip -mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0 md:pb-0"
    >
      {posts.map((post) => {
        const kind = post.mediaType === 'video' ? dict.common.instagramReel : dict.common.instagramPhoto
        const date = formatDate(post.postedAt, locale)
        const firstLine = post.caption?.trim().split('\n')[0]
        return (
          <li key={post.id} className="w-[42%] shrink-0 snap-start sm:w-[30%] md:w-auto">
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${kind}, ${date} (${dict.common.opensInstagram})`}
              className="group zoom-on-hover relative block aspect-[9/16] overflow-hidden rounded-[var(--radius-media)] bg-ink"
            >
              <CmsImage media={post.image} sizes="(min-width: 768px) 16vw, 42vw" className="object-cover" />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent"
              />
              <span aria-hidden className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/45 text-paper backdrop-blur-[2px]">
                {post.mediaType === 'video' ? (
                  <Play size={12} weight="fill" />
                ) : post.mediaType === 'carousel' ? (
                  <Copy size={13} weight="bold" />
                ) : (
                  <InstagramLogo size={14} weight="bold" />
                )}
              </span>
              <span className="absolute inset-x-3 bottom-3 text-paper">
                {firstLine && (
                  <span className="mb-1 line-clamp-2 text-[0.8rem] leading-snug opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {firstLine}
                  </span>
                )}
                <time dateTime={post.postedAt} className="block text-[0.78rem] font-medium">
                  {date}
                </time>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

/** Recent behind-the-scenes content: the latest Instagram posts, or Founder's Updates cards. */
export async function FounderUpdatesBlock({ block, context }: { block: FounderUpdatesData; context: BlockContext }) {
  const posts =
    block.source === 'updates'
      ? []
      : await findPublished('instagram-posts', {
          locale: context.locale,
          where: { showOnWebsite: { equals: true } },
          sort: '-postedAt',
          limit: block.limit ?? 6,
        })
  const updates = posts.length
    ? []
    : await findPublished('founder-updates', {
        locale: context.locale,
        where: { featured: { equals: true } },
        sort: '-date',
        limit: 3,
      })
  if (!posts.length && !updates.length) return null

  const instagram = context.settings.social.instagram
  const titleId = headingId(block)
  const header = (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary self-start md:self-auto">
          <InstagramLogo size={20} aria-hidden />
          {block.instagramLabel || context.dict.common.followOnInstagram}
        </a>
      )}
    </div>
  )

  if (posts.length) {
    return (
      <Section id={block.anchorId} labelledBy={titleId}>
        <div className="container-site">
          {header}
          <InstagramStrip posts={posts} context={context} />
        </div>
      </Section>
    )
  }

  const [first, ...rest] = updates

  return (
    <Section id={block.anchorId} labelledBy={titleId}>
      <div className="container-site">
        {header}

        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="reveal md:col-span-2 lg:col-span-6">
            <UpdateCard update={first} context={context} large />
          </div>
          {rest.map((update) => (
            <div key={update.id} className="reveal lg:col-span-3">
              <UpdateCard update={update} context={context} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
