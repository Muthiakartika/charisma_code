/**
 * All page-builder blocks available on Pages, in the order editors see them.
 * Each block has a matching React component in src/components/blocks/.
 */
import { ApplicationFormBlock } from './ApplicationForm'
import { CallToActionBlock } from './CallToAction'
import { ClientLogosBlock } from './ClientLogos'
import { EnquiryFormBlock } from './EnquiryForm'
import { FaqBlock } from './Faq'
import { FeaturedProjectsBlock } from './FeaturedProjects'
import { FeatureGridBlock } from './FeatureGrid'
import { FounderIntroBlock } from './FounderIntro'
import { FounderUpdatesBlock } from './FounderUpdates'
import { GalleryBlock } from './Gallery'
import { HeroBlock } from './Hero'
import { PostArchiveBlock } from './PostArchive'
import { ProcessStepsBlock } from './ProcessSteps'
import { ProjectArchiveBlock } from './ProjectArchive'
import { ProgramCardsBlock } from './ProgramCards'
import { RichTextBlock } from './RichText'
import { ServiceCardsBlock } from './ServiceCards'
import { TestimonialsBlock } from './Testimonials'
import { TextImageBlock } from './TextImage'
import { VideoBlock } from './Video'

export const pageBlocks = [
  HeroBlock,
  TextImageBlock,
  FeatureGridBlock,
  ProcessStepsBlock,
  ServiceCardsBlock,
  ProgramCardsBlock,
  ClientLogosBlock,
  FeaturedProjectsBlock,
  ProjectArchiveBlock,
  PostArchiveBlock,
  TestimonialsBlock,
  FounderIntroBlock,
  FounderUpdatesBlock,
  GalleryBlock,
  VideoBlock,
  FaqBlock,
  CallToActionBlock,
  EnquiryFormBlock,
  ApplicationFormBlock,
  RichTextBlock,
]
