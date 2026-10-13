/**
 * Wedding Emcee (warm wedding theme is chosen in the CMS)
 * Content: CMS → Pages → "wedding-emcee". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'wedding-emcee'

export default async function WeddingEmceePage({ params }: PageProps<'/[locale]/wedding-emcee'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/wedding-emcee'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
