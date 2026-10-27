import { EnvelopeSimple, Phone, WhatsappLogo } from '@phosphor-icons/react/ssr'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { HighlightText } from '@/components/ui/HighlightText'
import { contactLinks } from '@/lib/contact'
import { resolveLink } from '@/lib/links'
import type { CallToActionBlock as CallToActionData, Media } from '@/payload-types'

import { headingId, PriceLine, whatsappIcon, type BlockContext } from './shared'

const styles = {
  spark: 'cta-spark bg-action text-on-action',
  dark: 'tone-dark',
  light: 'bg-surface-alt text-ink',
  ivory: 'bg-surface text-ink',
  card: 'bg-surface text-ink',
}

export function CallToActionBlock({
  block,
  context,
}: {
  block: CallToActionData
  context: BlockContext
}) {
  const { locale, dict, settings } = context
  const primary = resolveLink(block.primaryButton, locale)
  const secondary = resolveLink(block.secondaryButton, locale)
  const contact = block.showContactDetails ? contactLinks(settings.contact) : null
  const style = block.style ?? 'spark'
  const titleId = headingId(block)
  const onColour = style === 'spark'

  // ── Card: a contained invitation with a photo, quieter than the full-width closing band ─
  if (style === 'card') {
    const image =
      typeof block.image === 'object' && block.image !== null ? (block.image as Media) : null
    return (
      <section
        id={block.anchorId ?? undefined}
        aria-labelledby={titleId}
        className="section-space scroll-mt-24 bg-surface"
      >
        <div className="container-site">
          <div className="reveal grid overflow-hidden rounded-[var(--radius-card)] bg-surface-alt lg:grid-cols-12">
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7 lg:p-14">
              {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
              <h2 id={titleId} className="heading-lg max-w-xl">
                <HighlightText text={block.heading} />
              </h2>
              {block.text && <p className="mt-5 max-w-xl text-ink-soft">{block.text}</p>}
              {(primary || secondary) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink link={primary} icon={whatsappIcon(primary)} />
                  <ButtonLink link={secondary} variant="secondary" icon={whatsappIcon(secondary)} />
                </div>
              )}
            </div>
            {image && (
              <div className="relative min-h-[240px] sm:min-h-[300px] lg:col-span-5 lg:min-h-full">
                <CmsImage
                  media={image}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id={block.anchorId ?? undefined}
      aria-labelledby={titleId}
      className={`${styles[style]} scroll-mt-24`}
    >
      <div className="container-site grid gap-12 py-20 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          {block.eyebrow && (
            <p className={`mb-4 text-sm font-semibold ${onColour ? '' : 'eyebrow'}`}>
              {block.eyebrow}
            </p>
          )}
          <h2
            id={titleId}
            className="heading-xl max-w-3xl [&_.text-highlight]:bg-none [&_.text-highlight]:text-inherit [&_.text-highlight]:underline [&_.text-highlight]:decoration-2 [&_.text-highlight]:underline-offset-[0.12em]"
          >
            <HighlightText text={block.heading} />
          </h2>
          {block.text && <p className="lead mt-6">{block.text}</p>}
          <PriceLine text={block.priceLine} locale={locale} className="mt-6 text-xl" />
          {(primary || secondary) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {primary &&
                (onColour ? (
                  <ButtonLink
                    link={primary}
                    icon={whatsappIcon(primary)}
                    className="!bg-ink !text-paper !shadow-none hover:!bg-paper hover:!text-ink"
                  />
                ) : (
                  <ButtonLink link={primary} icon={whatsappIcon(primary)} />
                ))}
              <ButtonLink link={secondary} variant="secondary" icon={whatsappIcon(secondary)} />
            </div>
          )}
        </div>

        {contact && (contact.phone || contact.whatsapp || contact.email) && (
          <ul className="grid gap-4 text-lg lg:col-span-4 lg:justify-self-end">
            {contact.whatsapp && (
              <li>
                <a
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-semibold underline-offset-4 hover:underline"
                >
                  <WhatsappLogo size={24} aria-hidden /> {dict.common.whatsapp}
                </a>
              </li>
            )}
            {contact.phone && (
              <li>
                <a
                  href={contact.phone.href}
                  className="inline-flex items-center gap-3 font-semibold underline-offset-4 hover:underline"
                >
                  <Phone size={24} aria-hidden /> {contact.phone.label}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a
                  href={contact.email.href}
                  className="inline-flex items-center gap-3 font-semibold underline-offset-4 hover:underline"
                >
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
