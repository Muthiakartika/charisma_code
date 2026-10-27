/**
 * Building pieces shared by all page-builder blocks.
 */
import { WhatsappLogo } from '@phosphor-icons/react/ssr'
import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { HighlightText } from '@/components/ui/HighlightText'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { SiteSettings } from '@/lib/cms'
import { resolveLink, type CmsLink, type ResolvedLink } from '@/lib/links'
import { localizePath } from '@/lib/paths'
import type { Crumb } from '@/lib/seo'

/** Information every block receives besides its own CMS fields. */
export type BlockContext = {
  locale: Locale
  dict: Dictionary
  settings: SiteSettings
  pageTitle: string
  breadcrumbs: Crumb[]
  /** The first block on a page renders the page's <h1> and loads its image first. */
  isFirst: boolean
  /** The page's main action (e.g. "Check your D&D date"), set when this block should offer it (see RenderBlocks). */
  action?: ResolvedLink | null
}

/** The page's main action button at the end of a block. Renders nothing when the block was not given one. */
export function BlockAction({
  action,
  className = '',
}: {
  action?: ResolvedLink | null
  className?: string
}) {
  if (!action) return null
  return (
    <div className={className}>
      <ButtonLink link={action} />
    </div>
  )
}

/** WhatsApp buttons carry the WhatsApp logo so visitors know the app will open. */
export const whatsappIcon = (link: ResolvedLink | null) =>
  link?.href.includes('wa.me/') ? <WhatsappLogo size={20} weight="fill" aria-hidden /> : undefined

/** True when at least one of the CMS buttons is complete enough to show. */
export const hasButtons = (links: CmsLink[] | null | undefined, locale: Locale) =>
  (links ?? []).some((link) => resolveLink(link, locale))

/** A section's own row of buttons: the first is the solid action button, the rest are outlined. */
export function SectionButtons({
  links,
  locale,
  className = '',
}: {
  links?: CmsLink[] | null
  locale: Locale
  className?: string
}) {
  const resolved = (links ?? [])
    .map((link) => resolveLink(link, locale))
    .filter((link): link is ResolvedLink => link !== null)
  if (!resolved.length) return null
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {resolved.map((link, index) => (
        <ButtonLink
          key={`${link.href}-${index}`}
          link={link}
          variant={index === 0 ? 'primary' : 'secondary'}
          icon={whatsappIcon(link)}
          showArrow={index === 0 && !link.href.includes('wa.me/')}
        />
      ))}
    </div>
  )
}

/** Text where words written as [label](/path) become links, e.g. "[Wedding Emcee](/wedding-emcee), or …". */
export function InlineLinks({ text, locale }: { text: string; locale: Locale }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (!match) return <Fragment key={index}>{part}</Fragment>
        const [, label, href] = match
        return (
          <Link
            key={index}
            href={href.startsWith('/') ? localizePath(href, locale) : href}
            className="font-semibold underline decoration-1 underline-offset-4 hover:text-accent"
          >
            {label}
          </Link>
        )
      })}
    </>
  )
}

/** A price strip such as "From S$588 · see all rates". Words written as [see all rates](/rates) become a link. */
export function PriceLine({
  text,
  locale,
  className = '',
}: {
  text?: string | null
  locale: Locale
  className?: string
}) {
  if (!text) return null
  return (
    <p className={`price-line ${className}`}>
      <InlineLinks text={text} locale={locale} />
    </p>
  )
}

type Tone = 'light' | 'tinted' | 'dark' | null | undefined

export const toneClasses: Record<string, string> = {
  light: 'bg-surface',
  tinted: 'bg-surface-alt',
  dark: 'tone-dark',
}

export function Section({
  id,
  tone,
  className = '',
  children,
  labelledBy,
}: {
  id?: string | null
  tone?: Tone
  className?: string
  children: ReactNode
  labelledBy?: string
}) {
  return (
    <section
      id={id ?? undefined}
      aria-labelledby={labelledBy}
      className={`section-space scroll-mt-24 ${toneClasses[tone ?? 'light']} ${className}`}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  heading,
  intro,
  as: Tag = 'h2',
  className = '',
  size = 'lg',
}: {
  id?: string
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  as?: 'h1' | 'h2'
  className?: string
  size?: 'xl' | 'lg'
}) {
  if (!heading && !eyebrow && !intro) return null
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      {heading && (
        <Tag id={id} className={size === 'xl' ? 'heading-xl' : 'heading-lg'}>
          <HighlightText text={heading} />
        </Tag>
      )}
      {intro && (
        <p className="lead mt-5 text-ink-soft in-[.tone-dark]:text-on-dark-muted">{intro}</p>
      )}
    </div>
  )
}

/** Stable id for aria-labelledby, based on the block's database id. */
export const headingId = (block: { id?: string | null; blockType: string }) =>
  `heading-${block.blockType}-${block.id ?? 'x'}`
