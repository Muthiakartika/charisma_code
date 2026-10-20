import { CmsImage } from '@/components/ui/CmsImage'
import type { TeamBlock as TeamData } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

/** First letters of a name, shown when a team member has no photo yet. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

export function TeamBlock({ block }: { block: TeamData; context: BlockContext }) {
  const titleId = headingId(block)
  const dark = block.tone === 'dark'
  const members = block.members ?? []
  if (members.length === 0) return null

  return (
    <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
      <div className="container-site">
        <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <li key={member.id ?? index} className="reveal">
              <div
                className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[var(--radius-media)] ${
                  dark ? 'bg-white/[0.06]' : 'bg-paper-deep'
                }`}
              >
                {member.photo ? (
                  <CmsImage media={member.photo} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                ) : (
                  <span aria-hidden className="font-display text-5xl font-bold text-accent">
                    {initials(member.name)}
                  </span>
                )}
              </div>
              <h3 className="heading-md mt-6">{member.name}</h3>
              {member.role && <p className="mt-1 text-sm font-semibold text-accent">{member.role}</p>}
              {member.bio && <p className={`mt-3 ${dark ? 'text-on-dark-muted' : 'text-ink-soft'}`}>{member.bio}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
