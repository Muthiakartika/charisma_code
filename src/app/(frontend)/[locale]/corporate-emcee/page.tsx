/**
 * Corporate Emcee
 * Content: CMS → Pages → "corporate-emcee". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'corporate-emcee'

export default async function CorporateEmceePage({ params }: PageProps<'/[locale]/corporate-emcee'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/corporate-emcee'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
