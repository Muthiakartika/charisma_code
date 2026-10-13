import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  Phone,
  TiktokLogo,
  WhatsappLogo,
  YoutubeLogo,
} from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { SiteSettings } from '@/lib/cms'
import { contactLinks } from '@/lib/contact'
import { resolveLink } from '@/lib/links'
import { localizePath } from '@/lib/paths'

type Props = { settings: SiteSettings; locale: Locale; dict: Dictionary }

export function Footer({ settings, locale, dict }: Props) {
  const { footer, contact, social } = settings
  const links = contactLinks(contact)

  const socials = [
    { href: social.instagram, label: 'Instagram', Icon: InstagramLogo },
    { href: social.linkedin, label: 'LinkedIn', Icon: LinkedinLogo },
    { href: social.facebook, label: 'Facebook', Icon: FacebookLogo },
    { href: social.youtube, label: 'YouTube', Icon: YoutubeLogo },
    { href: social.tiktok, label: 'TikTok', Icon: TiktokLogo },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href))

  return (
    <footer className="tone-dark">
      <div className="container-site grid gap-14 pb-10 pt-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href={localizePath('/', locale)} aria-label="The Charisma Code, home" className="inline-block">
            <Image
              src="/brand/logo-horizontal-light.png"
              alt="The Charisma Code"
              width={163}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          {footer.tagline && (
            <p className="mt-8 font-display text-2xl font-semibold tracking-tight">{footer.tagline}</p>
          )}
          {footer.blurb && <p className="mt-3 max-w-sm text-on-dark-muted">{footer.blurb}</p>}

          <ul className="mt-8 grid gap-3">
            {links.phone && (
              <li>
                <a href={links.phone.href} className="inline-flex items-center gap-3 hover:text-accent">
                  <Phone size={20} aria-hidden /> {links.phone.label}
                </a>
              </li>
            )}
            {links.whatsapp && (
              <li>
                <a
                  href={links.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-accent"
                >
                  <WhatsappLogo size={20} aria-hidden /> {dict.common.whatsapp}
                </a>
              </li>
            )}
            {links.email && (
              <li>
                <a href={links.email.href} className="inline-flex items-center gap-3 hover:text-accent">
                  <EnvelopeSimple size={20} aria-hidden /> {links.email.label}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          {(footer.columns ?? []).map((column, index) => (
            <div key={column.id ?? index}>
              <h2 className="font-sans text-sm font-semibold text-on-dark-muted">{column.title}</h2>
              <ul className="mt-4 grid gap-2.5">
                {(column.links ?? []).map((item, linkIndex) => {
                  const link = resolveLink(item.link, locale)
                  if (!link) return null
                  return (
                    <li key={item.id ?? linkIndex}>
                      <Link href={link.href} className="hover:text-accent">
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container-site flex flex-col gap-6 border-t border-white/10 py-8 text-sm text-on-dark-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} The Charisma Code. {dict.common.allRightsReserved}
          {contact.uen && (
            <>
              {' '}
              {dict.common.uen} {contact.uen}
            </>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-6">
          {(footer.legalLinks ?? []).map((item, index) => {
            const link = resolveLink(item.link, locale)
            return link ? (
              <Link key={item.id ?? index} href={link.href} className="hover:text-paper">
                {link.label}
              </Link>
            ) : null
          })}
          {socials.length > 0 && (
            <ul className="flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
