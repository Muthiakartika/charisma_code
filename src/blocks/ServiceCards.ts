import type { Block } from 'payload'

import { buttonsField } from '@/fields/link'
import {
  eyebrowField,
  headingField,
  introField,
  sectionSettingsFields,
  toneField,
} from '@/fields/shared'

export const ServiceCardsBlock: Block = {
  slug: 'serviceCards',
  interfaceName: 'ServiceCardsBlock',
  labels: { singular: 'Service Cards', plural: 'Service Cards' },
  fields: [
    eyebrowField,
    headingField(),
    introField(),
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'priority',
      options: [
        { label: 'Priority — the first service is shown largest', value: 'priority' },
        {
          label: 'Price cards — every service with its price and a button (homepage)',
          value: 'cards',
        },
        { label: 'Even grid', value: 'grid' },
        { label: 'Compact list (for "related services")', value: 'list' },
      ],
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description:
          'Leave empty to show all services, ordered by their priority number. Drag to reorder.',
      },
    },
    {
      name: 'footnote',
      label: 'Text under the cards (optional)',
      type: 'textarea',
      localized: true,
      maxLength: 300,
    },
    buttonsField(),
    toneField,
    ...sectionSettingsFields,
  ],
}
