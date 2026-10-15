import type { ProcessStepsBlock as ProcessStepsData } from '@/payload-types'

import { BlockAction, headingId, Section, SectionHeading, type BlockContext } from './shared'

/**
 * A "run of show": the steps of working together, in order, like the cue sheet
 * an emcee holds on the night. Each cue sits on one rail that runs down the page.
 * The heading (and the page's main action, when given) stays in view on large screens while the cues scroll past.
 */
export function ProcessStepsBlock({ block, context }: { block: ProcessStepsData; context: BlockContext }) {
  const titleId = headingId(block)
  const dark = block.tone === 'dark'
  const lastIndex = block.steps.length - 1

  return (
    <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
            <BlockAction action={context.action} className="mt-9" />
          </div>
        </div>

        <ol className="cue-sheet grid gap-12 sm:gap-14 lg:col-span-7">
          {block.steps.map((step, index) => (
            <li key={step.id ?? index} className="cue grid grid-cols-[3.25rem_1fr] gap-x-5 sm:grid-cols-[4.5rem_1fr] sm:gap-x-7">
              <div className="flex flex-col items-center">
                <span aria-hidden className="cue-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {/* The rail runs on through the gap to the next cue's number */}
                {index < lastIndex && (
                  <span
                    aria-hidden
                    className={`cue-rail -mb-9 mt-3 w-px flex-1 sm:-mb-11 ${dark ? 'bg-white/15' : 'bg-ink/15'}`}
                  />
                )}
              </div>
              <div>
                <h3 className="heading-md mt-1 sm:mt-2.5">{step.title}</h3>
                {step.text && (
                  <p className={`mt-3 max-w-xl ${dark ? 'text-on-dark-muted' : 'text-ink-soft'}`}>{step.text}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
