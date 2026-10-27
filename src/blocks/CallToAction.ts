import type { Block } from 'payload'

import { linkField } from '@/fields/link'
import { eyebrowField, headingField, priceLineField, sectionSettingsFields } from '@/fields/shared'

export const CallToActionBlock: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  labels: { singular: 'Call to Action', plural: 'Calls to Action' },
  fields: [
    eyebrowField,
    headingField(true, 100),
    { name: 'text', type: 'textarea', localized: true, maxLength: 400 },
    priceLineField,
    {
      name: 'image',
      label: 'Photo (card style only)',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, siblingData) => siblingData?.style === 'card' },
    },
    {
      type: 'row',
      fields: [
        { ...linkField({ name: 'primaryButton', label: 'Main button' }), admin: { width: '50%' } },
        {
          ...linkField({ name: 'secondaryButton', label: 'Second button' }),
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'showContactDetails',
      label: 'Also show phone, WhatsApp and email',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Taken from Settings → Contact Information.' },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'spark',
      options: [
        { label: 'Spark (bold accent colour)', value: 'spark' },
        { label: 'Dark (stage)', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Ivory (same as the page)', value: 'ivory' },
        { label: 'Card with a photo (a smaller, quieter invitation)', value: 'card' },
      ],
    },
    ...sectionSettingsFields,
  ],
}
