import type { Block } from 'payload'

import { eyebrowField, headingField, introField, sectionSettingsFields } from '@/fields/shared'

export const ApplicationFormBlock: Block = {
  slug: 'applicationForm',
  interfaceName: 'ApplicationFormBlock',
  labels: { singular: 'Freelancer Application Form', plural: 'Freelancer Application Forms' },
  fields: [eyebrowField, headingField(), introField(), ...sectionSettingsFields],
}
