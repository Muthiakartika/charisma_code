/**
 * Legacy WordPress URLs → new Next.js URLs (301 permanent redirects).
 *
 * Generated from the WordPress export during the migration audit
 * (see docs/03-peta-migrasi-url.md), then updated to the developer handoff's
 * redirect table (docs/handoff/redirects.md, 26 Oct 2026): SEO posts without live
 * copy now go to the service page for their topic, and the three event posts to
 * their case studies. Keys are decoded paths without a trailing slash. The proxy
 * (src/proxy.ts) checks this list first.
 *
 * To add a redirect later, prefer the "Redirects" collection in the CMS.
 */
export const legacyRedirects: Record<string, string> = {
  '/services/emcee': '/emcee',
  '/services/events-planning': '/event-planning',
  '/services/workshops': '/corporate-workshops',
  '/portfolio-testimonials': '/our-work',
  '/blog': '/insights',
  '/category/blog': '/insights',
  '/category/uncategorized': '/insights',
  '/category/emcee': '/emcee',
  '/category/event': '/insights/category/corporate-events',
  '/category/workshops': '/insights/category/workshops',
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
  '/meet-chia-de-zhong-my-updated-2026-portfolio-resume-16-years-of-hosting-performing-creating':
    '/insights/meet-chia-de-zhong-my-updated-2026-portfolio-resume-16-years-of-hosting-performing-creating',
  '/every-moment-on-stage-is-a-moment-well-lived-❤️':
    '/insights/every-moment-on-stage-is-a-moment-well-lived',
  '/can-corporate-workshops-increase-employee-retention':
    '/insights/can-corporate-workshops-increase-employee-retention',
  '/can-event-host-service-use-ai-tools-in-2026':
    '/insights/can-event-host-service-use-ai-tools-in-2026',
  '/is-corporate-emcee-important-for-award-nights':
    '/insights/is-corporate-emcee-important-for-award-nights',
  '/do-workshop-services-support-career-development-goals-emcee-services-in-singapore':
    '/insights/do-workshop-services-support-career-development-goals-emcee-services-in-singapore',
  '/can-event-management-improve-social-media-visibility':
    '/insights/can-event-management-improve-social-media-visibility',
  '/are-event-organizer-services-affordable-today':
    '/insights/are-event-organizer-services-affordable-today',
  '/how-to-book-a-corporate-event-emcee-online-easily-how-to-write-your-own-wedding-emcee-script':
    '/insights/how-to-book-a-corporate-event-emcee-online-easily-how-to-write-your-own-wedding-emcee-script',
  '/does-a-conference-emcee-handle-qa-sessions-event-host-services-in-singapore-2026':
    '/insights/does-a-conference-emcee-handle-qa-sessions-event-host-services-in-singapore-2026',
  '/can-event-organizer-plan-fundraisers': '/insights/can-event-organizer-plan-fundraisers',
  '/hire-a-wedding-emcee-in-singapore-for-your-big-day':
    '/insights/hire-a-wedding-emcee-in-singapore-for-your-big-day',
  '/is-sustainable-event-planning-important-in-2026-best-event-management-companies-singapore':
    '/insights/is-sustainable-event-planning-important-in-2026-best-event-management-companies-singapore',
  '/is-corporate-emcee-service-beneficial-for-exhibitions':
    '/insights/is-corporate-emcee-service-beneficial-for-exhibitions',
  '/is-event-management-a-growing-field': '/insights/is-event-management-a-growing-field',
  '/how-to-be-a-professional-emcee-in-singapore':
    '/insights/how-to-be-a-professional-emcee-in-singapore',
  '/popular-corporate-emcee-for-events-styles-wedding-emcee-services-singapore':
    '/insights/popular-corporate-emcee-for-events-styles-wedding-emcee-services-singapore',
  '/are-corporate-workshops-helpful-for-teams-event-company-in-singapore':
    '/insights/are-corporate-workshops-helpful-for-teams-event-company-in-singapore',
  '/why-use-event-organizer-services-today-best-workshop-services-in-singapore':
    '/insights/why-use-event-organizer-services-today-best-workshop-services-in-singapore',
  '/does-professional-party-planner-arrange-catering':
    '/insights/does-professional-party-planner-arrange-catering',
  '/is-wedding-emcee-script-important-for-toasts-wedding-emcee-cost-in-singapore':
    '/insights/is-wedding-emcee-script-important-for-toasts-wedding-emcee-cost-in-singapore',
  '/is-conference-emcee-suitable-for-annual-meetings':
    '/insights/is-conference-emcee-suitable-for-annual-meetings',
  '/can-a-wedding-emcee-script-engage-guests': '/insights/can-a-wedding-emcee-script-engage-guests',
  '/does-a-professional-party-planner-book-venues-best-wedding-emcee-in-singapore':
    '/insights/does-a-professional-party-planner-book-venues-best-wedding-emcee-in-singapore',
  '/is-emcee-singapore-rate-per-event-pros-and-cons-of-wedding-emcee-services-singapore': '/emcee',
  '/does-a-best-emcee-speak-multiple-languages-best-event-organizer-company-in-singapore': '/emcee',
  '/how-to-become-a-professional-emcee-corporate-emcee-service-in-singapore-may-2026': '/emcee',
  '/are-corporate-workshops-useful-for-companies-do-emcee-services-include-hosting-duties':
    '/corporate-workshops',
  '/can-a-corporate-event-emcee-host-seminars-do-wedding-emcees-use-microphones':
    '/corporate-emcee',
  '/event-and-event-management-company-singapore-in-may-2026': '/',
  '/best-event-and-event-management-companies-singapore': '/',
  '/the-ultimate-guide-to-event-planning-singapore-2026-emcee-script-for-wedding-reception':
    '/event-planning',
  '/can-celebrity-party-planners-plan-galas-event-emcee-singapore-price': '/event-planning',
  '/do-event-host-services-support-parties-why-do-event-organizers-face-stress': '/emcee',
  '/can-emcee-services-host-online-events-can-a-corporate-emcee-host-awards': '/emcee',
  '/does-a-corporate-emcee-add-value-future-of-event-companies-in-singapore': '/corporate-emcee',
  '/can-wedding-emcee-speak-confidently-in-public-emcee-singapore-rate-in-2026': '/wedding-emcee',
  '/can-an-event-organizer-plan-online-events-can-corporate-workshops-solve-workplace-issues': '/',
  '/how-does-technology-help-in-event-management-what-challenges-does-an-event-host-face': '/',
  '/how-to-attract-clients-in-event-management-the-importance-of-workshops-in-singapore': '/',
  '/do-event-organizers-provide-catering-can-emcees-manage-charity-events': '/event-planning',
  '/does-a-wedding-emcee-entertain-guests': '/wedding-emcee',
  '/does-technology-support-event-management-can-event-host-manage-transitions': '/',
  '/can-children-benefit-from-workshops-event-company-singapore-2026': '/kids-youth-programs',
  '/can-emcee-services-manage-hybrid-events-event-management-company-singapore': '/emcee',
  '/what-mistakes-should-a-conference-emcee-avoid-average-emcee-singapore-rate':
    '/conference-emcee',
  '/can-a-party-planner-plan-birthdays-wedding-emcee-cost-include-music': '/event-planning',
  '/can-corporate-emcee-create-scripts-can-wedding-emcee-script-be-emotional': '/corporate-emcee',
  '/can-corporate-workshops-change-mindset-best-professional-emcee-in-singapore':
    '/corporate-workshops',
  '/are-workshops-in-singapore-for-adults-pros-cons-of-corporate-workshops-in-sg':
    '/corporate-workshops',
  '/how-to-write-a-wedding-emcee-script-average-wedding-emcee-cost': '/wedding-emcee',
  '/is-emcee-beneficial-in-sg-emcee-singapore-rate': '/emcee',
  '/can-a-corporate-emcee-in-singapore-host-product-launches': '/corporate-emcee',
  '/why-every-conference-needs-a-professional-emcee': '/conference-emcee',
  '/best-wedding-emcee-in-singapore-2026': '/wedding-emcee',
  '/party-planner-singapore-and-celebrity-emcee-singapore': '/event-planning',
  '/the-event-management-process-step-by-step-event-host-in-singapore': '/',
  '/the-charisma-code-singapores-premier-event-management-emcee-services': '/',
  '/find-the-best-event-company-and-event-organizer-in-singapore': '/',
  '/wedding-emceeing-and-singing-at-sheraton-towers': '/our-work/wedding-at-sheraton-towers',
  '/inside-a-corporate-christmas-party-at-intercontinental-singapore-emcee-live-music-engagement':
    '/our-work/lectrix-engineering-christmas-celebration',
  '/transform-your-celebration-with-custom-costume-themed-parties-in-singapore': '/event-planning',
  '/how-i-maintain-high-energy-on-stage-hosting-the-banyan-groups-dd-at-mandai-rainforest-resort':
    '/our-work/the-banyan-group-dinner-and-dance',
  '/trendjacking-in-content-strategy': '/insights/trendjacking-in-content-strategy',
  '/why-you-should-choose-an-emcee-who-does-more-than-just-weddings-💍':
    '/insights/why-you-should-choose-an-emcee-who-does-more-than-just-weddings',
  '/honoured-to-be-invited-to-the-28th-compass-awards-presentation-2025':
    '/insights/honoured-to-be-invited-to-the-28th-compass-awards-presentation-2025',
  '/mediacorp-channel-8-interview-segment': '/insights/mediacorp-channel-8-interview-segment',
  '/procuring-princesses-for-a-princess-birthday-party': '/kids-youth-programs',
  '/capturing-stories-teaching-videography-at-maris-stella-high-school':
    '/insights/capturing-stories-teaching-videography-at-maris-stella-high-school',
  '/hello-world': '/about',
  '/events-management-event-hosts-provider-in-singapore': '/',
  '/top-event-management-companies-best-event-emcees-in-singapore-2026': '/',
  '/best-event-company-event-organizers-in-singapore-2026': '/',
  '/wp-content/uploads/2026/09/Chia-De-Zhong-Emcee-Resume-2026.pdf': '/about',
  '/wp-content/uploads/2026/09/Chia-De-Zhong-Emcee-Resume-2026-1.pdf': '/about',
  '/metform-form/contact': '/contact',
  '/author/skylegal_bro1fa': '/insights',
}

/** Old WordPress prefixes that should all land on one page. */
export const legacyPrefixRedirects: Array<{ prefix: string; to: string }> = [
  { prefix: '/tag/', to: '/insights' },
  { prefix: '/author/', to: '/insights' },
]

/** Old WordPress pages that are gone for good: answered with 410 so search engines drop them. */
export const legacyGone = new Set<string>(['/sample-page'])
