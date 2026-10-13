import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { isContentEditor, publishedOrLoggedIn } from '@/access/roles'
import { chineseTranslationField, reviewStatusField, workCategoryOptions } from '@/fields/shared'
import { revalidateHooks } from '@/hooks/revalidateSite'
import { previewUrl, projectPath } from '@/lib/paths'
import { validateYoutubeUrl } from '@/lib/youtube'

/** Portfolio case studies shown on /our-work. */
export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  labels: { singular: 'Portfolio Project', plural: 'Portfolio Projects' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'clientName', 'featured', 'reviewStatus', 'updatedAt'],
    livePreview: {
      url: ({ data, locale }) => previewUrl(projectPath(data?.slug), locale?.code),
    },
    preview: (data, { locale }) => previewUrl(projectPath(data?.slug as string), locale),
  },
  defaultSort: '-eventDate',
  defaultPopulate: {
    title: true,
    slug: true,
    category: true,
    clientName: true,
    summary: true,
    coverImage: true,
    eventDate: true,
    hasDetailPage: true,
  },
  access: {
    read: publishedOrLoggedIn,
    create: isContentEditor,
    update: isContentEditor,
    delete: isContentEditor,
  },
  hooks: revalidateHooks,
  versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: 20 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Project',
          fields: [
            { name: 'title', type: 'text', localized: true, required: true, maxLength: 110 },
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  options: workCategoryOptions,
                  admin: { width: '50%' },
                },
                {
                  name: 'eventDate',
                  label: 'Date',
                  type: 'date',
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'monthOnly', displayFormat: 'MMMM yyyy' },
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'clientName',
                  label: 'Client (as shown on the website)',
                  type: 'text',
                  maxLength: 80,
                  admin: { width: '50%', description: 'Only name a client with their permission.' },
                },
                {
                  name: 'venue',
                  type: 'text',
                  localized: true,
                  maxLength: 80,
                  admin: { width: '50%' },
                },
              ],
            },
            { name: 'summary', type: 'textarea', localized: true, required: true, maxLength: 260 },
            { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
            {
              type: 'collapsible',
              label: 'Case study (shown on the project page)',
              fields: [
                { name: 'objective', type: 'textarea', localized: true, maxLength: 1200 },
                { name: 'solution', type: 'textarea', localized: true, maxLength: 1600 },
                { name: 'execution', type: 'textarea', localized: true, maxLength: 1600 },
                {
                  name: 'outcomes',
                  type: 'textarea',
                  localized: true,
                  maxLength: 1200,
                  admin: { description: 'Real outcomes only — no invented numbers.' },
                },
              ],
            },
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true, maxRows: 16 },
            {
              name: 'videoUrl',
              label: 'YouTube video (optional)',
              type: 'text',
              validate: (value: unknown) => validateYoutubeUrl(value),
            },
            { name: 'testimonial', type: 'relationship', relationTo: 'testimonials' },
          ],
        },
      ],
    },
    {
      name: 'featured',
      label: 'Feature on the homepage',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'hasDetailPage',
      label: 'Has its own page',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'Untick when there is not enough content yet — the project then only appears as a card.',
      },
    },
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
