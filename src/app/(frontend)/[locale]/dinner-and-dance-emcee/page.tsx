/**
 * Dinner & Dance Emcee
 * Content: CMS → Pages → "dinner-and-dance-emcee". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'dinner-and-dance-emcee'

export default async function DinnerAndDanceEmceePage({ params }: PageProps<'/[locale]/dinner-and-dance-emcee'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/dinner-and-dance-emcee'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
