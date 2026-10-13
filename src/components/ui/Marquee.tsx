'use client'

import { Pause, Play } from '@phosphor-icons/react'
import { useState, type ReactNode } from 'react'

/**
 * A slowly scrolling row. Hovering pauses it, and a small round button at the
 * faded right edge stops it for keyboard and touch users too (WCAG 2.2.2).
 * Visitors who prefer reduced motion get a still, wrapped list instead (see "Motion" in globals.css).
 */
export function Marquee({
  children,
  labels,
}: {
  children: ReactNode
  labels: { pause: string; play: string }
}) {
  const [paused, setPaused] = useState(false)

  return (
    <div className="marquee group relative" data-paused={paused || undefined}>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)] sm:[mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]">
        {children}
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? labels.play : labels.pause}
        title={paused ? labels.play : labels.pause}
        className="marquee-control absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-surface text-ink-soft transition-colors hover:border-ink/40 hover:text-ink sm:right-6 in-[.tone-dark]:border-white/15 in-[.tone-dark]:bg-ink in-[.tone-dark]:text-on-dark-muted in-[.tone-dark]:hover:border-white/40 in-[.tone-dark]:hover:text-paper"
      >
        {paused ? <Play size={14} weight="fill" aria-hidden /> : <Pause size={14} weight="fill" aria-hidden />}
      </button>
    </div>
  )
}
