'use client'

import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'

import { readAttribution, type Attribution } from '@/lib/analytics'

const noSubscription = () => () => {}

/**
 * Hidden fields sent with every form:
 *  - startedAt: when this page was opened (spam protection: bots submit instantly)
 *  - language, page and where the visitor came from (monthly reports)
 */
export function FormMetaFields({ locale }: { locale: string }) {
  const formPage = usePathname()
  const startedAt = useSyncExternalStore(
    noSubscription,
    () => String(Math.round(performance.timeOrigin)),
    () => '',
  )
  const attributionJson = useSyncExternalStore(
    noSubscription,
    () => JSON.stringify(readAttribution()),
    () => '{}',
  )
  const attribution = JSON.parse(attributionJson) as Attribution

  return (
    <>
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="formPage" value={formPage} />
      <input type="hidden" name="landingPage" value={attribution.landingPage ?? ''} />
      <input type="hidden" name="referrer" value={attribution.referrer ?? ''} />
      <input type="hidden" name="utmSource" value={attribution.utmSource ?? ''} />
      <input type="hidden" name="utmMedium" value={attribution.utmMedium ?? ''} />
      <input type="hidden" name="utmCampaign" value={attribution.utmCampaign ?? ''} />
    </>
  )
}
