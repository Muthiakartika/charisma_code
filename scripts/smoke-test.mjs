/**
 * Quick checks against a running website (default http://localhost:3000):
 *   npm run test:smoke                      (local)
 *   TEST_BASE_URL=https://staging… npm run test:smoke
 *
 *  1. Every old WordPress URL answers with ONE 301 redirect to the right new page
 *  2. Important pages answer 200
 *  3. SEO basics: canonical, hreflang, sitemap.xml, robots.txt
 */
import fs from 'node:fs'

const BASE = (process.env.TEST_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')
const results = []
const check = (name, pass, detail = '') => results.push({ check: name, pass, detail })

// ── 1. Legacy redirects (parsed from src/lib/legacy-redirects.ts) ──────────
const source = fs.readFileSync(new URL('../src/lib/legacy-redirects.ts', import.meta.url), 'utf8')
const pairs = [...source.matchAll(/^\s+"([^"]+)": "([^"]+)",$/gm)].map((match) => [match[1], match[2]])

const encodePath = (path) => path.split('/').map((part) => encodeURIComponent(part)).join('/')

for (const [from, to] of pairs) {
  // Old WordPress links end with "/" (except files); test exactly what Google has indexed.
  const oldUrl = /\.[a-z0-9]+$/i.test(from) ? from : `${from}/`
  const response = await fetch(`${BASE}${encodePath(oldUrl)}`, { redirect: 'manual' })
  const location = response.headers.get('location') ?? ''
  const target = location.startsWith('http') ? new URL(location).pathname : location
  check(`301 ${from}`, response.status === 301 && decodeURIComponent(target) === to, `${response.status} → ${target}`)
}

// ── 2. Pages that must work ─────────────────────────────────────────────────
const pages = [
  '/',
  '/corporate-team-building',
  '/corporate-emcee',
  '/dinner-and-dance-emcee',
  '/corporate-workshops',
  '/communication-coaching',
  '/wedding-emcee',
  '/kids-youth-programs',
  '/creative-campaigns',
  '/event-support',
  '/services',
  '/our-work',
  '/about',
  '/insights',
  '/contact',
  '/work-with-us',
  '/legal',
  '/sitemap.xml',
  '/robots.txt',
]
for (const path of pages) {
  const response = await fetch(`${BASE}${path}`, { redirect: 'manual' })
  check(`200 ${path}`, response.status === 200, String(response.status))
}

// Trailing slash and /en prefix are normalised with one 301
for (const [from, to] of [
  ['/about/', '/about'],
  ['/en/about', '/about'],
]) {
  const response = await fetch(`${BASE}${from}`, { redirect: 'manual' })
  const location = new URL(response.headers.get('location') ?? '/', BASE).pathname
  check(`301 ${from}`, response.status === 301 && location === to, `${response.status} → ${location}`)
}

// Unknown pages return 404
{
  const response = await fetch(`${BASE}/this-page-does-not-exist`, { redirect: 'manual' })
  check('404 unknown page', response.status === 404, String(response.status))
}

// ── 3. SEO basics on the most important page ───────────────────────────────
{
  const html = await (await fetch(`${BASE}/corporate-team-building`)).text()
  check('canonical tag', /<link rel="canonical" href="[^"]+\/corporate-team-building"/.test(html))
  check('hreflang en-SG', /hreflang="en-SG"/i.test(html))
  check('one <h1>', (html.match(/<h1[\s>]/g) ?? []).length === 1, `${(html.match(/<h1[\s>]/g) ?? []).length} found`)
  check('meta description', /<meta name="description" content="[^"]{50,}"/.test(html))
  check('BreadcrumbList JSON-LD', html.includes('"BreadcrumbList"'))
  check('Service JSON-LD', html.includes('"@type":"Service"'))
  check('Organization JSON-LD', html.includes('"@type":"Organization"'))
}

console.table(results.filter((result) => !result.pass).length ? results.filter((r) => !r.pass) : results.slice(-12))
const failed = results.filter((result) => !result.pass)
console.log(failed.length ? `❌ ${failed.length} of ${results.length} checks failed` : `✅ All ${results.length} checks passed`)
process.exit(failed.length ? 1 : 0)
