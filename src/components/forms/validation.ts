/**
 * Server-side validation for the public forms. The browser also checks required
 * fields, but these checks are the ones that count (they cannot be bypassed).
 */
import {
  availabilityOptions,
  budgetOptions,
  experienceOptions,
  freelancerRoleOptions,
  groupSizeOptions,
  optionValues,
} from '@/lib/forms/options'

export type FieldErrors = Record<string, string>

/** Error codes match the keys in dictionary.form.errors */
type ErrorCode =
  | 'name'
  | 'email'
  | 'phone'
  | 'message'
  | 'consent'
  | 'service'
  | 'tooLong'
  | 'url'
  | 'role'
  | 'experience'
  | 'bio'
  | 'location'
  | 'resume'

const text = (formData: FormData, name: string) => String(formData.get(name) ?? '').trim()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^[+()\d\s-]{6,24}$/

const oneOf = (value: string, allowed: string[]) => (value && allowed.includes(value) ? value : undefined)

export function readEnquiry(formData: FormData) {
  const values = {
    name: text(formData, 'name'),
    email: text(formData, 'email').toLowerCase(),
    phone: text(formData, 'phone'),
    company: text(formData, 'company'),
    service: text(formData, 'service'),
    eventDate: text(formData, 'eventDate'),
    groupSize: text(formData, 'groupSize'),
    budget: text(formData, 'budget'),
    message: text(formData, 'message'),
    consent: formData.get('consent') === 'on',
  }

  const errors: Record<string, ErrorCode> = {}
  if (values.name.length < 2) errors.name = 'name'
  else if (values.name.length > 100) errors.name = 'tooLong'
  if (!emailPattern.test(values.email) || values.email.length > 160) errors.email = 'email'
  if (values.phone && !phonePattern.test(values.phone)) errors.phone = 'phone'
  if (values.company.length > 120) errors.company = 'tooLong'
  if (!values.service) errors.service = 'service'
  if (values.eventDate.length > 60) errors.eventDate = 'tooLong'
  if (values.message.length < 10) errors.message = 'message'
  else if (values.message.length > 3000) errors.message = 'tooLong'
  if (!values.consent) errors.consent = 'consent'

  return {
    values: {
      ...values,
      groupSize: oneOf(values.groupSize, optionValues(groupSizeOptions)),
      budget: oneOf(values.budget, optionValues(budgetOptions)),
    },
    raw: values,
    errors,
  }
}

export const MAX_RESUME_BYTES = 4 * 1024 * 1024

const resumeTypes: Record<string, { extensions: string[]; magic: number[][] }> = {
  'application/pdf': { extensions: ['pdf'], magic: [[0x25, 0x50, 0x44, 0x46]] }, // %PDF
  'application/msword': { extensions: ['doc'], magic: [[0xd0, 0xcf, 0x11, 0xe0]] },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    extensions: ['docx'],
    magic: [[0x50, 0x4b, 0x03, 0x04]], // ZIP container
  },
}

/** Checks size, declared type, file extension AND the file's real first bytes. */
export async function readResume(formData: FormData) {
  const file = formData.get('resume')
  if (!(file instanceof File) || file.size === 0) return { file: null, error: null as ErrorCode | null }
  const type = resumeTypes[file.type]
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (!type || !type.extensions.includes(extension) || file.size > MAX_RESUME_BYTES) {
    return { file: null, error: 'resume' as ErrorCode }
  }
  const buffer = Buffer.from(await file.arrayBuffer())
  const matches = type.magic.some((signature) => signature.every((byte, index) => buffer[index] === byte))
  if (!matches) return { file: null, error: 'resume' as ErrorCode }
  return { file: { buffer, mimetype: file.type, extension, size: file.size }, error: null }
}

export function readApplication(formData: FormData) {
  const values = {
    name: text(formData, 'name'),
    email: text(formData, 'email').toLowerCase(),
    phone: text(formData, 'phone'),
    location: text(formData, 'location'),
    role: text(formData, 'role'),
    experience: text(formData, 'experience'),
    bio: text(formData, 'bio'),
    portfolioUrl: text(formData, 'portfolioUrl'),
    availability: formData.getAll('availability').map(String),
    availabilityNotes: text(formData, 'availabilityNotes'),
    consent: formData.get('consent') === 'on',
  }

  const errors: Record<string, ErrorCode> = {}
  if (values.name.length < 2) errors.name = 'name'
  else if (values.name.length > 100) errors.name = 'tooLong'
  if (!emailPattern.test(values.email) || values.email.length > 160) errors.email = 'email'
  if (values.phone && !phonePattern.test(values.phone)) errors.phone = 'phone'
  if (values.location.length < 2) errors.location = 'location'
  else if (values.location.length > 100) errors.location = 'tooLong'
  if (!oneOf(values.role, optionValues(freelancerRoleOptions))) errors.role = 'role'
  if (!oneOf(values.experience, optionValues(experienceOptions))) errors.experience = 'experience'
  if (values.bio.length < 30) errors.bio = 'bio'
  else if (values.bio.length > 2500) errors.bio = 'tooLong'
  if (values.portfolioUrl && (!/^https:\/\/\S+\.\S+/.test(values.portfolioUrl) || values.portfolioUrl.length > 300)) {
    errors.portfolioUrl = 'url'
  }
  if (values.availabilityNotes.length > 600) errors.availabilityNotes = 'tooLong'
  if (!values.consent) errors.consent = 'consent'

  const allowedAvailability = optionValues(availabilityOptions)
  return {
    values: { ...values, availability: values.availability.filter((item) => allowedAvailability.includes(item)) },
    errors,
  }
}
