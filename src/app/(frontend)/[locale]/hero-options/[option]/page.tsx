/**
 * The homepage with one light hero option, e.g. /hero-options/daylight
 * (preview for the client, not indexed). See src/components/hero-options/hero-options.ts.
 * The Colour block option also takes a line art choice: /hero-options/colour-block?art=skyline
 */
import type { Metadata } from 'next'

import { findHeroOption } from '@/components/hero-options/hero-options'
import { HomeWithHeroOption } from '@/components/hero-options/HomeWithHeroOption'

type Props = {
  params: Promise<{ locale: string; option: string }>
  searchParams: Promise<{ art?: string | string[] }>
}

export default async function HeroOptionPage({ params, searchParams }: Props) {
  const [{ locale, option }, { art }] = await Promise.all([params, searchParams])
  return <HomeWithHeroOption option={option} locale={locale} art={art} />
}

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const { option } = await params
  const found = findHeroOption(option)
  return {
    title: found ? `Hero option: ${found.name}` : 'Hero options',
    robots: { index: false, follow: false },
  }
}
