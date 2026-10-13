import type { Block } from 'payload'

import { eyebrowField, headingField, introField, sectionSettingsFields } from '@/fields/shared'

export const ProgramCardsBlock: Block = {
  slug: 'programCards',
  interfaceName: 'ProgramCardsBlock',
  labels: { singular: 'Program Cards', plural: 'Program Cards' },
  fields: [
    eyebrowField,
    headingField(),
    introField(),
    {
      name: 'service',
      label: 'Show programs of this service',
      type: 'relationship',
      relationTo: 'services',
    },
    {
      name: 'programs',
      label: 'Or choose programs manually',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
      maxRows: 8,
    },
    ...sectionSettingsFields,
  ],
}
