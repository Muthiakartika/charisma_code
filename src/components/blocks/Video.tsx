import { CmsImage } from '@/components/ui/CmsImage'
import { stripHighlight } from '@/components/ui/HighlightText'
import { YouTubePlayer } from '@/components/ui/YouTubePlayer'
import { getYoutubeId } from '@/lib/youtube'
import type { VideoBlock as VideoData } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

export function VideoBlock({ block, context }: { block: VideoData; context: BlockContext }) {
  const videoId = getYoutubeId(block.youtubeUrl)
  if (!videoId) return null
  const titleId = headingId(block)
  const title = stripHighlight(block.heading) || block.caption || context.pageTitle

  return (
    <Section id={block.anchorId} tone={block.tone} labelledBy={block.heading ? titleId : undefined}>
      <div className="container-site">
        <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} />
        <figure className={block.heading ? 'mt-10' : ''}>
          <div className="relative aspect-video overflow-hidden rounded-[var(--radius-media)] bg-ink">
            <YouTubePlayer
              videoId={videoId}
              title={title}
              playLabel={context.dict.common.playVideo}
              poster={
                block.poster ? (
                  <CmsImage media={block.poster} sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" alt="" />
                ) : undefined
              }
            />
          </div>
          {block.caption && (
            <figcaption className="mt-4 text-[0.95rem] text-ink-soft in-[.tone-dark]:text-on-dark-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </Section>
  )
}
