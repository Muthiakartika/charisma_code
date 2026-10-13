import type { CollectionConfig } from 'payload'

import { isContentOrMarketing, publishedOrLoggedIn } from '@/access/roles'
import { testimonialCategoryOptions } from '@/fields/shared'
import { revalidateHooks } from '@/hooks/revalidateSite'

/**
 * Real client feedback only. Testimonials marked "Permission pending" are never
 * shown on the website (PDPA).
 */
export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    group: 'Content',
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'category', 'source', 'permission', 'updatedAt'],
    description: 'Never invent or edit the meaning of a testimonial. Only publish with permission or from a public review.',
  },
  defaultSort: '-createdAt',
  access: {
    read: publishedOrLoggedIn,
    create: isContentOrMarketing,
    update: isContentOrMarketing,
    delete: isContentOrMarketing,
  },
  hooks: revalidateHooks,
  versions: { drafts: true, maxPerDoc: 10 },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 900,
    },
    {
      type: 'row',
      fields: [
        { name: 'authorName', label: 'Name (as permitted)', type: 'text', required: true, maxLength: 60, admin: { width: '50%' } },
        { name: 'authorRole', label: 'Role / context', type: 'text', localized: true, maxLength: 80, admin: { width: '50%', description: 'e.g. "Bride", "HR Manager"' } },
      ],
    },
    { name: 'organisation', type: 'text', maxLength: 80 },
    {
      type: 'row',
      fields: [
        { name: 'category', type: 'select', required: true, options: testimonialCategoryOptions, admin: { width: '50%' } },
        {
          name: 'source',
          type: 'select',
          required: true,
          defaultValue: 'google-review',
          options: [
            { label: 'Google review', value: 'google-review' },
            { label: 'WhatsApp / message', value: 'message' },
            { label: 'Email', value: 'email' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Feedback form', value: 'feedback-form' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'permission',
      label: 'Permission to publish',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Public review (e.g. Google)', value: 'public-review' },
        { label: 'Written permission received', value: 'written-permission' },
        { label: 'Permission pending — do not show', value: 'pending' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
