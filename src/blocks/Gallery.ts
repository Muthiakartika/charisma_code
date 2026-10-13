import type { Block } from 'payload'

import { eyebrowField, headingField, sectionSettingsFields } from '@/fields/shared'

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    eyebrowField,
    headingField(false),
    {
      name: 'images',
      label: 'Photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      minRows: 3,
      maxRows: 12,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'mosaic',
      options: [
        { label: 'Mosaic (mixed sizes)', value: 'mosaic' },
        { label: 'Even grid', value: 'grid' },
      ],
    },
    ...sectionSettingsFields,
  ],
}
