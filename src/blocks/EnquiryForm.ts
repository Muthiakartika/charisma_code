import type { Block } from 'payload'

import { eyebrowField, headingField, introField, sectionSettingsFields } from '@/fields/shared'

export const EnquiryFormBlock: Block = {
  slug: 'enquiryForm',
  interfaceName: 'EnquiryFormBlock',
  labels: { singular: 'Enquiry Form', plural: 'Enquiry Forms' },
  fields: [
    eyebrowField,
    headingField(),
    introField(),
    {
      name: 'defaultService',
      label: 'Pre-select this service',
      type: 'relationship',
      relationTo: 'services',
      admin: { description: 'On a service page, choose that service so visitors do not have to.' },
    },
    {
      name: 'nextSteps',
      label: '"What happens next" points',
      type: 'array',
      maxRows: 4,
      fields: [{ name: 'text', type: 'text', localized: true, required: true, maxLength: 120 }],
    },
    ...sectionSettingsFields,
  ],
}
