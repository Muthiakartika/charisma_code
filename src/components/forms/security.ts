/**
 * Spam protection and privacy helpers for the public forms (server only).
 *
 *  1. Honeypot: a hidden "website" field that people never see. Bots fill it in.
 *  2. Timing: the browser records when the form appeared. Submissions faster than
 *     3 seconds, or without that value (no JavaScript = typical bot), are ignored.
 *  3. Rate limit: max 3 submissions per 15 minutes from the same (anonymised) IP.
 *
 * IP addresses are never stored — only a one-way hash, to apply the rate limit (PDPA).
 */
import crypto from 'node:crypto'
import { headers } from 'next/headers'

import type { Payload } from 'payload'

const MIN_FILL_TIME_MS = 3_000
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 3

/** The visitor's IP address (used in memory only, never stored). */
export async function getClientIp() {
  const headerList = await headers()
  return headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || headerList.get('x-real-ip') || 'unknown'
}

export async function getIpHash() {
  const ip = await getClientIp()
  return crypto
    .createHash('sha256')
    .update(`${ip}:${process.env.PAYLOAD_SECRET ?? ''}`)
    .digest('hex')
    .slice(0, 32)
}

/** True when the submission looks automated. Such submissions get a fake "success" and are not saved. */
export function looksLikeBot(formData: FormData) {
  const honeypot = String(formData.get('website') ?? '')
  const startedAt = Number(formData.get('startedAt'))
  if (honeypot.trim() !== '') return true
  if (!Number.isFinite(startedAt) || startedAt <= 0) return true
  return Date.now() - startedAt < MIN_FILL_TIME_MS
}

export async function isRateLimited(
  payload: Payload,
  collection: 'enquiries' | 'freelancer-applications',
  ipHash: string,
) {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
  const { totalDocs } = await payload.count({
    collection,
    overrideAccess: true,
    where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: since } }] },
  })
  return totalDocs >= RATE_LIMIT_MAX
}

/** Human-friendly reference, e.g. ENQ-20261012-K7Q4 */
export function makeReference(prefix: 'ENQ' | 'APP') {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const code = Array.from({ length: 4 }, () => alphabet[crypto.randomInt(alphabet.length)]).join('')
  return `${prefix}-${date}-${code}`
}

/** Classifies where the visitor came from, for monthly enquiry reports. */
export function detectChannel({ referrer, utmMedium }: { referrer?: string; utmMedium?: string }) {
  const medium = (utmMedium ?? '').toLowerCase()
  if (/(cpc|ppc|paid|ads?)/.test(medium)) return 'paid'
  if (/email|newsletter/.test(medium)) return 'email'
  if (/social/.test(medium)) return 'social'
  const host = (() => {
    try {
      return referrer ? new URL(referrer).hostname : ''
    } catch {
      return ''
    }
  })()
  if (!host) return 'direct'
  if (/(google|bing|yahoo|duckduckgo|baidu|ecosia)\./.test(host)) return 'organic-search'
  if (/(instagram|facebook|linkedin|tiktok|youtube|t\.co|twitter|x\.com|threads|whatsapp|telegram)/.test(host)) return 'social'
  return 'referral'
}
