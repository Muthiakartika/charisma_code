'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/**
 * In preview mode, refreshes the page every time the editor saves a draft in the CMS.
 * The CMS runs on the same address as the site, so it listens for that address: this keeps working
 * on staging, on www and on the bare domain, whatever NEXT_PUBLIC_SITE_URL says.
 */
export function LivePreviewListener() {
  const router = useRouter()
  const serverURL = typeof window === 'undefined' ? '' : window.location.origin
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
}
