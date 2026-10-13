/**
 * Insights (blog overview)
 * Content: CMS → Pages → "insights" (with a "Blog list" block). Articles: CMS → Blog Posts.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'insights'

export default async function InsightsPage({ params }: PageProps<'/[locale]/insights'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/insights'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
