/**
 * Payload CMS configuration — the "brain" of the admin panel at /admin.
 *
 *  - collections/  → lists of content (pages, services, enquiries, …)
 *  - globals/      → one-off settings (header, footer, contact details, …)
 *  - blocks/       → page-builder sections editors can add to a page
 */
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { anyone, isContentEditor } from './access/roles'
import { Categories } from './collections/Categories'
import { Clients } from './collections/Clients'
import { Enquiries } from './collections/Enquiries'
import { FAQs } from './collections/FAQs'
import { FounderUpdates } from './collections/FounderUpdates'
import { FreelancerApplications } from './collections/FreelancerApplications'
import { InstagramPosts } from './collections/InstagramPosts'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Programs } from './collections/Programs'
import { Projects } from './collections/Projects'
import { Resumes } from './collections/Resumes'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { ContactInformation } from './globals/ContactInformation'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Navigation } from './globals/Navigation'
import { SeoDefaults } from './globals/SeoDefaults'
import { SocialLinks } from './globals/SocialLinks'
import { revalidateHooks } from './hooks/revalidateSite'
import { absoluteUrl, pagePath, postPath, projectPath } from './lib/paths'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const useR2Storage = Boolean(process.env.R2_BUCKET)

/**
 * How the website sends email (form notifications, password resets):
 * 1. SendGrid, when SENDGRID_API_KEY is set (through SendGrid's SMTP relay, no extra package)
 * 2. Any other SMTP server, when SMTP_HOST is set
 * 3. Otherwise emails are only printed in the terminal (fine for local development)
 */
const emailTransport = process.env.SENDGRID_API_KEY
  ? {
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY },
    }
  : process.env.SMTP_HOST
    ? {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      }
    : null

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — The Charisma Code CMS' },
    importMap: { baseDir: path.resolve(dirname) },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  // English is the main language; Chinese content is added per field in the admin.
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: '中文 (简体)', code: 'zh' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  collections: [
    Pages,
    Services,
    Programs,
    Projects,
    Testimonials,
    Clients,
    FAQs,
    FounderUpdates,
    InstagramPosts,
    Media,
    Posts,
    Categories,
    Enquiries,
    FreelancerApplications,
    Resumes,
    Users,
  ],
  globals: [Header, Navigation, Footer, ContactInformation, SocialLinks, SeoDefaults],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),

  // Without SMTP settings (local development) emails are printed in the terminal.
  email: emailTransport
    ? nodemailerAdapter({
        // With SendGrid this address must be a verified sender (or on an authenticated domain).
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'hello@thecharismacode.co',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'The Charisma Code Website',
        transportOptions: emailTransport,
      })
    : undefined,

  // The website does not use GraphQL, so it is switched off (smaller attack surface).
  graphQL: { disable: true },

  upload: { limits: { fileSize: 15_000_000 } }, // 15 MB per file

  sharp,

  plugins: [
    redirectsPlugin({
      collections: ['pages', 'posts', 'projects'],
      redirectTypes: ['301', '302'],
      overrides: {
        admin: { group: 'Settings' },
        access: { read: anyone, create: isContentEditor, update: isContentEditor, delete: isContentEditor },
        hooks: revalidateHooks,
      },
    }),
    seoPlugin({
      collections: ['pages', 'posts', 'projects'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => doc?.title ?? '',
      generateDescription: ({ doc }) => doc?.excerpt ?? doc?.summary ?? '',
      generateURL: ({ doc, collectionConfig }) => {
        const slug = doc?.slug as string | undefined
        if (collectionConfig?.slug === 'posts') return absoluteUrl(postPath(slug))
        if (collectionConfig?.slug === 'projects') return absoluteUrl(projectPath(slug))
        return absoluteUrl(pagePath(slug))
      },
    }),
    s3Storage({
      enabled: useR2Storage,
      alwaysInsertFields: true,
      // Admin uploads go straight to R2 (avoids the 4.5 MB request limit on Vercel).
      clientUploads: true,
      bucket: process.env.R2_BUCKET || '',
      collections: {
        media: { prefix: 'media' },
        resumes: { prefix: 'resumes' }, // private: downloaded only through Payload's access control
      },
      config: {
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        region: 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],

  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
