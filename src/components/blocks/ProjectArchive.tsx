import { ProjectCard } from '@/components/portfolio/ProjectCard'
import { ProjectFilter } from '@/components/portfolio/ProjectFilter'
import { HighlightText } from '@/components/ui/HighlightText'
import { workCategoryOptions } from '@/fields/shared'
import { findPublished } from '@/lib/cms'
import type { ProjectArchiveBlock as ProjectArchiveData } from '@/payload-types'

import { headingId, Section, type BlockContext } from './shared'

export async function ProjectArchiveBlock({ block, context }: { block: ProjectArchiveData; context: BlockContext }) {
  const { locale, dict } = context
  const projects = await findPublished('projects', { locale, sort: '-eventDate', limit: 200 })
  const usedCategories = new Set(projects.map((project) => project.category))
  const categories = workCategoryOptions
    .filter((option) => usedCategories.has(option.value as (typeof projects)[number]['category']))
    .map((option) => ({ value: option.value, label: dict.work.categories[option.value] ?? option.label }))
  const titleId = headingId(block)

  return (
    <Section id={block.anchorId} labelledBy={block.heading ? titleId : undefined}>
      <div className="container-site">
        {block.heading && (
          <h2 id={titleId} className="heading-lg mb-10 max-w-3xl">
            <HighlightText text={block.heading} />
          </h2>
        )}
        <ProjectFilter
          allLabel={dict.work.all}
          filterLabel={dict.work.filterLabel}
          emptyLabel={dict.work.noProjects}
          showFilters={block.showFilters !== false && categories.length > 1}
          categories={categories}
          items={projects.map((project) => ({
            id: project.id,
            category: project.category,
            card: <ProjectCard project={project} locale={locale} dict={dict} />,
          }))}
        />
      </div>
    </Section>
  )
}
