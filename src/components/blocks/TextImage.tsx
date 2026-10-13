import { Bullet } from '@/components/ui/Bullet'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { HighlightText, Paragraphs } from '@/components/ui/HighlightText'
import { resolveLink } from '@/lib/links'
import type { TextImageBlock as TextImageData } from '@/payload-types'

import { headingId, Section, type BlockContext } from './shared'

export function TextImageBlock({ block, context }: { block: TextImageData; context: BlockContext }) {
  const button = resolveLink(block.button, context.locale)
  const imageLeft = block.imagePosition === 'left'
  const portrait = block.imageShape === 'portrait'
  const dark = block.tone === 'dark'
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`reveal ${portrait ? 'lg:col-span-5' : 'lg:col-span-6'} ${imageLeft ? '' : 'lg:order-2'}`}>
          <div
            className={`relative overflow-hidden rounded-[var(--radius-media)] bg-paper-deep ${
              portrait ? 'aspect-[4/5] in-data-[theme=wedding]:rounded-t-full' : 'aspect-[5/4]'
            }`}
          >
            <CmsImage media={block.image} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>

        <div className={`${portrait ? 'lg:col-span-7' : 'lg:col-span-6'} ${imageLeft ? 'lg:pl-4' : 'lg:pr-4'}`}>
          {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
          <h2 id={titleId} className="heading-lg">
            <HighlightText text={block.heading} />
          </h2>
          <div className={`mt-6 space-y-4 ${dark ? 'text-on-dark-muted' : 'text-ink-soft'}`}>
            <Paragraphs text={block.body} />
          </div>

          {block.points && block.points.length > 0 && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {block.points.map((point, index) => (
                <li key={point.id ?? index} className="flex items-start gap-3">
                  <Bullet />
                  <span className="font-medium">{point.text}</span>
                </li>
              ))}
            </ul>
          )}

          {button && (
            <div className="mt-10">
              <ButtonLink link={button} />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
