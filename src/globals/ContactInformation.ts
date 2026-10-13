import type { GlobalConfig } from 'payload'

import { anyone, isContentEditor, loggedInField } from '@/access/roles'
import { revalidateGlobal } from '@/hooks/revalidateSite'

export const ContactInformation: GlobalConfig = {
  slug: 'contact-information',
  label: 'Contact Information',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isContentEditor },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'email', type: 'email', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          admin: { width: '50%', description: 'Shown on the website, e.g. +65 9437 8083' },
        },
        {
          name: 'whatsappNumber',
          label: 'WhatsApp number',
          type: 'text',
          admin: { width: '50%', description: 'Digits only with country code, e.g. 6594378083' },
          validate: (value: unknown) =>
            !value || /^\d{8,15}$/.test(String(value)) || 'Digits only, including the country code.',
        },
      ],
    },
    {
      name: 'uen',
      label: 'UEN',
      type: 'text',
      admin: { description: 'Singapore business registration number (shown in the footer).' },
    },
    {
      name: 'serviceArea',
      type: 'text',
      localized: true,
      defaultValue: 'Singapore',
      admin: { description: 'No street address is published. Used for local SEO ("service-area business").' },
    },
    {
      name: 'notificationEmails',
      label: 'Send new enquiries to',
      type: 'array',
      access: { read: loggedInField },
      admin: { description: 'Who receives an email for every new enquiry and freelancer application.' },
      fields: [{ name: 'email', type: 'email', required: true }],
    },
  ],
}
