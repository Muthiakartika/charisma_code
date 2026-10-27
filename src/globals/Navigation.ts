import type { GlobalConfig } from 'payload'

import { anyone, isContentEditor } from '@/access/roles'
import { linkField } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidateSite'

/** Main menu. Items with sub-links become dropdowns. */
export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isContentEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      maxRows: 7,
      labels: { singular: 'Menu item', plural: 'Menu items' },
      admin: { initCollapsed: true, description: 'Keep the menu short: 5–7 items work best.' },
      fields: [
        linkField({ name: 'link', label: 'Menu item', required: true }),
        {
          name: 'children',
          label: 'Dropdown links (optional)',
          type: 'array',
          maxRows: 10,
          fields: [
            linkField({ name: 'link', label: 'Link', required: true }),
            { name: 'description', type: 'text', localized: true, maxLength: 70 },
          ],
        },
      ],
    },
  ],
}
