/**
 * About
 * Content: CMS → Pages → "about". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'about'

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
