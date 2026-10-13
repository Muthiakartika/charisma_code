/**
 * Checks that each CMS role can only reach what it should (run while `npm run dev` is running):
 *   npm run test:permissions
 *
 * Creates temporary test users with random passwords, calls the real REST API as each
 * of them, prints a pass/fail table, then deletes the temporary users again.
 */
import config from '@payload-config'
import crypto from 'node:crypto'
import { getPayload } from 'payload'

const BASE = process.env.TEST_BASE_URL || 'http://localhost:3000'
const payload = await getPayload({ config })

type Role = 'super-admin' | 'editor' | 'marketing' | 'enquiry-manager'
const roles: Role[] = ['super-admin', 'editor', 'marketing', 'enquiry-manager']
const created: number[] = []
const results: Array<{ role: string; check: string; expected: string; actual: string; pass: boolean }> = []

async function login(email: string, password: string) {
  const response = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const json = (await response.json()) as { token?: string }
  if (!json.token) throw new Error(`Login failed for ${email}`)
  return json.token
}

const api = (token: string, path: string, init: RequestInit = {}) =>
  fetch(`${BASE}${path}`, { ...init, headers: { ...(init.headers ?? {}), Authorization: `JWT ${token}`, 'Content-Type': 'application/json' } })

function record(role: string, check: string, expected: string, actual: string) {
  results.push({ role, check, expected, actual, pass: expected === actual })
}

try {
  const tokens: Record<string, string> = {}
  for (const role of roles) {
    const email = `permission-test-${role}-${crypto.randomBytes(3).toString('hex')}@example.com`
    const password = crypto.randomBytes(18).toString('base64url')
    const user = await payload.create({
      collection: 'users',
      data: { email, password, name: `Test ${role}`, role, canManageApplications: false },
      overrideAccess: true,
    })
    created.push(user.id)
    tokens[role] = await login(email, password)
  }

  const enquiry = (await payload.find({ collection: 'enquiries', limit: 1, overrideAccess: true })).docs[0]
  const page = (await payload.find({ collection: 'pages', where: { slug: { equals: 'contact' } }, limit: 1, overrideAccess: true })).docs[0]

  for (const role of roles) {
    const token = tokens[role]

    // Enquiries list
    const list = await api(token, '/api/enquiries?limit=1')
    const listJson = (await list.json()) as { docs?: Array<Record<string, unknown>> }
    const expectedList = role === 'editor' ? '403' : '200'
    record(role, 'Read enquiries', expectedList, String(list.status))

    // Personal details inside enquiries
    if (list.status === 200 && enquiry) {
      const doc = listJson.docs?.[0] ?? {}
      const seesEmail = typeof doc.email === 'string' && doc.email.length > 0
      record(role, 'See enquiry email/name', role === 'marketing' ? 'hidden' : 'visible', seesEmail ? 'visible' : 'hidden')
    }

    // Update an enquiry status
    if (enquiry) {
      const update = await api(token, `/api/enquiries/${enquiry.id}`, { method: 'PATCH', body: JSON.stringify({ status: enquiry.status }) })
      record(role, 'Update enquiry', ['super-admin', 'enquiry-manager'].includes(role) ? '200' : '403', String(update.status))
    }

    // Freelancer applications (only super admin by default)
    const applications = await api(token, '/api/freelancer-applications?limit=1')
    record(role, 'Read freelancer applications', role === 'super-admin' ? '200' : '403', String(applications.status))

    // Edit a page
    if (page) {
      const edit = await api(token, `/api/pages/${page.id}?draft=true`, { method: 'PATCH', body: JSON.stringify({ title: page.title }) })
      record(role, 'Edit a page', ['super-admin', 'editor'].includes(role) ? '200' : '403', String(edit.status))
    }

    // List users (non-admins only see themselves)
    const users = await api(token, '/api/users?limit=50')
    const usersJson = (await users.json()) as { totalDocs?: number }
    record(role, 'Users visible', role === 'super-admin' ? 'all' : 'only self', (usersJson.totalDocs ?? 0) > 1 ? 'all' : 'only self')

    // Change own role (only super admin may)
    if (role !== 'super-admin') {
      const me = created[roles.indexOf(role)]
      await api(token, `/api/users/${me}`, { method: 'PATCH', body: JSON.stringify({ role: 'super-admin' }) })
      const after = await payload.findByID({ collection: 'users', id: me, overrideAccess: true })
      record(role, 'Promote self to super admin', 'blocked', after.role === 'super-admin' ? 'ALLOWED' : 'blocked')
    }
  }
} finally {
  for (const id of created) {
    await payload.delete({ collection: 'users', id, overrideAccess: true })
  }
}

console.table(results)
const failed = results.filter((result) => !result.pass)
console.log(failed.length ? `❌ ${failed.length} check(s) failed` : `✅ All ${results.length} permission checks passed`)
process.exit(failed.length ? 1 : 0)
