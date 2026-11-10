/**
 * Content from the client's answers of 5 Nov 2026 that does not live in a page brief
 * (docs/11-update-data-klien-9-nov.md): the payment terms and hosting location on the legal page,
 * TikTok in Social Links, and the Youth Olympic Games logo taken off the logo strips. Runs once on staging with the handoff update "2026-11-09"
 * (deploy.ts). Safe to repeat: each change applies only while the old wording is still there, so
 * edits made in the CMS afterwards are left alone.
 */
import type { Payload } from 'payload'

import { seedContext } from '../helpers'

type LexicalNode = {
  type?: string
  text?: string
  value?: number
  children?: LexicalNode[]
  [key: string]: unknown
}

const textNode = (text: string, bold = false): LexicalNode => ({
  mode: 'normal',
  text,
  type: 'text',
  style: '',
  detail: 0,
  format: bold ? 1 : 0,
  version: 1,
})

const listItem = (children: LexicalNode[]): LexicalNode => ({
  type: 'listitem',
  value: 1,
  format: '',
  indent: 0,
  version: 1,
  children,
  direction: null,
})

const TIKTOK = 'https://www.tiktok.com/@deprinceofzhong'

/** The WordPress text uses narrow no-break spaces ("22 July 2025", "50 %"), so compare without them. */
const plain = (text?: string) => text?.replace(/[  ]/g, ' ')

/** Returns true when it changed something in the tree. */
function updateLegalText(root: LexicalNode): boolean {
  let changed = false
  const walk = (node: LexicalNode) => {
    // "Last updated" moves with the terms ("the 'Last updated' date will change accordingly")
    if (node.type === 'text' && plain(node.text) === 'Last updated: 22 July 2025') {
      node.text = 'Last updated: 10 November 2026'
      changed = true
    }

    // 2.5 Booking, Payment & Cancellation: confirmed by the client on 5 Nov 2026
    if (node.type === 'list' && node.children) {
      const items = node.children
      const payment = items.findIndex((item) => item.children?.[0]?.text === 'Payment terms')
      const terms = items[payment]?.children?.[1]
      if (terms && plain(terms.text)?.startsWith(': 50 % deposit on confirmation')) {
        terms.text =
          ': 50% deposit on confirmation and the 50% balance on the day of the event. Weddings are secured with a S$300 deposit, with the balance paid at the end of the wedding day. PayNow is preferred.'
        if (!items.some((item) => item.children?.[0]?.text === 'Quotations')) {
          items.splice(
            payment + 1,
            0,
            listItem([
              textNode('Quotations', true),
              textNode(': valid for 2 weeks from the date of issue.'),
            ]),
          )
        }
        items.forEach((item, index) => (item.value = index + 1))
        changed = true
      }
    }

    // 3.6 International Transfers: the "[Hosting Location]" placeholder from the old site
    if (node.type === 'paragraph' && node.children?.some((child) => child.text === '[Hosting Location]')) {
      node.children = [
        textNode(
          'Our website is hosted by Vercel on servers in Singapore, with its database (Neon) in Singapore and its files stored with Cloudflare. Where data is transferred outside Singapore/EU, we rely on contractual safeguards or adequacy decisions.',
        ),
      ]
      changed = true
    }

    node.children?.forEach(walk)
  }
  walk(root)
  return changed
}

export async function applyClientData20261109(payload: Payload) {
  const log = (message: string) => payload.logger.info(`[client data 9 Nov] ${message}`)

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'legal' } },
    limit: 1,
    depth: 0,
    locale: 'en',
    draft: false,
  })
  const legal = docs[0]
  if (!legal) {
    log('no legal page, skipped')
  } else {
    const layout = structuredClone(legal.layout ?? []) as Array<{
      blockType: string
      content?: { root?: LexicalNode } | null
    }>
    const changed = layout
      .filter((block) => block.blockType === 'richText' && block.content?.root)
      .map((block) => updateLegalText(block.content!.root!))
      .some(Boolean)
    if (changed) {
      await payload.update({
        collection: 'pages',
        id: legal.id,
        locale: 'en',
        data: { layout: layout as never, _status: 'published' },
        draft: false,
        context: seedContext(),
      })
      log('legal page: payment terms, quotation validity and hosting location updated')
    } else {
      log('legal page already up to date (or edited in the CMS), left alone')
    }
  }

  const social = await payload.findGlobal({ slug: 'social-links', depth: 0 })
  if (!social.tiktok) {
    await payload.updateGlobal({ slug: 'social-links', data: { tiktok: TIKTOK }, context: seedContext() })
    log('Social Links: TikTok added')
  }

  // Olympic marks are restricted: the workbook told the client the logo stays out unless he has
  // written permission, and he sent none (5 Nov 2026). The name still appears in the About text.
  const { docs: olympic } = await payload.find({
    collection: 'clients',
    where: { name: { equals: 'Youth Olympic Games' }, showOnWebsite: { equals: true } },
    limit: 1,
    depth: 0,
  })
  for (const client of olympic) {
    await payload.update({
      collection: 'clients',
      id: client.id,
      data: { showOnWebsite: false },
      context: seedContext(),
    })
    log('Youth Olympic Games logo hidden from the logo strips')
  }
}
