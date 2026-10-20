/**
 * Imports the blog posts from the existing WordPress website into "Blog Posts".
 * Used by `npm run migrate:wordpress` (src/seed/migrate-wordpress.ts) and by the migration
 * 20261020_033925_wordpress_posts, which imports them on Vercel during a deploy.
 *
 *  - Slugs follow docs/03-peta-migrasi-url.md (old URLs 301-redirect to /insights/{slug})
 *  - Featured and inline images are copied into the Media library
 *  - YouTube embeds become links (the page stays fast)
 *  - Yoast SEO titles/descriptions are kept; every post is marked "Needs client review"
 */
import type { Payload } from 'payload'

import { decodeEntities, htmlToLexical, importImage, upsert } from './helpers'

const WP_API = 'https://www.thecharismacode.co/wp-json/wp/v2'

type WpPost = {
  id: number
  date: string
  slug: string
  link: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  featured_media: number
  yoast_head_json?: { title?: string; description?: string }
}

/** Same slug rules as the redirect map. */
const newSlug = (wpSlug: string) => {
  if (wpSlug === 'hello-world') return 'soma-fragrances-brand-launch-behind-the-scenes'
  return decodeURIComponent(wpSlug)
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/-+$/, '')
}

/** Picks a category from the article's subject. */
const categoryFor = (slug: string): string => {
  if (/maris-stella|children|princess|kids/.test(slug)) return 'kids-programs'
  if (/compass|mediacorp|meet-chia|every-moment|trendjacking|hello-world|soma/.test(slug)) return 'founder-updates'
  if (/wedding/.test(slug)) return 'weddings'
  if (/workshop/.test(slug)) return 'workshops'
  if (/how-to-be|become-a-professional-emcee|speak-confidently/.test(slug)) return 'communication'
  if (/team/.test(slug)) return 'team-building'
  return 'corporate-events'
}

const stripTags = (html: string) =>
  decodeEntities(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()

const shorten = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`

type Options = {
  /** Leave posts that already exist (matched by slug) untouched, e.g. edited in the CMS. */
  onlyMissing?: boolean
  /** When WordPress cannot be reached, log a warning instead of failing. */
  skipWhenUnreachable?: boolean
}

/** Returns the number of posts created or updated. */
export async function importWordPressPosts(payload: Payload, { onlyMissing = false, skipWhenUnreachable = false }: Options = {}) {
  const log = (message: string) => payload.logger.info(`[wordpress] ${message}`)

  const categories = await payload.find({ collection: 'categories', limit: 50, depth: 0 })
  if (categories.docs.length === 0) {
    log('skipped: no blog categories yet (run the seed first)')
    return 0
  }
  const categoryId = (slug: string) => categories.docs.find((category) => category.slug === slug)?.id

  let posts: WpPost[]
  try {
    const response = await fetch(`${WP_API}/posts?per_page=100`)
    if (!response.ok) throw new Error(`WordPress answered ${response.status}`)
    posts = (await response.json()) as WpPost[]
  } catch (error) {
    if (!skipWhenUnreachable) throw error
    payload.logger.warn({ err: error }, '[wordpress] skipped: the WordPress website could not be reached')
    return 0
  }
  log(`Found ${posts.length} posts`)

  const existing = onlyMissing
    ? new Set(
        (await payload.find({ collection: 'posts', limit: 1000, depth: 0, pagination: false, draft: true })).docs.map(
          (post) => post.slug,
        ),
      )
    : new Set<string>()

  let imported = 0
  for (const post of posts) {
    const slug = newSlug(post.slug)
    if (existing.has(slug)) continue
    const title = decodeEntities(post.title.rendered).replace(/\s*[✀-➿\u{1F300}-\u{1FAFF}️]+\s*$/u, '').trim()

    // Featured image
    let coverImage: number | undefined
    if (post.featured_media) {
      try {
        const media = (await (await fetch(`${WP_API}/media/${post.featured_media}`)).json()) as {
          source_url: string
          alt_text?: string
          media_details?: { sizes?: Record<string, { source_url: string }> }
        }
        const url = media.media_details?.sizes?.['1536x1536']?.source_url ?? media.source_url
        coverImage = await importImage(payload, { url, alt: media.alt_text?.trim() || title })
      } catch (error) {
        payload.logger.warn({ err: error }, `[wordpress] No cover image for ${slug}`)
      }
    }

    // Content: copy inline images, turn embeds into links, drop scripts/styles
    let html = post.content.rendered
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '')
      .replace(/<iframe[^>]*src="[^"]*(?:youtube\.com\/embed\/|youtu\.be\/)([\w-]{11})[^"]*"[^>]*><\/iframe>/gi, (_m, id: string) =>
        `<p><a href="https://youtu.be/${id}">Watch the video on YouTube</a></p>`,
      )
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')

    const imageTags = [...html.matchAll(/<img[^>]*>/gi)].map((match) => match[0])
    for (const tag of imageTags) {
      const src = tag.match(/src="([^"]+)"/)?.[1]
      if (!src || !src.includes('thecharismacode.co/wp-content/uploads')) {
        html = html.replace(tag, '')
        continue
      }
      try {
        // Use the original file rather than a resized copy (e.g. photo-1024x683.jpg → photo.jpg)
        const original = src.replace(/-\d+x\d+(?=\.\w+$)/, '')
        const alt = decodeEntities(tag.match(/alt="([^"]*)"/)?.[1] ?? '').trim() || title
        const id = await importImage(payload, { url: original, alt }).catch(() => importImage(payload, { url: src, alt }))
        html = html.replace(tag, `<img data-lexical-upload-id="${id}" data-lexical-upload-relation-to="media" />`)
      } catch {
        html = html.replace(tag, '')
      }
    }

    const content = await htmlToLexical(payload, decodeEntities(html))
    const excerpt = shorten(stripTags(post.yoast_head_json?.description || post.excerpt.rendered), 230)
    const category = categoryId(categoryFor(post.slug))

    await upsert(payload, 'posts', { slug: { equals: slug } }, {
      title,
      slug,
      generateSlug: false,
      excerpt,
      coverImage,
      content,
      categories: category ? [category] : [],
      authorName: 'Chia De Zhong',
      publishedAt: new Date(post.date).toISOString(),
      legacyUrl: new URL(post.link).pathname,
      meta: {
        title: post.yoast_head_json?.title ? decodeEntities(post.yoast_head_json.title) : undefined,
        description: post.yoast_head_json?.description ? decodeEntities(post.yoast_head_json.description) : undefined,
        image: coverImage,
      },
      reviewStatus: 'needs-client-review',
      _status: 'published',
    })
    imported += 1
    log(`✓ ${slug}`)
  }

  log(`Done: ${imported} imported${onlyMissing ? `, ${existing.size} already there` : ''}.`)
  return imported
}
