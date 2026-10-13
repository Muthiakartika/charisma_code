import type { Block } from 'payload'

import { linkField } from '@/fields/link'
import { eyebrowField, headingField, sectionSettingsFields, toneField } from '@/fields/shared'

export const TextImageBlock: Block = {
  slug: 'textImage',
  interfaceName: 'TextImageBlock',
  labels: { singular: 'Text and Image', plural: 'Text and Image sections' },
  fields: [
    eyebrowField,
    headingField(),
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      maxLength: 1200,
      admin: { description: 'Leave an empty line between paragraphs.' },
    },
    {
      name: 'points',
      label: 'Bullet points',
      type: 'array',
      maxRows: 6,
      fields: [{ name: 'text', type: 'text', localized: true, required: true, maxLength: 120 }],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Image on the right', value: 'right' },
            { label: 'Image on the left', value: 'left' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'imageShape',
          type: 'select',
          defaultValue: 'landscape',
          options: [
            { label: 'Landscape', value: 'landscape' },
            { label: 'Portrait', value: 'portrait' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    linkField({ name: 'button', label: 'Button' }),
    toneField,
    ...sectionSettingsFields,
  ],
}
