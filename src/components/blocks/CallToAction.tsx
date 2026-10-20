import { EnvelopeSimple, Phone, WhatsappLogo } from '@phosphor-icons/react/ssr'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { HighlightText } from '@/components/ui/HighlightText'
import { contactLinks } from '@/lib/contact'
import { resolveLink } from '@/lib/links'
import type { CallToActionBlock as CallToActionData } from '@/payload-types'

import { headingId, type BlockContext } from './shared'

const styles = {
  spark: 'cta-spark bg-action text-on-action',
  dark: 'tone-dark',
  light: 'bg-surface-alt text-ink',
}

export function CallToActionBlock({ block, context }: { block: CallToActionData; context: BlockContext }) {
  const { locale, dict, settings } = context
  const primary = resolveLink(block.primaryButton, locale)
  const secondary = resolveLink(block.secondaryButton, locale)
  const contact = block.showContactDetails ? contactLinks(settings.contact) : null
  const style = block.style ?? 'spark'
  const titleId = headingId(block)
  const onColour = style === 'spark'

  return (
    <section id={block.anchorId ?? undefined} aria-labelledby={titleId} className={`${styles[style]} scroll-mt-24`}>
      <div className="container-site grid gap-12 py-20 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          {block.eyebrow && <p className={`mb-4 text-sm font-semibold ${onColour ? '' : 'eyebrow'}`}>{block.eyebrow}</p>}
          <h2 id={titleId} className="heading-xl max-w-3xl [&_.text-highlight]:bg-none [&_.text-highlight]:text-inherit [&_.text-highlight]:underline [&_.text-highlight]:decoration-2 [&_.text-highlight]:underline-offset-[0.12em]">
            <HighlightText text={block.heading} />
          </h2>
          {block.text && <p className="lead mt-6">{block.text}</p>}
          {(primary || secondary) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {primary &&
                (onColour ? (
                  <ButtonLink link={primary} className="!bg-ink !text-paper !shadow-none hover:!bg-paper hover:!text-ink" />
                ) : (
                  <ButtonLink link={primary} />
                ))}
              <ButtonLink link={secondary} variant="secondary" />
            </div>
          )}
        </div>

        {contact && (contact.phone || contact.whatsapp || contact.email) && (
          <ul className="grid gap-4 text-lg lg:col-span-4 lg:justify-self-end">
            {contact.whatsapp && (
              <li>
                <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-semibold underline-offset-4 hover:underline">
                  <WhatsappLogo size={24} aria-hidden /> {dict.common.whatsapp}
                </a>
              </li>
            )}
            {contact.phone && (
              <li>
                <a href={contact.phone.href} className="inline-flex items-center gap-3 font-semibold underline-offset-4 hover:underline">
                  <Phone size={24} aria-hidden /> {contact.phone.label}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={contact.email.href} className="inline-flex items-center gap-3 font-semibold underline-offset-4 hover:underline">
                  <EnvelopeSimple size={24} aria-hidden /> {contact.email.label}
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  )
}
