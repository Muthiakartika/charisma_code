import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone, isContentEditor, isContentOrMarketing } from '@/access/roles'
import { revalidateHooks } from '@/hooks/revalidateSite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Public images (and PDFs such as the founder's portfolio).
 * Images are optimised automatically by Next.js when they are shown on the website.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media file', plural: 'Media' },
  admin: {
    group: 'Content',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description: 'Upload real photos only. Always describe the photo in "Alt text" for accessibility and SEO.',
  },
  access: {
    read: anyone,
    create: isContentOrMarketing,
    update: isContentOrMarketing,
    delete: isContentEditor,
  },
  hooks: revalidateHooks,
  upload: {
    // Development only. In production files are stored in Cloudflare R2 (see payload.config.ts).
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf'],
    focalPoint: true,
    crop: true,
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 480, position: 'centre' },
      { name: 'openGraph', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      localized: true,
      required: true,
      maxLength: 160,
      admin: { description: 'Describe what is in the photo, e.g. "De Zhong hosting a corporate dinner and dance at Mandai".' },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      maxLength: 160,
    },
    {
      name: 'needsReplacement',
      label: 'Placeholder — replace with a better photo',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Internal reminder. Ticked for photos used temporarily until the right photos are supplied.',
      },
    },
  ],
}
