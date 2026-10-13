import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { isContentEditor, publishedOrLoggedIn } from '@/access/roles'
import { pageBlocks } from '@/blocks'
import { chineseTranslationField, reviewStatusField } from '@/fields/shared'
import { revalidateHooks } from '@/hooks/revalidateSite'
import { pagePath, previewUrl } from '@/lib/paths'

/**
 * Website pages built from blocks (the "page builder").
 * Core pages use fixed slugs that match folders in src/app/(frontend)/[locale]/
 * e.g. slug "corporate-team-building" → /corporate-team-building
 */
export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'theme', 'chineseTranslation', 'reviewStatus', 'updatedAt'],
    description:
      'Do not change the slug of core pages (home, corporate-team-building, …) — their address is fixed in the website code.',
    livePreview: {
      url: ({ data, locale }) => previewUrl(pagePath(data?.slug), locale?.code),
    },
    preview: (data, { locale }) => previewUrl(pagePath(data?.slug as string), locale),
  },
  defaultPopulate: { title: true, slug: true },
  access: {
    read: publishedOrLoggedIn,
    create: isContentEditor,
    update: isContentEditor,
    delete: isContentEditor,
  },
  hooks: revalidateHooks,
  versions: {
    drafts: { autosave: { interval: 800 } },
    maxPerDoc: 30,
  },
  fields: [
    // The first field is a set of tabs; the SEO plugin adds an "SEO" tab next to "Page".
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page',
          fields: [
            { name: 'title', type: 'text', localized: true, required: true },
            {
              name: 'layout',
              label: 'Page sections',
              type: 'blocks',
              blocks: pageBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
      ],
    },
    {
      name: 'theme',
      label: 'Visual style',
      type: 'select',
      defaultValue: 'corporate',
      options: [
        { label: 'Corporate (default)', value: 'corporate' },
        { label: 'Wedding — warm & elegant', value: 'wedding' },
        { label: 'Kids & Youth — playful', value: 'kids' },
      ],
      admin: { position: 'sidebar' },
    },
    slugField({ position: 'sidebar' }),
    chineseTranslationField,
    reviewStatusField,
  ],
}
