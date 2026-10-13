/**
 * Accessible form building blocks: label above the field, hint and error below,
 * linked with aria-describedby so screen readers read them out.
 */
import Link from 'next/link'
import type { ReactNode } from 'react'

type FieldShellProps = {
  name: string
  label: string
  hint?: string
  error?: string
  optionalLabel?: string
  className?: string
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
}

export function FieldShell({ name, label, hint, error, optionalLabel, className = '', children }: FieldShellProps) {
  const id = `field-${name}`
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {optionalLabel && <span className="ml-1.5 font-normal text-muted">({optionalLabel})</span>}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * A consent sentence with the privacy policy linked in place.
 * The text marks where the link goes with {privacyPolicy}, so every language can put it where it belongs.
 */
export function ConsentText({ text, linkLabel, href }: { text: string; linkLabel: string; href: string }) {
  const [before, after = ''] = text.split('{privacyPolicy}')
  return (
    <>
      {before}
      <Link href={href} className="font-medium text-ink underline underline-offset-4">
        {linkLabel}
      </Link>
      {after}
    </>
  )
}

/** Hidden from people; bots fill it in (see security.ts). */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="field-website">Website</label>
      <input id="field-website" type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  )
}
