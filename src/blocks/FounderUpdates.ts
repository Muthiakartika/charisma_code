import type { Block } from 'payload'

import { eyebrowField, headingField, introField, sectionSettingsFields } from '@/fields/shared'

export const FounderUpdatesBlock: Block = {
  slug: 'founderUpdates',
  interfaceName: 'FounderUpdatesBlock',
  labels: { singular: "Founder's Updates", plural: "Founder's Updates" },
  fields: [
    eyebrowField,
    headingField(),
    introField(240),
    {
      type: 'row',
      fields: [
        {
          name: 'source',
          label: 'Show',
          type: 'select',
          defaultValue: 'instagram',
          options: [
            { label: 'Latest Instagram posts (Content → Instagram Posts)', value: 'instagram' },
            { label: "Founder's Updates cards (Content → Founder's Updates)", value: 'updates' },
          ],
          admin: {
            width: '60%',
            description: 'When there are no Instagram posts to show, the Founder\'s Updates cards are used instead.',
          },
        },
        {
          name: 'limit',
          label: 'Number of Instagram posts',
          type: 'number',
          defaultValue: 6,
          min: 3,
          max: 12,
          admin: { width: '40%', condition: (_, siblingData) => siblingData?.source !== 'updates' },
        },
      ],
    },
    {
      name: 'instagramLabel',
      label: 'Instagram button text',
      type: 'text',
      localized: true,
      maxLength: 40,
      admin: { description: 'The Instagram link comes from Settings → Social Links.' },
    },
    ...sectionSettingsFields,
  ],
}
