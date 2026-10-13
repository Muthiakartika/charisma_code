import type { Block } from 'payload'

import { eyebrowField, headingField, introField, sectionSettingsFields } from '@/fields/shared'

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
      admin: { description: 'Shows every published FAQ linked to this service. Or pick FAQs manually below.' },
    },
    {
      name: 'faqs',
      label: 'Or choose FAQs manually',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
    ...sectionSettingsFields,
  ],
}
