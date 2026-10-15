/**
 * Website fonts (downloaded at build time and served from this website — no Google requests).
 *
 *  - Plus Jakarta Sans → headings (clean, bold, easy to read at a glance)
 *  - Geist             → body text, buttons, forms (clean, very readable)
 *
 * Chinese text uses the visitor's system fonts (PingFang SC / Microsoft YaHei),
 * which avoids downloading very large Chinese font files. See globals.css.
 *
 * To change a font: import another one from 'next/font/google' below and keep
 * the same `variable` name. Nothing else needs to change.
 */
import { Geist, Plus_Jakarta_Sans } from 'next/font/google'

export const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display-family',
  display: 'swap',
})

export const bodyFont = Geist({
  subsets: ['latin'],
  variable: '--font-body-family',
  display: 'swap',
  // Not preloaded, so the hero photo downloads first. Next.js adjusts the fallback
  // font metrics, so the switch to Geist does not shift the layout.
  preload: false,
})
