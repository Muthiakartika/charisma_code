import type { CollectionConfig } from 'payload'

import { isContentEditor, publishedOrLoggedIn } from '@/access/roles'
import { reviewStatusField } from '@/fields/shared'
import { revalidateHooks } from '@/hooks/revalidateSite'

/**
 * The list of services. Used by Service Cards, the enquiry form
 * ("Service required") and Google Analytics enquiry tracking.
 */
export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'priority', 'audience', 'showInEnquiryForm', 'updatedAt'],
  },
  defaultSort: 'priority',
  defaultPopulate: { title: true, key: true, summary: true, image: true, page: true, audience: true },
  access: {
    read: publishedOrLoggedIn,
    create: isContentEditor,
    update: isContentEditor,
    delete: isContentEditor,
  },
  hooks: revalidateHooks,
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true, maxLength: 60 },
    {
      name: 'key',
      label: 'Tracking key',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: (value: unknown) =>
        /^[a-z0-9-]+$/.test(String(value ?? '')) || 'Use lowercase letters, numbers and dashes, e.g. team-building',
      admin: {
        position: 'sidebar',
        description: 'Used in enquiry records and Google Analytics. Do not change after launch.',
      },
    },
    {
      name: 'priority',
      label: 'Priority (1 = most important)',
      type: 'number',
      required: true,
      defaultValue: 10,
      admin: { position: 'sidebar', description: 'Lower numbers appear first and largest.' },
    },
    {
      name: 'audience',
      type: 'select',
      required: true,
      defaultValue: 'corporate',
      options: [
        { label: 'Corporate', value: 'corporate' },
        { label: 'Celebrations', value: 'celebrations' },
        { label: 'Kids & Youth', value: 'youth' },
        { label: 'Creative & Support', value: 'creative' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 200,
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'page',
      label: 'Landing page',
      type: 'relationship',
      relationTo: 'pages',
      admin: { description: 'The page visitors open when they click this service.' },
    },
    {
      name: 'showInEnquiryForm',
      label: 'Show in the enquiry form',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    reviewStatusField,
  ],
}
