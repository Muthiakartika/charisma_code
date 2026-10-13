import Image from 'next/image'
import Link from 'next/link'

import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import type { SiteSettings } from '@/lib/cms'
import { resolveLink } from '@/lib/links'
import { localizePath } from '@/lib/paths'

import { SiteNavigation, type NavItem } from './SiteNavigation'

type Props = {
  settings: SiteSettings
  locale: Locale
  dict: Dictionary
}

/** Site header: logo, main menu (from CMS → Settings → Navigation) and the header button. */
export function Header({ settings, locale, dict }: Props) {
  const { header, navigation } = settings

  const items: NavItem[] = (navigation.mainMenu ?? [])
    .map((item): NavItem | null => {
      const link = resolveLink(item.link, locale)
      if (!link) return null
      const children = (item.children ?? [])
        .map((child) => {
          const childLink = resolveLink(child.link, locale)
          return childLink ? { ...childLink, description: child.description ?? undefined } : null
        })
        .filter((child) => child !== null)
      return { ...link, children }
    })
    .filter((item): item is NavItem => item !== null)

  const cta = resolveLink(header.ctaButton, locale)
  const announcement = header.announcement?.enabled ? header.announcement : null
  const announcementLink = announcement ? resolveLink(announcement.link, locale) : null
  // A logo uploaded in Settings → Header replaces the default logo in /public/brand.
  const cmsLogo = header.logo && typeof header.logo === 'object' ? header.logo : null

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        {dict.nav.skipToContent}
      </a>

      {announcement?.text && (
        <div className="bg-ink text-paper">
          <p className="container-site py-2 text-center text-sm">
            {announcement.text}{' '}
            {announcementLink && (
              <Link href={announcementLink.href} className="font-semibold underline underline-offset-4">
                {announcementLink.label}
              </Link>
            )}
          </p>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper">
        <div className="container-site flex h-[72px] items-center justify-between gap-6">
          <Link href={localizePath('/', locale)} className="shrink-0" aria-label="The Charisma Code, home">
            {cmsLogo?.url ? (
              <Image
                src={cmsLogo.url}
                alt="The Charisma Code"
                width={cmsLogo.width ?? 400}
                height={cmsLogo.height ?? 120}
                loading="eager"
                className="h-10 w-auto sm:h-11"
              />
            ) : (
              <Image
                src="/brand/logo-horizontal-dark.png"
                alt="The Charisma Code"
                width={152}
                height={45}
                loading="eager"
                className="h-10 w-auto sm:h-11"
              />
            )}
          </Link>

          <SiteNavigation items={items} cta={cta} locale={locale} labels={dict.nav} />
        </div>
      </header>
    </>
  )
}
