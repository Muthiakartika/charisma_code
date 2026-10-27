/**
 * Crew profiles, e.g. /about/crew/daniel-tan
 * Content: CMS → Pages → "crew-…" (the slug's prefix places the page here, see nestedPagePrefixes in src/lib/paths.ts).
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

export default async function CrewProfilePage({
  params,
}: PageProps<'/[locale]/about/crew/[name]'>) {
  const { locale, name } = await params
  return <CmsPage slug={`crew-${decodeURIComponent(name)}`} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/about/crew/[name]'>) {
  const { locale, name } = await params
  return generateCmsMetadata(`crew-${decodeURIComponent(name)}`, locale)
}
