/**
 * The homepage in one colour option, e.g. /colour-options/yellow (preview for the client, not indexed).
 */
import type { Metadata } from 'next'

import { findColourOption, HomeColourOption } from '@/components/colour-options/HomeColourOption'

type Props = { params: Promise<{ locale: string; palette: string }> }

export default async function HomeColourOptionPage({ params }: Props) {
  const { locale, palette } = await params
  return <HomeColourOption option={palette} locale={locale} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { palette } = await params
  const found = findColourOption(palette)
  return {
    title: found ? `Homepage colour: ${found.name}` : 'Homepage colour options',
    robots: { index: false, follow: false },
  }
}
