import { Plus } from '@phosphor-icons/react/ssr'

import { Paragraphs } from '@/components/ui/HighlightText'
import { findPublished } from '@/lib/cms'
import type { Faq, FaqBlock as FaqData } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

/** Questions open and close without JavaScript (native <details>), keyboard accessible. */
export async function FaqBlock({ block, context }: { block: FaqData; context: BlockContext }) {
  const chosen = (block.faqs ?? []).filter((faq): faq is Faq => typeof faq === 'object' && faq !== null)
  const serviceId = block.service && typeof block.service === 'object' ? block.service.id : block.service

  const faqs = chosen.length
    ? chosen
    : serviceId
      ? await findPublished('faqs', {
          locale: context.locale,
          where: { services: { in: [serviceId] } },
          sort: 'order',
          depth: 0,
        })
      : []

  if (!faqs.length) return null
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId} labelledBy={titleId}>
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
        </div>
        <div className="lg:col-span-8">
          {faqs.map((faq) => (
            <details key={faq.id} className="group border-b border-line first:border-t">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <Plus
                  size={22}
                  weight="bold"
                  className="mt-1 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <div className="max-w-2xl space-y-3 pb-7 text-ink-soft">
                <Paragraphs text={faq.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
