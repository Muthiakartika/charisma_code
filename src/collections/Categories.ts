import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone, isContentOrMarketing } from '@/access/roles'
import { revalidateHooks } from '@/hooks/revalidateSite'

/** Blog categories, e.g. Team Building, Communication, Founder Updates. */
export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  labels: { singular: 'Category', plural: 'Categories' },
  admin: {
    group: 'Insights (Blog)',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
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
    { name: 'title', type: 'text', localized: true, required: true, maxLength: 40 },
    { name: 'description', type: 'textarea', localized: true, maxLength: 200 },
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
    slugField({ position: 'sidebar' }),
  ],
}
