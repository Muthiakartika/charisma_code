'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef } from 'react'

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

/**
 * Cloudflare Turnstile check, shown only when the site key is set (see turnstile.ts).
 * It stays invisible for most visitors and only asks for a click when Cloudflare is unsure.
 * The widget adds a hidden "cf-turnstile-response" field to the surrounding form.
 */
export function TurnstileWidget({
  siteKey,
  action,
  locale,
  resetSignal,
}: {
  siteKey: string
  action: 'enquiry' | 'application'
  locale: string
  /** Changes after every submission; a used token cannot be reused, so the widget gets a fresh one. */
  resetSignal: unknown
}) {
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  const render = useCallback(() => {
    if (!container.current || !window.turnstile || widgetId.current) return
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      action,
      theme: 'light',
      appearance: 'interaction-only',
      size: 'flexible',
      language: locale === 'zh' ? 'zh-cn' : 'en',
    })
  }, [siteKey, action, locale])

  // Render when the script is already loaded (e.g. after client-side navigation), and clean up on leave.
  useEffect(() => {
    render()
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current)
      widgetId.current = null
    }
  }, [render])

  useEffect(() => {
    if (widgetId.current) window.turnstile?.reset(widgetId.current)
  }, [resetSignal])

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={render}
      />
      <div ref={container} className="sm:col-span-2 empty:hidden" />
    </>
  )
}
