import type { ProcessStepsBlock as ProcessStepsData } from '@/payload-types'

import {
  BlockAction,
  hasButtons,
  headingId,
  Section,
  SectionButtons,
  SectionHeading,
  type BlockContext,
} from './shared'

/** Columns on large screens: every step in one row when it fits, otherwise even rows (6 → 3 + 3). */
const columns: Record<number, string> = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-3',
  7: 'lg:grid-cols-4',
  8: 'lg:grid-cols-4',
}

/**
 * A "run of show": the steps of working together, in order, like the cue sheet an emcee holds
 * on the night. The cues run left to right along one rail (top to bottom on phones), under the
 * heading, so a short heading never sits beside a long empty column.
 */
export function ProcessStepsBlock({
  block,
  context,
}: {
  block: ProcessStepsData
  context: BlockContext
}) {
  const titleId = headingId(block)
  const dark = block.tone === 'dark'
  const rule = dark ? 'border-white/15' : 'border-ink/15'
  const ring = dark ? 'ring-ink' : block.tone === 'tinted' ? 'ring-surface-alt' : 'ring-surface'
  const ownButtons = hasButtons(block.buttons, context.locale)

  return (
    <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id={titleId}
            eyebrow={block.eyebrow}
            heading={block.heading}
            intro={block.intro}
          />
          <div className="shrink-0 [&>div]:mt-0">
            <SectionButtons links={block.buttons} locale={context.locale} />
            {!ownButtons && <BlockAction action={context.action} />}
          </div>
        </div>

        <ol
          className={`cue-sheet ml-[18px] mt-12 grid sm:mt-14 md:ml-0 md:grid-cols-2 md:gap-y-12 ${columns[block.steps.length] ?? 'lg:grid-cols-3'}`}
        >
          {block.steps.map((step, index) => (
            <li
              key={step.id ?? index}
              className={`cue reveal relative border-l pb-9 pl-9 last:pb-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-8 md:pt-10 ${rule}`}
            >
              <span
                aria-hidden
                className={`absolute -left-[18px] top-0 grid h-9 w-9 place-items-center rounded-full bg-action font-display text-sm font-bold text-on-action ring-[6px] md:-top-[18px] md:left-0 ${ring}`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="heading-md">{step.title}</h3>
              {step.text && (
                <p className={`mt-3 ${dark ? 'text-on-dark-muted' : 'text-ink-soft'}`}>
                  {step.text}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
