import Image from 'next/image'

import type { Media } from '@/payload-types'

type Props = {
  media?: number | Media | null
  /** Tells the browser how wide the image is shown, e.g. "(min-width: 1024px) 50vw, 100vw" */
  sizes: string
  className?: string
  /** Use for the main hero image only (loads it first for a fast page). */
  priority?: boolean
  /** Fill the parent element (the parent needs a size and `position: relative`). */
  fill?: boolean
  alt?: string
}

/**
 * Shows an image uploaded to the CMS with automatic resizing (AVIF/WebP),
 * lazy loading and the focal point chosen in the admin.
 */
export function CmsImage({ media, sizes, className = '', priority, fill = true, alt }: Props) {
  if (!media || typeof media !== 'object' || !media.url) return null
  if (media.mimeType && !media.mimeType.startsWith('image/')) return null

  const objectPosition =
    typeof media.focalX === 'number' && typeof media.focalY === 'number'
      ? `${media.focalX}% ${media.focalY}%`
      : 'center'

  const altText = alt ?? media.alt ?? ''
  const common = {
    src: media.url,
    sizes,
    // Next.js 16: the main (LCP) image loads immediately with high priority.
    ...(priority ? { loading: 'eager' as const, fetchPriority: 'high' as const, quality: 70 } : {}),
    className,
    style: { objectPosition },
  }

  if (fill) {
    return <Image {...common} alt={altText} fill />
  }

  return <Image {...common} alt={altText} width={media.width ?? 1200} height={media.height ?? 800} />
}
