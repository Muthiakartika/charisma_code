import type { CollectionConfig } from 'payload'

import { isSuperAdmin, isSuperAdminUser, selfOrSuperAdmin, superAdminField } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  admin: {
    group: 'Admin',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'canManageApplications'],
  },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8 hours
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 minutes after 5 failed attempts
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  access: {
    // Anyone with an account may open /admin; what they see is limited by their role.
    admin: ({ req: { user } }) => Boolean(user),
    create: isSuperAdmin,
    read: selfOrSuperAdmin,
    update: selfOrSuperAdmin,
    delete: isSuperAdmin,
  },
  hooks: {
    beforeChange: [
      // The very first account (created on /admin/create-first-user) becomes the super admin.
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true, req })
          if (totalDocs === 0) {
            data.role = 'super-admin'
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Enquiry Manager', value: 'enquiry-manager' },
      ],
      access: {
        create: superAdminField,
        update: superAdminField,
      },
      admin: {
        position: 'sidebar',
        description:
          'Editor: website content · Marketing: blog, updates, testimonials (enquiry stats without personal data) · Enquiry Manager: client enquiries',
        // Hidden on the "create first user" screen: the first account always becomes Super Admin.
        condition: (_, __, { user }) => Boolean(user),
      },
    },
    {
      name: 'canManageApplications',
      label: 'Can manage freelancer applications',
      type: 'checkbox',
      defaultValue: false,
      access: {
        create: superAdminField,
        update: superAdminField,
      },
      admin: {
        position: 'sidebar',
        description: 'Gives access to freelancer applications and résumés. Super admins always have access.',
        condition: (_, __, { user }) => isSuperAdminUser(user),
      },
    },
  ],
}
