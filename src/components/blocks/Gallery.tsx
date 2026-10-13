import { CmsImage } from '@/components/ui/CmsImage'
import type { GalleryBlock as GalleryData, Media } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

/** In the mosaic, every 1st and 6th photo is shown larger. */
const mosaicSpan = (index: number) => {
  const position = index % 6
  if (position === 0) return 'sm:col-span-2 sm:row-span-2'
  if (position === 5) return 'sm:col-span-2'
  return ''
}

export function GalleryBlock({ block }: { block: GalleryData; context: BlockContext }) {
  const images = (block.images ?? []).filter((image): image is Media => typeof image === 'object' && image !== null)
  if (!images.length) return null
  const titleId = headingId(block)
  const mosaic = block.layout !== 'grid'

  return (
    <Section id={block.anchorId} labelledBy={block.heading ? titleId : undefined}>
      <div className="container-site">
        <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} />
        <ul
          className={`mt-10 grid grid-cols-2 gap-3 sm:gap-4 ${
            mosaic ? 'auto-rows-[160px] sm:auto-rows-[220px] sm:grid-cols-4' : 'sm:grid-cols-3'
          }`}
        >
          {images.map((image, index) => (
            <li
              key={image.id}
              className={`relative overflow-hidden rounded-[var(--radius-media)] bg-paper-deep ${
                mosaic ? mosaicSpan(index) : 'aspect-[4/3]'
              }`}
            >
              <CmsImage media={image} sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
