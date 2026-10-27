/**
 * One portfolio project (case study). Content: CMS → Portfolio Projects.
 */
import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { GalleryBlock } from '@/components/blocks/Gallery'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { toLocale } from '@/components/layout/CmsPage'
import { ContactBand } from '@/components/layout/ContactBand'
import { LivePreviewListener } from '@/components/layout/LivePreviewListener'
import { formatMonthYear, ProjectCard } from '@/components/portfolio/ProjectCard'
import { JsonLd } from '@/components/seo/JsonLd'
import { CmsImage } from '@/components/ui/CmsImage'
import { Paragraphs } from '@/components/ui/HighlightText'
import { YouTubePlayer } from '@/components/ui/YouTubePlayer'
import { getDictionary } from '@/i18n/dictionaries'
import { findPublished, getPayloadClient, getProject, getSiteSettings } from '@/lib/cms'
import { projectPath } from '@/lib/paths'
import { breadcrumbSchema, buildMetadata, type Crumb } from '@/lib/seo'
import { getYoutubeCover, getYoutubeId } from '@/lib/youtube'
import type { Media, Testimonial } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { hasDetailPage: { not_equals: false } },
    limit: 500,
    depth: 0,
    overrideAccess: false,
    select: { slug: true },
  })
  return docs.filter((doc) => doc.slug).map((doc) => ({ slug: doc.slug as string }))
}

export default async function ProjectPage({ params }: PageProps<'/[locale]/our-work/[slug]'>) {
  const { locale: raw, slug } = await params
  const locale = toLocale(raw)
  const project = await getProject(decodeURIComponent(slug), locale)
  if (!project || project.hasDetailPage === false) notFound()

  const { isEnabled: isDraft } = await draftMode()
  if (locale === 'zh' && project.chineseTranslation !== 'approved' && !isDraft) redirect(projectPath(project.slug))

  const dict = getDictionary(locale)
  const settings = await getSiteSettings(locale)
  const crumbs: Crumb[] = [
    { name: dict.common.home, path: '/' },
    { name: dict.work.title, path: '/our-work' },
    { name: project.title, path: projectPath(project.slug) },
  ]
  const videoId = getYoutubeId(project.videoUrl)
  const videoCover = videoId ? await getYoutubeCover(videoId) : undefined
  const testimonial = project.testimonial && typeof project.testimonial === 'object' ? (project.testimonial as Testimonial) : null
  const gallery = (project.gallery ?? []).filter((image): image is Media => typeof image === 'object' && image !== null)
  const related = (
    await findPublished('projects', {
      locale,
      where: { and: [{ category: { equals: project.category } }, { id: { not_equals: project.id } }] },
      sort: '-eventDate',
      limit: 2,
    })
  ).filter((item) => item.id !== project.id)

  const facts = [
    { label: dict.work.client, value: project.clientName },
    { label: dict.work.venue, value: project.venue },
    { label: dict.work.date, value: formatMonthYear(project.eventDate, locale) },
  ].filter((fact) => fact.value)

  const story = [
    { title: dict.work.objective, text: project.objective },
    { title: dict.work.solution, text: project.solution },
    { title: dict.work.execution, text: project.execution },
    { title: dict.work.outcomes, text: project.outcomes },
  ].filter((part) => part.text)

  return (
    <main id="main" className="bg-surface">
      {isDraft && <LivePreviewListener />}

      <header className="container-site pb-12 pt-8 lg:pt-12">
        <Breadcrumbs crumbs={crumbs} locale={locale} label={dict.common.breadcrumb} />
        <p className="mt-10 text-sm font-semibold text-accent">{dict.work.categories[project.category]}</p>
        <h1 className="heading-xl mt-3 max-w-4xl">{project.title}</h1>
        <p className="lead mt-6 text-ink-soft">{project.summary}</p>
        {facts.length > 0 && (
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="mt-1 font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <div className="container-site">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-media)] bg-paper-deep">
          <CmsImage media={project.coverImage} sizes="(min-width: 1320px) 1220px, 100vw" priority className="object-cover" />
        </div>
      </div>

      {story.length > 0 && (
        <section className="container-site grid gap-12 py-20 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-8 lg:col-start-3">
            {story.map((part) => (
              <div key={part.title}>
                <h2 className="heading-md">{part.title}</h2>
                <div className="mt-4 space-y-4 text-[1.0625rem] text-ink-soft">
                  <Paragraphs text={part.text} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {videoId && (
        <section className="container-site pb-16">
          <div className="relative aspect-video overflow-hidden rounded-[var(--radius-media)] bg-ink">
            <YouTubePlayer
              videoId={videoId}
              title={project.title}
              playLabel={dict.common.playVideo}
              cover={videoCover}
            />
          </div>
        </section>
      )}

      {testimonial && testimonial.permission !== 'pending' && (
        <section className="bg-surface-alt py-20">
          <blockquote className="container-site max-w-4xl">
            <p className="font-display text-[clamp(1.45rem,1.2vw+1.1rem,2.1rem)] font-medium leading-[1.3] tracking-tight">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6 font-semibold">
              {testimonial.authorName}
              {testimonial.authorRole && <span className="block font-normal text-ink-soft">{testimonial.authorRole}</span>}
            </footer>
          </blockquote>
        </section>
      )}

      {gallery.length >= 3 && (
        <GalleryBlock
          block={{ blockType: 'gallery', images: gallery, layout: 'mosaic' }}
          context={{ locale, dict, settings, pageTitle: project.title, breadcrumbs: crumbs, isFirst: false }}
        />
      )}

      {related.length > 0 && (
        <section className="container-site border-t border-line py-20">
          <h2 className="heading-lg">{dict.work.moreWork}</h2>
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {related.map((item) => (
              <ProjectCard key={item.id} project={item} locale={locale} dict={dict} />
            ))}
          </div>
        </section>
      )}

      <ContactBand locale={locale} dict={dict} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </main>
  )
}

export async function generateMetadata({ params }: PageProps<'/[locale]/our-work/[slug]'>) {
  const { locale: raw, slug } = await params
  const locale = toLocale(raw)
  const [project, settings] = await Promise.all([getProject(decodeURIComponent(slug), locale), getSiteSettings(locale)])
  if (!project) return {}
  return buildMetadata({
    locale,
    path: projectPath(project.slug),
    title: project.title,
    meta: project.meta,
    fallbackDescription: project.summary,
    fallbackImage: project.coverImage,
    seo: settings.seo,
    hasChinese: project.chineseTranslation === 'approved',
  })
}
