import { RichText } from '@payloadcms/richtext-lexical/react'

import { HighlightText } from '@/components/ui/HighlightText'
import type { RichTextBlock as RichTextData } from '@/payload-types'

import { headingId, Section, type BlockContext } from './shared'

export function RichTextBlock({ block }: { block: RichTextData; context: BlockContext }) {
  const titleId = headingId(block)
  return (
    <Section id={block.anchorId} labelledBy={block.heading ? titleId : undefined}>
      <div className="container-site">
        {block.heading && (
          <h2 id={titleId} className="heading-lg mb-10 max-w-3xl">
            <HighlightText text={block.heading} />
          </h2>
        )}
        <RichText data={block.content} className="prose-body text-ink-soft [&_h2]:text-ink [&_h3]:text-ink [&_strong]:text-ink" />
      </div>
    </Section>
  )
}
