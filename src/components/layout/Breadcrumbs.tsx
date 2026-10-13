import { CaretRight } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { localizePath } from '@/lib/paths'
import type { Crumb } from '@/lib/seo'

/** Visible breadcrumb trail (the matching JSON-LD is added by the page). */
export function Breadcrumbs({ crumbs, locale, label }: { crumbs: Crumb[]; locale: Locale; label: string }) {
  if (crumbs.length < 2) return null
  return (
    <nav aria-label={label} className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-ink-soft">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={localizePath(crumb.path, locale)} className="hover:text-ink">
                    {crumb.name}
                  </Link>
                  <CaretRight size={12} aria-hidden />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
