import { ArrowUpRight } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

import { CmsImage } from '@/components/ui/CmsImage'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localizePath, projectPath } from '@/lib/paths'
import type { Project } from '@/payload-types'

type Props = {
  project: Project
  locale: Locale
  dict: Dictionary
  size?: 'large' | 'small'
  headingLevel?: 'h2' | 'h3'
}

export const formatMonthYear = (date: string | null | undefined, locale: Locale) =>
  date
    ? new Intl.DateTimeFormat(locale === 'zh' ? 'zh-SG' : 'en-SG', { month: 'long', year: 'numeric', timeZone: 'Asia/Singapore' }).format(
        new Date(date),
      )
    : null

/** A portfolio project: photo, category, title and client. Links to its page when it has one. */
export function ProjectCard({ project, locale, dict, size = 'small', headingLevel: Heading = 'h3' }: Props) {
  const category = dict.work.categories[project.category] ?? project.category
  const date = formatMonthYear(project.eventDate, locale)
  const href = project.hasDetailPage !== false && project.slug ? localizePath(projectPath(project.slug), locale) : null

  const body = (
    <>
      <div
        className={`zoom-on-hover relative overflow-hidden rounded-[var(--radius-media)] bg-paper-deep ${
          size === 'large' ? 'aspect-[4/3]' : 'aspect-[16/10]'
        }`}
      >
        <CmsImage
          media={project.coverImage}
          sizes={size === 'large' ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 38vw, 100vw'}
          className="object-cover"
        />
      </div>
      <p className="mt-4 text-sm font-semibold text-accent">
        {category}
        {date && <span className="font-normal text-muted"> {` / ${date}`}</span>}
      </p>
      <Heading className={`mt-2 ${size === 'large' ? 'heading-md lg:text-[1.9rem]' : 'heading-md'} group-hover:text-accent`}>
        {project.title}
        {href && (
          <ArrowUpRight size={20} className="ml-1.5 inline-block align-baseline text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
        )}
      </Heading>
      {project.clientName && <p className="mt-1.5 text-ink-soft">{project.clientName}</p>}
    </>
  )

  return href ? (
    <Link href={href} className="group block">
      {body}
    </Link>
  ) : (
    <div>{body}</div>
  )
}
