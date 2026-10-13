import type { Block } from 'payload'

import { linkField } from '@/fields/link'
import { eyebrowField, headingField, sectionSettingsFields, workCategoryOptions } from '@/fields/shared'

export const FeaturedProjectsBlock: Block = {
  slug: 'featuredProjects',
  interfaceName: 'FeaturedProjectsBlock',
  labels: { singular: 'Featured Projects', plural: 'Featured Projects' },
  fields: [
    eyebrowField,
    headingField(),
    {
      name: 'category',
      label: 'Only show this category',
      type: 'select',
      defaultValue: 'all',
      options: [{ label: 'All categories (featured projects)', value: 'all' }, ...workCategoryOptions],
    },
    {
      name: 'projects',
      label: 'Or choose projects manually',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      maxRows: 6,
    },
    {
      name: 'limit',
      label: 'How many to show',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 6,
    },
    linkField({ name: 'button', label: 'Button (e.g. "See all our work")' }),
    ...sectionSettingsFields,
  ],
}
