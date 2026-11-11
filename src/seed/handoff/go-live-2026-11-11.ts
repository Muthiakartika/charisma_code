/**
 * Content from the go-live changes and the blog plan of 11 Nov 2026 (docs/12-go-live-11-nov.md) that
 * does not live in a page brief: the retired blog posts are unpublished, links in the kept posts to
 * old addresses point straight at their new page, the Kids & Youth menu entry no longer mentions
 * camps, and the "Pool party" label comes off a review shown on corporate pages.
 * Runs once on staging with the handoff update "2026-11-11" (deploy.ts). Safe to repeat: each change
 * applies only while the old content is still there, so later edits in the CMS are left alone.
 */
import type { Payload } from 'payload'

import { legacyRedirects, retiredPostSlugs } from '../../lib/legacy-redirects'
import { seedContext } from '../helpers'

type LexicalNode = { type?: string; fields?: { url?: string }; children?: LexicalNode[] }

/**
 * The page an old link ends on, when it points to a redirected address on this site
 * ("https://www.thecharismacode.co/services/emcee/" → "/emcee"), or undefined.
 */
function finalTarget(url?: string) {
  const match = url?.match(/^(?:https?:\/\/(?:www\.)?thecharismacode\.co)?(\/[^?#]*)([?#].*)?$/)
  if (!match) return undefined
  let path = match[1]
  try {
    path = decodeURIComponent(path)
  } catch {
    // keep the raw path
  }
  path = path.length > 1 ? path.replace(/\/+$/, '') : path
  return legacyRedirects[path]
}

/** Points links to redirected addresses straight at their new page; returns how many changed. */
function relinkOldUrls(node: LexicalNode): number {
  let changed = 0
  const target = node.type === 'link' ? finalTarget(node.fields?.url) : undefined
  if (target && node.fields) {
    node.fields.url = target
    changed += 1
  }
  for (const child of node.children ?? []) changed += relinkOldUrls(child)
  return changed
}

export async function applyGoLive20261111(payload: Payload) {
  const log = (message: string) => payload.logger.info(`[go-live 11 Nov] ${message}`)

  // Blog plan: 63 posts (and the old /hello-world/ SOMA post) leave /insights. They stay in the CMS
  // as drafts; their old URLs and /insights copies redirect (src/lib/legacy-redirects.ts).
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { slug: { in: [...retiredPostSlugs] }, _status: { equals: 'published' } },
    limit: 1000,
    depth: 0,
    pagination: false,
  })
  for (const post of posts) {
    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { _status: 'draft' },
      context: seedContext(),
    })
  }
  log(`${posts.length} retired blog posts unpublished`)

  // The kept posts still link to old WordPress addresses, two of them to retired posts: each link
  // now points straight at its new page (one less redirect for readers and search engines)
  const { docs: kept } = await payload.find({
    collection: 'posts',
    where: { slug: { not_in: [...retiredPostSlugs] } },
    locale: 'en',
    limit: 1000,
    depth: 0,
    pagination: false,
  })
  for (const post of kept) {
    const content = structuredClone(post.content) as { root: LexicalNode } | null
    const changed = content?.root ? relinkOldUrls(content.root) : 0
    if (!changed) continue
    await payload.update({
      collection: 'posts',
      id: post.id,
      locale: 'en',
      data: { content: content as never },
      context: seedContext(),
    })
    log(`/insights/${post.slug}: ${changed} old links pointed at their new page`)
  }

  // Kids & Youth: no camps have run yet
  const navigation = await payload.findGlobal({ slug: 'navigation', depth: 0, locale: 'en' })
  let menuChanged = false
  for (const item of navigation.mainMenu ?? []) {
    for (const child of item.children ?? []) {
      if (child.description === 'School programmes and camps') {
        child.description = 'School programmes'
        menuChanged = true
      }
    }
  }
  if (menuChanged) {
    await payload.updateGlobal({
      slug: 'navigation',
      locale: 'en',
      data: { mainMenu: navigation.mainMenu },
      context: seedContext(),
    })
    log('menu: Kids & Youth now reads "School programmes"')
  }

  // "Pool party · Google review" sat under a corporate review: the occasion label goes
  const { docs: reviews } = await payload.find({
    collection: 'testimonials',
    where: { authorRole: { equals: 'Pool party' } },
    locale: 'en',
    depth: 0,
    limit: 10,
  })
  for (const review of reviews) {
    await payload.update({
      collection: 'testimonials',
      id: review.id,
      locale: 'en',
      data: { authorRole: '' },
      context: seedContext(),
    })
    log(`review by ${review.authorName}: "Pool party" label removed`)
  }
}
