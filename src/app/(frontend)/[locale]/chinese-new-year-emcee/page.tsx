/**
 * Chinese New Year Emcee (seasonal landing page)
 * Content: CMS → Pages → "chinese-new-year-emcee". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'chinese-new-year-emcee'

export default async function ChineseNewYearEmceePage({ params }: PageProps<'/[locale]/chinese-new-year-emcee'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/chinese-new-year-emcee'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
