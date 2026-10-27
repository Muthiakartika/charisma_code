import { DownloadSimple, FilePdf } from '@phosphor-icons/react/ssr'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { CmsImage } from '@/components/ui/CmsImage'
import { HighlightText, Paragraphs } from '@/components/ui/HighlightText'
import { resolveLink } from '@/lib/links'
import type { FounderIntroBlock as FounderIntroData, Media } from '@/payload-types'

import { headingId, Section, type BlockContext } from './shared'

/** "PDF · 2.4 MB": the file type and size, read from the uploaded file. */
const fileMeta = (file: Media) => {
  const type =
    file.mimeType === 'application/pdf'
      ? 'PDF'
      : (file.filename?.split('.').pop() ?? '').toUpperCase()
  const size = file.filesize ? `${(file.filesize / 1024 / 1024).toFixed(1)} MB` : null
  return [type, size].filter(Boolean).join(' · ')
}

export function FounderIntroBlock({
  block,
  context,
}: {
  block: FounderIntroData
  context: BlockContext
}) {
  const button = resolveLink(block.button, context.locale)
  const stage = block.mood === 'stage'
  const titleId = headingId(block)
  const downloads = (block.downloads ?? []).flatMap((entry) =>
    typeof entry.file === 'object' && entry.file !== null
      ? [{ ...entry, file: entry.file as Media }]
      : [],
  )

  return (
    <Section id={block.anchorId} tone={stage ? 'dark' : 'tinted'} labelledBy={titleId}>
      <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal relative lg:sticky lg:top-28 lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-paper-deep in-data-[theme=wedding]:rounded-t-full">
            <CmsImage
              media={block.portrait}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
          {block.quote && (
            <p
              className={`relative -mt-14 ml-6 mr-0 max-w-[88%] rounded-[var(--radius-card)] p-6 font-display text-xl font-semibold leading-snug tracking-tight sm:ml-10 ${
                stage ? 'bg-action text-on-action' : 'bg-ink text-paper'
              }`}
            >
              &ldquo;{block.quote}&rdquo;
            </p>
          )}
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          {block.eyebrow && <p className="eyebrow mb-4">{block.eyebrow}</p>}
          <h2 id={titleId} className="heading-lg">
            <HighlightText text={block.heading} />
          </h2>
          <div
            className={`mt-7 max-w-2xl space-y-4 text-[1.0625rem] ${stage ? 'text-on-dark-muted' : 'text-ink-soft'}`}
          >
            <Paragraphs text={block.body} />
          </div>

          {block.credentials && block.credentials.length > 0 && (
            <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {block.credentials.map((item, index) => (
                <li
                  key={item.id ?? index}
                  className={`border-t py-4 font-medium ${stage ? 'border-white/15' : 'border-ink/15'}`}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          )}

          {downloads.length > 0 && (
            <div className="mt-10">
              {block.downloadsHeading && (
                <h3 className="mb-4 text-lg font-semibold">{block.downloadsHeading}</h3>
              )}
              <ul className="grid gap-3 sm:grid-cols-2">
                {downloads.map(({ label, file, id }) => (
                  <li key={id ?? file.id}>
                    <a
                      href={file.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={file.filename ?? undefined}
                      className={`group flex items-center gap-4 rounded-[var(--radius-card)] p-4 pr-5 ring-1 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:ring-action ${
                        stage ? 'bg-white/[0.06] ring-white/15' : 'bg-surface ring-line'
                      }`}
                    >
                      <span
                        aria-hidden
                        className="note-icon grid h-12 w-12 shrink-0 place-items-center rounded-full text-accent in-[.tone-dark]:text-spark-bright"
                      >
                        <FilePdf size={24} weight="duotone" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{label}</span>
                        <span
                          className={`block text-sm ${stage ? 'text-on-dark-muted' : 'text-ink-soft'}`}
                        >
                          {fileMeta(file)}
                        </span>
                      </span>
                      <DownloadSimple
                        size={20}
                        weight="bold"
                        aria-hidden
                        className="shrink-0 text-accent transition-transform group-hover:translate-y-0.5 in-[.tone-dark]:text-spark-bright"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {button && (
            <div className="mt-10">
              <ButtonLink link={button} variant={stage ? 'primary' : 'secondary'} showArrow />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
