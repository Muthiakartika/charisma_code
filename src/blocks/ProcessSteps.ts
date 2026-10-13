import type { Block } from 'payload'

import { eyebrowField, headingField, introField, sectionSettingsFields, toneField } from '@/fields/shared'

export const ProcessStepsBlock: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  labels: { singular: 'Process Steps', plural: 'Process Steps' },
  fields: [
    eyebrowField,
    headingField(),
    introField(),
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 7,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true, maxLength: 60 },
        { name: 'text', type: 'textarea', localized: true, maxLength: 280 },
      ],
    },
    toneField,
    ...sectionSettingsFields,
  ],
}
