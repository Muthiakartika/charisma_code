import type { Block } from 'payload'

import { eyebrowField, headingField, sectionSettingsFields, toneField } from '@/fields/shared'

export const ClientLogosBlock: Block = {
  slug: 'clientLogos',
  interfaceName: 'ClientLogosBlock',
  labels: { singular: 'Client Logo Grid', plural: 'Client Logo Grids' },
  fields: [
    eyebrowField,
    headingField(false),
    {
      name: 'clients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
      admin: {
        description:
          'Leave empty to show every client marked "Show on website". Clients without a logo are shown as names.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'display',
          type: 'select',
          defaultValue: 'marquee',
          options: [
            { label: 'Scrolling row', value: 'marquee' },
            { label: 'Compact list (with an optional quote)', value: 'static' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'limit',
          label: 'How many clients to show',
          type: 'number',
          defaultValue: 12,
          min: 4,
          max: 40,
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.display === 'static',
            description: 'Use 12 (or 24) so every row of logos is full on phones and desktops.',
          },
        },
      ],
    },
    {
      name: 'testimonial',
      label: 'Quote shown next to the list',
      type: 'relationship',
      relationTo: 'testimonials',
      admin: {
        condition: (_, siblingData) => siblingData?.display === 'static',
        description: 'Only testimonials with permission are shown.',
      },
    },
    toneField,
    ...sectionSettingsFields,
  ],
}
