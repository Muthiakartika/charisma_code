import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { HighlightText, Paragraphs } from '@/components/ui/HighlightText'
import { resolveLink } from '@/lib/links'
import type { FounderIntroBlock as FounderIntroData } from '@/payload-types'

import { headingId, Section, type BlockContext } from './shared'

export function FounderIntroBlock({ block, context }: { block: FounderIntroData; context: BlockContext }) {
  const button = resolveLink(block.button, context.locale)
  const stage = block.mood === 'stage'
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId} tone={stage ? 'dark' : 'tinted'} labelledBy={titleId}>
      <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-paper-deep in-data-[theme=wedding]:rounded-t-full">
            <CmsImage media={block.portrait} sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
          {block.quote && (
            <p
              className={`relative -mt-14 ml-6 mr-0 max-w-[88%] rounded-[var(--radius-card)] p-6 font-display text-xl font-semibold leading-snug tracking-tight sm:ml-10 ${
                stage ? 'bg-accent text-ink' : 'bg-ink text-paper'
              }`}
            >
              &ldquo;{block.quote}&rdquo;
            </p>
          )}
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
          <h2 id={titleId} className="heading-lg">
            <HighlightText text={block.heading} />
          </h2>
          <div className={`mt-7 max-w-2xl space-y-4 text-[1.0625rem] ${stage ? 'text-on-dark-muted' : 'text-ink-soft'}`}>
            <Paragraphs text={block.body} />
          </div>

          {block.credentials && block.credentials.length > 0 && (
            <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {block.credentials.map((item, index) => (
                <li
                  key={item.id ?? index}
                  className={`border-t py-4 font-medium ${stage ? 'border-white/15' : 'border-ink/15'}`}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          )}

          {button && (
            <div className="mt-10">
              <ButtonLink link={button} variant={stage ? 'primary' : 'secondary'} showArrow />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
