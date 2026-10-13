/**
 * Communication Coaching
 * Content: CMS → Pages → "communication-coaching". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'communication-coaching'

export default async function CommunicationCoachingPage({ params }: PageProps<'/[locale]/communication-coaching'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/communication-coaching'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
