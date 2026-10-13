import type { CollectionConfig } from 'payload'

import { isContentEditor, publishedOrLoggedIn } from '@/access/roles'
import { reviewStatusField } from '@/fields/shared'
import { revalidateHooks } from '@/hooks/revalidateSite'

/** Program formats (team building, workshops, kids programs) shown by "Program Cards". */
export const Programs: CollectionConfig<'programs'> = {
  slug: 'programs',
  labels: { singular: 'Program', plural: 'Programs' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'service', 'order', 'reviewStatus', 'updatedAt'],
  },
  defaultSort: 'order',
  access: {
    read: publishedOrLoggedIn,
    create: isContentEditor,
    update: isContentEditor,
    delete: isContentEditor,
  },
  hooks: revalidateHooks,
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true, maxLength: 70 },
    { name: 'service', type: 'relationship', relationTo: 'services', required: true, index: true },
    { name: 'summary', type: 'textarea', localized: true, required: true, maxLength: 320 },
    {
      type: 'row',
      fields: [
        {
          name: 'duration',
          type: 'text',
          localized: true,
          maxLength: 40,
          admin: { width: '33%', description: 'e.g. "2–3 hours"' },
        },
        {
          name: 'groupSize',
          label: 'Group size',
          type: 'text',
          localized: true,
          maxLength: 40,
          admin: { width: '33%', description: 'e.g. "15–200 people"' },
        },
        {
          name: 'setting',
          type: 'text',
          localized: true,
          maxLength: 40,
          admin: { width: '33%', description: 'e.g. "Indoor, your venue"' },
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 4,
      fields: [{ name: 'text', type: 'text', localized: true, required: true, maxLength: 90 }],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
    reviewStatusField,
  ],
}
