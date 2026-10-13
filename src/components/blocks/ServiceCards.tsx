import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import { CmsImage } from '@/components/ui/CmsImage'
import { findPublished } from '@/lib/cms'
import { localizePath, pagePath } from '@/lib/paths'
import type { Service, ServiceCardsBlock as ServiceCardsData } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

const serviceHref = (service: Service, locale: BlockContext['locale']) => {
  const page = service.page
  if (!page || typeof page !== 'object') return localizePath('/contact', locale)
  return localizePath(pagePath(page.slug), locale)
}

export async function ServiceCardsBlock({ block, context }: { block: ServiceCardsData; context: BlockContext }) {
  const { locale } = context
  const chosen = (block.services ?? []).filter((service): service is Service => typeof service === 'object' && service !== null)
  const services = chosen.length
    ? chosen
    : await findPublished('services', { locale, sort: 'priority', depth: 1 })

  if (!services.length) return null
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId} labelledBy={titleId}>
      <div className="container-site">
        <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
        <div className="mt-12 lg:mt-16">
          {block.layout === 'list' ? (
            <CompactList services={services} locale={locale} />
          ) : block.layout === 'grid' ? (
            <EvenGrid services={services} locale={locale} />
          ) : (
            <PriorityLayout services={services} locale={locale} exploreLabel={context.dict.common.explore} />
          )}
        </div>
      </div>
    </Section>
  )
}

/** Homepage layout: the most important service is the largest tile. */
function PriorityLayout({
  services,
  locale,
  exploreLabel,
}: {
  services: Service[]
  locale: BlockContext['locale']
  exploreLabel: string
}) {
  const [feature, wide, ...rest] = services
  const smalls = rest.slice(0, 2)
  const others = rest.slice(2)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {feature && (
          <Link
            href={serviceHref(feature, locale)}
            className="zoom-on-hover group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-ink p-7 text-paper md:col-span-2 lg:row-span-2 lg:min-h-[560px] lg:p-10"
          >
            <CmsImage media={feature.image} sizes="(min-width: 1024px) 50vw, 100vw" className="-z-20 object-cover" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/0" />
            <h3 className="heading-lg max-w-md">{feature.title}</h3>
            <p className="mt-4 max-w-md text-paper/85">{feature.summary}</p>
            <span className="mt-7 inline-flex items-center gap-2 font-semibold text-spark-bright">
              {exploreLabel}
              <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        )}

        {wide && (
          <Link
            href={serviceHref(wide, locale)}
            className="group grid overflow-hidden rounded-[var(--radius-card)] bg-surface-alt md:col-span-2 sm:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="zoom-on-hover relative min-h-[220px] overflow-hidden bg-paper-deep">
              <CmsImage media={wide.image} sizes="(min-width: 1024px) 22vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-6 p-7">
              <div>
                <h3 className="heading-md">{wide.title}</h3>
                <p className="mt-3 text-ink-soft">{wide.summary}</p>
              </div>
              <ArrowUpRight size={22} className="self-end text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </div>
          </Link>
        )}

        {smalls.map((service) => (
          <Link
            key={service.id}
            href={serviceHref(service, locale)}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface"
          >
            <div className="zoom-on-hover relative aspect-[4/3] overflow-hidden bg-paper-deep">
              <CmsImage media={service.image} sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4 p-6">
              <div>
                <h3 className="heading-md">{service.title}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{service.summary}</p>
              </div>
              <ArrowUpRight size={22} className="self-end text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </div>
          </Link>
        ))}
      </div>

      {others.length > 0 && (
        <div className="mt-14">
          <CompactList services={others} locale={locale} />
        </div>
      )}
    </>
  )
}

function EvenGrid({ services, locale }: { services: Service[]; locale: BlockContext['locale'] }) {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Link key={service.id} href={serviceHref(service, locale)} className="group">
          <div className="zoom-on-hover relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] bg-paper-deep">
            <CmsImage media={service.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
          <h3 className="heading-md mt-5 group-hover:text-accent">{service.title}</h3>
          <p className="mt-2 text-ink-soft">{service.summary}</p>
        </Link>
      ))}
    </div>
  )
}

function CompactList({ services, locale }: { services: Service[]; locale: BlockContext['locale'] }) {
  return (
    <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.id} className="border-t border-line">
          <Link href={serviceHref(service, locale)} className="group flex items-start justify-between gap-6 py-6">
            <span>
              <span className="block font-display text-xl font-semibold tracking-tight group-hover:text-accent">
                {service.title}
              </span>
              <span className="mt-1.5 block text-[0.95rem] text-ink-soft">{service.summary}</span>
            </span>
            <ArrowRight size={20} className="mt-1 shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  )
}
