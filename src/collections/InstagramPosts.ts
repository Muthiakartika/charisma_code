import type { CollectionConfig } from 'payload'

import { anyone, isContentOrMarketing } from '@/access/roles'
import { revalidateHooks } from '@/hooks/revalidateSite'

/**
 * Recent Instagram posts shown in the homepage "Founder's Updates" strip.
 *
 * Today the posts are added by hand (or by the seed). When the Instagram API is
 * connected, a sync job fills this same collection automatically (it uses
 * `instagramId` to avoid duplicates). Images are stored here, not linked from
 * Instagram, because Instagram image links expire after a few days.
 * Any post can be hidden from the website without deleting it.
 */
export const InstagramPosts: CollectionConfig<'instagram-posts'> = {
  slug: 'instagram-posts',
  labels: { singular: 'Instagram Post', plural: 'Instagram Posts' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'postedAt', 'showOnWebsite', 'source'],
    description:
      'The newest posts appear in the "Founder\'s Updates" strip on the homepage. Untick "Show on website" to hide a post (for example a personal one) without deleting it.',
  },
  defaultSort: '-postedAt',
  access: {
    read: anyone,
    create: isContentOrMarketing,
    update: isContentOrMarketing,
    delete: isContentOrMarketing,
  },
  hooks: {
    ...revalidateHooks,
    beforeChange: [
      // A readable title for the admin list, made from the caption or the date.
      ({ data }) => {
        const date = data.postedAt
          ? new Intl.DateTimeFormat('en-SG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Singapore' }).format(new Date(data.postedAt))
          : ''
        const caption = typeof data.caption === 'string' ? data.caption.trim().split('\n')[0].slice(0, 60) : ''
        data.title = caption ? `${caption} (${date})` : `Instagram post, ${date}`
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', admin: { hidden: true } },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'The post image or the reel cover. Write a short alt text that describes it.' },
    },
    {
      name: 'permalink',
      label: 'Instagram link',
      type: 'text',
      required: true,
      validate: (value: unknown) =>
        /^https:\/\/(www\.)?instagram\.com\//.test(String(value ?? '')) ||
        'Paste a link that starts with https://www.instagram.com/',
    },
    {
      type: 'row',
      fields: [
        { name: 'postedAt', label: 'Posted on', type: 'date', required: true, admin: { width: '50%' } },
        {
          name: 'mediaType',
          label: 'Type',
          type: 'select',
          defaultValue: 'video',
          options: [
            { label: 'Reel / video', value: 'video' },
            { label: 'Photo', value: 'image' },
            { label: 'Carousel', value: 'carousel' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'caption',
      type: 'textarea',
      maxLength: 600,
      admin: { description: 'Optional. Only the first line is shown, when someone hovers over the post.' },
    },
    {
      name: 'showOnWebsite',
      label: 'Show on website',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Added by hand', value: 'manual' },
        { label: 'Instagram API', value: 'api' },
      ],
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'instagramId',
      label: 'Instagram media ID',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Filled in automatically when the Instagram API is connected.',
      },
    },
  ],
}
