/**
 * All services overview
 * Content: CMS → Pages → "services". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'services'

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
