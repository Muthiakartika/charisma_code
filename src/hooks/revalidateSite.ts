/**
 * After content changes in the CMS, tell Next.js to rebuild the affected pages.
 *
 * The website is small, so we simply refresh every page ("/" + "layout").
 * Pages are rebuilt lazily the next time someone visits them, so this is cheap.
 */
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'
import { revalidatePath } from 'next/cache'

const refreshWebsite = (req: PayloadRequest) => {
  // The seed script sets this flag because it runs outside of Next.js.
  if (req.context?.disableRevalidate) return
  try {
    revalidatePath('/', 'layout')
  } catch (error) {
    req.payload.logger.warn({ err: error }, 'Could not revalidate the website cache')
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  refreshWebsite(req)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  refreshWebsite(req)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  refreshWebsite(req)
  return doc
}

/** Shortcut used by content collections. */
export const revalidateHooks = {
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
}
