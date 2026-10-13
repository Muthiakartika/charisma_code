'use client'

import { ArrowRight, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { useActionState, useEffect, useRef } from 'react'

import type { Dictionary } from '@/i18n/dictionaries'
import { trackEvent } from '@/lib/analytics'

import { submitApplication, type FormState } from './actions'
import { ConsentText, FieldShell, Honeypot } from './FormFields'
import { TurnstileWidget } from './TurnstileWidget'
import { FormMetaFields } from './FormMetaFields'

type Option = { value: string; label: string }

type Props = {
  locale: string
  labels: Dictionary['form']
  applicationLabels: Dictionary['application']
  roles: Option[]
  experienceLevels: Option[]
  availability: Option[]
  privacyHref: string
  /** Cloudflare Turnstile site key, when the check is switched on. */
  turnstileSiteKey?: string
}

const initialState: FormState = { status: 'idle' }

export function ApplicationForm({
  locale,
  labels,
  applicationLabels: app,
  roles,
  experienceLevels,
  availability,
  privacyHref,
  turnstileSiteKey,
}: Props) {
  const [state, formAction, pending] = useActionState(submitApplication, initialState)
  const statusRef = useRef<HTMLDivElement>(null)
  const trackedRef = useRef<string | null>(null)

  const value = (name: string) => {
    const submitted = state.values?.[name]
    return typeof submitted === 'string' ? submitted : undefined
  }
  const error = (name: string) => {
    const code = state.errors?.[name] as keyof Dictionary['form']['errors'] | undefined
    return code ? labels.errors[code] : undefined
  }
  const chosenAvailability = Array.isArray(state.values?.availability) ? (state.values.availability as string[]) : []

  useEffect(() => {
    if (state.status !== 'idle') statusRef.current?.focus()
    if (state.status === 'success' && state.saved && state.reference && trackedRef.current !== state.reference) {
      trackedRef.current = state.reference
      trackEvent('freelancer_application_submit', { language: locale })
    }
  }, [state, locale])

  if (state.status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-card)] bg-surface p-8 outline-none md:p-10">
        <CheckCircle size={44} weight="fill" className="text-accent" aria-hidden />
        <h3 className="heading-md mt-5">{app.successTitle}</h3>
        <p className="mt-3 text-ink-soft">
          {app.successText} <strong className="text-ink">{state.reference}</strong>
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="relative grid gap-5 sm:grid-cols-2">
      {state.status === 'error' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="form-alert sm:col-span-2"
        >
          <WarningCircle size={22} className="mt-0.5 shrink-0" aria-hidden />
          <p>
            {state.message === 'rateLimit'
              ? labels.errorRateLimit
              : state.message === 'fix'
                ? labels.errorFix
                : state.message === 'captcha'
                  ? labels.errorCaptcha
                  : labels.errorGeneric}
          </p>
        </div>
      )}

      <FieldShell name="name" label={labels.name} error={error('name')}>
        {({ id, describedBy, invalid }) => (
          <input id={id} name="name" type="text" required maxLength={100} autoComplete="name" defaultValue={value('name')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input" />
        )}
      </FieldShell>

      <FieldShell name="email" label={labels.email} error={error('email')}>
        {({ id, describedBy, invalid }) => (
          <input id={id} name="email" type="email" required maxLength={160} autoComplete="email" defaultValue={value('email')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input" />
        )}
      </FieldShell>

      <FieldShell name="phone" label={labels.phone} optionalLabel={labels.optional} error={error('phone')}>
        {({ id, describedBy, invalid }) => (
          <input id={id} name="phone" type="tel" maxLength={24} autoComplete="tel" defaultValue={value('phone')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input" />
        )}
      </FieldShell>

      <FieldShell name="location" label={app.location} error={error('location')}>
        {({ id, describedBy, invalid }) => (
          <input id={id} name="location" type="text" required maxLength={100} autoComplete="address-level1" defaultValue={value('location')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input" />
        )}
      </FieldShell>

      <FieldShell name="role" label={app.role} error={error('role')}>
        {({ id, describedBy, invalid }) => (
          <select id={id} name="role" required key={`role-${value('role') ?? ''}`} defaultValue={value('role') ?? ''} aria-invalid={invalid} aria-describedby={describedBy} className="field-input">
            <option value="" disabled>
              {labels.choose}
            </option>
            {roles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </FieldShell>

      <FieldShell name="experience" label={app.experience} error={error('experience')}>
        {({ id, describedBy, invalid }) => (
          <select id={id} name="experience" required key={`experience-${value('experience') ?? ''}`} defaultValue={value('experience') ?? ''} aria-invalid={invalid} aria-describedby={describedBy} className="field-input">
            <option value="" disabled>
              {labels.choose}
            </option>
            {experienceLevels.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </FieldShell>

      <FieldShell name="bio" label={app.bio} hint={app.bioHint} error={error('bio')} className="sm:col-span-2">
        {({ id, describedBy, invalid }) => (
          <textarea id={id} name="bio" required minLength={30} maxLength={2500} rows={5} defaultValue={value('bio')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input resize-y" />
        )}
      </FieldShell>

      <FieldShell name="portfolioUrl" label={app.portfolioUrl} optionalLabel={labels.optional} error={error('portfolioUrl')}>
        {({ id, describedBy, invalid }) => (
          <input id={id} name="portfolioUrl" type="url" inputMode="url" placeholder="https://" maxLength={300} defaultValue={value('portfolioUrl')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input" />
        )}
      </FieldShell>

      <FieldShell name="resume" label={app.resume} optionalLabel={labels.optional} hint={app.resumeHint} error={error('resume')}>
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className="field-input file:mr-4 file:rounded-full file:border-0 file:bg-paper-deep file:px-4 file:py-1.5 file:font-medium"
          />
        )}
      </FieldShell>

      <fieldset className="sm:col-span-2">
        <legend className="field-label">{app.availability}</legend>
        <div className="mt-1 flex flex-wrap gap-x-6 gap-y-3">
          {availability.map((option) => (
            <label key={option.value} className="inline-flex items-center gap-2.5">
              <input
                type="checkbox"
                name="availability"
                value={option.value}
                key={`${option.value}-${chosenAvailability.includes(option.value)}`}
                defaultChecked={chosenAvailability.includes(option.value)}
                className="h-5 w-5 accent-[var(--color-accent)]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <FieldShell name="availabilityNotes" label={app.availabilityNotes} optionalLabel={labels.optional} error={error('availabilityNotes')} className="sm:col-span-2">
        {({ id, describedBy, invalid }) => (
          <textarea id={id} name="availabilityNotes" maxLength={600} rows={2} defaultValue={value('availabilityNotes')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input resize-y" />
        )}
      </FieldShell>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id="field-consent"
            name="consent"
            type="checkbox"
            required
            defaultChecked={state.values?.consent === true}
            aria-invalid={Boolean(error('consent'))}
            aria-describedby={error('consent') ? 'field-consent-error' : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
          />
          <label htmlFor="field-consent" className="text-[0.95rem] text-ink-soft">
            <ConsentText text={app.consent} linkLabel={labels.privacyPolicy} href={privacyHref} />
          </label>
        </div>
        {error('consent') && (
          <p id="field-consent-error" className="field-error">
            {error('consent')}
          </p>
        )}
      </div>

      <Honeypot />
      <FormMetaFields locale={locale} />
      {turnstileSiteKey && (
        <TurnstileWidget siteKey={turnstileSiteKey} action="application" locale={locale} resetSignal={state} />
      )}

      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
          {pending ? labels.sending : app.submit}
          {!pending && <ArrowRight className="arrow" size={18} weight="bold" aria-hidden />}
        </button>
      </div>
    </form>
  )
}
