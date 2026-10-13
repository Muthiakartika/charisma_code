/**
 * Our Work (portfolio)
 * Content: CMS → Pages → "our-work". The project grid is the "Portfolio with filters" block;
 * projects themselves are managed in CMS → Portfolio Projects.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'our-work'

export default async function OurWorkPage({ params }: PageProps<'/[locale]/our-work'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/our-work'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
