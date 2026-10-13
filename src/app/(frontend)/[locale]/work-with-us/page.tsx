/**
 * Work With Us (freelancer applications)
 * Content: CMS → Pages → "work-with-us". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'work-with-us'

export default async function WorkWithUsPage({ params }: PageProps<'/[locale]/work-with-us'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/work-with-us'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
