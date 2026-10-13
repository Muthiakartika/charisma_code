import type { Block } from 'payload'

import { linkField } from '@/fields/link'
import { eyebrowField, headingField, sectionSettingsFields } from '@/fields/shared'

export const FounderIntroBlock: Block = {
  slug: 'founderIntro',
  interfaceName: 'FounderIntroBlock',
  labels: { singular: 'Founder Introduction', plural: 'Founder Introductions' },
  fields: [
    eyebrowField,
    headingField(),
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 1400,
      admin: { description: 'Leave an empty line between paragraphs.' },
    },
    { name: 'portrait', type: 'upload', relationTo: 'media', required: true },
    { name: 'quote', type: 'text', localized: true, maxLength: 140 },
    {
      name: 'credentials',
      label: 'Facts & credentials',
      type: 'array',
      maxRows: 6,
      fields: [{ name: 'text', type: 'text', localized: true, required: true, maxLength: 90 }],
      admin: { description: 'Verified facts only, e.g. "Hosted at the Singapore Youth Olympic Games 2010".' },
    },
    linkField({ name: 'button', label: 'Button' }),
    {
      name: 'mood',
      type: 'select',
      defaultValue: 'stage',
      options: [
        { label: 'Stage (dark, corporate)', value: 'stage' },
        { label: 'Warm (light, personal)', value: 'warm' },
      ],
    },
    ...sectionSettingsFields,
  ],
}
