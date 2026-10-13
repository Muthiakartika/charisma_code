/**
 * Corporate Team Building (priority #1 landing page)
 * Content: CMS → Pages → "corporate-team-building". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'corporate-team-building'

export default async function CorporateTeamBuildingPage({ params }: PageProps<'/[locale]/corporate-team-building'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/corporate-team-building'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
