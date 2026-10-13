import type { Block } from 'payload'

import { headingField, sectionSettingsFields } from '@/fields/shared'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: { singular: 'Text', plural: 'Text sections' },
  fields: [
    headingField(false),
    { name: 'content', type: 'richText', localized: true, required: true },
    ...sectionSettingsFields,
  ],
}
