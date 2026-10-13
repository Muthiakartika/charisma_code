'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/** In preview mode, refreshes the page every time the editor saves a draft in the CMS. */
export function LivePreviewListener() {
  const router = useRouter()
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={process.env.NEXT_PUBLIC_SITE_URL ?? ''} />
}
