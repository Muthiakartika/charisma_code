'use client'

import { Play } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState, type ReactNode } from 'react'

type Props = {
  videoId: string
  title: string
  playLabel: string
  /** Optional cover image from the CMS (rendered by the parent). */
  poster?: ReactNode
}

/**
 * Lightweight YouTube player: shows a cover image first and only loads YouTube
 * when the visitor presses play (keeps pages fast, no tracking until then).
 */
export function YouTubePlayer({ videoId, title, playLabel, poster }: Props) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full"
      aria-label={`${playLabel}: ${title}`}
    >
      {poster ?? (
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover"
        />
      )}
      <span aria-hidden className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/10" />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-paper transition-transform group-hover:scale-105"
      >
        <Play size={30} weight="fill" />
      </span>
    </button>
  )
}
