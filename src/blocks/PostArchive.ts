import type { Block } from 'payload'

import { eyebrowField, headingField, sectionSettingsFields } from '@/fields/shared'

/** A list of blog articles (used on /insights, or "latest articles" on service pages). */
export const PostArchiveBlock: Block = {
  slug: 'postArchive',
  interfaceName: 'PostArchiveBlock',
  labels: { singular: 'Blog list', plural: 'Blog lists' },
  fields: [
    eyebrowField,
    headingField(false),
    {
      name: 'category',
      label: 'Only this category (optional)',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      label: 'How many articles',
      type: 'number',
      defaultValue: 12,
      min: 1,
      max: 48,
    },
    {
      name: 'showCategoryLinks',
      label: 'Show category links above the list',
      type: 'checkbox',
      defaultValue: true,
    },
    ...sectionSettingsFields,
  ],
}
