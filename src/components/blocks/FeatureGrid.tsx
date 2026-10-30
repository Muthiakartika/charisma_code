import {
  ArrowDown,
  ArrowRight,
  CalendarCheck,
  Car,
  Clock,
  CloudSun,
  Handshake,
  Info,
  MapPin,
  MicrophoneStage,
  ShieldCheck,
  Signature,
  UsersThree,
  Wallet,
  Wheelchair,
} from '@phosphor-icons/react/ssr'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'

import { Bullet } from '@/components/ui/Bullet'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Paragraphs } from '@/components/ui/HighlightText'
import { resolveLink } from '@/lib/links'
import type { FeatureGridBlock as FeatureGridData } from '@/payload-types'

import {
  BlockAction,
  hasButtons,
  headingId,
  InlineLinks,
  PriceLine,
  Section,
  SectionButtons,
  SectionHeading,
  whatsappIcon,
  type BlockContext,
} from './shared'
import { CredentialsGrid } from './Credentials'

type Item = FeatureGridData['items'][number]

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

/** "Ideal for: couples who…": the words before the first colon are shown in bold. */
function LabelledLine({ text, className }: { text: string; className: string }) {
  const colon = text.indexOf(':')
  if (colon < 1 || colon > 30) return <p className={className}>{text}</p>
  return (
    <p className={className}>
      <strong className="font-semibold text-ink in-[.tone-dark]:text-paper">
        {text.slice(0, colon + 1)}
      </strong>
      {text.slice(colon + 1)}
    </p>
  )
}

/** An icon that fits a booking note, picked from words in its title ("Your date is confirmed…" → calendar). */
const NOTE_ICONS: [RegExp, PhosphorIcon][] = [
  [/date|book early|season|calendar/i, CalendarCheck],
  [/deposit|cancel|payment|fee/i, Wallet],
  [/proposal|sign-off|script|run-?sheet|names|writing/i, Signature],
  [/vendor|venue|terms|partner/i, Handshake],
  [/headcount|group|guest|participant|minimum|size/i, UsersThree],
  [/outdoor|weather|rain/i, CloudSun],
  [/mobility|access/i, Wheelchair],
  [/sound|microphone|\bav\b|equipment/i, MicrophoneStage],
  [/timing|time|schedule|on the day|late/i, Clock],
  [/space|room|location/i, MapPin],
  [/teacher|safeguard|child|student|parent|supervis/i, ShieldCheck],
  [/travel|parking|transport/i, Car],
]
const noteIcon = (title: string) => NOTE_ICONS.find(([pattern]) => pattern.test(title))?.[1] ?? Info

/** An item's title; when it points to a section further down ("Stronger collaboration ↓") it becomes a jump link. */
function ItemTitle({ item, className }: { item: Item; className: string }) {
  return (
    <h3 className={className}>
      {item.jumpTo ? (
        <a
          href={`#${item.jumpTo}`}
          className="group/jump inline-flex items-baseline gap-2 hover:text-accent"
        >
          {item.title}
          <ArrowDown
            size={18}
            weight="bold"
            className="shrink-0 text-accent transition-transform group-hover/jump:translate-y-0.5"
            aria-hidden
          />
        </a>
      ) : (
        item.title
      )}
    </h3>
  )
}

/** Everything under an item's title: price, "ideal for", text, included points, small print and its button. */
function ItemDetails({
  item,
  muted,
  context,
  card = false,
}: {
  item: Item
  muted: string
  context: BlockContext
  card?: boolean
}) {
  const link = resolveLink(item.link, context.locale)
  const points = item.points ?? []
  return (
    <>
      <PriceLine
        text={item.priceLine}
        locale={context.locale}
        className={`mt-2 text-accent ${card ? 'text-[1.35rem] leading-snug' : 'text-lg'}`}
      />
      {item.idealFor && (
        <LabelledLine text={item.idealFor} className={`mt-3 text-[0.95rem] ${muted}`} />
      )}
      {item.text && (
        <div className={`mt-3 space-y-3 ${muted}`}>
          <Paragraphs text={item.text} />
        </div>
      )}
      {item.pointsHeading && (
        <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.08em]">
          {item.pointsHeading}
        </h4>
      )}
      {points.length > 0 && (
        <ul className="mt-3 grid gap-2.5 text-[0.95rem]">
          {points.map((point, index) => (
            <li key={point.id ?? index} className="flex items-start gap-2.5">
              <Bullet small />
              <span>{point.text}</span>
            </li>
          ))}
        </ul>
      )}
      {item.note && <p className="mt-5 text-sm font-semibold">{item.note}</p>}
      {link && (
        <div className={card ? 'mt-auto pt-7' : 'mt-6'}>
          <ButtonLink
            link={link}
            variant={card && item.badge ? 'primary' : 'secondary'}
            showArrow
            icon={whatsappIcon(link)}
          />
        </div>
      )}
    </>
  )
}

