'use client'

import { ArrowRight, CaretDown, List, X } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { ResolvedLink } from '@/lib/links'

import { LanguageSwitcher } from './LanguageSwitcher'

export type NavItem = ResolvedLink & {
  children: Array<ResolvedLink & { description?: string }>
}

type Props = {
  items: NavItem[]
  cta: ResolvedLink | null
  locale: Locale
  labels: Dictionary['nav']
}

export function SiteNavigation({ items, cta, locale, labels }: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const baseId = useId()

  // Close menus after navigating to another page (adjusting state during render, as React recommends).
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setMobileOpen(false)
    setOpenDropdown(null)
  }

  // Escape closes menus; clicking outside closes the desktop dropdown.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
        setMobileOpen(false)
      }
    }
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenDropdown(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

  return (
    <div ref={navRef} className="flex items-center gap-2">
      {/* Desktop navigation */}
      <nav aria-label={labels.mainNavigation} className="hidden xl:block">
        <ul className="flex items-center gap-1">
          {items.map((item, index) => {
            const hasChildren = item.children.length > 0
            const panelId = `${baseId}-panel-${index}`
            const open = openDropdown === index
            return (
              <li
                key={item.href + index}
                className="relative"
                onMouseEnter={() => hasChildren && setOpenDropdown(index)}
                onMouseLeave={() => hasChildren && setOpenDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="rounded-full px-3 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-ink"
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      aria-label={item.label}
                      onClick={() => setOpenDropdown(open ? null : index)}
                      className="-ml-2 rounded-full p-1.5 text-ink-soft hover:text-ink"
                    >
                      <CaretDown size={14} weight="bold" className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <div
                    id={panelId}
                    hidden={!open}
                    className="absolute left-0 top-full z-50 w-[340px] pt-2"
                  >
                    <ul className="rounded-[var(--radius-card)] bg-paper p-2 shadow-[0_18px_40px_-14px_rgba(30,35,34,0.4),0_2px_6px_rgba(30,35,34,0.08)]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="group flex items-start justify-between gap-4 rounded-md px-3 py-2.5 hover:bg-paper-deep"
                          >
                            <span>
                              <span className="block font-medium text-ink">{child.label}</span>
                              {child.description && (
                                <span className="block text-sm leading-snug text-muted">{child.description}</span>
                              )}
                            </span>
                            <ArrowRight size={16} className="mt-1 shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="hidden xl:block">
        <LanguageSwitcher locale={locale} labels={labels} />
      </div>

      {cta && (
        <Link href={cta.href} className="btn btn-primary hidden !min-h-11 !px-5 sm:inline-flex">
          {cta.label}
        </Link>
      )}

      {/* Mobile menu button */}
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink xl:hidden"
        aria-expanded={mobileOpen}
        aria-controls={`${baseId}-mobile`}
        aria-label={mobileOpen ? labels.closeMenu : labels.menu}
        onClick={() => setMobileOpen((value) => !value)}
      >
        {mobileOpen ? <X size={22} /> : <List size={22} />}
      </button>

      {/* Mobile menu panel */}
      <div
        id={`${baseId}-mobile`}
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-paper xl:hidden"
      >
        <nav aria-label={labels.mainNavigation} className="container-site flex min-h-full flex-col pt-6">
          <ul className="divide-y divide-line">
            {items.map((item, index) => (
              <li key={item.href + index} className="py-3">
                <Link
                  href={item.href}
                  className="block py-1 font-display text-2xl font-semibold tracking-tight text-ink"
                >
                  {item.label}
                </Link>
                {item.children.length > 0 && (
                  <ul className="mt-1 grid gap-1 pl-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block py-1.5 text-ink-soft hover:text-ink">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="sticky bottom-0 -mx-1 mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line bg-paper px-1 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
            {cta && (
              <Link href={cta.href} className="btn btn-primary">
                {cta.label}
              </Link>
            )}
            <LanguageSwitcher locale={locale} labels={labels} />
          </div>
        </nav>
      </div>
    </div>
  )
}
