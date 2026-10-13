'use server'

/**
 * Server actions for the public forms. These run ONLY on the server:
 * validate → spam checks → save in Payload → email the team.
 * Visitors cannot write to the Enquiries/Applications collections any other way.
 */
import type { Payload } from 'payload'

import { isLocale } from '@/i18n/config'
import type { Enquiry } from '@/payload-types'
import { getPayloadClient } from '@/lib/cms'
import { siteUrl } from '@/lib/paths'

import { detectChannel, getIpHash, isRateLimited, looksLikeBot, makeReference } from './security'
import { verifyTurnstile } from './turnstile'
import { readApplication, readEnquiry, readResume } from './validation'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  reference?: string
  /** True only when the submission was really stored (used for analytics). */
  saved?: boolean
  /** Sent to Google Analytics after a successful enquiry. */
  serviceKey?: string
  /** Field name → error code (translated in the browser). */
  errors?: Record<string, string>
  message?: 'generic' | 'rateLimit' | 'fix' | 'captcha'
  /** Submitted values, so the visitor does not lose their text when there is an error. */
  values?: Record<string, string | string[] | boolean | undefined>
}

const clip = (value: FormDataEntryValue | null, max = 300) =>
  String(value ?? '')
    .trim()
    .slice(0, max) || undefined

async function notifyTeam(
  payload: Payload,
  subject: string,
  lines: Array<[string, string | undefined]>,
  adminPath: string,
  /** The visitor's email, so the team can simply press Reply. */
  replyTo?: string,
) {
  try {
    const contact = await payload.findGlobal({ slug: 'contact-information', depth: 0 })
    const recipients = (contact.notificationEmails ?? []).map((item) => item.email).filter(Boolean)
    if (!recipients.length && contact.email) recipients.push(contact.email)
    if (!recipients.length) return

    const body = lines
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n')

    await payload.sendEmail({
      to: recipients.join(', '),
      ...(replyTo ? { replyTo } : {}),
      subject,
      text: `${body}\n\nOpen in the CMS: ${siteUrl()}${adminPath}\n`,
    })
  } catch (error) {
    // The submission is already saved, so the visitor still sees success; the team can find it in the CMS.
    payload.logger.error({ err: error }, 'Could not send the form notification email')
  }
}

// ── Client enquiry ───────────────────────────────────────────────────────────

export async function submitEnquiry(_previous: FormState, formData: FormData): Promise<FormState> {
  const { values, raw, errors } = readEnquiry(formData)

  // Bots get a convincing "success" but nothing is saved or emailed.
  if (looksLikeBot(formData)) return { status: 'success', reference: makeReference('ENQ') }

  if (Object.keys(errors).length) return { status: 'error', message: 'fix', errors, values: raw }

  try {
    const payload = await getPayloadClient()
    const human = await verifyTurnstile(formData, 'enquiry', (message, detail) =>
      payload.logger.warn({ detail }, message),
    )
    if (!human) return { status: 'error', message: 'captcha', values: raw }

    const ipHash = await getIpHash()
    if (await isRateLimited(payload, 'enquiries', ipHash)) {
      return { status: 'error', message: 'rateLimit', values: raw }
    }

    const locale = isLocale(formData.get('locale')) ? (formData.get('locale') as 'en' | 'zh') : 'en'
    const service =
      values.service === 'other'
        ? null
        : (
            await payload.find({
              collection: 'services',
              where: { key: { equals: values.service } },
              limit: 1,
              depth: 0,
              overrideAccess: true,
            })
          ).docs[0]

    if (values.service !== 'other' && !service) {
      return { status: 'error', message: 'fix', errors: { service: 'service' }, values: raw }
    }

    const referrer = clip(formData.get('referrer'), 500)
    const utmMedium = clip(formData.get('utmMedium'), 100)
    const reference = makeReference('ENQ')

    const enquiry = await payload.create({
      collection: 'enquiries',
      overrideAccess: true,
      data: {
        reference,
        status: 'new',
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        company: values.company || undefined,
        service: service?.id,
        serviceKey: service?.key ?? 'other',
        eventDate: values.eventDate || undefined,
        groupSize: values.groupSize as Enquiry['groupSize'],
        budget: values.budget as Enquiry['budget'],
        message: values.message,
        privacyConsent: true,
        locale,
        channel: detectChannel({ referrer, utmMedium }),
        formPage: clip(formData.get('formPage'), 300),
        landingPage: clip(formData.get('landingPage'), 300),
        referrer,
        utmSource: clip(formData.get('utmSource'), 100),
        utmMedium,
        utmCampaign: clip(formData.get('utmCampaign'), 100),
        ipHash,
      },
    })

    await notifyTeam(
      payload,
      `New enquiry ${reference}: ${service?.title ?? 'Other'} from ${values.name}`,
      [
        ['Reference', reference],
        ['Service', service?.title ?? 'Other'],
        ['Name', values.name],
        ['Email', values.email],
        ['Phone', values.phone],
        ['Company', values.company],
        ['Event date', values.eventDate],
        ['Group size', values.groupSize],
        ['Budget', values.budget],
        ['Language', locale === 'zh' ? 'Chinese' : 'English'],
        ['Message', `\n${values.message}`],
      ],
      `/admin/collections/enquiries/${enquiry.id}`,
      values.email,
    )

    return { status: 'success', saved: true, reference, serviceKey: service?.key ?? 'other' }
  } catch (error) {
    const payload = await getPayloadClient().catch(() => null)
    payload?.logger.error({ err: error }, 'Enquiry form submission failed')
    return { status: 'error', message: 'generic', values: raw }
  }
}

