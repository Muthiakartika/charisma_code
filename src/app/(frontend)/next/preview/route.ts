/**
 * Opens a page in "draft mode" so logged-in editors can preview unpublished changes.
 * Called by the Preview / Live Preview buttons in the CMS.
 */
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') ?? ''
  const secret = searchParams.get('secret')

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page.', { status: 403 })
  }
  // Only allow paths on this website (prevents open redirects).
  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid preview path.', { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: request.headers })
  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('Please log in to the CMS to preview this page.', { status: 403 })
  }

  draft.enable()
  redirect(path)
}
