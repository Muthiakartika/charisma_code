import type { GlobalConfig } from 'payload'

import { anyone, isContentEditor } from '@/access/roles'
import { linkField } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidateSite'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isContentEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      defaultValue: 'We Bring the Spark, You Shine.',
      maxLength: 80,
    },
    {
      name: 'blurb',
      label: 'Short description',
      type: 'textarea',
      localized: true,
      maxLength: 260,
    },
    {
      name: 'columns',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true, maxLength: 30 },
        {
          name: 'links',
          type: 'array',
          maxRows: 14,
          fields: [linkField({ name: 'link', label: 'Link', required: true })],
        },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      maxRows: 4,
      fields: [linkField({ name: 'link', label: 'Link', required: true })],
    },
  ],
}
