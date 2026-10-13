/**
 * Who is allowed to do what in the CMS.
 *
 * Every rule here is enforced by Payload on the server (admin panel, REST API,
 * GraphQL and Local API with `overrideAccess: false`), so hiding a button in the
 * admin is never the only protection.
 *
 * Roles:
 *  - super-admin      everything, including users, enquiries and freelancer applications
 *  - editor           website content (pages, services, portfolio, globals…)
 *  - marketing        blog, founder updates, testimonials, clients, media, SEO settings;
 *                     can read enquiry statistics but NOT personal details
 *  - enquiry-manager  client enquiries (and freelancer applications only if a
 *                     super admin ticks "Can manage freelancer applications")
 */
import type { Access, FieldAccess, PayloadRequest, Where } from 'payload'

export const ROLES = ['super-admin', 'editor', 'marketing', 'enquiry-manager'] as const
export type Role = (typeof ROLES)[number]

type MaybeUser = PayloadRequest['user']

const userRole = (user: MaybeUser): Role | undefined =>
  user && 'role' in user ? (user.role as Role) : undefined

export const hasRole = (user: MaybeUser, ...roles: Role[]): boolean => {
  const role = userRole(user)
  return Boolean(role && roles.includes(role))
}

export const isSuperAdminUser = (user: MaybeUser) => hasRole(user, 'super-admin')

export const canManageApplicationsUser = (user: MaybeUser) =>
  isSuperAdminUser(user) ||
  Boolean(user && 'canManageApplications' in user && user.canManageApplications)

// ── Collection-level access ────────────────────────────────────────────────

export const anyone: Access = () => true
export const nobody: Access = () => false

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const isSuperAdmin: Access = ({ req: { user } }) => isSuperAdminUser(user)

/** Pages, services, programs, portfolio, FAQs, navigation… */
export const isContentEditor: Access = ({ req: { user } }) =>
  hasRole(user, 'super-admin', 'editor')

/** Blog, founder updates, testimonials, clients, media */
export const isContentOrMarketing: Access = ({ req: { user } }) =>
  hasRole(user, 'super-admin', 'editor', 'marketing')

export const canReadEnquiries: Access = ({ req: { user } }) =>
  hasRole(user, 'super-admin', 'enquiry-manager', 'marketing')

export const canManageEnquiries: Access = ({ req: { user } }) =>
  hasRole(user, 'super-admin', 'enquiry-manager')

export const canManageApplications: Access = ({ req: { user } }) =>
  canManageApplicationsUser(user)

/**
 * Public visitors only see published documents; logged-in staff also see drafts
 * (needed for preview).
 */
export const publishedOrLoggedIn: Access = ({ req: { user } }) => {
  if (user) return true
  const onlyPublished: Where = { _status: { equals: 'published' } }
  return onlyPublished
}

/** Users can read and update their own account; super admins can manage everyone. */
export const selfOrSuperAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isSuperAdminUser(user)) return true
  const ownAccount: Where = { id: { equals: user.id } }
  return ownAccount
}

// ── Field-level access ─────────────────────────────────────────────────────

export const superAdminField: FieldAccess = ({ req: { user } }) => isSuperAdminUser(user)

/** Personal details in enquiries: hidden from the marketing role. */
export const enquiryPersonalDataField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, 'super-admin', 'enquiry-manager')

export const loggedInField: FieldAccess = ({ req: { user } }) => Boolean(user)
