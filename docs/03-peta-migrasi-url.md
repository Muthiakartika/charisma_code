# 03 — Peta Migrasi URL (WordPress → Next.js)

Prinsip:
- URL lama yang masih relevan **dipertahankan** (`/about`, `/contact`, `/legal`, `/services`).
- Semua URL lain diarahkan dengan **301 (permanent)** langsung ke tujuan akhir — tanpa rantai redirect.
- Website baru memakai URL tanpa garis miring di akhir (`/about`, bukan `/about/`). URL lama berakhiran `/` otomatis di-301 ke versi tanpa `/` dalam satu langkah.
- Daftar ini juga tersimpan sebagai kode di `src/lib/legacy-redirects.ts` dan diuji otomatis.
- Redirect baru di masa depan dapat dibuat admin melalui koleksi **Redirects** di CMS.

## A. Halaman, kategori & sitemap lama

| URL lama | URL baru | Catatan |
|---|---|---|
| `/about/` | `/about` | Kept |
| `/services/` | `/services` | Kept (hub page) |
| `/services/emcee/` | `/corporate-emcee` | Moved — SEO target was emcee services |
| `/services/events-planning/` | `/event-support` | Moved — event planning & vendor coordination |
| `/services/workshops/` | `/corporate-workshops` | Moved — title targeted corporate workshops |
| `/portfolio-testimonials/` | `/our-work` | Moved |
| `/blog/` | `/insights` | Moved |
| `/contact/` | `/contact` | Kept |
| `/legal/` | `/legal` | Kept |
| `/sample-page/` | `/` | Default WordPress page — removed |
| `/category/blog/` | `/insights` | Category archive |
| `/category/uncategorized/` | `/insights` | Category archive |
| `/category/emcee/` | `/insights/category/corporate-events` | Category archive |
| `/category/event/` | `/insights/category/corporate-events` | Category archive |
| `/category/workshops/` | `/insights/category/workshops` | Category archive |
| `/category/campaigns/` | `/insights/category/founder-updates` | Category archive |
| `/category/invites/` | `/insights/category/founder-updates` | Category archive |
| `/feed/` | `/insights` | RSS feed |
| `/sitemap_index.xml/` | `/sitemap.xml` | Old Yoast sitemap |
| `/post-sitemap.xml/` | `/sitemap.xml` | Old Yoast sitemap |
| `/page-sitemap.xml/` | `/sitemap.xml` | Old Yoast sitemap |
| `/category-sitemap.xml/` | `/sitemap.xml` | Old Yoast sitemap |
| `/post_tag-sitemap.xml/` | `/sitemap.xml` | Old Yoast sitemap |
| `/author-sitemap.xml/` | `/sitemap.xml` | Old Yoast sitemap |
| `/metform-form-sitemap.xml/` | `/sitemap.xml` | Old Yoast sitemap |
| `/tag/*` | `/insights` | ±100 arsip tag tipis — tidak dimigrasi |
| `/author/*` | `/about` | Arsip penulis |

## B. Artikel blog (70) — semua pindah ke `/insights/{slug}`

Kolom **Jenis**: ⭐ = cerita asli founder/proyek (prioritas, dipakai juga di portfolio), SEO = artikel generik (tinjau dengan data Search Console sebelum digabung/ditulis ulang).

