import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/paths'

/** robots.txt — staging and local copies block all search engines. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_SITE_ENV !== 'production') {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/next'] }],
    sitemap: `${siteUrl()}/sitemap.xml`,
  }
}
