import { Fragment } from 'react'

/**
 * Shows a CMS heading. Words wrapped in *asterisks* are highlighted in the accent colour.
 * Example: "Experiences built around *your people*."
 */
export function HighlightText({ text }: { text?: string | null }) {
  if (!text) return null
  const parts = text.split(/(\*[^*]+\*)/g)
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <em key={index} className="text-highlight">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  )
}

/** Plain version (no markup) for meta tags and image alt text. */
export const stripHighlight = (text?: string | null) => (text ?? '').replace(/\*/g, '')

/** Splits a textarea into paragraphs on empty lines. */
export function Paragraphs({ text, className }: { text?: string | null; className?: string }) {
  if (!text) return null
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index} className={className}>
            {paragraph}
          </p>
        ))}
    </>
  )
}
