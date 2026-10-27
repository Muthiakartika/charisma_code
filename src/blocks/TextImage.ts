import type { Block } from 'payload'

import { buttonsField, linkField } from '@/fields/link'
import {
  eyebrowField,
  headingField,
  priceLineField,
  sectionSettingsFields,
  toneField,
} from '@/fields/shared'

export const TextImageBlock: Block = {
  slug: 'textImage',
  interfaceName: 'TextImageBlock',
  labels: { singular: 'Text and Image', plural: 'Text and Image sections' },
  fields: [
    eyebrowField,
    headingField(),
    priceLineField,
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      maxLength: 2000,
      admin: { description: 'Leave an empty line between paragraphs.' },
    },
    {
      name: 'table',
      label: 'Table (optional)',
      type: 'textarea',
      localized: true,
      maxLength: 3000,
      admin: {
        description:
          'One row per line, cells separated by | . The first line is the header, e.g. "Package | From | Live singing". A cell like /wedding-emcee becomes a link to that page.',
      },
    },
    {
      name: 'pointsHeading',
      label: 'Heading above the bullet points (optional)',
      type: 'text',
      localized: true,
      maxLength: 80,
    },
    {
      name: 'points',
      label: 'Bullet points',
      type: 'array',
      maxRows: 10,
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
          required: true,
          maxLength: 400,
          admin: { description: 'To make words a link, write [words](https://…).' },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional. Without a photo the text and the bullet points sit side by side.',
      },
    },
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
    buttonsField(),
    toneField,
    ...sectionSettingsFields,
  ],
}
