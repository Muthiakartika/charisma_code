import type { Block } from 'payload'

import { buttonsField } from '@/fields/link'
import {
  eyebrowField,
  headingField,
  sectionSettingsFields,
  testimonialCategoryOptions,
} from '@/fields/shared'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    eyebrowField,
    headingField(false),
    {
      name: 'source',
      label: 'Which testimonials?',
      type: 'radio',
      defaultValue: 'category',
      options: [
        { label: 'Latest from a category', value: 'category' },
        { label: 'Choose manually', value: 'manual' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'category',
      type: 'select',
      options: [{ label: 'All categories', value: 'all' }, ...testimonialCategoryOptions],
      defaultValue: 'all',
      admin: { condition: (_, siblingData) => siblingData?.source !== 'manual' },
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      maxRows: 9,
      admin: { condition: (_, siblingData) => siblingData?.source === 'manual' },
    },
    {
      name: 'limit',
      label: 'How many to show',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 9,
      admin: { condition: (_, siblingData) => siblingData?.source !== 'manual' },
    },
    buttonsField(),
    ...sectionSettingsFields,
  ],
}
