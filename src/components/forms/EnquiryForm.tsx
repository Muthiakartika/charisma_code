'use client'

import { ArrowRight, CheckCircle, WarningCircle, WhatsappLogo } from '@phosphor-icons/react'
import { useActionState, useEffect, useRef } from 'react'

import type { Dictionary } from '@/i18n/dictionaries'
import { trackEvent } from '@/lib/analytics'

import { submitEnquiry, type FormState } from './actions'
import { ConsentText, FieldShell, Honeypot } from './FormFields'
import { TurnstileWidget } from './TurnstileWidget'
import { FormMetaFields } from './FormMetaFields'

type Option = { value: string; label: string }

type Props = {
  locale: string
  labels: Dictionary['form']
  services: Option[]
  groupSizes: Option[]
  budgets: Option[]
  defaultService?: string
  privacyHref: string
  /** Shown again after a successful enquiry, so people know what to expect. */
  nextSteps?: string[]
  whatsappHref?: string
  /** Cloudflare Turnstile site key, when the check is switched on. */
  turnstileSiteKey?: string
}

const initialState: FormState = { status: 'idle' }

export function EnquiryForm({
  locale,
  labels,
  services,
  groupSizes,
  budgets,
  defaultService,
  privacyHref,
  nextSteps = [],
  whatsappHref,
  turnstileSiteKey,
}: Props) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState)
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

  useEffect(() => {
    if (state.status !== 'idle') statusRef.current?.focus()
    // Count the enquiry in Google Analytics only after it was really saved — once.
    if (state.status === 'success' && state.saved && state.reference && trackedRef.current !== state.reference) {
      trackedRef.current = state.reference
      trackEvent('generate_lead', { form_type: 'client_enquiry', service: state.serviceKey, language: locale })
    }
  }, [state, locale])

  if (state.status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-card)] bg-surface p-8 outline-none md:p-10">
        <CheckCircle size={44} weight="fill" className="text-accent" aria-hidden />
        <h3 className="heading-md mt-5">{labels.successTitle}</h3>
        <p className="mt-3 text-ink-soft">
          {labels.successText} <strong className="text-ink">{state.reference}</strong>.
        </p>
        {nextSteps.length > 0 && (
          <>
            <h4 className="mt-8 font-semibold">{labels.nextStepsTitle}</h4>
            <ol className="mt-4 grid gap-3">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-action font-display text-sm font-bold text-on-action"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </>
        )}
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 font-semibold underline-offset-4 hover:text-accent hover:underline"
          >
            <WhatsappLogo size={22} className="text-accent" aria-hidden />
            {labels.successWhatsapp}
          </a>
        )}
      </div>
    )
  }

  const selectedService = value('service') ?? defaultService ?? ''

  return (
    <form action={formAction} className="relative grid gap-5 sm:grid-cols-2" noValidate={false}>
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

      <FieldShell name="company" label={labels.company} optionalLabel={labels.optional} error={error('company')}>
        {({ id, describedBy, invalid }) => (
          <input id={id} name="company" type="text" maxLength={120} autoComplete="organization" defaultValue={value('company')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input" />
        )}
      </FieldShell>

      <FieldShell name="service" label={labels.service} error={error('service')}>
        {({ id, describedBy, invalid }) => (
          <select id={id} name="service" required defaultValue={selectedService} key={selectedService} aria-invalid={invalid} aria-describedby={describedBy} className="field-input">
            <option value="" disabled>
              {labels.servicePlaceholder}
            </option>
            {services.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            <option value="other">{labels.serviceOther}</option>
          </select>
        )}
      </FieldShell>

      <FieldShell name="eventDate" label={labels.eventDate} optionalLabel={labels.optional} hint={labels.eventDateHint} error={error('eventDate')}>
        {({ id, describedBy, invalid }) => (
          <input id={id} name="eventDate" type="text" maxLength={60} defaultValue={value('eventDate')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input" />
        )}
      </FieldShell>

      <FieldShell name="groupSize" label={labels.groupSize} optionalLabel={labels.optional}>
        {({ id }) => (
          <select id={id} name="groupSize" key={`groupSize-${value('groupSize') ?? ''}`} defaultValue={value('groupSize') ?? ''} className="field-input">
            <option value="">{labels.choose}</option>
            {groupSizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </FieldShell>

      <FieldShell name="budget" label={labels.budget} optionalLabel={labels.optional} hint={labels.budgetHint}>
        {({ id, describedBy }) => (
          <select id={id} name="budget" key={`budget-${value('budget') ?? ''}`} defaultValue={value('budget') ?? ''} aria-describedby={describedBy} className="field-input">
            <option value="">{labels.choose}</option>
            {budgets.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </FieldShell>

      <FieldShell name="message" label={labels.message} hint={labels.messageHint} error={error('message')} className="sm:col-span-2">
        {({ id, describedBy, invalid }) => (
          <textarea id={id} name="message" required minLength={10} maxLength={3000} rows={5} defaultValue={value('message')} aria-invalid={invalid} aria-describedby={describedBy} className="field-input resize-y" />
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
            <ConsentText text={labels.consent} linkLabel={labels.privacyPolicy} href={privacyHref} />
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
        <TurnstileWidget siteKey={turnstileSiteKey} action="enquiry" locale={locale} resetSignal={state} />
      )}

      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
          {pending ? labels.sending : labels.submit}
          {!pending && <ArrowRight className="arrow" size={18} weight="bold" aria-hidden />}
        </button>
      </div>
    </form>
  )
}
