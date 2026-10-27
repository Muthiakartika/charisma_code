/**
 * Job openings, e.g. /work-with-us/event-facilitator
 * Content: CMS → Pages → "jobs-…" (the slug's prefix places the page here, see nestedPagePrefixes in src/lib/paths.ts).
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

export default async function JobOpeningPage({
  params,
}: PageProps<'/[locale]/work-with-us/[role]'>) {
  const { locale, role } = await params
  return <CmsPage slug={`jobs-${decodeURIComponent(role)}`} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/work-with-us/[role]'>) {
  const { locale, role } = await params
  return generateCmsMetadata(`jobs-${decodeURIComponent(role)}`, locale)
}
