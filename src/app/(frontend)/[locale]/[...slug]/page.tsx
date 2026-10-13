/**
 * Any other address, e.g. /legal or a new page created in the CMS.
 * 1. Shows the CMS page with that slug, if it exists.
 * 2. Otherwise follows a redirect created in CMS → Settings → Redirects.
 * 3. Otherwise shows the "page not found" screen.
 */
import { notFound, permanentRedirect, redirect } from 'next/navigation'

import { CmsPage, generateCmsMetadata, toLocale } from '@/components/layout/CmsPage'
import { getCmsRedirect, getPage } from '@/lib/cms'
import { localizePath } from '@/lib/paths'

export default async function CatchAllPage({ params }: PageProps<'/[locale]/[...slug]'>) {
  const { locale, slug } = await params
  const path = slug.map(decodeURIComponent).join('/')

  if (slug.length === 1 && (await getPage(path, toLocale(locale)))) {
    return <CmsPage slug={path} locale={locale} />
  }

  const target = await getCmsRedirect(`/${path}`)
  if (target) {
    const url = target.url.startsWith('/') ? localizePath(target.url, toLocale(locale)) : target.url
    if (target.permanent) permanentRedirect(url)
    redirect(url)
  }

  notFound()
}

export async function generateMetadata({ params }: PageProps<'/[locale]/[...slug]'>) {
  const { locale, slug } = await params
  if (slug.length !== 1) return {}
  return generateCmsMetadata(decodeURIComponent(slug[0]), locale)
}
