/**
 * Cloudflare Turnstile: an optional, privacy-friendly "are you human?" check on the public forms.
 *
 * It switches on only when BOTH keys are set (see .env.example):
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY  (shown in the browser)
 *   TURNSTILE_SECRET_KEY            (server only, never sent to the browser)
 * Without them, the forms keep working with the honeypot, timing check and rate limit.
 *
 * Server only (it reads request headers and the secret key).
 */
import { getClientIp } from './security'

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** The public site key, or undefined when Turnstile is not set up. */
export function turnstileSiteKey() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  return siteKey && process.env.TURNSTILE_SECRET_KEY ? siteKey : undefined
}

export type TurnstileAction = 'enquiry' | 'application'

/**
 * Checks the token the widget put in the form (field "cf-turnstile-response").
 * - Not set up → always passes.
 * - Cloudflare says no (or no token) → fails.
 * - Cloudflare cannot be reached → passes and logs a warning, so a Cloudflare outage
 *   never blocks real enquiries (the other spam checks still apply).
 */
export async function verifyTurnstile(
  formData: FormData,
  action: TurnstileAction,
  log: (message: string, detail?: unknown) => void,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!turnstileSiteKey() || !secret) return true

  const token = String(formData.get('cf-turnstile-response') ?? '')
  if (!token || token.length > 2048) return false

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: await getClientIp() }),
      signal: AbortSignal.timeout(5_000),
      cache: 'no-store',
    })
    const result = (await response.json()) as { success?: boolean; action?: string; 'error-codes'?: string[] }
    if (!result.success) {
      log('Turnstile check failed', result['error-codes'])
      return false
    }
    // A token made for another form is not accepted here.
    if (result.action && result.action !== action) {
      log('Turnstile token was made for a different form', result.action)
      return false
    }
    return true
  } catch (error) {
    log('Turnstile could not be reached; the submission was allowed', error)
    return true
  }
}
