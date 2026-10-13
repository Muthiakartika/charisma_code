import type { CollectionConfig } from 'payload'

import { anyone, isContentOrMarketing } from '@/access/roles'
import { revalidateHooks } from '@/hooks/revalidateSite'

/** Organisations The Charisma Code has worked with (client logo grid). */
export const Clients: CollectionConfig<'clients'> = {
  slug: 'clients',
  labels: { singular: 'Client', plural: 'Clients' },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'confirmation', 'showOnWebsite', 'order'],
    description: 'Only list clients you actually worked with, and use official logos with permission.',
  },
  defaultSort: 'order',
  access: {
    read: anyone,
    create: isContentOrMarketing,
    update: isContentOrMarketing,
    delete: isContentOrMarketing,
  },
  hooks: revalidateHooks,
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 60 },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Official logo, PNG or WebP with a TRANSPARENT background, at least 300px wide. The website draws it in one colour that matches the section, so the logo colours do not matter. Without a logo the name is shown in elegant type.',
      },
    },
    {
      name: 'context',
      label: 'What we did for them (internal)',
      type: 'text',
      maxLength: 120,
      admin: { description: 'e.g. "Emcee for 2024 D&D". Helps the team confirm the relationship.' },
    },
    {
      name: 'confirmation',
      type: 'select',
      defaultValue: 'needs-confirmation',
      options: [
        { label: 'Confirmed by De Zhong', value: 'confirmed' },
        { label: 'From old website — needs confirmation', value: 'needs-confirmation' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'showOnWebsite', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
  ],
}
