import { ProjectCard } from '@/components/portfolio/ProjectCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { findPublished } from '@/lib/cms'
import { resolveLink } from '@/lib/links'
import type { FeaturedProjectsBlock as FeaturedProjectsData, Project } from '@/payload-types'

import { headingId, Section, SectionHeading, type BlockContext } from './shared'

export async function FeaturedProjectsBlock({ block, context }: { block: FeaturedProjectsData; context: BlockContext }) {
  const { locale, dict } = context
  const limit = block.limit ?? 3
  const chosen = (block.projects ?? []).filter((project): project is Project => typeof project === 'object' && project !== null)

  const projects = chosen.length
    ? chosen.slice(0, limit)
    : await findPublished('projects', {
        locale,
        where:
          block.category && block.category !== 'all'
            ? { category: { equals: block.category } }
            : { featured: { equals: true } },
        sort: '-eventDate',
        limit,
      })

  if (!projects.length) return null
  const [first, ...rest] = projects
  const button = resolveLink(block.button, locale)
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId} labelledBy={titleId}>
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id={titleId} eyebrow={block.eyebrow} heading={block.heading} />
          {button && <ButtonLink link={button} variant="secondary" showArrow className="self-start md:self-auto" />}
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className={`reveal ${rest.length ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <ProjectCard project={first} locale={locale} dict={dict} size="large" />
          </div>
          {rest.length > 0 && (
            <div className="grid gap-12 lg:col-span-5">
              {rest.map((project) => (
                <div key={project.id} className="reveal">
                  <ProjectCard project={project} locale={locale} dict={dict} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
