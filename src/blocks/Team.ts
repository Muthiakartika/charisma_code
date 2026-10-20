import type { Block } from 'payload'

import { eyebrowField, headingField, introField, sectionSettingsFields, toneField } from '@/fields/shared'

/** The people behind The Charisma Code: De Zhong plus the facilitators, hosts and performers he works with. */
export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: { singular: 'Team', plural: 'Teams' },
  fields: [
    eyebrowField,
    headingField(),
    introField(),
    {
      name: 'members',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Team member', plural: 'Team members' },
      admin: { description: 'Only add people who have agreed to be shown on the website.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, maxLength: 60, admin: { width: '50%' } },
            {
              name: 'role',
              type: 'text',
              localized: true,
              maxLength: 60,
              admin: { width: '50%', description: 'e.g. Facilitator, Emcee, Singer' },
            },
          ],
        },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'bio', label: 'Short bio', type: 'textarea', localized: true, maxLength: 280 },
      ],
    },
    toneField,
    ...sectionSettingsFields,
  ],
}
