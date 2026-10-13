import type { CollectionConfig } from 'payload'

import { isContentEditor, publishedOrLoggedIn } from '@/access/roles'
import { reviewStatusField } from '@/fields/shared'
import { revalidateHooks } from '@/hooks/revalidateSite'

export const FAQs: CollectionConfig<'faqs'> = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    group: 'Content',
    useAsTitle: 'question',
    defaultColumns: ['question', 'services', 'order', 'reviewStatus'],
  },
  defaultSort: 'order',
  access: {
    read: publishedOrLoggedIn,
    create: isContentEditor,
    update: isContentEditor,
    delete: isContentEditor,
  },
  hooks: revalidateHooks,
  versions: { drafts: true, maxPerDoc: 10 },
  fields: [
    { name: 'question', type: 'text', localized: true, required: true, maxLength: 160 },
    {
      name: 'answer',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 1200,
      admin: { description: 'Leave an empty line between paragraphs.' },
    },
    {
      name: 'services',
      label: 'Show on these services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      index: true,
    },
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
    reviewStatusField,
  ],
}
