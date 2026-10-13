import type { Block } from 'payload'

import { eyebrowField, headingField, sectionSettingsFields, toneField } from '@/fields/shared'
import { validateYoutubeUrl } from '@/lib/youtube'

export const VideoBlock: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    eyebrowField,
    headingField(false),
    {
      name: 'youtubeUrl',
      label: 'YouTube link',
      type: 'text',
      required: true,
      validate: (value: unknown) => validateYoutubeUrl(value, true),
      admin: { description: 'The video only loads when a visitor presses play (keeps the page fast).' },
    },
    {
      name: 'poster',
      label: 'Cover image (optional)',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'If empty, the YouTube thumbnail is used.' },
    },
    { name: 'caption', type: 'text', localized: true, maxLength: 140 },
    toneField,
    ...sectionSettingsFields,
  ],
}