| Tanggal | Jenis | URL lama | URL baru |
|---|---|---|---|
| 2026-09-26 | ⭐ | `/meet-chia-de-zhong-my-updated-2026-portfolio-resume-16-years-of-hosting-performing-creating/` | `/insights/meet-chia-de-zhong-my-updated-2026-portfolio-resume-16-years-of-hosting-performing-creating` |
| 2026-09-24 | ⭐ | `/every-moment-on-stage-is-a-moment-well-lived-❤️/` | `/insights/every-moment-on-stage-is-a-moment-well-lived` |
| 2026-07-29 | SEO | `/can-corporate-workshops-increase-employee-retention/` | `/insights/can-corporate-workshops-increase-employee-retention` |
| 2026-07-27 | SEO | `/can-event-host-service-use-ai-tools-in-2026/` | `/insights/can-event-host-service-use-ai-tools-in-2026` |
| 2026-07-24 | SEO | `/is-corporate-emcee-important-for-award-nights/` | `/insights/is-corporate-emcee-important-for-award-nights` |
| 2026-07-22 | SEO | `/do-workshop-services-support-career-development-goals-emcee-services-in-singapore/` | `/insights/do-workshop-services-support-career-development-goals-emcee-services-in-singapore` |
| 2026-07-21 | SEO | `/can-event-management-improve-social-media-visibility/` | `/insights/can-event-management-improve-social-media-visibility` |
| 2026-07-17 | SEO | `/are-event-organizer-services-affordable-today/` | `/insights/are-event-organizer-services-affordable-today` |
| 2026-07-14 | SEO | `/how-to-book-a-corporate-event-emcee-online-easily-how-to-write-your-own-wedding-emcee-script/` | `/insights/how-to-book-a-corporate-event-emcee-online-easily-how-to-write-your-own-wedding-emcee-script` |
| 2026-07-13 | SEO | `/does-a-conference-emcee-handle-qa-sessions-event-host-services-in-singapore-2026/` | `/insights/does-a-conference-emcee-handle-qa-sessions-event-host-services-in-singapore-2026` |
| 2026-07-10 | SEO | `/can-event-organizer-plan-fundraisers/` | `/insights/can-event-organizer-plan-fundraisers` |
| 2026-07-07 | SEO | `/hire-a-wedding-emcee-in-singapore-for-your-big-day/` | `/insights/hire-a-wedding-emcee-in-singapore-for-your-big-day` |
| 2026-07-06 | SEO | `/is-sustainable-event-planning-important-in-2026-best-event-management-companies-singapore/` | `/insights/is-sustainable-event-planning-important-in-2026-best-event-management-companies-singapore` |
| 2026-07-03 | SEO | `/is-corporate-emcee-service-beneficial-for-exhibitions/` | `/insights/is-corporate-emcee-service-beneficial-for-exhibitions` |
| 2026-07-01 | SEO | `/is-event-management-a-growing-field/` | `/insights/is-event-management-a-growing-field` |
| 2026-06-26 | SEO | `/how-to-be-a-professional-emcee-in-singapore/` | `/insights/how-to-be-a-professional-emcee-in-singapore` |
| 2026-06-24 | SEO | `/popular-corporate-emcee-for-events-styles-wedding-emcee-services-singapore/` | `/insights/popular-corporate-emcee-for-events-styles-wedding-emcee-services-singapore` |
| 2026-06-22 | SEO | `/are-corporate-workshops-helpful-for-teams-event-company-in-singapore/` | `/insights/are-corporate-workshops-helpful-for-teams-event-company-in-singapore` |
| 2026-06-19 | SEO | `/why-use-event-organizer-services-today-best-workshop-services-in-singapore/` | `/insights/why-use-event-organizer-services-today-best-workshop-services-in-singapore` |
| 2026-06-17 | SEO | `/does-professional-party-planner-arrange-catering/` | `/insights/does-professional-party-planner-arrange-catering` |
| 2026-06-10 | SEO | `/is-wedding-emcee-script-important-for-toasts-wedding-emcee-cost-in-singapore/` | `/insights/is-wedding-emcee-script-important-for-toasts-wedding-emcee-cost-in-singapore` |
| 2026-06-09 | SEO | `/is-conference-emcee-suitable-for-annual-meetings/` | `/insights/is-conference-emcee-suitable-for-annual-meetings` |
| 2026-06-04 | SEO | `/can-a-wedding-emcee-script-engage-guests/` | `/insights/can-a-wedding-emcee-script-engage-guests` |
| 2026-06-03 | SEO | `/does-a-professional-party-planner-book-venues-best-wedding-emcee-in-singapore/` | `/insights/does-a-professional-party-planner-book-venues-best-wedding-emcee-in-singapore` |
| 2026-06-02 | SEO | `/is-emcee-singapore-rate-per-event-pros-and-cons-of-wedding-emcee-services-singapore/` | `/insights/is-emcee-singapore-rate-per-event-pros-and-cons-of-wedding-emcee-services-singapore` |
| 2026-06-01 | SEO | `/does-a-best-emcee-speak-multiple-languages-best-event-organizer-company-in-singapore/` | `/insights/does-a-best-emcee-speak-multiple-languages-best-event-organizer-company-in-singapore` |
| 2026-05-27 | SEO | `/how-to-become-a-professional-emcee-corporate-emcee-service-in-singapore-may-2026/` | `/insights/how-to-become-a-professional-emcee-corporate-emcee-service-in-singapore-may-2026` |
| 2026-05-25 | SEO | `/are-corporate-workshops-useful-for-companies-do-emcee-services-include-hosting-duties/` | `/insights/are-corporate-workshops-useful-for-companies-do-emcee-services-include-hosting-duties` |
| 2026-05-20 | SEO | `/can-a-corporate-event-emcee-host-seminars-do-wedding-emcees-use-microphones/` | `/insights/can-a-corporate-event-emcee-host-seminars-do-wedding-emcees-use-microphones` |
| 2026-05-19 | SEO | `/event-and-event-management-company-singapore-in-may-2026/` | `/insights/event-and-event-management-company-singapore-in-may-2026` |
| 2026-05-13 | SEO | `/best-event-and-event-management-companies-singapore/` | `/insights/best-event-and-event-management-companies-singapore` |
| 2026-05-12 | SEO | `/the-ultimate-guide-to-event-planning-singapore-2026-emcee-script-for-wedding-reception/` | `/insights/the-ultimate-guide-to-event-planning-singapore-2026-emcee-script-for-wedding-reception` |
| 2026-05-11 | SEO | `/can-celebrity-party-planners-plan-galas-event-emcee-singapore-price/` | `/insights/can-celebrity-party-planners-plan-galas-event-emcee-singapore-price` |
| 2026-05-07 | SEO | `/do-event-host-services-support-parties-why-do-event-organizers-face-stress/` | `/insights/do-event-host-services-support-parties-why-do-event-organizers-face-stress` |
| 2026-05-05 | SEO | `/can-emcee-services-host-online-events-can-a-corporate-emcee-host-awards/` | `/insights/can-emcee-services-host-online-events-can-a-corporate-emcee-host-awards` |
| 2026-05-04 | SEO | `/does-a-corporate-emcee-add-value-future-of-event-companies-in-singapore/` | `/insights/does-a-corporate-emcee-add-value-future-of-event-companies-in-singapore` |
| 2026-04-28 | SEO | `/can-wedding-emcee-speak-confidently-in-public-emcee-singapore-rate-in-2026/` | `/insights/can-wedding-emcee-speak-confidently-in-public-emcee-singapore-rate-in-2026` |
| 2026-04-24 | SEO | `/can-an-event-organizer-plan-online-events-can-corporate-workshops-solve-workplace-issues/` | `/insights/can-an-event-organizer-plan-online-events-can-corporate-workshops-solve-workplace-issues` |
| 2026-04-22 | SEO | `/how-does-technology-help-in-event-management-what-challenges-does-an-event-host-face/` | `/insights/how-does-technology-help-in-event-management-what-challenges-does-an-event-host-face` |
| 2026-04-21 | SEO | `/how-to-attract-clients-in-event-management-the-importance-of-workshops-in-singapore/` | `/insights/how-to-attract-clients-in-event-management-the-importance-of-workshops-in-singapore` |
| 2026-04-13 | SEO | `/do-event-organizers-provide-catering-can-emcees-manage-charity-events/` | `/insights/do-event-organizers-provide-catering-can-emcees-manage-charity-events` |
| 2026-04-10 | SEO | `/does-a-wedding-emcee-entertain-guests/` | `/insights/does-a-wedding-emcee-entertain-guests` |
| 2026-04-08 | SEO | `/does-technology-support-event-management-can-event-host-manage-transitions/` | `/insights/does-technology-support-event-management-can-event-host-manage-transitions` |
| 2026-04-06 | SEO | `/can-children-benefit-from-workshops-event-company-singapore-2026/` | `/insights/can-children-benefit-from-workshops-event-company-singapore-2026` |
| 2026-04-03 | SEO | `/can-emcee-services-manage-hybrid-events-event-management-company-singapore/` | `/insights/can-emcee-services-manage-hybrid-events-event-management-company-singapore` |
| 2026-04-01 | SEO | `/what-mistakes-should-a-conference-emcee-avoid-average-emcee-singapore-rate/` | `/insights/what-mistakes-should-a-conference-emcee-avoid-average-emcee-singapore-rate` |
| 2026-03-25 | SEO | `/can-a-party-planner-plan-birthdays-wedding-emcee-cost-include-music/` | `/insights/can-a-party-planner-plan-birthdays-wedding-emcee-cost-include-music` |
| 2026-03-20 | SEO | `/can-corporate-emcee-create-scripts-can-wedding-emcee-script-be-emotional/` | `/insights/can-corporate-emcee-create-scripts-can-wedding-emcee-script-be-emotional` |
| 2026-03-12 | SEO | `/can-corporate-workshops-change-mindset-best-professional-emcee-in-singapore/` | `/insights/can-corporate-workshops-change-mindset-best-professional-emcee-in-singapore` |
| 2026-03-06 | SEO | `/are-workshops-in-singapore-for-adults-pros-cons-of-corporate-workshops-in-sg/` | `/insights/are-workshops-in-singapore-for-adults-pros-cons-of-corporate-workshops-in-sg` |
| 2026-03-02 | SEO | `/how-to-write-a-wedding-emcee-script-average-wedding-emcee-cost/` | `/insights/how-to-write-a-wedding-emcee-script-average-wedding-emcee-cost` |
| 2026-02-25 | SEO | `/is-emcee-beneficial-in-sg-emcee-singapore-rate/` | `/insights/is-emcee-beneficial-in-sg-emcee-singapore-rate` |
| 2026-02-23 | SEO | `/can-a-corporate-emcee-in-singapore-host-product-launches/` | `/insights/can-a-corporate-emcee-in-singapore-host-product-launches` |
| 2026-02-20 | SEO | `/why-every-conference-needs-a-professional-emcee/` | `/insights/why-every-conference-needs-a-professional-emcee` |
| 2026-02-17 | SEO | `/best-wedding-emcee-in-singapore-2026/` | `/insights/best-wedding-emcee-in-singapore-2026` |
| 2026-02-13 | SEO | `/party-planner-singapore-and-celebrity-emcee-singapore/` | `/insights/party-planner-singapore-and-celebrity-emcee-singapore` |
| 2026-02-11 | SEO | `/the-event-management-process-step-by-step-event-host-in-singapore/` | `/insights/the-event-management-process-step-by-step-event-host-in-singapore` |
| 2026-02-09 | SEO | `/the-charisma-code-singapores-premier-event-management-emcee-services/` | `/insights/the-charisma-code-singapores-premier-event-management-emcee-services` |
| 2026-02-06 | SEO | `/find-the-best-event-company-and-event-organizer-in-singapore/` | `/insights/find-the-best-event-company-and-event-organizer-in-singapore` |
| 2026-02-01 | ⭐ | `/wedding-emceeing-and-singing-at-sheraton-towers/` | `/insights/wedding-emceeing-and-singing-at-sheraton-towers` |
| 2025-12-21 | ⭐ | `/inside-a-corporate-christmas-party-at-intercontinental-singapore-emcee-live-music-engagement/` | `/insights/inside-a-corporate-christmas-party-at-intercontinental-singapore-emcee-live-music-engagement` |
| 2025-12-10 | SEO | `/transform-your-celebration-with-custom-costume-themed-parties-in-singapore/` | `/insights/transform-your-celebration-with-custom-costume-themed-parties-in-singapore` |
| 2025-11-25 | ⭐ | `/how-i-maintain-high-energy-on-stage-hosting-the-banyan-groups-dd-at-mandai-rainforest-resort/` | `/insights/how-i-maintain-high-energy-on-stage-hosting-the-banyan-groups-dd-at-mandai-rainforest-resort` |
| 2025-11-23 | ⭐ | `/trendjacking-in-content-strategy/` | `/insights/trendjacking-in-content-strategy` |
| 2025-10-18 | ⭐ | `/why-you-should-choose-an-emcee-who-does-more-than-just-weddings-💍/` | `/insights/why-you-should-choose-an-emcee-who-does-more-than-just-weddings` |
| 2025-09-29 | ⭐ | `/honoured-to-be-invited-to-the-28th-compass-awards-presentation-2025/` | `/insights/honoured-to-be-invited-to-the-28th-compass-awards-presentation-2025` |
| 2025-09-19 | ⭐ | `/mediacorp-channel-8-interview-segment/` | `/insights/mediacorp-channel-8-interview-segment` |
| 2025-09-19 | ⭐ | `/procuring-princesses-for-a-princess-birthday-party/` | `/insights/procuring-princesses-for-a-princess-birthday-party` |
| 2025-09-02 | ⭐ | `/capturing-stories-teaching-videography-at-maris-stella-high-school/` | `/insights/capturing-stories-teaching-videography-at-maris-stella-high-school` |
| 2025-07-22 | ⭐ | `/hello-world/` | `/insights/soma-fragrances-brand-launch-behind-the-scenes` |

