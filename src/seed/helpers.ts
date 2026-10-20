/**
 * Helpers for the seed / WordPress migration scripts.
 */
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'
import type { CollectionSlug, Payload, Where } from 'payload'

import { seedFileName } from './media'

/** The seed runs outside Next.js, so cache revalidation is switched off. */
export const seedContext = { disableRevalidate: true }

const CACHE_DIR = path.resolve(process.cwd(), '.seed-cache')

/** Downloads a file once and keeps it in .seed-cache/ so re-running the seed is fast. */
export async function downloadToCache(url: string): Promise<{ buffer: Buffer; name: string; mimetype: string }> {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
  const name = seedFileName(url)
  const cached = path.join(CACHE_DIR, name)
  if (!fs.existsSync(cached)) {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Download failed (${response.status}): ${url}`)
    fs.writeFileSync(cached, Buffer.from(await response.arrayBuffer()))
  }
  const extension = name.split('.').pop()?.toLowerCase()
  const mimetype =
    extension === 'png'
      ? 'image/png'
      : extension === 'webp'
        ? 'image/webp'
        : extension === 'pdf'
          ? 'application/pdf'
          : 'image/jpeg'
  return { buffer: fs.readFileSync(cached), name, mimetype }
}

export type ImageSpec = {
  url: string
  alt: string
  /** Mark photos that should be replaced by better/more relevant ones. */
  needsReplacement?: boolean
  /** Where the subject is (0–100 %), so crops keep faces in frame. Editors can change it in the admin. */
  focal?: { x: number; y: number }
}

/** Imports an image into the Media collection (skips it if a file with the same name exists). */
export async function importImage(payload: Payload, spec: ImageSpec): Promise<number> {
  const file = await downloadToCache(spec.url)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: file.name } },
    limit: 1,
    depth: 0,
  })
  const focal = spec.focal ? { focalX: spec.focal.x, focalY: spec.focal.y } : {}
  if (existing.docs[0]) {
    if (spec.focal) {
      await payload.update({ collection: 'media', id: existing.docs[0].id, data: focal, context: seedContext })
    }
    return existing.docs[0].id
  }

  const doc = await payload.create({
    collection: 'media',
    context: seedContext,
    data: { alt: spec.alt, needsReplacement: Boolean(spec.needsReplacement), ...focal },
    file: { data: file.buffer, mimetype: file.mimetype, name: file.name, size: file.buffer.length },
  })
  return doc.id
}

/**
 * Imports a file that lives in the repository (e.g. a client logo in src/seed/logos/).
 * When the file on disk changed since the last seed, the stored copy is replaced.
 */
export async function importLocalImage(payload: Payload, filePath: string, alt: string): Promise<number> {
  const buffer = fs.readFileSync(filePath)
  const name = path.basename(filePath)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: name } },
    limit: 1,
    depth: 0,
  })
  const mimetype = /\.jpe?g$/i.test(name) ? 'image/jpeg' : /\.webp$/i.test(name) ? 'image/webp' : 'image/png'
  const file = { data: buffer, mimetype, name, size: buffer.length }
  const doc = existing.docs[0]
  if (doc) {
    if (doc.filesize !== buffer.length) {
      await payload.update({ collection: 'media', id: doc.id, data: { alt }, file, context: seedContext })
    }
    return doc.id
  }
  const created = await payload.create({ collection: 'media', data: { alt }, file, context: seedContext })
  return created.id
}

/** Creates a document, or updates it when one already matches `where` (so the seed can run twice). */
export async function upsert<T extends CollectionSlug>(
  payload: Payload,
  collection: T,
  where: Where,
  data: Record<string, unknown>,
): Promise<number> {
  const existing = await payload.find({ collection, where, limit: 1, depth: 0, draft: true })
  if (existing.docs[0]) {
    const updated = await payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
      context: seedContext,
      draft: false,
    })
    return updated.id as number
  }
  const created = await payload.create({ collection, data: data as never, context: seedContext, draft: false })
  return created.id as number
}

/** Converts HTML to the CMS rich-text format. */
export async function htmlToLexical(payload: Payload, html: string) {
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const result = convertHTMLToLexical({ editorConfig, html, JSDOM })
  // Upload ids from HTML come in as strings; the database uses numbers.
  const fixIds = (node: Record<string, unknown>) => {
    if (node.type === 'upload' && typeof node.value === 'string' && /^\d+$/.test(node.value)) {
      node.value = Number(node.value)
    }
    if (Array.isArray(node.children)) node.children.forEach((child) => fixIds(child as Record<string, unknown>))
  }
  fixIds(result.root as unknown as Record<string, unknown>)
  return result
}

/** Builds simple rich text from paragraphs, e.g. for short legal notes. */
export const decodeEntities = (text: string) =>
  text
    .replace(/&#8217;|&#039;|&#8216;/g, "'")
    .replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&#8211;|&#8212;/g, '-')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8230;/g, '…')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
