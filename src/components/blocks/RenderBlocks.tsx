/**
 * Renders the sections ("blocks") of a CMS page in order.
 * To add a new block: create its schema in src/blocks/, its component in this
 * folder, and add one line to `components` below.
 */
import type { ComponentType } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from './CallToAction'
import { ClientLogosBlock } from './ClientLogos'
import { FaqBlock } from './Faq'
import { FeaturedProjectsBlock } from './FeaturedProjects'
import { FeatureGridBlock } from './FeatureGrid'
import { ApplicationFormBlock, EnquiryFormBlock } from './FormBlocks'
import { FounderIntroBlock } from './FounderIntro'
import { FounderUpdatesBlock } from './FounderUpdates'
import { GalleryBlock } from './Gallery'
import { HeroBlock } from './Hero'
import { PostArchiveBlock } from './PostArchive'
import { ProcessStepsBlock } from './ProcessSteps'
import { ProgramCardsBlock } from './ProgramCards'
import { ProjectArchiveBlock } from './ProjectArchive'
import { RichTextBlock } from './RichTextSection'
import { ServiceCardsBlock } from './ServiceCards'
import type { BlockContext } from './shared'
import { TestimonialsBlock } from './Testimonials'
import { TextImageBlock } from './TextImage'
import { VideoBlock } from './Video'

type LayoutBlock = NonNullable<Page['layout']>[number]
type BlockComponent = ComponentType<{ block: never; context: BlockContext }>

const components: Record<LayoutBlock['blockType'], BlockComponent> = {
  hero: HeroBlock as BlockComponent,
  textImage: TextImageBlock as BlockComponent,
  featureGrid: FeatureGridBlock as BlockComponent,
  processSteps: ProcessStepsBlock as BlockComponent,
  serviceCards: ServiceCardsBlock as BlockComponent,
  programCards: ProgramCardsBlock as BlockComponent,
  clientLogos: ClientLogosBlock as BlockComponent,
  featuredProjects: FeaturedProjectsBlock as BlockComponent,
  projectArchive: ProjectArchiveBlock as BlockComponent,
  postArchive: PostArchiveBlock as BlockComponent,
  testimonials: TestimonialsBlock as BlockComponent,
  founderIntro: FounderIntroBlock as BlockComponent,
  founderUpdates: FounderUpdatesBlock as BlockComponent,
  gallery: GalleryBlock as BlockComponent,
  video: VideoBlock as BlockComponent,
  faq: FaqBlock as BlockComponent,
  cta: CallToActionBlock as BlockComponent,
  enquiryForm: EnquiryFormBlock as BlockComponent,
  applicationForm: ApplicationFormBlock as BlockComponent,
  richText: RichTextBlock as BlockComponent,
}

export function RenderBlocks({
  blocks,
  context,
}: {
  blocks: Page['layout']
  context: Omit<BlockContext, 'isFirst'>
}) {
  const visible = (blocks ?? []).filter((block) => !block.hidden)
  return (
    <>
      {visible.map((block, index) => {
        const Component = components[block.blockType]
        if (!Component) return null
        return (
          <Component
            key={block.id ?? index}
            block={block as never}
            context={{ ...context, isFirst: index === 0 }}
          />
        )
      })}
    </>
  )
}
