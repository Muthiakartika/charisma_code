/**
 * Homepage
 * Content: CMS → Pages → "home". Each homepage section is a block on that page.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'home'

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
