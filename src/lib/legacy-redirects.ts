/**
 * Legacy WordPress URLs → new Next.js URLs (301 permanent redirects).
 *
 * Generated from the WordPress export during the migration audit
 * (see docs/03-peta-migrasi-url.md), then updated to the developer handoff's
 * redirect table (docs/handoff/redirects.md, 26 Oct 2026): SEO posts without live
 * copy now go to the service page for their topic, and the three event posts to
 * their case studies. On 11 Nov 2026 the blog plan (docs/12-go-live-11-nov.md) kept 7 posts and
 * retired the other 63: each old WordPress URL and its /insights copy now point to one page.
 * Keys are decoded paths without a trailing slash. The proxy (src/proxy.ts) checks this list first.
 *
 * To add a redirect later, prefer the "Redirects" collection in the CMS.
 */
export const legacyRedirects: Record<string, string> = {
  // Old WordPress pages, category archives and sitemaps
  '/services/emcee': '/emcee',
  '/services/events-planning': '/event-planning',
  '/services/workshops': '/corporate-workshops',
  '/portfolio-testimonials': '/our-work',
  '/blog': '/insights',
  '/category/blog': '/insights',
  '/category/uncategorized': '/insights',
  '/category/emcee': '/emcee',
  '/category/event': '/insights',
  '/category/workshops': '/insights',
  '/category/campaigns': '/creative-campaigns',
  '/category/invites': '/insights/category/founder-updates',
  '/feed': '/insights',
  '/sitemap_index.xml': '/sitemap.xml',
  '/post-sitemap.xml': '/sitemap.xml',
  '/page-sitemap.xml': '/sitemap.xml',
  '/category-sitemap.xml': '/sitemap.xml',
  '/post_tag-sitemap.xml': '/sitemap.xml',
  '/author-sitemap.xml': '/sitemap.xml',
  '/metform-form-sitemap.xml': '/sitemap.xml',
  '/wp-content/uploads/2026/09/Chia-De-Zhong-Emcee-Resume-2026.pdf': '/about',
  '/wp-content/uploads/2026/09/Chia-De-Zhong-Emcee-Resume-2026-1.pdf': '/about',
  '/metform-form/contact': '/contact',
  '/author/skylegal_bro1fa': '/insights',

  // Blog plan (11 Nov 2026), 1. Keep: the 7 posts that stay on /insights under the same slug
  '/meet-chia-de-zhong-my-updated-2026-portfolio-resume-16-years-of-hosting-performing-creating':
    '/insights/meet-chia-de-zhong-my-updated-2026-portfolio-resume-16-years-of-hosting-performing-creating',
  '/every-moment-on-stage-is-a-moment-well-lived-❤️':
    '/insights/every-moment-on-stage-is-a-moment-well-lived',
  '/trendjacking-in-content-strategy': '/insights/trendjacking-in-content-strategy',
  '/why-you-should-choose-an-emcee-who-does-more-than-just-weddings-💍':
    '/insights/why-you-should-choose-an-emcee-who-does-more-than-just-weddings',
  '/honoured-to-be-invited-to-the-28th-compass-awards-presentation-2025':
    '/insights/honoured-to-be-invited-to-the-28th-compass-awards-presentation-2025',
  '/mediacorp-channel-8-interview-segment': '/insights/mediacorp-channel-8-interview-segment',
  '/capturing-stories-teaching-videography-at-maris-stella-high-school':
    '/insights/capturing-stories-teaching-videography-at-maris-stella-high-school',

  // 2. The six wedding-script posts merge into one new guide, /insights/wedding-emcee-script-singapore.
  // Until it is published they point at /wedding-emcee: then change these 12 targets to the guide.
  '/how-to-write-a-wedding-emcee-script-average-wedding-emcee-cost': '/wedding-emcee',
  '/insights/how-to-write-a-wedding-emcee-script-average-wedding-emcee-cost': '/wedding-emcee',
  '/can-corporate-emcee-create-scripts-can-wedding-emcee-script-be-emotional': '/wedding-emcee',
  '/insights/can-corporate-emcee-create-scripts-can-wedding-emcee-script-be-emotional':
    '/wedding-emcee',
  '/the-ultimate-guide-to-event-planning-singapore-2026-emcee-script-for-wedding-reception':
    '/wedding-emcee',
  '/insights/the-ultimate-guide-to-event-planning-singapore-2026-emcee-script-for-wedding-reception':
    '/wedding-emcee',
  '/can-a-wedding-emcee-script-engage-guests': '/wedding-emcee',
  '/insights/can-a-wedding-emcee-script-engage-guests': '/wedding-emcee',
  '/is-wedding-emcee-script-important-for-toasts-wedding-emcee-cost-in-singapore': '/wedding-emcee',
  '/insights/is-wedding-emcee-script-important-for-toasts-wedding-emcee-cost-in-singapore':
    '/wedding-emcee',
  '/how-to-book-a-corporate-event-emcee-online-easily-how-to-write-your-own-wedding-emcee-script':
    '/wedding-emcee',
  '/insights/how-to-book-a-corporate-event-emcee-online-easily-how-to-write-your-own-wedding-emcee-script':
    '/wedding-emcee',

  // 3. Redirect: the old WordPress URL and its unpublished /insights copy (in case it was shared
  // from staging) both go to the closest service page or case study
  '/hello-world': '/our-work/soma-fragrances-brand-launch',
  '/insights/soma-fragrances-brand-launch-behind-the-scenes':
    '/our-work/soma-fragrances-brand-launch',
  '/how-i-maintain-high-energy-on-stage-hosting-the-banyan-groups-dd-at-mandai-rainforest-resort':
    '/our-work/the-banyan-group-dinner-and-dance',
  '/insights/how-i-maintain-high-energy-on-stage-hosting-the-banyan-groups-dd-at-mandai-rainforest-resort':
    '/our-work/the-banyan-group-dinner-and-dance',
  '/inside-a-corporate-christmas-party-at-intercontinental-singapore-emcee-live-music-engagement':
    '/our-work/lectrix-engineering-christmas-celebration',
  '/insights/inside-a-corporate-christmas-party-at-intercontinental-singapore-emcee-live-music-engagement':
    '/our-work/lectrix-engineering-christmas-celebration',
  '/wedding-emceeing-and-singing-at-sheraton-towers': '/our-work/wedding-at-sheraton-towers',
  '/insights/wedding-emceeing-and-singing-at-sheraton-towers':
    '/our-work/wedding-at-sheraton-towers',
  '/find-the-best-event-company-and-event-organizer-in-singapore': '/',
  '/insights/find-the-best-event-company-and-event-organizer-in-singapore': '/',
  '/the-charisma-code-singapores-premier-event-management-emcee-services': '/',
  '/insights/the-charisma-code-singapores-premier-event-management-emcee-services': '/',
  '/are-workshops-in-singapore-for-adults-pros-cons-of-corporate-workshops-in-sg':
    '/corporate-workshops',
  '/insights/are-workshops-in-singapore-for-adults-pros-cons-of-corporate-workshops-in-sg':
    '/corporate-workshops',
  '/can-a-corporate-emcee-in-singapore-host-product-launches': '/product-launch-events',
  '/insights/can-a-corporate-emcee-in-singapore-host-product-launches': '/product-launch-events',
  '/party-planner-singapore-and-celebrity-emcee-singapore': '/event-planning',
  '/insights/party-planner-singapore-and-celebrity-emcee-singapore': '/event-planning',
  '/best-wedding-emcee-in-singapore-2026': '/wedding-emcee',
  '/insights/best-wedding-emcee-in-singapore-2026': '/wedding-emcee',
  '/why-every-conference-needs-a-professional-emcee': '/conference-emcee',
  '/insights/why-every-conference-needs-a-professional-emcee': '/conference-emcee',
  '/is-emcee-beneficial-in-sg-emcee-singapore-rate': '/rates',
  '/insights/is-emcee-beneficial-in-sg-emcee-singapore-rate': '/rates',
  '/can-corporate-workshops-change-mindset-best-professional-emcee-in-singapore':
    '/corporate-workshops',
  '/insights/can-corporate-workshops-change-mindset-best-professional-emcee-in-singapore':
    '/corporate-workshops',
  '/can-a-party-planner-plan-birthdays-wedding-emcee-cost-include-music': '/event-planning',
  '/insights/can-a-party-planner-plan-birthdays-wedding-emcee-cost-include-music':
    '/event-planning',
  '/can-emcee-services-manage-hybrid-events-event-management-company-singapore':
    '/conference-emcee',
  '/insights/can-emcee-services-manage-hybrid-events-event-management-company-singapore':
    '/conference-emcee',
  '/can-children-benefit-from-workshops-event-company-singapore-2026': '/kids-youth-programs',
  '/insights/can-children-benefit-from-workshops-event-company-singapore-2026':
    '/kids-youth-programs',
  '/does-a-wedding-emcee-entertain-guests': '/wedding-emcee',
  '/insights/does-a-wedding-emcee-entertain-guests': '/wedding-emcee',
  '/do-event-organizers-provide-catering-can-emcees-manage-charity-events': '/event-planning',
  '/insights/do-event-organizers-provide-catering-can-emcees-manage-charity-events':
    '/event-planning',
  '/how-to-attract-clients-in-event-management-the-importance-of-workshops-in-singapore': '/',
  '/insights/how-to-attract-clients-in-event-management-the-importance-of-workshops-in-singapore':
    '/',
  '/how-does-technology-help-in-event-management-what-challenges-does-an-event-host-face': '/',
  '/insights/how-does-technology-help-in-event-management-what-challenges-does-an-event-host-face':
    '/',
  '/can-wedding-emcee-speak-confidently-in-public-emcee-singapore-rate-in-2026': '/wedding-emcee',
  '/insights/can-wedding-emcee-speak-confidently-in-public-emcee-singapore-rate-in-2026':
    '/wedding-emcee',
  '/does-a-corporate-emcee-add-value-future-of-event-companies-in-singapore': '/corporate-emcee',
  '/insights/does-a-corporate-emcee-add-value-future-of-event-companies-in-singapore':
    '/corporate-emcee',
  '/can-emcee-services-host-online-events-can-a-corporate-emcee-host-awards': '/corporate-emcee',
  '/insights/can-emcee-services-host-online-events-can-a-corporate-emcee-host-awards':
    '/corporate-emcee',
  '/do-event-host-services-support-parties-why-do-event-organizers-face-stress': '/emcee',
  '/insights/do-event-host-services-support-parties-why-do-event-organizers-face-stress': '/emcee',
  '/can-celebrity-party-planners-plan-galas-event-emcee-singapore-price': '/event-planning',
  '/insights/can-celebrity-party-planners-plan-galas-event-emcee-singapore-price':
    '/event-planning',
  '/best-event-and-event-management-companies-singapore': '/',
  '/insights/best-event-and-event-management-companies-singapore': '/',
  '/event-and-event-management-company-singapore-in-may-2026': '/',
  '/insights/event-and-event-management-company-singapore-in-may-2026': '/',
  '/can-a-corporate-event-emcee-host-seminars-do-wedding-emcees-use-microphones':
    '/conference-emcee',
  '/insights/can-a-corporate-event-emcee-host-seminars-do-wedding-emcees-use-microphones':
    '/conference-emcee',
  '/are-corporate-workshops-useful-for-companies-do-emcee-services-include-hosting-duties':
    '/corporate-workshops',
  '/insights/are-corporate-workshops-useful-for-companies-do-emcee-services-include-hosting-duties':
    '/corporate-workshops',
  '/how-to-become-a-professional-emcee-corporate-emcee-service-in-singapore-may-2026': '/emcee',
  '/insights/how-to-become-a-professional-emcee-corporate-emcee-service-in-singapore-may-2026':
    '/emcee',
  '/transform-your-celebration-with-custom-costume-themed-parties-in-singapore':
    '/school-family-emcee',
  '/insights/transform-your-celebration-with-custom-costume-themed-parties-in-singapore':
    '/school-family-emcee',
  '/can-an-event-organizer-plan-online-events-can-corporate-workshops-solve-workplace-issues': '/',
  '/insights/can-an-event-organizer-plan-online-events-can-corporate-workshops-solve-workplace-issues':
    '/',
  '/does-technology-support-event-management-can-event-host-manage-transitions': '/',
  '/insights/does-technology-support-event-management-can-event-host-manage-transitions': '/',
  '/what-mistakes-should-a-conference-emcee-avoid-average-emcee-singapore-rate':
    '/conference-emcee',
  '/insights/what-mistakes-should-a-conference-emcee-avoid-average-emcee-singapore-rate':
    '/conference-emcee',
  '/procuring-princesses-for-a-princess-birthday-party': '/our-work/princess-birthday-party',
  '/insights/procuring-princesses-for-a-princess-birthday-party':
    '/our-work/princess-birthday-party',
  '/the-event-management-process-step-by-step-event-host-in-singapore': '/',
  '/insights/the-event-management-process-step-by-step-event-host-in-singapore': '/',
  '/does-a-best-emcee-speak-multiple-languages-best-event-organizer-company-in-singapore': '/emcee',
  '/insights/does-a-best-emcee-speak-multiple-languages-best-event-organizer-company-in-singapore':
    '/emcee',
  '/is-emcee-singapore-rate-per-event-pros-and-cons-of-wedding-emcee-services-singapore': '/rates',
  '/insights/is-emcee-singapore-rate-per-event-pros-and-cons-of-wedding-emcee-services-singapore':
    '/rates',
  '/does-a-professional-party-planner-book-venues-best-wedding-emcee-in-singapore':
    '/event-planning',
  '/insights/does-a-professional-party-planner-book-venues-best-wedding-emcee-in-singapore':
    '/event-planning',
  '/is-conference-emcee-suitable-for-annual-meetings': '/conference-emcee',
  '/insights/is-conference-emcee-suitable-for-annual-meetings': '/conference-emcee',
  '/does-professional-party-planner-arrange-catering': '/event-planning',
  '/insights/does-professional-party-planner-arrange-catering': '/event-planning',
  '/why-use-event-organizer-services-today-best-workshop-services-in-singapore': '/event-planning',
  '/insights/why-use-event-organizer-services-today-best-workshop-services-in-singapore':
    '/event-planning',
  '/are-corporate-workshops-helpful-for-teams-event-company-in-singapore': '/corporate-workshops',
  '/insights/are-corporate-workshops-helpful-for-teams-event-company-in-singapore':
    '/corporate-workshops',
  '/popular-corporate-emcee-for-events-styles-wedding-emcee-services-singapore': '/corporate-emcee',
  '/insights/popular-corporate-emcee-for-events-styles-wedding-emcee-services-singapore':
    '/corporate-emcee',
  '/how-to-be-a-professional-emcee-in-singapore': '/emcee',
  '/insights/how-to-be-a-professional-emcee-in-singapore': '/emcee',
  '/is-event-management-a-growing-field': '/event-planning',
  '/insights/is-event-management-a-growing-field': '/event-planning',
  '/is-corporate-emcee-service-beneficial-for-exhibitions': '/roadshow-emcee',
  '/insights/is-corporate-emcee-service-beneficial-for-exhibitions': '/roadshow-emcee',
  '/is-sustainable-event-planning-important-in-2026-best-event-management-companies-singapore':
    '/event-planning',
  '/insights/is-sustainable-event-planning-important-in-2026-best-event-management-companies-singapore':
    '/event-planning',
  '/hire-a-wedding-emcee-in-singapore-for-your-big-day': '/wedding-emcee',
  '/insights/hire-a-wedding-emcee-in-singapore-for-your-big-day': '/wedding-emcee',
  '/can-event-organizer-plan-fundraisers': '/event-planning',
  '/insights/can-event-organizer-plan-fundraisers': '/event-planning',
  '/does-a-conference-emcee-handle-qa-sessions-event-host-services-in-singapore-2026':
    '/conference-emcee',
  '/insights/does-a-conference-emcee-handle-qa-sessions-event-host-services-in-singapore-2026':
    '/conference-emcee',
  '/are-event-organizer-services-affordable-today': '/rates',
  '/insights/are-event-organizer-services-affordable-today': '/rates',
  '/can-event-management-improve-social-media-visibility': '/creative-campaigns',
  '/insights/can-event-management-improve-social-media-visibility': '/creative-campaigns',
  '/do-workshop-services-support-career-development-goals-emcee-services-in-singapore':
    '/corporate-workshops',
  '/insights/do-workshop-services-support-career-development-goals-emcee-services-in-singapore':
    '/corporate-workshops',
  '/is-corporate-emcee-important-for-award-nights': '/corporate-emcee',
  '/insights/is-corporate-emcee-important-for-award-nights': '/corporate-emcee',
  '/can-event-host-service-use-ai-tools-in-2026': '/emcee',
  '/insights/can-event-host-service-use-ai-tools-in-2026': '/emcee',
  '/can-corporate-workshops-increase-employee-retention': '/corporate-workshops',
  '/insights/can-corporate-workshops-increase-employee-retention': '/corporate-workshops',

  // Other old posts that were never on /insights
  '/events-management-event-hosts-provider-in-singapore': '/',
  '/top-event-management-companies-best-event-emcees-in-singapore-2026': '/',
  '/best-event-company-event-organizers-in-singapore-2026': '/',
}

/** Old WordPress prefixes that should all land on one page. */
export const legacyPrefixRedirects: Array<{ prefix: string; to: string }> = [
  { prefix: '/tag/', to: '/insights' },
  { prefix: '/author/', to: '/insights' },
]

/** Old WordPress pages that are gone for good: answered with 410 so search engines drop them. */
export const legacyGone = new Set<string>(['/sample-page'])

/**
 * The blog posts retired by the blog plan (11 Nov 2026): every /insights/<slug> above that redirects.
 * They stay in the CMS as unpublished drafts (src/seed/handoff/go-live-2026-11-11.ts), and a fresh
 * import of the WordPress posts saves them as drafts too.
 */
export const retiredPostSlugs = new Set(
  Object.keys(legacyRedirects)
    .filter((from) => from.startsWith('/insights/') && !from.startsWith('/insights/category/'))
    .map((from) => from.slice('/insights/'.length)),
)
