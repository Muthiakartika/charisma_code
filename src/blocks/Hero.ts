import type { Block } from 'payload'

import { linkField } from '@/fields/link'
import { eyebrowField, headingField, sectionSettingsFields } from '@/fields/shared'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'variant',
      label: 'Layout',
      type: 'select',
      defaultValue: 'split',
      options: [
        { label: 'Split — text left, photos right (recommended)', value: 'split' },
        { label: 'Stage — dark stage, photos in spotlight circles', value: 'stage' },
        { label: 'Colour block — light, photos stepping out of a block of brand colour (homepage)', value: 'colourBlock' },
        { label: 'Full photo — text over a large photo', value: 'photo' },
        { label: 'Simple — text only (for inner pages)', value: 'simple' },
      ],
    },
    {
      name: 'lineArt',
      label: 'Line art in the block of colour',
      type: 'select',
      defaultValue: 'spotlight',
      options: [
        { label: 'Stage spotlight', value: 'spotlight' },
        { label: 'Stage curtain', value: 'curtain' },
        { label: 'Singapore skyline', value: 'skyline' },
        { label: 'None', value: 'none' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'colourBlock',
        description: 'A soft line drawing in the block of colour, shown on desktop screens behind the photos.',
      },
    },
    eyebrowField,
    headingField(true, 90),
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
      maxLength: 280,
    },
    {
      type: 'row',
      fields: [
        { ...linkField({ name: 'primaryButton', label: 'Main button' }), admin: { width: '50%' } },
        { ...linkField({ name: 'secondaryButton', label: 'Second button' }), admin: { width: '50%' } },
      ],
    },
    {
      name: 'images',
      label: 'Photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      maxRows: 3,
      admin: {
        condition: (_, siblingData) => siblingData?.variant !== 'simple',
        description:
          'Split layout: up to 3 photos (the first one is the largest). Stage and Colour block layouts: up to 2 photos. Full photo layout: the first photo is used. Set the focal point on each photo (Media → photo → focal point) so faces stay in frame.',
      },
    },
    {
      name: 'highlights',
      label: 'Short highlights under the buttons',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Highlight', plural: 'Highlights' },
      fields: [{ name: 'text', type: 'text', localized: true, required: true, maxLength: 48 }],
      admin: { description: 'Optional, e.g. "Hosted in English & 中文". Only facts — no invented numbers.' },
    },
    ...sectionSettingsFields,
  ],
}
