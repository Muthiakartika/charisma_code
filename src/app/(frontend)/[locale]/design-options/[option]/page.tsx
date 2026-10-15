/**
 * One homepage design option, e.g. /design-options/colour (preview for the client, not indexed).
 */
import type { Metadata } from 'next'

import { findHomeOption, HomeOption } from '@/components/design-options/HomeOption'

type Props = { params: Promise<{ locale: string; option: string }> }

export default async function HomeOptionPage({ params }: Props) {
  const { locale, option } = await params
  return <HomeOption option={option} locale={locale} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { option } = await params
  const found = findHomeOption(option)
  return {
    title: found ? `Homepage option: ${found.name}` : 'Homepage options',
    robots: { index: false, follow: false },
  }
}
