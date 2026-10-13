/**
 * Creative Campaigns
 * Content: CMS → Pages → "creative-campaigns". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'creative-campaigns'

export default async function CreativeCampaignsPage({ params }: PageProps<'/[locale]/creative-campaigns'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/creative-campaigns'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
