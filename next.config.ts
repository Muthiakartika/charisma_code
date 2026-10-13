import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Only the live production site may be indexed by search engines.
// Staging/preview/local deployments send "noindex" headers.
const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === 'production'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ...(isProductionSite
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }]
    : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]),
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Trailing slashes are removed in src/proxy.ts, so old WordPress URLs
  // (which end with "/") redirect to their new address in a single hop.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // 70 is used for the large hero photo (smaller file, same visual quality), 75 for everything else.
    qualities: [70, 75],
    // Images that may be optimised: CMS uploads and the brand files in /public/brand
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/brand/**' }],
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
  experimental: {
    serverActions: {
      // Freelancer applications can include a résumé (max 5 MB, checked again on the server).
      bodySizeLimit: '6mb',
    },
  },
  // Needed on Windows while Turbopack resolves the Payload admin Sass files.
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
