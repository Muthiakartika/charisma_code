import type { Block } from 'payload'

import { buttonsField } from '@/fields/link'
import {
  eyebrowField,
  headingField,
  introField,
  sectionSettingsFields,
  toneField,
} from '@/fields/shared'

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    eyebrowField,
    headingField(),
    introField(240),
    {
      name: 'service',
      label: 'Show FAQs for this service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description:
          'Shows every published FAQ linked to this service. Or pick FAQs manually below.',
      },
    },
    {
      name: 'faqs',
      label: 'Or choose FAQs manually',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
    {
      name: 'items',
      label: 'Or write the questions here',
      type: 'array',
      maxRows: 16,
      labels: { singular: 'Question', plural: 'Questions' },
      admin: {
        initCollapsed: true,
        description:
          "Questions written here are shown instead of the ones above. Each one is added to the page's FAQ structured data for Google.",
      },
      fields: [
        { name: 'question', type: 'text', localized: true, required: true, maxLength: 160 },
        {
          name: 'answer',
          type: 'textarea',
          localized: true,
          required: true,
          maxLength: 1200,
          admin: { description: 'Leave an empty line between paragraphs.' },
        },
      ],
    },
    buttonsField(),
    toneField,
    ...sectionSettingsFields,
  ],
}
