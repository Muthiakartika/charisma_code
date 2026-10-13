import type { Block } from 'payload'

import { headingField, sectionSettingsFields } from '@/fields/shared'

/** All published portfolio projects with category filters (used on /our-work). */
export const ProjectArchiveBlock: Block = {
  slug: 'projectArchive',
  interfaceName: 'ProjectArchiveBlock',
  labels: { singular: 'Portfolio with filters', plural: 'Portfolio with filters' },
  fields: [
    headingField(false),
    {
      name: 'showFilters',
      label: 'Show category filters',
      type: 'checkbox',
      defaultValue: true,
    },
    ...sectionSettingsFields,
  ],
}
