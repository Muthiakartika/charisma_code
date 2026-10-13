import type { GlobalConfig } from 'payload'

import { anyone, isContentOrMarketing } from '@/access/roles'
import { revalidateGlobal } from '@/hooks/revalidateSite'

const urlField = (name: string, label: string, example: string) => ({
  name,
  label,
  type: 'text' as const,
  admin: { description: `Full link, e.g. ${example}` },
  validate: (value: unknown) => !value || /^https:\/\//.test(String(value)) || 'Must start with https://',
})

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Social Links',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isContentOrMarketing },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    urlField('instagram', 'Instagram', 'https://www.instagram.com/deprinceofzhong'),
    urlField('facebook', 'Facebook', 'https://www.facebook.com/deprinceofzhong'),
    urlField('linkedin', 'LinkedIn', 'https://www.linkedin.com/in/deprinceofzhong/'),
    urlField('youtube', 'YouTube', 'https://www.youtube.com/channel/…'),
    urlField('tiktok', 'TikTok', 'https://www.tiktok.com/@…'),
  ],
}
