/**
 * Contact (the enquiry form is an "Enquiry Form" block)
 * Content: CMS → Pages → "contact". Edit the sections there, not in this file.
 */
import { CmsPage, generateCmsMetadata } from '@/components/layout/CmsPage'

const SLUG = 'contact'

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params
  return <CmsPage slug={SLUG} locale={locale} />
}

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params
  return generateCmsMetadata(SLUG, locale)
}
