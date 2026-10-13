import { Check } from '@phosphor-icons/react/ssr'

/**
 * The one bullet used in every list on the website: a tick in an accent-coloured disc.
 * `small` is for compact lists inside cards.
 */
export function Bullet({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-accent text-paper in-[.tone-dark]:text-ink ${
        small ? 'mt-1 h-4 w-4' : 'mt-0.5 h-6 w-6'
      }`}
    >
      <Check size={small ? 10 : 14} weight="bold" />
    </span>
  )
}
