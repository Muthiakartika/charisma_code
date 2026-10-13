import type { Block } from 'payload'

import { eyebrowField, headingField, introField, sectionSettingsFields, toneField } from '@/fields/shared'

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  labels: { singular: 'Feature Grid', plural: 'Feature Grids' },
  fields: [
    eyebrowField,
    headingField(),
    introField(),
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 8,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true, maxLength: 70 },
        { name: 'text', type: 'textarea', localized: true, maxLength: 320 },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'style',
          type: 'select',
          defaultValue: 'list',
          options: [
            { label: 'List — ruled, no numbers', value: 'list' },
            { label: 'Numbered — only when the order matters', value: 'numbered' },
            { label: 'Comparison strip — e.g. group sizes', value: 'strip' },
            { label: 'Cards', value: 'cards' },
            { label: 'Checklist', value: 'checklist' },
          ],
          admin: {
            width: '50%',
            description: 'Comparison strip: keep item titles short (e.g. "Under 20"), 2 to 4 items.',
          },
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          options: [
            { label: '2 columns', value: '2' },
            { label: '3 columns', value: '3' },
            { label: '4 columns', value: '4' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    toneField,
    ...sectionSettingsFields,
  ],
}
