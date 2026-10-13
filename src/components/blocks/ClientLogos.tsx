import type { CSSProperties } from 'react'

import { DeferredLogos } from '@/components/ui/DeferredLogos'
import { HighlightText } from '@/components/ui/HighlightText'
import { Marquee } from '@/components/ui/Marquee'
import { findPublished } from '@/lib/cms'
import type { Client, ClientLogosBlock as ClientLogosData, Media, Testimonial } from '@/payload-types'

import { headingId, type BlockContext } from './shared'
import { testimonialSourceLabel } from './Testimonials'

const logoOf = (client: Client): Media | null =>
  client.logo && typeof client.logo === 'object' && client.logo.url && client.logo.width && client.logo.height
    ? client.logo
    : null

/**
 * Logos come in every shape: long wordmarks, square badges, tall emblems.
 * Giving them the same height makes long ones shout and square ones whisper,
 * so each logo gets roughly the same visual area instead ("optical sizing").
 */
function logoBox(logo: Media, baseHeight: number) {
  const aspect = (logo.width ?? 3) / (logo.height ?? 1)
  const height = Math.min(baseHeight * 1.8, Math.max(baseHeight * 0.62, baseHeight * Math.sqrt(3 / aspect)))
  return { width: Math.round(height * aspect), height: Math.round(height) }
}

/**
 * One client: the logo drawn in a single colour that follows the section
 * (ink on light sections, ivory on the dark stage), or the name in display type.
 */
function ClientItem({ client, compact = false, large = false }: { client: Client; compact?: boolean; large?: boolean }) {
  const logo = logoOf(client)
  if (logo) {
    const { width, height } = logoBox(logo, compact ? 30 : large ? 42 : 36)
    return (
      <span
        role="img"
        aria-label={client.name}
        title={client.name}
        className="client-logo"
        style={{ width, height, '--logo': `url("${logo.url}")` } as CSSProperties}
      />
    )
  }
  return (
    <span
      className={`whitespace-nowrap font-display font-medium tracking-tight text-ink-soft in-[.tone-dark]:text-paper/80 ${
        compact ? 'text-[1.15rem]' : 'text-[1.35rem]'
      }`}
    >
      {client.name}
    </span>
  )
}

/** Without JavaScript the logos are shown straight away. */
const noScriptLogos =
  '<style>.client-logo{opacity:1;background-color:currentColor;-webkit-mask:var(--logo) center/contain no-repeat;mask:var(--logo) center/contain no-repeat}</style>'

/**
 * Clients we have worked with, as a slowly scrolling row (with a pause button)
 * or as a compact list with one supporting quote — the "proof strip" under a hero.
 */
export async function ClientLogosBlock({ block, context }: { block: ClientLogosData; context: BlockContext }) {
  const isStatic = block.display === 'static'
  const chosen = (block.clients ?? []).filter((client): client is Client => typeof client === 'object' && client !== null)
  const all = chosen.length
    ? chosen
    : await findPublished('clients', {
        locale: context.locale,
        where: { showOnWebsite: { equals: true } },
        sort: 'order',
        limit: 60,
        depth: 1,
      })

  // When most clients have a logo, show only the logos so the row stays consistent.
  const withLogo = all.filter((client) => logoOf(client))
  const shown = withLogo.length >= all.length / 2 ? withLogo : all
  const clients = isStatic ? shown.slice(0, block.limit ?? 12) : shown

  if (!clients.length) return null
  const titleId = headingId(block)
  const tone = block.tone === 'dark' ? 'tone-dark' : block.tone === 'tinted' ? 'bg-surface-alt' : 'bg-surface'
  const heading = block.heading && (
    <h2 id={titleId} className="max-w-xl text-[1.05rem] font-semibold text-ink in-[.tone-dark]:text-paper">
      <HighlightText text={block.heading} />
    </h2>
  )

  if (isStatic) {
    const quote =
      block.testimonial && typeof block.testimonial === 'object' && block.testimonial.permission !== 'pending'
        ? (block.testimonial as Testimonial)
        : null
    const source = quote ? testimonialSourceLabel(quote.source) : null
    const details = quote ? [quote.authorRole, source].filter(Boolean).join(' · ') : ''

    return (
      <section id={block.anchorId ?? undefined} aria-labelledby={block.heading ? titleId : undefined} className={`${tone} py-12 md:py-16`}>
        <div className={`container-site grid gap-10 ${quote ? 'lg:grid-cols-12 lg:items-center lg:gap-16' : ''}`}>
          <div className={quote ? 'lg:col-span-7' : ''}>
            {heading}
            {/* A grid so every row is full (the default 12 divides into rows of 3 and 4) */}
            <DeferredLogos>
              <ul className="client-list mt-7 grid grid-cols-3 items-center gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-x-9">
                {clients.map((client) => (
                  <li key={client.id} className="flex min-w-0 items-center">
                    <ClientItem client={client} compact />
                  </li>
                ))}
              </ul>
            </DeferredLogos>
            <noscript dangerouslySetInnerHTML={{ __html: noScriptLogos }} />
          </div>
          {quote && (
            <figure className="border-t border-ink/15 pt-8 in-[.tone-dark]:border-white/15 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <blockquote className="font-display text-[1.3rem] font-medium leading-[1.35] tracking-tight">
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[0.95rem]">
                <span className="font-semibold">{quote.authorName}</span>
                {details && <span className="block text-sm text-muted in-[.tone-dark]:text-on-dark-muted">{details}</span>}
              </figcaption>
            </figure>
          )}
        </div>
      </section>
    )
  }

  const row = (duplicate = false) => (
    <ul
      className={`client-list flex shrink-0 items-center gap-x-16 pr-16 ${duplicate ? 'marquee-duplicate' : ''}`}
      aria-hidden={duplicate || undefined}
    >
      {clients.map((client) => (
        <li key={client.id} className="flex items-center">
          <ClientItem client={client} large />
        </li>
      ))}
    </ul>
  )

  // Scrolling row: the heading is a centred statement, the logos run underneath it.
  return (
    <section id={block.anchorId ?? undefined} aria-labelledby={block.heading ? titleId : undefined} className={`${tone} pb-16 pt-14 md:pb-20 md:pt-20`}>
      {block.heading && (
        <div className="container-site">
          <h2 id={titleId} className="heading-lg mx-auto max-w-[24ch] text-center">
            <HighlightText text={block.heading} />
          </h2>
        </div>
      )}
      <DeferredLogos className="mt-10 md:mt-12">
        <Marquee labels={{ pause: context.dict.common.pauseAnimation, play: context.dict.common.playAnimation }}>
          <div className="marquee-track flex w-max items-center">
            {row()}
            {row(true)}
          </div>
        </Marquee>
      </DeferredLogos>
      <noscript dangerouslySetInnerHTML={{ __html: noScriptLogos }} />
    </section>
  )
}
