import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { canManageApplications, isSuperAdmin, nobody } from '@/access/roles'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Private résumé files from freelancer applications.
 * Files are NOT public: downloading one requires being logged in with access to
 * freelancer applications. In production they are stored in a private R2 bucket.
 */
export const Resumes: CollectionConfig<'resumes'> = {
  slug: 'resumes',
  labels: { singular: 'Résumé', plural: 'Résumés' },
  admin: {
    group: 'Inbox',
    useAsTitle: 'filename',
    hidden: ({ user }) =>
      !(user && (user.role === 'super-admin' || Boolean(user.canManageApplications))),
  },
  access: {
    create: nobody,
    read: canManageApplications,
    update: nobody,
    delete: isSuperAdmin,
  },
  upload: {
    // Development only: stored outside /public so files are never served directly.
    staticDir: path.resolve(dirname, '../../private-uploads/resumes'),
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [],
}