## C. Slug lama & file

| URL lama | URL baru | Catatan |
|---|---|---|
| `/events-management-event-hosts-provider-in-singapore` | `/insights/the-event-management-process-step-by-step-event-host-in-singapore` | Old slug (WP already 301s) |
| `/top-event-management-companies-best-event-emcees-in-singapore-2026` | `/insights/the-charisma-code-singapores-premier-event-management-emcee-services` | Old slug (WP already 301s) |
| `/best-event-company-event-organizers-in-singapore-2026` | `/insights/find-the-best-event-company-and-event-organizer-in-singapore` | Old slug (WP already 301s) |
| `/wp-content/uploads/2026/09/Chia-De-Zhong-Emcee-Resume-2026.pdf` | `/about` | Resume PDF — point to About until the PDF is re-uploaded |
| `/wp-content/uploads/2026/09/Chia-De-Zhong-Emcee-Resume-2026-1.pdf` | `/about` | Resume PDF duplicate |

## D. Yang perlu dilakukan saat peluncuran (checklist)

1. Ekspor data Google Search Console (12 bulan) → tandai URL yang punya klik/backlink.
2. Impor artikel ke koleksi Blog Posts (skrip migrasi tahap 6) dengan slug baru di atas.
3. Unggah ulang gambar penting dan PDF resume ke R2; perbarui baris resume di tabel C.
4. Jalankan uji redirect: `npm run test:redirects` terhadap server staging.
5. Setelah DNS dipindah: submit `/sitemap.xml` baru di Search Console, pantau laporan "Page indexing" 4–6 minggu.
6. Biarkan WordPress lama tetap bisa diakses (mis. subdomain sementara, `noindex`) selama 30 hari sebagai cadangan.
