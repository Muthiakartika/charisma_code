import { Clock, MapPin, UsersThree } from '@phosphor-icons/react/ssr'

import { Bullet } from '@/components/ui/Bullet'
import { CmsImage } from '@/components/ui/CmsImage'
import { findPublished } from '@/lib/cms'
import type { Program, ProgramCardsBlock as ProgramCardsData } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

export async function ProgramCardsBlock({ block, context }: { block: ProgramCardsData; context: BlockContext }) {
  const chosen = (block.programs ?? []).filter((program): program is Program => typeof program === 'object' && program !== null)
  const serviceId = block.service && typeof block.service === 'object' ? block.service.id : block.service

  const programs = chosen.length
    ? chosen
    : serviceId
      ? await findPublished('programs', {
          locale: context.locale,
          where: { service: { equals: serviceId } },
          sort: 'order',
        })
      : []

  if (!programs.length) return null
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId} tone="tinted" labelledBy={titleId}>
      <div className="container-site">
        <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {programs.map((program) => {
            const facts = [
              { Icon: Clock, label: context.dict.programs.duration, text: program.duration },
              { Icon: UsersThree, label: context.dict.programs.groupSize, text: program.groupSize },
              { Icon: MapPin, label: context.dict.programs.setting, text: program.setting },
            ].filter((fact) => Boolean(fact.text))
            const hasImage = program.image && typeof program.image === 'object'

            return (
              <li
                key={program.id}
                className={`reveal grid overflow-hidden rounded-[var(--radius-card)] bg-surface ${hasImage ? 'sm:grid-cols-[0.8fr_1.2fr]' : ''}`}
              >
                {hasImage && (
                  <div className="relative min-h-[200px] bg-paper-deep">
                    <CmsImage media={program.image} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="flex flex-col p-7">
                  <h3 className="heading-md">{program.title}</h3>
                  <p className="mt-3 text-ink-soft">{program.summary}</p>
                  {program.highlights && program.highlights.length > 0 && (
                    <ul className="mt-4 grid gap-1.5 text-[0.95rem]">
                      {program.highlights.map((item, index) => (
                        <li key={item.id ?? index} className="flex gap-2.5">
                          <Bullet small />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  )}
                  {facts.length > 0 && (
                    <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm text-ink-soft">
                      {facts.map(({ Icon, label, text }) => (
                        <div key={text} className="flex items-center gap-2">
                          <dt className="sr-only">{label}</dt>
                          <Icon size={18} className="text-accent" aria-hidden />
                          <dd>{text}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
