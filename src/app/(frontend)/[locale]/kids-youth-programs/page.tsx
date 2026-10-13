/**
 * Kids & Youth Programs (playful kids theme is chosen in the CMS)
 * Content: CMS → Pages → "kids-youth-programs". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'kids-youth-programs'

export default async function KidsYouthProgramsPage({ params }: PageProps<'/[locale]/kids-youth-programs'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/kids-youth-programs'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
