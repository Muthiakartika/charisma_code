import { ArrowRight } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/lib/paths'

/** Closing call to action on article and project pages. */
export function ContactBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="cta-spark bg-action text-on-action">
      <div className="container-site flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div>
          <h2 className="heading-lg max-w-2xl">{dict.cta.title}</h2>
          <p className="lead mt-4">{dict.cta.text}</p>
        </div>
        <Link href={localizePath('/contact', locale)} className="btn shrink-0 bg-ink text-paper hover:bg-paper hover:text-ink">
          {dict.cta.button} <ArrowRight className="arrow" size={18} weight="bold" aria-hidden />
        </Link>
      </div>
    </section>
  )
}
