/**
 * Runs before every website request (not for /admin or /api).
 *
 *  1. Old WordPress URLs           → 301 to their new address (src/lib/legacy-redirects.ts)
 *  2. URLs ending with "/"         → 301 to the same URL without "/" (one hop, no chains)
 *  3. /en/...                      → 301 to the URL without /en (English has no prefix)
 *  4. /zh/...                      → Chinese pages, served as they are
 *  5. Everything else              → internally served by the English pages (/en/...)
 */
import { NextResponse, type NextRequest } from 'next/server'

import { legacyPrefixRedirects, legacyRedirects } from '@/lib/legacy-redirects'

const FILE_PATTERN = /\.[a-z0-9]{2,5}$/i

const permanentRedirect = (request: NextRequest, pathname: string) => {
  // Build a fresh URL: cloning nextUrl would keep the original trailing slash.
  const url = new URL(pathname + request.nextUrl.search, request.url)
  return NextResponse.redirect(url, 301)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  let decoded = pathname
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    // Keep the raw path if it is not valid URL encoding.
  }
  const withoutSlash = decoded.length > 1 ? decoded.replace(/\/+$/, '') : decoded

  // 1. Legacy WordPress addresses
  const legacyTarget =
    legacyRedirects[withoutSlash] ??
    legacyPrefixRedirects.find((rule) => `${withoutSlash}/`.startsWith(rule.prefix))?.to
  if (legacyTarget) return permanentRedirect(request, legacyTarget)

  // 2. Remove trailing slash
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return permanentRedirect(request, pathname.replace(/\/+$/, ''))
  }

  // Files such as /sitemap.xml, /robots.txt and images in /public
  if (FILE_PATTERN.test(pathname)) return NextResponse.next()

  // 3. English is the default language and has no prefix
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return permanentRedirect(request, pathname.slice(3) || '/')
  }

  // 4. Chinese pages
  if (pathname === '/zh' || pathname.startsWith('/zh/')) return NextResponse.next()

  // 5. English pages live in the [locale] folder as "en"
  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip the CMS (/admin), its API (/api), Next.js internals and the preview routes (/next/...).
  matcher: ['/((?!api(?:/|$)|admin(?:/|$)|_next/|next/).*)'],
}
