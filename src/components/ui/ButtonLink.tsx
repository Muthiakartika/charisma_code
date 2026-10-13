import { ArrowRight } from '@phosphor-icons/react/ssr'
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { ResolvedLink } from '@/lib/links'

type Props = {
  link: ResolvedLink | null
  variant?: 'primary' | 'secondary'
  showArrow?: boolean
  className?: string
  icon?: ReactNode
}

/** A button-styled link. Renders nothing when the CMS link is incomplete. */
export function ButtonLink({ link, variant = 'primary', showArrow, className = '', icon }: Props) {
  if (!link) return null
  const classes = `btn btn-${variant} ${className}`
  const content = (
    <>
      {icon}
      <span>{link.label}</span>
      {(showArrow ?? variant === 'primary') && <ArrowRight className="arrow" size={18} weight="bold" aria-hidden />}
    </>
  )

  if (link.external) {
    const opensNewTab = link.href.startsWith('http')
    return (
      <a
        href={link.href}
        className={classes}
        {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={link.href} className={classes}>
      {content}
    </Link>
  )
}
