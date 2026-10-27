import type { ArrayField, GroupField } from 'payload'

type LinkFieldOptions = {
  name?: string
  label?: string
  /** When true the editor must fill in the button text and destination. */
  required?: boolean
  description?: string
}

/**
 * A button or link chosen by an editor: either a page on this website or a
 * custom URL (anchor, phone number, email, or external website).
 */
export const linkField = ({
  name = 'link',
  label = 'Link',
  required = false,
  description,
}: LinkFieldOptions = {}): GroupField => ({
  name,
  label,
  type: 'group',
  admin: {
    description:
      description ?? (required ? undefined : 'Leave the button text empty to hide this link.'),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          label: 'Button text',
          type: 'text',
          localized: true,
          required,
          maxLength: 60,
          admin: { width: '50%' },
        },
        {
          name: 'type',
          label: 'Links to',
          type: 'radio',
          defaultValue: 'page',
          options: [
            { label: 'A page on this website', value: 'page' },
            { label: 'Custom URL', value: 'custom' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
      ],
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      admin: { condition: (_, siblingData) => siblingData?.type !== 'custom' },
    },
    {
      name: 'url',
      label: 'Custom URL',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
        description:
          'Examples: /our-work · /contact#enquire · https://… · tel:+6594378083 · mailto:hello@…',
      },
    },
  ],
})

/**
 * A row of buttons at the end of a section (the first is the solid action button, the rest are outlined).
 * WhatsApp links get the WhatsApp icon automatically.
 */
export const buttonsField = (maxRows = 3): ArrayField => ({
  name: 'buttons',
  label: 'Buttons',
  type: 'array',
  maxRows,
  labels: { singular: 'Button', plural: 'Buttons' },
  admin: {
    initCollapsed: true,
    description: 'The first button is the main one. Leave empty for none.',
  },
  fields: linkField({ required: true }).fields,
})
