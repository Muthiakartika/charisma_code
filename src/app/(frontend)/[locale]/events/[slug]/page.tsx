/**
 * Public sessions and camps, e.g. /events/holiday-camp-dec-2026
 * Content: CMS → Pages → "events-…" (the slug's prefix places the page here, see nestedPagePrefixes in src/lib/paths.ts).
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

export default async function EventPage({ params }: PageProps<'/[locale]/events/[slug]'>) {
  const { locale, slug } = await params
  return <CmsPage slug={`events-${decodeURIComponent(slug)}`} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/events/[slug]'>) {
  const { locale, slug } = await params
  return generateCmsMetadata(`events-${decodeURIComponent(slug)}`, locale)
}
