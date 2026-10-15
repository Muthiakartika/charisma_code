import { EnvelopeSimple, Phone, WhatsappLogo } from '@phosphor-icons/react/ssr'

import { ApplicationForm } from '@/components/forms/ApplicationForm'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { turnstileSiteKey } from '@/components/forms/turnstile'
import { optionLabels } from '@/i18n/dictionaries'
import { findPublished } from '@/lib/cms'
import { contactLinks } from '@/lib/contact'
import {
  availabilityOptions,
  budgetOptions,
  experienceOptions,
  freelancerRoleOptions,
  groupSizeOptions,
} from '@/lib/forms/options'
import { localizePath } from '@/lib/paths'
import type { ApplicationFormBlock as ApplicationFormData, EnquiryFormBlock as EnquiryFormData } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

type Option = { readonly value: string; readonly label: string }
const translate = (options: readonly Option[], locale: BlockContext['locale']) =>
  options.map((option) => ({ value: option.value, label: optionLabels[locale][option.value] ?? option.label }))

const privacyHref = (locale: BlockContext['locale']) => localizePath('/legal', locale)

function DirectContact({ context }: { context: BlockContext }) {
  const links = contactLinks(context.settings.contact)
  const items = [
    links.whatsapp && { ...links.whatsapp, Icon: WhatsappLogo, label: context.dict.common.whatsapp, external: true },
    links.phone && { ...links.phone, Icon: Phone, external: false },
    links.email && { ...links.email, Icon: EnvelopeSimple, external: false },
  ].filter(Boolean) as Array<{ href: string; label: string; Icon: typeof Phone; external: boolean }>

  if (!items.length) return null
  return (
    <ul className="mt-10 grid gap-3 border-t border-line pt-8">
      {items.map(({ href, label, Icon, external }) => (
        <li key={href}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-3 font-semibold hover:text-accent"
          >
            <Icon size={22} className="text-accent" aria-hidden /> {label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export async function EnquiryFormBlock({ block, context }: { block: EnquiryFormData; context: BlockContext }) {
  const { locale, dict } = context
  const services = await findPublished('services', {
    locale,
    where: { showInEnquiryForm: { equals: true } },
    sort: 'priority',
    depth: 0,
  })
  const defaultService =
    block.defaultService && typeof block.defaultService === 'object' ? block.defaultService.key : undefined
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId ?? 'enquire'} tone="tinted" labelledBy={titleId}>
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
          {block.nextSteps && block.nextSteps.length > 0 && (
            <ol className="mt-8 grid gap-4">
              {block.nextSteps.map((step, index) => (
                <li key={step.id ?? index} className="flex gap-4">
                  <span
                    aria-hidden
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-action font-display text-sm font-bold text-on-action"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1 text-ink-soft">{step.text}</span>
                </li>
              ))}
            </ol>
          )}
          <DirectContact context={context} />
        </div>
        <div className="rounded-[var(--radius-card)] bg-surface p-6 sm:p-8 lg:col-span-8 lg:p-10">
          <EnquiryForm
            locale={locale}
            labels={dict.form}
            services={services.map((service) => ({ value: service.key, label: service.title }))}
            groupSizes={translate(groupSizeOptions, locale)}
            budgets={translate(budgetOptions, locale)}
            defaultService={defaultService ?? undefined}
            privacyHref={privacyHref(locale)}
            nextSteps={(block.nextSteps ?? []).map((step) => step.text)}
            whatsappHref={contactLinks(context.settings.contact).whatsapp?.href}
            turnstileSiteKey={turnstileSiteKey()}
          />
        </div>
      </div>
    </Section>
  )
}

export function ApplicationFormBlock({ block, context }: { block: ApplicationFormData; context: BlockContext }) {
  const { locale, dict } = context
  const titleId = headingId(block)
  return (
    <Section id={block.anchorId ?? 'apply'} tone="tinted" labelledBy={titleId}>
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
        </div>
        <div className="rounded-[var(--radius-card)] bg-surface p-6 sm:p-8 lg:col-span-8 lg:p-10">
          <ApplicationForm
            locale={locale}
            labels={dict.form}
            applicationLabels={dict.application}
            roles={translate(freelancerRoleOptions, locale)}
            experienceLevels={translate(experienceOptions, locale)}
            availability={translate(availabilityOptions, locale)}
            privacyHref={privacyHref(locale)}
            turnstileSiteKey={turnstileSiteKey()}
          />
        </div>
      </div>
    </Section>
  )
}
