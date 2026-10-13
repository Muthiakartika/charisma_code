import type { CollectionConfig } from 'payload'

import { isContentOrMarketing, publishedOrLoggedIn } from '@/access/roles'
import { revalidateHooks } from '@/hooks/revalidateSite'

/**
 * Short behind-the-scenes cards for the homepage "Founder's Updates" section.
 * Up to three featured updates are shown — no heavy Instagram embeds.
 */
export const FounderUpdates: CollectionConfig<'founder-updates'> = {
  slug: 'founder-updates',
  labels: { singular: "Founder's Update", plural: "Founder's Updates" },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'featured', '_status'],
  },
  defaultSort: '-date',
  access: {
    read: publishedOrLoggedIn,
    create: isContentOrMarketing,
    update: isContentOrMarketing,
    delete: isContentOrMarketing,
  },
  hooks: revalidateHooks,
  versions: { drafts: true, maxPerDoc: 10 },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true, maxLength: 80 },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'description',
      label: 'Short description',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 220,
    },
    { name: 'date', type: 'date', required: true, admin: { position: 'sidebar' } },
    {
      name: 'instagramUrl',
      label: 'Instagram post link',
      type: 'text',
      validate: (value: unknown) =>
        !value ||
        /^https:\/\/(www\.)?instagram\.com\//.test(String(value)) ||
        'Paste a link that starts with https://www.instagram.com/',
    },
    {
      name: 'link',
      label: 'Or link to a page on this website',
      type: 'text',
      admin: { description: 'Optional, e.g. /insights/wedding-emceeing-and-singing-at-sheraton-towers' },
    },
    {
      name: 'featured',
      label: 'Show on the homepage',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'The 3 most recent featured updates are shown.' },
    },
  ],
}
