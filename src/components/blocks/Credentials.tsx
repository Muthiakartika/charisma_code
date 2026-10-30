import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import {
  ChalkboardTeacher,
  GraduationCap,
  MaskHappy,
  Medal,
  MicrophoneStage,
  MusicNotes,
  PianoKeys,
  Sparkle,
  Trophy,
} from '@phosphor-icons/react/ssr'
import { createElement, Fragment, type ReactNode } from 'react'

import type { FeatureGridBlock as FeatureGridData } from '@/payload-types'

import { BlockAction, headingId, Section, SectionHeading, type BlockContext } from './shared'

type Item = FeatureGridData['items'][number]

/** An icon for each kind of credential, picked from words in its label or title (first match). */
const CREDENTIAL_ICONS: [RegExp, PhosphorIcon][] = [
  [/piano|abrsm/i, PianoKeys],
  [/\bbusk/i, MusicNotes],
  [/theatre|theater|acting|drama/i, MaskHappy],
  [/educat|graduat|degree|universit/i, GraduationCap],
  [/\btrain|\bteach|\bcoach/i, ChalkboardTeacher],
  [/finalist|competition/i, Trophy],
  [/recogni|award|invited/i, Medal],
  [/\bhost|\bemcee|\bstage/i, MicrophoneStage],
  [/\bmusic|\bsing(er|ing|s)?\b/i, MusicNotes],
]
const credentialIcon = (item: Item, size: number) =>
  createElement(
    CREDENTIAL_ICONS.find(([pattern]) => pattern.test(`${item.badge ?? ''} ${item.title}`))?.[1] ??
      Sparkle,
    { size, weight: 'duotone' },
  )

/**
 * The credential as written in its title, with each organisation named in it linked to its
 * website. The links are given in the item's text as [Name](https://…); a link whose name is
 * not in the title is shown after it.
 */
function CredentialLine({ item, title = item.title }: { item: Item; title?: string }) {
  const links = [...(item.text ?? '').matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)].map(
    ([, label, href]) => ({ label, href }),
  )
  const parts: ReactNode[] = []
  const extra: typeof links = []
  let rest = title
  for (const link of links) {
    const at = rest.indexOf(link.label)
    if (at < 0) {
      extra.push(link)
      continue
    }
    parts.push(rest.slice(0, at), <OrganisationLink key={link.href} {...link} />)
    rest = rest.slice(at + link.label.length)
  }
  parts.push(rest)
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>{part}</Fragment>
      ))}
      {extra.map((link) => (
        <Fragment key={link.href}>
          {' '}
          <OrganisationLink {...link} />
        </Fragment>
      ))}
    </>
  )
}

function OrganisationLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // The ↗ is text (not an icon), so it never wraps onto a line of its own
      className="font-semibold underline decoration-current/30 decoration-1 underline-offset-4 transition-colors after:ml-0.5 after:text-[0.8em] after:opacity-60 after:content-['↗'] hover:text-accent hover:decoration-current hover:after:opacity-100 in-[.credential-feature]:hover:text-spark-bright"
    >
      {label}
    </a>
  )
}

/**
 * Credentials and recognition: the first credential large on a dark card beside the heading
 * (its year as a big figure), the others in two ruled columns, each with an icon for its kind.
 */
export function CredentialsGrid({
  block,
  context,
}: {
  block: FeatureGridData
  context: BlockContext
}) {
  const titleId = headingId(block)
  const [featured, ...others] = block.items
  // "Hosted at the inaugural …, 2010" → the year as a big figure, the sentence without it
  const year = featured?.title.match(/,\s*((?:19|20)\d{2})$/)

  return (
    <Section id={block.anchorId} tone={block.tone} labelledBy={titleId}>
      {/* Side by side from 1280px (narrower, the two list columns get too tight). The button sits
          under the dark card when side by side, after the list otherwise. */}
      <div className="container-site grid gap-y-10 xl:grid-cols-12 xl:gap-x-16">
        <div className="xl:col-span-5 xl:row-start-1">
          <SectionHeading
            id={titleId}
            eyebrow={block.eyebrow}
            heading={block.heading}
            intro={block.intro}
          />
          {featured && (
            <div className="credential-feature reveal relative isolate mt-10 overflow-hidden rounded-[var(--radius-card)] bg-ink p-8 text-paper sm:p-10">
              <span
                aria-hidden
                className="band-glow pointer-events-none absolute -right-20 -top-20 -z-10 aspect-square w-72 rounded-full"
              />
              <div className="flex items-center justify-between gap-4">
                <span
                  aria-hidden
                  className="note-icon grid h-12 w-12 place-items-center rounded-full text-spark-bright"
                >
                  {credentialIcon(featured, 24)}
                </span>
                {featured.badge && (
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-on-dark-muted">
                    {featured.badge}
                  </span>
                )}
              </div>
              {year && (
                <p
                  aria-hidden
                  className="mt-10 font-display text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-none tracking-tight text-spark-bright"
                >
                  {year[1]}
                </p>
              )}
              <h3 className={`text-xl font-medium leading-snug ${year ? 'mt-4' : 'mt-8'}`}>
                {year && <span className="sr-only">{year[1]}: </span>}
                <CredentialLine
                  item={featured}
                  title={year ? featured.title.slice(0, year.index) : featured.title}
                />
              </h3>
            </div>
          )}
        </div>

        <ul className="grid content-start gap-x-10 md:grid-cols-2 xl:col-span-7 xl:col-start-6 xl:row-span-2 xl:row-start-1 xl:pt-3">
          {others.map((item, index) => (
            <li
              key={item.id ?? index}
              className="reveal flex gap-5 border-t border-ink/15 py-7 in-[.tone-dark]:border-white/15"
            >
              <span
                aria-hidden
                className="note-icon grid h-11 w-11 shrink-0 place-items-center rounded-full text-accent"
              >
                {credentialIcon(item, 22)}
              </span>
              <div>
                {item.badge && (
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {item.badge}
                  </p>
                )}
                <h3 className="mt-2 text-[1.0625rem] leading-snug text-ink in-[.tone-dark]:text-paper">
                  <CredentialLine item={item} />
                </h3>
              </div>
            </li>
          ))}
        </ul>

        <BlockAction action={context.action} className="xl:col-span-5 xl:row-start-2" />
      </div>
    </Section>
  )
}
