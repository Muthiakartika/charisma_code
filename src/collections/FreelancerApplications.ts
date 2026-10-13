import type { CollectionConfig } from 'payload'

import { canManageApplications, isSuperAdmin, nobody } from '@/access/roles'
import {
  applicationStatusOptions,
  availabilityOptions,
  experienceOptions,
  freelancerRoleOptions,
  toSelectOptions,
} from '@/lib/forms/options'

/**
 * Applications from /work-with-us. Kept completely separate from client enquiries.
 * Only super admins (and users given "Can manage freelancer applications") can see them.
 */
export const FreelancerApplications: CollectionConfig<'freelancer-applications'> = {
  slug: 'freelancer-applications',
  labels: { singular: 'Freelancer Application', plural: 'Freelancer Applications' },
  admin: {
    group: 'Inbox',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'experience', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'location'],
    hidden: ({ user }) =>
      !(user && (user.role === 'super-admin' || Boolean(user.canManageApplications))),
  },
  defaultSort: '-createdAt',
  access: {
    create: nobody,
    read: canManageApplications,
    update: canManageApplications,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: toSelectOptions(applicationStatusOptions),
      admin: { position: 'sidebar', description: 'New → Reviewing → Shortlisted → Contacted → Closed' },
    },
    { name: 'internalNotes', type: 'textarea', admin: { position: 'sidebar' } },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { readOnly: true, width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { readOnly: true, width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { readOnly: true, width: '50%' } },
        { name: 'location', type: 'text', admin: { readOnly: true, width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'role', type: 'select', options: toSelectOptions(freelancerRoleOptions), admin: { readOnly: true, width: '50%' } },
        { name: 'experience', type: 'select', options: toSelectOptions(experienceOptions), admin: { readOnly: true, width: '50%' } },
      ],
    },
    { name: 'bio', type: 'textarea', admin: { readOnly: true } },
    { name: 'portfolioUrl', label: 'Portfolio link', type: 'text', admin: { readOnly: true } },
    {
      name: 'resume',
      label: 'Résumé',
      type: 'upload',
      relationTo: 'resumes',
      admin: { readOnly: true },
    },
    {
      name: 'availability',
      type: 'select',
      hasMany: true,
      options: toSelectOptions(availabilityOptions),
      admin: { readOnly: true },
    },
    { name: 'availabilityNotes', type: 'textarea', admin: { readOnly: true } },
    { name: 'privacyConsent', type: 'checkbox', admin: { readOnly: true } },
    { name: 'locale', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
    { name: 'ipHash', type: 'text', index: true, admin: { readOnly: true, hidden: true } },
  ],
}
