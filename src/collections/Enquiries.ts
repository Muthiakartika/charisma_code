import type { CollectionConfig, Field } from 'payload'

import {
  canManageEnquiries,
  canReadEnquiries,
  enquiryPersonalDataField,
  isSuperAdmin,
  nobody,
} from '@/access/roles'
import {
  budgetOptions,
  channelOptions,
  enquiryStatusOptions,
  groupSizeOptions,
  toSelectOptions,
} from '@/lib/forms/options'

/** Personal details: hidden from the marketing role (they only see statistics). */
const personal = (field: Field): Field =>
  ({ ...field, access: { read: enquiryPersonalDataField, update: enquiryPersonalDataField } }) as Field

/**
 * Client enquiries from the website forms.
 * Visitors can NOT create these through the public API — only the website's
 * server-side form handler can (after validation, spam checks and rate limiting).
 */
export const Enquiries: CollectionConfig<'enquiries'> = {
  slug: 'enquiries',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  admin: {
    group: 'Inbox',
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'service', 'status', 'channel', 'locale', 'createdAt'],
    listSearchableFields: ['reference', 'name', 'email', 'company'],
  },
  defaultSort: '-createdAt',
  access: {
    create: nobody,
    read: canReadEnquiries,
    update: canManageEnquiries,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'reference',
      type: 'text',
      admin: { readOnly: true, description: 'Generated automatically, e.g. ENQ-20261012-4821' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: toSelectOptions(enquiryStatusOptions),
      admin: { position: 'sidebar' },
      access: { update: enquiryPersonalDataField },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: { position: 'sidebar' },
      access: { read: enquiryPersonalDataField, update: enquiryPersonalDataField },
    },
    {
      type: 'collapsible',
      label: 'Contact details',
      fields: [
        personal({ name: 'name', type: 'text', required: true }),
        personal({ name: 'email', type: 'email', required: true }),
        personal({ name: 'phone', type: 'text' }),
        personal({ name: 'company', label: 'Company / organisation', type: 'text' }),
      ],
    },
    {
      type: 'collapsible',
      label: 'Event',
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          admin: { readOnly: true },
        },
        { name: 'serviceKey', type: 'text', admin: { readOnly: true, hidden: true } },
        { name: 'eventDate', type: 'text', admin: { readOnly: true } },
        { name: 'groupSize', type: 'select', options: toSelectOptions(groupSizeOptions), admin: { readOnly: true } },
        { name: 'budget', type: 'select', options: toSelectOptions(budgetOptions), admin: { readOnly: true } },
        personal({ name: 'message', type: 'textarea', admin: { readOnly: true } }),
        { name: 'privacyConsent', type: 'checkbox', admin: { readOnly: true } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Source (for monthly reports)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'locale', label: 'Website language', type: 'select', options: [{ label: 'English', value: 'en' }, { label: '中文', value: 'zh' }], admin: { readOnly: true } },
        { name: 'channel', type: 'select', options: toSelectOptions(channelOptions), admin: { readOnly: true } },
        { name: 'formPage', label: 'Form submitted on', type: 'text', admin: { readOnly: true } },
        { name: 'landingPage', label: 'First page visited', type: 'text', admin: { readOnly: true } },
        { name: 'referrer', type: 'text', admin: { readOnly: true } },
        { name: 'utmSource', type: 'text', admin: { readOnly: true } },
        { name: 'utmMedium', type: 'text', admin: { readOnly: true } },
        { name: 'utmCampaign', type: 'text', admin: { readOnly: true } },
        personal({ name: 'ipHash', label: 'Anonymised IP (spam protection)', type: 'text', index: true, admin: { readOnly: true } }),
      ],
    },
  ],
}
