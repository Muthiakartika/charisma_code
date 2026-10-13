import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { isContentOrMarketing, publishedOrLoggedIn } from '@/access/roles'
import { chineseTranslationField, reviewStatusField } from '@/fields/shared'
import { revalidateHooks } from '@/hooks/revalidateSite'
import { postPath, previewUrl } from '@/lib/paths'

/** Articles shown on /insights. */
export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    group: 'Insights (Blog)',
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'publishedAt', '_status'],
    livePreview: {
      url: ({ data, locale }) => previewUrl(postPath(data?.slug), locale?.code),
    },
    preview: (data, { locale }) => previewUrl(postPath(data?.slug as string), locale),
  },
  defaultSort: '-publishedAt',
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    coverImage: true,
    publishedAt: true,
    categories: true,
  },
  access: {
    read: publishedOrLoggedIn,
    create: isContentOrMarketing,
    update: isContentOrMarketing,
    delete: isContentOrMarketing,
  },
  hooks: {
    ...revalidateHooks,
    beforeChange: [
      ({ data }) => {
        // Set the publish date automatically the first time a post is published.
        if (data._status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: 30 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'title', type: 'text', localized: true, required: true, maxLength: 120 },
            {
              name: 'excerpt',
              type: 'textarea',
              localized: true,
              required: true,
              maxLength: 240,
              admin: { description: 'Shown on article cards. 1–2 sentences.' },
            },
            { name: 'coverImage', type: 'upload', relationTo: 'media' },
            { name: 'content', type: 'richText', localized: true, required: true },
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'authorName',
      label: 'Author',
      type: 'text',
      defaultValue: 'Chia De Zhong',
      admin: { position: 'sidebar' },
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    {
      name: 'legacyUrl',
      label: 'Old WordPress URL',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true },
    },
    slugField({ position: 'sidebar' }),
    chineseTranslationField,
    reviewStatusField,
  ],
}
