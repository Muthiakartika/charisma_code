import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/** Leaves draft/preview mode and returns to the published website. */
export async function GET(): Promise<Response> {
  const draft = await draftMode()
  draft.disable()
  redirect('/')
}
