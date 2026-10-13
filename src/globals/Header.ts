import type { GlobalConfig } from 'payload'

import { anyone, isContentEditor } from '@/access/roles'
import { linkField } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidateSite'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isContentEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional. Upload a transparent PNG/WebP to replace the default logo (public/brand/logo-horizontal-dark.png).',
      },
    },
    linkField({ name: 'ctaButton', label: 'Header button (e.g. "Let\'s Talk")', required: true }),
    {
      name: 'announcement',
      label: 'Announcement bar (optional)',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'text', type: 'text', localized: true, maxLength: 120 },
        linkField({ name: 'link', label: 'Link' }),
      ],
    },
  ],
}
