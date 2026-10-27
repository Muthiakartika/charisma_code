import { Quotes } from '@phosphor-icons/react/ssr'

import type { Where } from 'payload'

import { findPublished } from '@/lib/cms'
import type { Testimonial, TestimonialsBlock as TestimonialsData } from '@/payload-types'

import {
  BlockAction,
  hasButtons,
  headingId,
  Section,
  SectionButtons,
  SectionHeading,
  type BlockContext,
} from './shared'

const sourceLabels: Record<string, string> = {
  'google-review': 'Google review',
  linkedin: 'LinkedIn',
}

/** "Google review", "LinkedIn"… or null for other sources. */
export const testimonialSourceLabel = (source: Testimonial['source']) =>
  sourceLabels[source] ?? null

function Attribution({ testimonial }: { testimonial: Testimonial }) {
  const details = [testimonial.authorRole, testimonial.organisation].filter(Boolean).join(', ')
  const source = testimonialSourceLabel(testimonial.source)
  return (
    <footer className="mt-6 text-[0.95rem]">
      <cite className="not-italic font-semibold text-ink in-[.tone-dark]:text-paper">
        {testimonial.authorName}
      </cite>
      {details && (
        <span className="block text-ink-soft in-[.tone-dark]:text-on-dark-muted">{details}</span>
      )}
      {source && <span className="block text-sm text-muted">{source}</span>}
    </footer>
  )
}

/** Only testimonials with permission (or public reviews) are ever shown. */
export async function TestimonialsBlock({
  block,
  context,
}: {
  block: TestimonialsData
  context: BlockContext
}) {
  const allowed = (item: Testimonial) => item.permission !== 'pending'
  let testimonials: Testimonial[]

  if (block.source === 'manual') {
    testimonials = (block.testimonials ?? [])
      .filter((item): item is Testimonial => typeof item === 'object' && item !== null)
      .filter(allowed)
  } else {
    const where: Where = { permission: { not_equals: 'pending' } }
    if (block.category && block.category !== 'all') where.category = { equals: block.category }
    testimonials = await findPublished('testimonials', {
      locale: context.locale,
      where,
      sort: '-createdAt',
      limit: block.limit ?? 3,
    })
  }

  if (!testimonials.length) return null
  const [featured, ...others] = testimonials
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId} tone="light" labelledBy={block.heading ? titleId : undefined}>
      <div className="container-site">
        <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} />

        {/* Many reviews: the featured one across the top, the rest as a grid of cards below it,
            so a long column on the right never leaves an empty gap under the featured quote.
            Four cards sit two by two, so no card is left alone on a row. */}
        {others.length > 2 && (
          <div className={block.heading ? 'mt-12' : ''}>
            <blockquote className="reveal max-w-4xl">
              <Quotes size={48} weight="fill" className="text-action" aria-hidden />
              <p className="mt-5 font-display text-[clamp(1.45rem,1.2vw+1.1rem,2.1rem)] font-medium leading-[1.3] tracking-tight">
                {featured.quote}
              </p>
              <Attribution testimonial={featured} />
            </blockquote>
            <div
              className={`mt-14 grid gap-4 md:grid-cols-2 ${others.length % 3 !== 0 && others.length % 2 === 0 ? '' : 'lg:grid-cols-3'}`}
            >
              {others.map((testimonial) => (
                <blockquote
                  key={testimonial.id}
                  className="reveal flex flex-col rounded-[var(--radius-card)] bg-surface-alt p-7"
                >
                  <Quotes size={24} weight="fill" className="text-action" aria-hidden />
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink">
                    {testimonial.quote}
                  </p>
                  <div className="mt-auto">
                    <Attribution testimonial={testimonial} />
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        )}

        {others.length <= 2 && (
          <div className={`grid gap-12 lg:grid-cols-12 lg:gap-16 ${block.heading ? 'mt-12' : ''}`}>
            <blockquote className={`reveal ${others.length ? 'lg:col-span-7' : 'lg:col-span-10'}`}>
              <Quotes size={48} weight="fill" className="text-action" aria-hidden />
              <p className="mt-5 font-display text-[clamp(1.45rem,1.2vw+1.1rem,2.1rem)] font-medium leading-[1.3] tracking-tight">
                {featured.quote}
              </p>
              <Attribution testimonial={featured} />
            </blockquote>

            {others.length > 0 && (
              <div className="grid content-start gap-10 lg:col-span-5 lg:border-l lg:border-line lg:pl-12">
                {others.map((testimonial) => (
                  <blockquote key={testimonial.id} className="reveal">
                    <p className="text-[1.0625rem] leading-relaxed text-ink">{testimonial.quote}</p>
                    <Attribution testimonial={testimonial} />
                  </blockquote>
                ))}
              </div>
            )}
          </div>
        )}

        <SectionButtons links={block.buttons} locale={context.locale} className="mt-12" />
        {!hasButtons(block.buttons, context.locale) && (
          <BlockAction action={context.action} className="mt-12" />
        )}
      </div>
    </Section>
  )
}
