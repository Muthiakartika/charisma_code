'use client'

import { useState, type ReactNode } from 'react'

type Props = {
  allLabel: string
  filterLabel: string
  emptyLabel: string
  categories: Array<{ value: string; label: string }>
  items: Array<{ id: number | string; category: string; card: ReactNode }>
  showFilters: boolean
}

/** Filter buttons for the portfolio. Cards are rendered on the server and passed in. */
export function ProjectFilter({ allLabel, filterLabel, emptyLabel, categories, items, showFilters }: Props) {
  const [active, setActive] = useState('all')
  const visible = active === 'all' ? items : items.filter((item) => item.category === active)
  const options = [{ value: 'all', label: allLabel }, ...categories]

  return (
    <>
      {showFilters && (
        <div role="group" aria-label={filterLabel} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={active === option.value}
              onClick={() => setActive(option.value)}
              className="shrink-0 rounded-full border border-ink/20 px-4 py-2 text-[0.95rem] font-medium transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {visible.length}
      </p>

      {visible.length ? (
        <ul className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {visible.map((item) => (
            <li key={item.id}>{item.card}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-ink-soft">{emptyLabel}</p>
      )}
    </>
  )
}
