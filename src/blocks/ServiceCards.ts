import type { Block } from 'payload'

import { eyebrowField, headingField, introField, sectionSettingsFields } from '@/fields/shared'

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
        { label: 'Priority — the first service is shown largest (homepage)', value: 'priority' },
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
        description: 'Leave empty to show all services, ordered by their priority number. Drag to reorder.',
      },
    },
    ...sectionSettingsFields,
  ],
}
