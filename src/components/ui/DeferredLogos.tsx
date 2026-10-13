'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Client logos are drawn with CSS masks. Masks start downloading as soon as the
 * page is styled, which would compete with the hero photo for bandwidth.
 * This wrapper switches the logos on only after the page has finished loading
 * (see `.client-logo` in globals.css). Without JavaScript, a <noscript> rule shows them anyway.
 */
export function DeferredLogos({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const show = () => ref.current?.setAttribute('data-logos-ready', '')
    if (document.readyState === 'complete') {
      show()
      return
    }
    window.addEventListener('load', show, { once: true })
    return () => window.removeEventListener('load', show)
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
