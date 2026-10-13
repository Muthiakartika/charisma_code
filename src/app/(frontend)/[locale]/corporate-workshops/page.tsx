/**
 * Corporate Workshops
 * Content: CMS → Pages → "corporate-workshops". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'corporate-workshops'

export default async function CorporateWorkshopsPage({ params }: PageProps<'/[locale]/corporate-workshops'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/corporate-workshops'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
