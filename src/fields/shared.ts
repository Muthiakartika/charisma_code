/**
 * Small fields that are reused across many collections and blocks.
 */
import type { Field, SelectField, TextField, TextareaField } from 'payload'

/** Short label shown above a heading, styled like an emcee's cue card ("01 — The brief"). */
export const eyebrowField: TextField = {
  name: 'eyebrow',
  label: 'Small label above the heading',
  type: 'text',
  localized: true,
  maxLength: 48,
}

export const headingField = (required = true, maxLength = 110): TextField => ({
  name: 'heading',
  type: 'text',
  localized: true,
  required,
  maxLength,
  admin: {
    description: 'Wrap words in *asterisks* to highlight them, e.g. Experiences built around *your people*.',
  },
})

export const introField = (maxLength = 360): TextareaField => ({
  name: 'intro',
  label: 'Introduction',
  type: 'textarea',
  localized: true,
  maxLength,
})

/** Background colour choices are limited on purpose so the design stays consistent. */
export const toneField: SelectField = {
  name: 'tone',
  label: 'Background',
  type: 'select',
  defaultValue: 'light',
  options: [
    { label: 'Light (ivory)', value: 'light' },
    { label: 'Soft tint', value: 'tinted' },
    { label: 'Dark (stage)', value: 'dark' },
  ],
}

/** Every page-builder block gets "Hide this section" and an optional anchor. */
export const sectionSettingsFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Section settings',
    admin: { initCollapsed: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'hidden',
            label: 'Hide this section',
            type: 'checkbox',
            defaultValue: false,
            admin: { width: '50%', description: 'Hidden sections stay saved but are not shown on the website.' },
          },
          {
            name: 'anchorId',
            label: 'Anchor ID',
            type: 'text',
            admin: {
              width: '50%',
              description: 'Optional. Lets buttons jump to this section, e.g. "enquire" → /page#enquire',
            },
            validate: (value: unknown) =>
              !value || /^[a-z0-9-]+$/.test(String(value)) || 'Use lowercase letters, numbers and dashes only.',
          },
        ],
      },
    ],
  },
]

/** Internal flag so the client can see which texts still need their approval. */
export const reviewStatusField: SelectField = {
  name: 'reviewStatus',
  label: 'Content review',
  type: 'select',
  defaultValue: 'needs-client-review',
  options: [
    { label: 'Needs client review', value: 'needs-client-review' },
    { label: 'Approved by client', value: 'approved' },
  ],
  admin: {
    position: 'sidebar',
    description: 'Internal only — never shown on the website.',
  },
}

/**
 * Chinese pages are only published (and listed in the sitemap/hreflang) once a
 * native speaker has approved the translation.
 */
export const chineseTranslationField: SelectField = {
  name: 'chineseTranslation',
  label: 'Chinese translation (中文)',
  type: 'select',
  defaultValue: 'not-started',
  options: [
    { label: 'Not started', value: 'not-started' },
    { label: 'Draft — needs native-speaker review', value: 'needs-review' },
    { label: 'Approved — publish /zh/ version', value: 'approved' },
  ],
  admin: {
    position: 'sidebar',
    description: 'Until "Approved", visitors to the /zh/ address are sent to the English page.',
  },
}

/** Categories shared by portfolio projects, testimonials and filters. */
export const workCategoryOptions = [
  { label: 'Team Building', value: 'team-building' },
  { label: 'Corporate Events', value: 'corporate-events' },
  { label: 'Dinner & Dance', value: 'dinner-and-dance' },
  { label: 'Weddings', value: 'weddings' },
  { label: 'Kids & Youth', value: 'kids-youth' },
  { label: 'Campaigns', value: 'campaigns' },
]

/** Testimonials can also be about events outside the portfolio categories. */
export const testimonialCategoryOptions = [...workCategoryOptions, { label: 'Other events', value: 'general' }]
