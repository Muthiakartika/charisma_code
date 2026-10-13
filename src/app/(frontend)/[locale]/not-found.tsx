'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/lib/paths'

export default function NotFound() {
  const params = useParams<{ locale?: string }>()
  const locale = isLocale(params?.locale) ? params.locale : 'en'
  const dict = getDictionary(locale)

  return (
    <main id="main" className="bg-surface">
      <div className="container-site flex min-h-[60dvh] flex-col justify-center py-24">
        <p className="eyebrow">404</p>
        <h1 className="heading-xl mt-4 max-w-3xl">{dict.notFound.title}</h1>
        <p className="lead mt-6 text-ink-soft">{dict.notFound.text}</p>
        <div className="mt-10">
          <Link href={localizePath('/', locale)} className="btn btn-primary">
            {dict.notFound.backHome}
          </Link>
        </div>
      </div>
    </main>
  )
}