// ── Freelancer application ───────────────────────────────────────────────────

export async function submitApplication(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const { values, errors } = readApplication(formData)
  const resume = await readResume(formData)
  if (resume.error) errors.resume = resume.error

  if (looksLikeBot(formData)) return { status: 'success', reference: makeReference('APP') }

  // Never send the file back; keep the typed values.
  const keep = { ...values, consent: values.consent }
  if (Object.keys(errors).length) return { status: 'error', message: 'fix', errors, values: keep }

  try {
    const payload = await getPayloadClient()
    const human = await verifyTurnstile(formData, 'application', (message, detail) =>
      payload.logger.warn({ detail }, message),
    )
    if (!human) return { status: 'error', message: 'captcha', values: keep }

    const ipHash = await getIpHash()
    if (await isRateLimited(payload, 'freelancer-applications', ipHash)) {
      return { status: 'error', message: 'rateLimit', values: keep }
    }

    const reference = makeReference('APP')
    let resumeId: number | undefined
    if (resume.file) {
      // Payload checks the file content again (e.g. that a PDF is really a valid PDF).
      const uploaded = await payload
        .create({
          collection: 'resumes',
          overrideAccess: true,
          data: {},
          file: {
            data: resume.file.buffer,
            mimetype: resume.file.mimetype,
            // Random file name: the applicant's own file name is never exposed in URLs.
            name: `resume-${reference.toLowerCase()}.${resume.file.extension}`,
            size: resume.file.size,
          },
        })
        .catch((error) => {
          payload.logger.warn({ err: error }, 'Résumé upload rejected')
          return null
        })
      if (!uploaded) {
        return { status: 'error', message: 'fix', errors: { resume: 'resume' }, values: keep }
      }
      resumeId = uploaded.id
    }

    const locale = isLocale(formData.get('locale')) ? String(formData.get('locale')) : 'en'
    const application = await payload.create({
      collection: 'freelancer-applications',
      overrideAccess: true,
      data: {
        status: 'new',
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        location: values.location,
        role: values.role as never,
        experience: values.experience as never,
        bio: values.bio,
        portfolioUrl: values.portfolioUrl || undefined,
        resume: resumeId,
        availability: values.availability as never,
        availabilityNotes: values.availabilityNotes || undefined,
        privacyConsent: true,
        locale,
        ipHash,
      },
    })

    await notifyTeam(
      payload,
      `New freelancer application ${reference}: ${values.role} (${values.name})`,
      [
        ['Reference', reference],
        ['Role', values.role],
        ['Name', values.name],
        ['Location', values.location],
        ['Experience', values.experience],
        ['Résumé attached in CMS', resumeId ? 'Yes' : 'No'],
      ],
      `/admin/collections/freelancer-applications/${application.id}`,
      values.email,
    )

    return { status: 'success', saved: true, reference }
  } catch (error) {
    const payload = await getPayloadClient().catch(() => null)
    payload?.logger.error({ err: error }, 'Freelancer application submission failed')
    return { status: 'error', message: 'generic', values: keep }
  }
}
