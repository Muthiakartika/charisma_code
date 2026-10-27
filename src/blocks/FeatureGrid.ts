import type { Block } from 'payload'

import { buttonsField, linkField } from '@/fields/link'
import {
  eyebrowField,
  headingField,
  introField,
  priceLineField,
  sectionSettingsFields,
  toneField,
} from '@/fields/shared'

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  labels: { singular: 'Feature Grid', plural: 'Feature Grids' },
  fields: [
    eyebrowField,
    headingField(),
    introField(600),
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 16,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              maxLength: 120,
              admin: { width: '70%' },
            },
            {
              name: 'badge',
              type: 'text',
              localized: true,
              maxLength: 24,
              admin: { width: '30%', description: 'Cards only, e.g. "Most popular"' },
            },
          ],
        },
        { ...priceLineField, admin: { description: 'e.g. "From S$888"' } },
        {
          name: 'idealFor',
          label: '"Ideal for" line',
          type: 'text',
          localized: true,
          maxLength: 200,
        },
        { name: 'text', type: 'textarea', localized: true, maxLength: 900 },
        {
          name: 'pointsHeading',
          label: 'Heading above the points',
          type: 'text',
          localized: true,
          maxLength: 80,
        },
        {
          name: 'points',
          type: 'array',
          maxRows: 12,
          fields: [{ name: 'text', type: 'text', localized: true, required: true, maxLength: 160 }],
        },
        {
          name: 'note',
          label: 'Small print (e.g. hosting time)',
          type: 'text',
          localized: true,
          maxLength: 160,
        },
        linkField({ name: 'link', label: 'Button' }),
        {
          name: 'jumpTo',
          label: 'Title jumps to this section (anchor ID)',
          type: 'text',
          admin: {
            description: 'Optional, e.g. "collaboration" when a section below has that anchor ID.',
          },
          validate: (value: unknown) =>
            !value ||
            /^[a-z0-9-]+$/.test(String(value)) ||
            'Use lowercase letters, numbers and dashes only.',
        },
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
            { label: 'Quick match: "You are planning…" → the right page', value: 'match' },
            {
              label:
                'Notes box: bold lead lines in a soft panel (e.g. "Please read before booking")',
              value: 'notes',
            },
          ],
          admin: {
            width: '50%',
            description:
              'Comparison strip: keep item titles short (e.g. "Under 20"), 2 to 4 items.',
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
    {
      name: 'footnote',
      label: 'Text under the items (optional)',
      type: 'textarea',
      localized: true,
      maxLength: 500,
      admin: {
        description:
          'A first line ending in "?" is shown in bold. Leave an empty line between paragraphs.',
      },
    },
    buttonsField(),
    toneField,
    ...sectionSettingsFields,
  ],
}
