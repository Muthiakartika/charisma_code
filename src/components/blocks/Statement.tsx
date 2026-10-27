import { ButtonLink } from '@/components/ui/ButtonLink'
import { HighlightText, Paragraphs } from '@/components/ui/HighlightText'
import { resolveLink } from '@/lib/links'
import type { StatementBlock as StatementData } from '@/payload-types'

import { headingId, Section, type BlockContext } from './shared'

/**
 * The idea behind the brand, on the dark stage. The roles are billed like the names outside
 * a theatre and light up one by one as they scroll into view; the languages line closes the bill.
 */
export function StatementBlock({
  block,
  context,
}: {
  block: StatementData
  context: BlockContext
}) {
  const button = resolveLink(block.button, context.locale)
  const titleId = headingId(block)
  const roles = block.roles ?? []

  return (
    <Section
      id={block.anchorId}
      tone="dark"
      labelledBy={titleId}
      className="statement relative isolate overflow-hidden"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
          {/* With a big line, the heading reads as a label above it (it stays the section's h2) */}
          <h2 id={titleId} className={block.tagline ? 'eyebrow mb-4' : 'heading-lg'}>
            <HighlightText text={block.heading} />
          </h2>
          {block.tagline && (
            <p className="heading-lg">
              <HighlightText text={block.tagline} />
            </p>
          )}
          <div className="mt-7 max-w-xl space-y-4 text-[1.0625rem] text-on-dark-muted">
            <Paragraphs text={block.body} />
          </div>
          {button && (
            <div className="mt-10">
              <ButtonLink link={button} variant="secondary" showArrow />
            </div>
          )}
        </div>

        {(roles.length > 0 || block.languages) && (
          <div className="lg:col-span-6">
            {roles.length > 0 && (
              <ul>
                {roles.map((role, index) => (
                  <li
                    key={role.id ?? index}
                    className="statement-role border-t border-white/15 py-3 sm:py-4"
                  >
                    {role.text}
                  </li>
                ))}
              </ul>
            )}
            {block.languages && (
              <p className="statement-languages border-y border-white/15 py-5">
                <HighlightText text={block.languages} />
              </p>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}
