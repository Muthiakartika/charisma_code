/**
 * Renders the sections ("blocks") of a CMS page in order.
 * To add a new block: create its schema in src/blocks/, its component in this
 * folder, and add one line to `components` below.
 */
import type { ComponentType } from 'react'

import type { Locale } from '@/i18n/config'
import { resolveLink, type ResolvedLink } from '@/lib/links'
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
import { StatementBlock } from './Statement'
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
  statement: StatementBlock as BlockComponent,
  founderUpdates: FounderUpdatesBlock as BlockComponent,
  gallery: GalleryBlock as BlockComponent,
  video: VideoBlock as BlockComponent,
  faq: FaqBlock as BlockComponent,
  cta: CallToActionBlock as BlockComponent,
  enquiryForm: EnquiryFormBlock as BlockComponent,
  applicationForm: ApplicationFormBlock as BlockComponent,
  richText: RichTextBlock as BlockComponent,
}

/** Blocks that can close with the page's main action button. */
const canOfferAction = new Set<LayoutBlock['blockType']>(['textImage', 'processSteps', 'featureGrid', 'testimonials', 'video'])

/** True when the block already asks the visitor to do something (its own button or a form). */
function hasOwnAction(block: LayoutBlock, locale: Locale): boolean {
  switch (block.blockType) {
    case 'hero':
    case 'cta':
      return Boolean(resolveLink(block.primaryButton, locale) ?? resolveLink(block.secondaryButton, locale))
    case 'textImage':
    case 'founderIntro':
    case 'statement':
    case 'featuredProjects':
      return Boolean(resolveLink(block.button, locale))
    case 'enquiryForm':
    case 'applicationForm':
      return true
    default:
      return false
  }
}

/**
 * Picks the blocks that repeat the page's main action, so a visitor is never more than
 * about two sections away from a button: a block offers it after a section without one,
 * unless the next block already has its own button or form.
 */
function blocksOfferingAction(blocks: LayoutBlock[], locale: Locale): Set<number> {
  const offering = new Set<number>()
  let quietSections = 0
  blocks.forEach((block, index) => {
    if (hasOwnAction(block, locale)) {
      quietSections = 0
      return
    }
    const next = blocks[index + 1]
    if (canOfferAction.has(block.blockType) && quietSections >= 1 && next && !hasOwnAction(next, locale)) {
      offering.add(index)
      quietSections = 0
      return
    }
    quietSections += 1
  })
  return offering
}

export function RenderBlocks({
  blocks,
  context,
  pageAction,
}: {
  blocks: Page['layout']
  context: Omit<BlockContext, 'isFirst' | 'action'>
  /** The page's main action (the same one as the phone action bar). */
  pageAction?: ResolvedLink | null
}) {
  const visible = (blocks ?? []).filter((block) => !block.hidden)
  const offering = pageAction ? blocksOfferingAction(visible, context.locale) : new Set<number>()
  return (
    <>
      {visible.map((block, index) => {
        const Component = components[block.blockType]
        if (!Component) return null
        return (
          <Component
            key={block.id ?? index}
            block={block as never}
            context={{ ...context, isFirst: index === 0, action: offering.has(index) ? pageAction : null }}
          />
        )
      })}
    </>
  )
}
