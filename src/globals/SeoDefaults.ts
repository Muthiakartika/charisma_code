import type { GlobalConfig } from 'payload'

import { anyone, isContentOrMarketing } from '@/access/roles'
import { revalidateGlobal } from '@/hooks/revalidateSite'

/** Fallback SEO values and the business facts used in structured data (JSON-LD). */
export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  label: 'SEO Defaults',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isContentOrMarketing },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'The Charisma Code' },
    {
      name: 'titleSuffix',
      type: 'text',
      defaultValue: ' | The Charisma Code',
      admin: { description: 'Added after every page title, e.g. "Corporate Emcee Singapore | The Charisma Code"' },
    },
    { name: 'defaultDescription', type: 'textarea', localized: true, required: true, maxLength: 160 },
    { name: 'defaultImage', label: 'Default social sharing image', type: 'upload', relationTo: 'media' },
    {
      type: 'collapsible',
      label: 'Business facts for Google (structured data)',
      fields: [
        { name: 'organizationDescription', type: 'textarea', localized: true, maxLength: 300 },
        { name: 'founderName', type: 'text', defaultValue: 'Chia De Zhong' },
        { name: 'founderJobTitle', type: 'text', localized: true },
        {
          name: 'founderAlumniOf',
          label: 'Founder education (verified)',
          type: 'text',
          admin: { description: 'e.g. Singapore Management University' },
        },
      ],
    },
    {
      name: 'googleSiteVerification',
      label: 'Google Search Console verification code',
      type: 'text',
      admin: { description: 'Only the code from the HTML tag method, e.g. "abc123…".' },
    },
  ],
}
