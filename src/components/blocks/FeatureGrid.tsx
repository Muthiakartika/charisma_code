import { Bullet } from '@/components/ui/Bullet'
import type { FeatureGridBlock as FeatureGridData } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

const columnClasses: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

/** Comparison strip: one column per item on large screens. */
const stripColumns: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}

export function FeatureGridBlock({ block }: { block: FeatureGridData; context: BlockContext }) {
  const titleId = headingId(block)
  const dark = block.tone === 'dark'
  const muted = dark ? 'text-on-dark-muted' : 'text-ink-soft'
  const rule = dark ? 'border-white/15' : 'border-ink/15'
  const columns = columnClasses[block.columns ?? '3']
  const style = block.style ?? 'list'
  // Numbers only when the order carries meaning; otherwise a plain list.
  const ListTag = style === 'numbered' ? 'ol' : 'ul'

  return (
    <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
      <div className="container-site">
        <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        {style === 'checklist' && (
          <ul className={`mt-12 grid gap-x-10 gap-y-7 ${columns === columnClasses['4'] ? columnClasses['2'] : columns}`}>
            {block.items.map((item, index) => (
              <li key={item.id ?? index} className="flex gap-4">
                <Bullet />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.text && <p className={`mt-1.5 ${muted}`}>{item.text}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}

        {style === 'cards' && (
          <ul className={`mt-12 grid gap-4 ${columns}`}>
            {block.items.map((item, index) => (
              <li
                key={item.id ?? index}
                className={`feature-card reveal rounded-[var(--radius-card)] p-7 ${
                  dark ? 'bg-white/[0.06]' : block.tone === 'tinted' ? 'bg-surface' : 'bg-surface-alt'
                }`}
              >
                <h3 className="heading-md">{item.title}</h3>
                {item.text && <p className={`mt-3 ${muted}`}>{item.text}</p>}
              </li>
            ))}
          </ul>
        )}

        {/* A side-by-side comparison, e.g. group sizes. Big short titles, divided by thin rules. */}
        {style === 'strip' && (
          <ul className={`mt-12 grid border-t ${rule} ${stripColumns[block.items.length] ?? stripColumns[3]}`}>
            {block.items.map((item, index) => (
              <li
                key={item.id ?? index}
                className={`reveal border-b py-8 md:border-b-0 md:py-10 md:pr-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-8 ${rule}`}
              >
                <h3 className="strip-title">{item.title}</h3>
                {item.text && <p className={`mt-4 max-w-sm ${muted}`}>{item.text}</p>}
              </li>
            ))}
          </ul>
        )}

        {(style === 'list' || style === 'numbered') && (
          <ListTag className={`mt-12 grid gap-x-10 gap-y-10 ${columns}`}>
            {block.items.map((item, index) => (
              <li key={item.id ?? index} className={`reveal border-t pt-6 ${rule}`}>
                {style === 'numbered' && (
                  <span aria-hidden className="feature-number mb-3 block font-display text-sm font-semibold text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                <h3 className="heading-md">{item.title}</h3>
                {item.text && <p className={`mt-3 ${muted}`}>{item.text}</p>}
              </li>
            ))}
          </ListTag>
        )}
      </div>
    </Section>
  )
}
