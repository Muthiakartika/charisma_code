/**
 * Building pieces shared by all page-builder blocks.
 */
import type { ReactNode } from 'react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { HighlightText } from '@/components/ui/HighlightText'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { SiteSettings } from '@/lib/cms'
import type { ResolvedLink } from '@/lib/links'
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
export function BlockAction({ action, className = '' }: { action?: ResolvedLink | null; className?: string }) {
  if (!action) return null
  return (
    <div className={className}>
      <ButtonLink link={action} />
    </div>
  )
}

type Tone = 'light' | 'tinted' | 'dark' | 'spark' | null | undefined

export const toneClasses: Record<string, string> = {
  light: 'bg-surface',
  tinted: 'bg-surface-alt',
  dark: 'tone-dark',
  /** Orange colour block. Not offered in the CMS yet; used by the homepage design options. */
  spark: 'tone-spark',
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
      {intro && <p className="lead mt-5 text-ink-soft in-[.tone-dark]:text-on-dark-muted">{intro}</p>}
    </div>
  )
}

/** Stable id for aria-labelledby, based on the block's database id. */
export const headingId = (block: { id?: string | null; blockType: string }) =>
  `heading-${block.blockType}-${block.id ?? 'x'}`
