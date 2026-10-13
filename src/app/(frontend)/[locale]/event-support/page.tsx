/**
 * Event Support
 * Content: CMS → Pages → "event-support". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'event-support'

export default async function EventSupportPage({ params }: PageProps<'/[locale]/event-support'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/event-support'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
