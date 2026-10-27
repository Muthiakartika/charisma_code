import { Bullet } from '@/components/ui/Bullet'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { HighlightText, Paragraphs } from '@/components/ui/HighlightText'
import { resolveLink } from '@/lib/links'
import type { Media, TextImageBlock as TextImageData } from '@/payload-types'

import {
  hasButtons,
  headingId,
  InlineLinks,
  PriceLine,
  Section,
  SectionButtons,
  type BlockContext,
} from './shared'

/** A simple price or comparison table written in the CMS as "cell | cell" lines (first line = header). */
function SimpleTable({ text, locale }: { text: string; locale: BlockContext['locale'] }) {
  const rows = text
    .split('\n')
    .map((line) => line.split('|').map((cell) => cell.trim()))
    .filter((cells) => cells.some(Boolean))
  const [header, ...body] = rows
  if (!header) return null
  const isPrice = (cell: string) => /^(from )?S\$/i.test(cell)
  return (
    <div className="reveal mt-10 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
      <table className="w-full min-w-[34rem] text-left text-[0.95rem]">
        <thead className="bg-surface-alt">
          <tr>
            {header.map((cell, index) => (
              <th key={index} scope="col" className="px-5 py-3.5 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((cells, rowIndex) => (
            <tr key={rowIndex} className="border-t border-line">
              {cells.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row" className="px-5 py-4 font-semibold">
                    {cell}
                  </th>
                ) : (
                  <td
                    key={index}
                    className={`px-5 py-4 ${isPrice(cell) ? 'price-line text-accent' : 'text-ink-soft'}`}
                  >
                    <InlineLinks text={cell} locale={locale} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TextImageBlock({
  block,
  context,
}: {
  block: TextImageData
  context: BlockContext
}) {
  const { locale } = context
  const ownButtons = hasButtons(block.buttons, locale)
  const button = ownButtons ? null : (resolveLink(block.button, locale) ?? context.action)
  const image =
    typeof block.image === 'object' && block.image !== null ? (block.image as Media) : null
  const imageLeft = block.imagePosition === 'left'
  const portrait = block.imageShape === 'portrait'
  const dark = block.tone === 'dark'
  const muted = dark ? 'text-on-dark-muted' : 'text-ink-soft'
  const titleId = headingId(block)
  const points = block.points ?? []

  const text = (
    <>
      {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
      <h2 id={titleId} className="heading-lg">
        <HighlightText text={block.heading} />
      </h2>
      <PriceLine text={block.priceLine} locale={locale} className="mt-5 text-xl text-accent" />
      {block.body && (
        <div className={`mt-6 space-y-4 ${muted}`}>
          <Paragraphs text={block.body} />
        </div>
      )}
    </>
  )

  const actions = (
    <>
      <SectionButtons links={block.buttons} locale={locale} className="mt-10" />
      {button && (
        <div className="mt-10">
          <ButtonLink link={button} />
        </div>
      )}
    </>
  )

  const pointsHeading = block.pointsHeading && (
    <h4 className="heading-md mb-5">{block.pointsHeading}</h4>
  )

  // ── With a table (e.g. prices at a glance): heading, the table, then the notes and buttons ─
  if (!image && block.table) {
    return (
      <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
        <div className="container-site">
          {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
          <h2 id={titleId} className="heading-lg max-w-3xl">
            <HighlightText text={block.heading} />
          </h2>
          <PriceLine text={block.priceLine} locale={locale} className="mt-5 text-xl text-accent" />
          <SimpleTable text={block.table} locale={locale} />
          {block.body && (
            <div className={`mt-6 max-w-3xl space-y-3 text-[0.95rem] ${muted}`}>
              <Paragraphs text={block.body} />
            </div>
          )}
          {actions}
        </div>
      </Section>
    )
  }

  // Soft panel inside the section: beige on ivory, ivory on beige
  const panel = dark ? 'bg-white/[0.06]' : block.tone === 'tinted' ? 'bg-surface' : 'bg-surface-alt'

  // ── Dated points ("2010: hosts at…", "July-August 2025: teaches…"): a timeline, four across ─
  const dated = points.map((point) =>
    point.text.match(/^((?:[A-Z][a-z]+(?:-[A-Z][a-z]+)? )?\d{4}): (.+)$/),
  )
  if (!image && points.length >= 4 && dated.every(Boolean)) {
    return (
      <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
              <h2 id={titleId} className="heading-lg">
                <HighlightText text={block.heading} />
              </h2>
              {block.body && (
                <div className={`mt-5 space-y-4 ${muted}`}>
                  <Paragraphs text={block.body} />
                </div>
              )}
            </div>
            <div className="shrink-0 [&>div]:mt-0">{actions}</div>
          </div>
          <ol className="mt-10 grid sm:mt-12 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {points.map((point, index) => {
              const [, when, what] = dated[index]!
              return (
                <li
                  key={point.id ?? index}
                  className={`reveal relative border-l pb-7 pl-6 last:pb-0 sm:border-l-0 sm:border-t sm:pb-0 sm:pl-0 sm:pr-6 sm:pt-7 ${dark ? 'border-white/15' : 'border-ink/15'}`}
                >
                  <span
                    aria-hidden
                    className={`absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-action ring-4 sm:-top-[7px] sm:left-0 ${
                      dark
                        ? 'ring-ink'
                        : block.tone === 'tinted'
                          ? 'ring-surface-alt'
                          : 'ring-surface'
                    }`}
                  />
                  <p className="font-display text-lg font-bold leading-tight tracking-tight text-accent">
                    {when}
                  </p>
                  <p className={`mt-1.5 text-[0.95rem] sm:mt-2 ${muted}`}>
                    <InlineLinks text={what} locale={locale} />
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </Section>
    )
  }

  // ── Without a photo: the text on the left, the points in a soft panel on the right ─
  if (!image && points.length > 0) {
    return (
      <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
        <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
            <h2 id={titleId} className="heading-lg">
              <HighlightText text={block.heading} />
            </h2>
            {/* A pricing band leads with its price */}
            <PriceLine
              text={block.priceLine}
              locale={locale}
              className="mt-5 text-[clamp(1.6rem,1.4vw+1.15rem,2.35rem)] leading-tight text-accent"
            />
            {block.body && (
              <div className={`mt-6 space-y-4 ${muted}`}>
                <Paragraphs text={block.body} />
              </div>
            )}
            {actions}
          </div>
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <div
              className={`reveal relative isolate overflow-hidden rounded-[var(--radius-card)] p-7 sm:p-9 ${panel}`}
            >
              <span
                aria-hidden
                className="band-glow pointer-events-none absolute -right-16 -top-16 -z-10 aspect-square w-52 rounded-full"
              />
              {block.pointsHeading && (
                <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.08em]">
                  {block.pointsHeading}
                </h4>
              )}
              <ul className="grid gap-4">
                {points.map((point, index) => (
                  <li key={point.id ?? index} className="flex items-start gap-3">
                    <Bullet />
                    <span className="font-medium">
                      <InlineLinks text={point.text} locale={locale} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    )
  }

  // ── Text only: a callout panel, the heading on the left and the story on the right ─
  if (!image) {
    return (
      <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
        <div className="container-site">
          <div
            className={`reveal relative isolate grid gap-8 overflow-hidden rounded-[var(--radius-card)] px-7 py-9 sm:px-12 sm:py-11 lg:grid-cols-12 lg:gap-12 lg:px-14 ${panel}`}
          >
            <span
              aria-hidden
              className="band-glow pointer-events-none absolute -bottom-24 -right-20 -z-10 aspect-square w-80 rounded-full"
            />
            <div className="lg:col-span-5">
              {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
              <span aria-hidden className="mb-6 block h-1.5 w-14 rounded-full bg-action" />
              <h2 id={titleId} className="heading-lg">
                <HighlightText text={block.heading} />
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-2">
              <PriceLine
                text={block.priceLine}
                locale={locale}
                className="mb-5 text-[clamp(1.6rem,1.4vw+1.15rem,2.35rem)] leading-tight text-accent"
              />
              {block.body && (
                <div className={`lead space-y-4 ${muted}`}>
                  <Paragraphs text={block.body} />
                </div>
              )}
              {actions}
            </div>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div
          className={`reveal ${portrait ? 'lg:col-span-5' : 'lg:col-span-6'} ${imageLeft ? '' : 'lg:order-2'}`}
        >
          <div
            className={`relative overflow-hidden rounded-[var(--radius-media)] bg-paper-deep ${
              portrait ? 'aspect-[4/5] in-data-[theme=wedding]:rounded-t-full' : 'aspect-[5/4]'
            }`}
          >
            <CmsImage
              media={image}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div
          className={`${portrait ? 'lg:col-span-7' : 'lg:col-span-6'} ${imageLeft ? 'lg:pl-4' : 'lg:pr-4'}`}
        >
          {text}

          {points.length > 0 && (
            <div className="mt-8">
              {pointsHeading}
              <ul className="grid gap-3 sm:grid-cols-2">
                {points.map((point, index) => (
                  <li key={point.id ?? index} className="flex items-start gap-3">
                    <Bullet />
                    <span className="font-medium">
                      <InlineLinks text={point.text} locale={locale} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {actions}
        </div>
      </div>
    </Section>
  )
}
