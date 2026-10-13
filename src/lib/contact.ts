import type { ContactInformation } from '@/payload-types'

/** Ready-to-use links for phone, WhatsApp and email (from Settings → Contact Information). */
export const contactLinks = (contact: ContactInformation) => {
  const phoneDigits = contact.phone?.replace(/[^\d+]/g, '')
  return {
    phone: contact.phone && phoneDigits ? { label: contact.phone, href: `tel:${phoneDigits}` } : null,
    whatsapp: contact.whatsappNumber
      ? { label: contact.phone ?? contact.whatsappNumber, href: `https://wa.me/${contact.whatsappNumber}` }
      : null,
    email: contact.email ? { label: contact.email, href: `mailto:${contact.email}` } : null,
  }
}