export function FeatureGridBlock({
  block,
  context,
}: {
  block: FeatureGridData
  context: BlockContext
}) {
  // Credentials have a layout of their own (Credentials.tsx)
  if (block.style === 'credentials') return <CredentialsGrid block={block} context={context} />
  const { locale } = context
  const titleId = headingId(block)
  const dark = block.tone === 'dark'
  const muted = dark ? 'text-on-dark-muted' : 'text-ink-soft'
  const rule = dark ? 'border-white/15' : 'border-ink/15'
  const columns = columnClasses[block.columns ?? '3']
  const style = block.style ?? 'list'
  // Soft panel for the quick-match and notes boxes: beige on ivory, ivory on beige
  const panel = dark ? 'bg-white/[0.06]' : block.tone === 'tinted' ? 'bg-surface' : 'bg-surface-alt'
  const jumpTiles = block.items.length > 0 && block.items.every((item) => item.jumpTo)
  // Numbers only when the order carries meaning; otherwise a plain list.
  const ListTag = style === 'numbered' ? 'ol' : 'ul'
  const ownButtons = hasButtons(block.buttons, locale)
  const [footnoteLead, ...footnoteRest] = (block.footnote ?? '')
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
      <div className="container-site">
        <SectionHeading
          id={titleId}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
        />

        {style === 'checklist' && (
          <ul
            className={`mt-12 grid gap-x-10 gap-y-7 ${columns === columnClasses['4'] ? columnClasses['2'] : columns}`}
          >
            {block.items.map((item, index) => (
              <li key={item.id ?? index} className="flex gap-4">
                <Bullet />
                <div>
                  <ItemTitle item={item} className="text-lg font-semibold" />
                  <ItemDetails item={item} muted={muted} context={context} />
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
                className={`feature-card reveal flex flex-col rounded-[var(--radius-card)] p-7 ${
                  item.badge ? 'ring-2 ring-action' : ''
                } ${dark ? 'bg-white/[0.06]' : block.tone === 'tinted' ? 'bg-surface' : 'bg-surface-alt'}`}
              >
                {item.badge && <span className="card-badge mb-4 self-start">{item.badge}</span>}
                {!item.badge && !item.priceLine && (
                  <span aria-hidden className="card-dot mb-5 h-3 w-3 rounded-full bg-action" />
                )}
                <ItemTitle item={item} className="heading-md" />
                <ItemDetails item={item} muted={muted} context={context} card />
              </li>
            ))}
          </ul>
        )}

        {/* A side-by-side comparison, e.g. group sizes. Big short titles, divided by thin rules. */}
        {style === 'strip' && (
          <ul
            className={`mt-12 grid border-t ${rule} ${stripColumns[block.items.length] ?? stripColumns[3]}`}
          >
            {block.items.map((item, index) => (
              <li
                key={item.id ?? index}
                className={`reveal border-b py-8 md:border-b-0 md:py-10 md:pr-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-8 ${rule}`}
              >
                <ItemTitle item={item} className="strip-title" />
                <div className="max-w-sm">
                  <ItemDetails item={item} muted={muted} context={context} />
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* "You are planning…" on the left, the page that fits on the right */}
        {/* Quick match: one tile per situation, the page that fits underneath it */}
        {style === 'match' && (
          <ul className="mt-12 grid gap-3 md:grid-cols-2">
            {block.items.map((item, index) => (
              <li
                key={item.id ?? index}
                className={`reveal flex items-start gap-4 rounded-[var(--radius-card)] p-5 sm:p-6 ${panel}`}
              >
                <span
                  aria-hidden
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-action text-on-action"
                >
                  <ArrowRight size={16} weight="bold" />
                </span>
                <div>
                  <p className="font-semibold leading-snug">{item.title}</p>
                  {item.text && (
                    <p className={`mt-1.5 text-[0.95rem] ${muted}`}>
                      <InlineLinks text={item.text} locale={locale} />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Booking notes: an icon, a bold lead line and a sentence or two each, with the
            closing question and buttons inside the same panel (not a legal block) */}
        {style === 'notes' && (
          <div className={`reveal mt-12 overflow-hidden rounded-[var(--radius-card)] ${panel}`}>
            <ul
              className={`grid gap-x-12 gap-y-9 p-7 sm:p-10 md:grid-cols-2 ${block.items.length === 3 ? 'lg:grid-cols-3' : ''}`}
            >
              {block.items.map((item, index) => {
                const Icon = noteIcon(item.title)
                return (
                  <li key={item.id ?? index} className="flex gap-4">
                    {!item.priceLine && (
                      <span
                        aria-hidden
                        className="note-icon grid h-11 w-11 shrink-0 place-items-center rounded-full text-accent"
                      >
                        <Icon size={22} weight="duotone" />
                      </span>
                    )}
                    <div>
                      <ItemTitle item={item} className="text-lg font-semibold leading-snug" />
                      <ItemDetails item={item} muted={muted} context={context} />
                    </div>
                  </li>
                )
              })}
            </ul>
            {(footnoteLead || ownButtons) && (
              <div
                className={`flex flex-col gap-6 border-t px-7 py-7 sm:px-10 md:flex-row md:items-center md:justify-between ${rule}`}
              >
                {footnoteLead ? (
                  <div className={`max-w-xl space-y-1.5 ${muted}`}>
                    <p className="font-semibold text-ink in-[.tone-dark]:text-paper">
                      <InlineLinks text={footnoteLead} locale={locale} />
                    </p>
                    {footnoteRest.map((paragraph, index) => (
                      <p key={index}>
                        <InlineLinks text={paragraph} locale={locale} />
                      </p>
                    ))}
                  </div>
                ) : null}
                <SectionButtons links={block.buttons} locale={locale} className="shrink-0" />
              </div>
            )}
          </div>
        )}

        {/* Every item leads to a band further down ("Stronger collaboration ↓"): clickable tiles */}
        {style === 'list' && jumpTiles && (
          <ul className={`mt-12 grid gap-4 ${columns}`}>
            {block.items.map((item, index) => (
              <li key={item.id ?? index} className="reveal">
                <a
                  href={`#${item.jumpTo}`}
                  className={`group flex h-full flex-col rounded-[var(--radius-card)] p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--color-ink)_60%,transparent)] sm:p-7 ${panel}`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <h3 className="heading-md group-hover:text-accent">{item.title}</h3>
                    <span
                      aria-hidden
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-action text-on-action transition-transform duration-300 group-hover:translate-y-0.5"
                    >
                      <ArrowDown size={16} weight="bold" />
                    </span>
                  </span>
                  {item.text && <p className={`mt-3 ${muted}`}>{item.text}</p>}
                </a>
              </li>
            ))}
          </ul>
        )}

        {((style === 'list' && !jumpTiles) || style === 'numbered') && (
          <ListTag className={`mt-12 grid gap-x-10 gap-y-10 ${columns}`}>
            {block.items.map((item, index) => (
              <li key={item.id ?? index} className={`reveal border-t pt-6 ${rule}`}>
                {style === 'numbered' && (
                  <span
                    aria-hidden
                    className="feature-number mb-3 block font-display text-sm font-semibold text-accent"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                <ItemTitle item={item} className="heading-md" />
                <ItemDetails item={item} muted={muted} context={context} />
              </li>
            ))}
          </ListTag>
        )}

        {footnoteLead && style !== 'notes' && (
          <div className={`mt-12 max-w-2xl space-y-2 ${muted}`}>
            <p
              className={
                footnoteLead.endsWith('?')
                  ? 'text-lg font-semibold text-ink in-[.tone-dark]:text-paper'
                  : ''
              }
            >
              <InlineLinks text={footnoteLead} locale={locale} />
            </p>
            {footnoteRest.map((paragraph, index) => (
              <p key={index}>
                <InlineLinks text={paragraph} locale={locale} />
              </p>
            ))}
          </div>
        )}

        {style !== 'notes' && (
          <SectionButtons
            links={block.buttons}
            locale={locale}
            className={footnoteLead ? 'mt-7' : 'mt-12'}
          />
        )}
        {!ownButtons && <BlockAction action={context.action} className="mt-12" />}
      </div>
    </Section>
  )
}
