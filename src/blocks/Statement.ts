import type { Block } from 'payload'

import { linkField } from '@/fields/link'
import { eyebrowField, headingField, sectionSettingsFields } from '@/fields/shared'

/**
 * The big idea behind the brand on the dark stage: what "The Charisma Code" means, a short list
 * billed like the names outside a theatre and the languages events are hosted in. The homepage
 * lists what the company does; the About page lists the roles De Zhong plays himself.
 */
export const StatementBlock: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Statement', plural: 'Statements' },
  fields: [
    eyebrowField,
    headingField(),
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 700,
      admin: { description: 'Leave an empty line between paragraphs.' },
    },
    {
      name: 'roles',
      label: 'Roles (shown large, one per line)',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Role', plural: 'Roles' },
      fields: [{ name: 'text', type: 'text', localized: true, required: true, maxLength: 24 }],
      admin: {
        description:
          'Short words. Homepage: what the company does (Team building, Emceeing). Founder profile: his roles (Emcee, Singer, Pianist).',
      },
    },
    {
      name: 'languages',
      label: 'Languages line (under the roles)',
      type: 'text',
      localized: true,
      maxLength: 40,
      admin: { description: 'e.g. Hosted in *English & 中文*. Words in *asterisks* are highlighted.' },
    },
    linkField({ name: 'button', label: 'Button' }),
    ...sectionSettingsFields,
  ],
}
