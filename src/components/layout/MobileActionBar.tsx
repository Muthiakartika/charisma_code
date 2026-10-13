'use client'

import { WhatsappLogo } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  action: { href: string; label: string }
  whatsapp?: { href: string; label: string } | null
}

/**
 * Phones only: a bar pinned to the bottom of the screen with the page's main action
 * (e.g. "Request a proposal") and WhatsApp. It appears once the visitor has scrolled
 * past the first screen, and steps aside while the enquiry form or the footer is in view.
 */
export function MobileActionBar({ action, whatsapp }: Props) {
  const [pastHero, setPastHero] = useState(false)
  const [targetsInView, setTargetsInView] = useState(0)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    const frame = requestAnimationFrame(onScroll) // the page may open half-way down (back button)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Hide while the form or the footer is on screen (they already show these actions).
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      }
      setTargetsInView(visible.size)
    })
    document.querySelectorAll('#enquire, footer').forEach((element) => observer.observe(element))

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const shown = pastHero && targetsInView === 0

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
        shown ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!shown}
      inert={!shown}
    >
      <div className="tone-dark flex items-center gap-3 bg-transparent">
        <Link href={action.href} className="btn btn-primary flex-1">
          {action.label}
        </Link>
        {whatsapp && (
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={whatsapp.label}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 text-paper"
          >
            <WhatsappLogo size={24} aria-hidden />
          </a>
        )}
      </div>
    </div>
  )
}
