/**
 * Google Analytics 4 helpers (browser only).
 *
 * Event names used on this website (mark only `generate_lead` as a "key event" in GA4
 * so enquiries are not counted twice):
 *   generate_lead                  a client enquiry was SAVED successfully (param: service, language)
 *   freelancer_application_submit  a freelancer application was saved successfully
 *   contact_phone_click            someone tapped the phone number
 *   contact_email_click            someone clicked the email address
 *   contact_whatsapp_click         someone opened WhatsApp
 *   social_instagram_click         someone opened Instagram
 */
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export type AnalyticsEvent =
  | 'generate_lead'
  | 'freelancer_application_submit'
  | 'contact_phone_click'
  | 'contact_email_click'
  | 'contact_whatsapp_click'
  | 'social_instagram_click'

export function trackEvent(name: AnalyticsEvent, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

/** Where the visitor came from — stored for this browser tab only, sent with enquiries. */
export type Attribution = {
  landingPage?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

const ATTRIBUTION_KEY = 'tcc-attribution'

/** Attribution of the current page view (used on the first page of a visit). */
function currentAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search)
  const referrer =
    document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : undefined
  return {
    landingPage: window.location.pathname,
    referrer,
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  }
}

/** Saves the first page of the visit, so later pages still know where the visitor came from. */
export function rememberAttribution() {
  try {
    if (!sessionStorage.getItem(ATTRIBUTION_KEY)) {
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(currentAttribution()))
    }
  } catch {
    // Storage can be blocked (private mode). Attribution is optional.
  }
}

export function readAttribution(): Attribution {
  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_KEY)
    return stored ? (JSON.parse(stored) as Attribution) : currentAttribution()
  } catch {
    return {}
  }
}
