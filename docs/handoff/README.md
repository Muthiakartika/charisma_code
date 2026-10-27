# The Charisma Code: Next.js build guide

**Updated:** 26 Oct 2026

This pack turns the Figma site content structure into a build spec for the Next.js site. The preview site at https://charisma-code.vercel.app is the starting point (Next.js + Tailwind v4).

> **Content structure, not visual design.** Figma shows **what content goes on each page and in what order**: sections, headings, copy, buttons and their links. Keep the visual design of the existing preview site. Where Figma and the preview site differ on content or order, Figma wins. On look and feel, the preview site wins.

## 1. What to use, in order of authority

| Source | Use it for |
|---|---|
| `pages/*.md` in this folder (generated from `copy/*.json`) | **The copy.** Every heading, paragraph, button label and link, word for word, plus each page's developer section (SEO title, meta, schema, forms, image ALT text). |
| `copy/*.json`, `copy/future/*.json` | The same content as structured data, if you want to import it rather than paste it. Each block is `[type, text, extra]`; the types are in the legend below. |
| Figma, https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=0-1 | **Placement.** Section order, what sits side by side, card counts, and how sections stack on mobile. The desktop boards are 1920 wide (content column 1224); the mobile boards are 375. |
| `TheCharismaCode-schema-vocabulary.xlsx` | Structured data (JSON-LD): every @id, which page owns it, and which pages only reference it. |
| `redirects.md` / `redirects.json` | 301s and 410s from the old WordPress URLs. |
| `copy/*.docx` | The same briefs as Word files, for the client. You don't need them if you have the `.md` or `.json` files. |

## 2. How to read a page file

Each `pages/<page>.md` runs top to bottom in page order:

| In the file | What it means on the page |
|---|---|
| `## Section N — Name` | A page section (band). Build one component per section, in this order. |
| **H1 ·** / **H2 ·** / **H3 ·** / **H4 ·** | The real HTML heading level. One H1 per page. Use the H2 and H3 levels exactly as given; they are planned for SEO. |
| **Button:** `LABEL` → /path | A button or link. Use the label as given, linking to that path. `wa.me` and `tel:` targets go straight to WhatsApp or the phone. |
| - ✓ item | A tick or trust-point list (icon list). |
| - item | A plain bullet list, or the cards of a card grid when the section has several short items. |
| **Price line:** | A price strip, usually under the hero intro or in the final call-to-action band. |
| **Badge:** | A small label on a card (e.g. MOST POPULAR). |
| > quote | A pull quote or review. |
| > **Note:** | An instruction to the developer, or a question for the client. **Do not publish it.** |
| > _italic_ | Context about the brief. Do not publish it. |
| · · · | A break between cards or items in the same section. |
| Field/Value tables | The developer section at the end of each page: SEO title, meta description, H2 plan, schema, internal links, form email subject, WhatsApp message, tracking, and image file names with ALT text. |
| <mark>highlighted</mark> | **Dummy or unconfirmed content.** Build the slot with this text so the layout is real, but it must be replaced before launch (see section 6). |

## 3. Global rules

These apply to every page; each page's developer section repeats them where they matter.

- **Header and footer:** the same as the preview site. Add the new pages to the nav or footer as the Figma header and footer show.
- **Mobile sticky bar:** two buttons, usually **LET'S TALK | WHATSAPP**. The page's "Mobile conversion requirements" section sets the labels.
- **WhatsApp:** open `wa.me` with the page's pre-filled message from its developer section.
- **Phone numbers:** tap-to-call.
- **Forms:** use the email subject pattern given for each page. Spam protection is an invisible captcha or a honeypot, with no visible puzzle.
- **Tracking:** form submit, WhatsApp click, phone click, and every quote or availability button each fire their own event.
- **FAQs:** use accordions. Every FAQ shown on a page is also in that page's FAQPage schema; never put schema on content the page doesn't show.
- **Images:** use real event photos. Serve them as WebP or AVIF, with the file names and ALT text from the page's "Image SEO" section.
- **Prices:** every price in the schema must also be visible on the page.
- **URLs:** flat service URLs, as listed below. Don't use `/services/...` paths; the old ones redirect (section 7).

## 4. Pages (37)

Figma links open the desktop / mobile board for each page. The status comes from the board review. PARTIAL and BLOCKED pages can be built now, but they still have dummy or placeholder content.

| Route | Page | Copy | Figma (desktop / mobile) | Status |
|---|---|---|---|---|
| `/` | Home | [home.md](pages/home.md) | [5:228](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-228) / [5:1519](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-1519) | RESOLVED |
| `/corporate-team-building` | Corporate Team Building | [corporate-team-building.md](pages/corporate-team-building.md) | [5:644](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-644) / [5:1871](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-1871) | PARTIAL — price is a placeholder |
| `/emcee` | Emcee Singapore (hub) | [emcee.md](pages/emcee.md) | [18:4](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=18-4) / [18:304](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=18-304) | RESOLVED |
| `/corporate-emcee` | Corporate Emcee | [corporate-emcee.md](pages/corporate-emcee.md) | [5:1037](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-1037) / [5:2258](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-2258) | RESOLVED |
| `/conference-emcee` | Conference & Seminar Emcee | [conference-emcee.md](pages/conference-emcee.md) | [95:2](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=95-2) / [95:304](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=95-304) | RESOLVED |
| `/roadshow-emcee` | Roadshow & Exhibition Emcee | [roadshow-emcee.md](pages/roadshow-emcee.md) | [96:2](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=96-2) / [96:307](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=96-307) | PARTIAL — photos to swap |
| `/government-community-emcee` | Government & Community Emcee | [government-community-emcee.md](pages/government-community-emcee.md) | [96:594](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=96-594) / [96:894](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=96-894) | PARTIAL — client facts |
| `/school-family-emcee` | School, Kids & Family Emcee | [school-family-emcee.md](pages/school-family-emcee.md) | [100:2](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=100-2) / [100:303](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=100-303) | RESOLVED |
| `/dinner-and-dance-emcee` | Dinner & Dance Emcee | [dinner-and-dance-emcee.md](pages/dinner-and-dance-emcee.md) | [5:1286](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-1286) / [5:2490](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-2490) | RESOLVED |
| `/dinner-and-dance-planning` | D&D Event Planning | [dinner-and-dance-planning.md](pages/dinner-and-dance-planning.md) | [24:4](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=24-4) / [22:327](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=22-327) | RESOLVED |
| `/chinese-new-year-emcee` | Chinese New Year Emcee | [chinese-new-year-emcee.md](pages/chinese-new-year-emcee.md) | [5:2749](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-2749) / [5:4134](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-4134) | RESOLVED |
| `/wedding-emcee` | Wedding Emcee | [wedding-emcee.md](pages/wedding-emcee.md) | [5:2982](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-2982) / [5:4358](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-4358) | RESOLVED |
| `/corporate-workshops` | Corporate Workshops | [corporate-workshops.md](pages/corporate-workshops.md) | [5:3205](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-3205) / [5:4568](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-4568) | RESOLVED |
| `/communication-coaching` | Communication Coaching | [communication-coaching.md](pages/communication-coaching.md) | [5:3389](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-3389) / [5:4742](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-4742) | PARTIAL — sample sections to replace |
| `/kids-youth-programs` | Kids & Youth Programs | [kids-youth-programs.md](pages/kids-youth-programs.md) | [5:3558](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-3558) / [5:4902](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-4902) | PARTIAL — sample sections to replace |
| `/creative-campaigns` | Creative Campaigns | [creative-campaigns.md](pages/creative-campaigns.md) | [5:3781](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-3781) / [5:5115](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-5115) | RESOLVED |
| `/event-support` | Event Support | [event-support.md](pages/event-support.md) | [5:3953](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-3953) / [5:5277](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-5277) | RESOLVED |
| `/event-planning` | Event Planning & Management | [event-planning.md](pages/event-planning.md) | [21:4](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=21-4) / [21:320](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=21-320) | RESOLVED |
| `/product-launch-events` | Product & Brand Launch Events (new page) | [product-launch-events.md](pages/product-launch-events.md) | [209:2](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=209-2) / [209:387](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=209-387) | RESOLVED |
| `/services` | Services | [services.md](pages/services.md) | [5:5569](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-5569) / [5:5437](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-5437) | RESOLVED |
| `/rates` | Rates & Starting Prices | [rates.md](pages/rates.md) | [25:2](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=25-2) / [25:246](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=25-246) | PARTIAL — placeholder prices |
| `/our-work` | Our Work | [our-work.md](pages/our-work.md) | [5:5711](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-5711) / [5:6891](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-6891) | RESOLVED |
| `/about` | About | [about.md](pages/about.md) | [5:6002](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-6002) / [5:7155](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-7155) | RESOLVED |
| `/contact` | Contact | [contact.md](pages/contact.md) | [5:6589](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-6589) / [5:7704](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-7704) | PARTIAL — address placeholder |
| `/our-work/[case-study]` | Case study (template) | — (keep the preview page) | [5:5876](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-5876) / [5:7039](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-7039) | RESOLVED — template only |
| `/insights` | Insights | — (keep the preview page) | [5:6176](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-6176) / [5:7319](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-7319) | OPEN — post list to sign off |
| `/insights/[article]` | Article (template) | — (keep the preview page) | [5:6411](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-6411) / [5:7536](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-7536) | RESOLVED — template only |
| `/work-with-us` | Work With Us | — (keep the preview page) | [5:6724](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-6724) / [5:7829](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-7829) | RESOLVED — no changes needed |
| `/legal` | Legal | — (keep the preview page) | [5:7988](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-7988) / [5:8147](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=5-8147) | RESOLVED — no changes needed |
| `/events/public-speaking-teens-dec-2026` | Public session (sample) | [future-events-public-sessions.md](pages/future-events-public-sessions.md) | [306:2](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=306-2) / [306:306](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=306-306) | BLOCKED — all sample content |
| `/events/holiday-camp-dec-2026` | Holiday camp intake (sample) | [future-events-public-sessions.md](pages/future-events-public-sessions.md) | [306:790](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=306-790) / [306:978](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=306-978) | BLOCKED — all sample content |
| `/videos` | Videos (all five reels) | [future-videos.md](pages/future-videos.md) | [307:2](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=307-2) / [307:329](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=307-329) | PARTIAL — sample chapters |
| `/insights/lo-hei-phrases` | Lo hei phrases (article) | [future-insights-lo-hei-phrases.md](pages/future-insights-lo-hei-phrases.md) | [308:2](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-2) / [308:211](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-211) | PARTIAL — publish date |
| `/insights/resources` | Free event planning guides | [future-insights-resources.md](pages/future-insights-resources.md) | [308:447](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-447) / [308:723](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-723) | PARTIAL — client decision |
| `/press` | In the press | [future-press.md](pages/future-press.md) | [308:986](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-986) / [308:1159](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-1159) | PARTIAL — sample item |
| `/about/crew/[name]` | Crew profile (sample member) | [future-about-crew-profile.md](pages/future-about-crew-profile.md) | [308:1370](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-1370) / [308:1548](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-1548) | BLOCKED — fictional member |
| `/work-with-us/[role]` | Job opening (sample role) | [future-work-with-us-job.md](pages/future-work-with-us-job.md) | [308:1778](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-1778) / [308:2004](https://www.figma.com/design/TuWAQndDZvN5fkfJZ5OUfN/charisma-code-orange?node-id=308-2004) | BLOCKED — sample role |

### Additions to existing pages

These briefs add sections to pages that are already in the table above. Merge them into the page in the place the brief describes.

| Adds to | File |
|---|---|
| `/about` | [future-about-additions.md](pages/future-about-additions.md) |
| `/communication-coaching` | [future-communication-coaching-additions.md](pages/future-communication-coaching-additions.md) |
| `/kids-youth-programs` | [future-kids-youth-programs-additions.md](pages/future-kids-youth-programs-additions.md) |
| `/our-work/[case-study]` | [future-our-work-photo-credits.md](pages/future-our-work-photo-credits.md) |

Pages marked "keep the preview page" (the case study and article templates, /insights, /work-with-us, /legal) have no new brief. Build them as the preview site has them, checked against their Figma boards.

## 5. Structured data (JSON-LD) per page

Summary from the **Pages** tab of `TheCharismaCode-schema-vocabulary.xlsx`. Each page **emits** the nodes it owns, in full, and only **references** the others by `@id`. Base URL: `https://www.thecharismacode.co`. The workbook has the full node list (96 nodes) with every property.

| Route | Page type | Emits (owns) | References |
|---|---|---|---|
| `/` | WebPage (home) | organization, website, area/singapore, action/whatsapp | founder (core), the 12 headline Services (name, url, offer) |
| `/about` | AboutPage + ProfilePage | person/chia-de-zhong, org/smu, the three trainer organisations, event/yog-2010, 2 credentials, acting credits, music | organization, video/hosting-reel, video/acting-reel, video/singing-reel (by @id) |
| `/services` | CollectionPage | list/services | all 12 Services (core) |
| `/rates` | WebPage | catalog/rates | all 18 Services and their Offers |
| `/emcee` | WebPage | service/emcee (+ emcee OfferCatalog) | the 8 emcee Services, founder |
| `/corporate-emcee` | WebPage | service/corporate-emcee | organization, founder |
| `/dinner-and-dance-emcee` | WebPage | service/dinner-and-dance-emcee | organization, founder, case/banyan |
| `/chinese-new-year-emcee` | WebPage | service/chinese-new-year-emcee, 3 packages, lo hei term set (1 + 6) | organization, founder, video/hosting-reel |
| `/conference-emcee` | WebPage | service/conference-emcee | organization, founder |
| `/roadshow-emcee` | WebPage | service/roadshow-emcee | organization, founder |
| `/government-community-emcee` | WebPage | service/government-community-emcee | organization, founder |
| `/school-family-emcee` | WebPage | service/school-family-emcee, 3 packages | organization, founder, video/party-games-reel, video/hosting-reel, service/kids-youth-programmes |
| `/wedding-emcee` | WebPage | service/wedding-emcee, 3 packages | organization, founder, case/sheraton, video/wedding-in-action, video/singing-reel |
| `/corporate-team-building` | WebPage | service/corporate-team-building | organization, founder |
| `/event-planning` | WebPage | service/event-planning | organization, founder, case/lectrix |
| `/dinner-and-dance-planning` | WebPage | service/dinner-and-dance-planning | organization, case/banyan |
| `/product-launch-events` | WebPage | service/product-launch-events | organization, case/soma |
| `/creative-campaigns` | WebPage | service/creative-campaigns | organization, case/soma |
| `/event-support` | WebPage | service/event-support | organization |
| `/corporate-workshops` | WebPage | service/corporate-workshops | organization, founder, course/one-to-one-coaching |
| `/communication-coaching` | WebPage | service/communication-coaching, course/one-to-one, course/public-speaking, course/presentation-skills, 3 reviews | organization, founder |
| `/kids-youth-programs` | WebPage | service/kids-youth-programmes, 3 Courses | organization, founder, case/maris-stella |
| `/our-work` | CollectionPage | list/case-studies, list/brands | the 7 case studies (core), the 5 case-study clients by @id |
| `/our-work/[case-study] × 7` | WebPage + Article | one case study each, plus its venue and client | organization, founder, the Service it proves |
| `/insights` | CollectionPage (Blog) | — | organization |
| `/insights/[article]` | WebPage + BlogPosting | one BlogPosting each | organization, founder (author by @id) |
| `/contact` | ContactPage | 2 ContactPoints, address (waiting) | organization |
| `/work-with-us` | WebPage | — | organization |
| `/legal` | WebPage | — | organization |
| `/videos` | CollectionPage | the 5 VideoObjects (one section each) + Clips once chapters are real | organization, founder |
| `/press` | CollectionPage | video/channel-8-interview, org/mediacorp | founder (subjectOf) |
| `/insights/lo-hei-phrases` | WebPage + BlogPosting | article/lo-hei-phrases | founder (author), lo hei term set (core facts) |
| `/insights/resources` | WebPage | 3 LearningResources | organization, founder |
| `/events/[session] × 2` | WebPage + EducationEvent | one EducationEvent each + CourseInstance | organization, founder, course/multi-day-camp |
| `/about/crew/[name]` | ProfilePage | one Person per crew member | organization (worksFor) |
| `/work-with-us/[role]` | WebPage + JobPosting | one JobPosting | organization (hiringOrganization) |

## 6. Before launch: open items (33)

These are waiting on the client. Build the page with the placeholder or dummy text in place, then swap in the real content once it's confirmed. The live list is the **To Confirm** tab of the Gap Analysis workbook.

| Page | Question | Where it stands |
|---|---|---|
| `/dinner-and-dance-emcee` | Add the two case studies; link across to /dinner-and-dance-planning. | The Banyan Group case study and the planning links are on the board. A second D&D case study is for the client to supply. |
| `/kids-youth-programs` | Re-confirm S$388 / S$880 and publish them here. | Published on the board (S$880 per school group, S$120 coaching). The client re-confirms all prices before launch. |
| `/our-work` | Add Review / AggregateRating schema. | Developer task at build; the Google reviews on the boards are the source. |
| `/about` | sameAs links to the Instagram profiles. | Developer task at build; the client confirms which profiles are his. |
| `/contact` | A street address to publish (and for LocalBusiness schema). | Client to supply. Contact shows a placeholder (Singapore 000000) until then. |
| `/dinner-and-dance-planning` | Optional: swap the Banyan highlight for a D&D the team planned end to end. | Client to supply such an event if there is one. |
| `/rates` | Deposit and cancellation terms. | Left for the client (24 Oct 2026). /legal says 50% deposit on confirmation and 50% on the day; the client confirms whether /rates should say the same, plus cancellation terms. |
| `/rates` | Placeholder price ranges. | Client to confirm every range before launch (Rates tab). |
| `/conference-emcee` | Corporate Emcee stays the overview and links down here; a conference photo, case study or testimonial would help. | Linking done. The photo, case study or testimonial is for the client to supply. |
| `/roadshow-emcee` | Are the hero photos the SOMA launch? Are school roadshows offered? | School roadshows: yes, confirmed 24 Oct 2026 (the page has a school assemblies band). Hero photos: swap them for a mall roadshow or exhibition photo; both are labelled "Photo to swap" on the board until the client sends one. |
| `/government-community-emcee` | Which event is the main photo from, and did De Zhong host it? Which public-sector clients can be named? | Client to answer. The logo strip stays the corporate one until then. |
| `/communication-coaching` | Is a presentation skills course offered as its own course? Format, number of sessions and price (S$480 for 4 sessions is a sample). | Waiting on the client (added 26 Oct 2026). |
| `/communication-coaching` | Three real participant reviews, with permission to publish first name and occasion (the three shown are samples). | Waiting on the client (added 26 Oct 2026). |
| `/kids-youth-programs` | Three real parent or teacher reviews (samples shown), and the dates of any public camp intakes. | Waiting on the client (added 26 Oct 2026). |
| `/about` | Years of the two competition finals (SAFRA's The Ultimate Talent, UFM100.3's The Wedding Singer). Add 987TVStar 2014? | Waiting on the client (added 26 Oct 2026). |
| `/about` | Youth Olympic Games 2010: hosted (portfolio: canoeing and rowing) or performed at the athletes' welcome (old About page)? | Waiting on the client (added 26 Oct 2026). |
| `/about` | Is De Zhong a COMPASS member (only then is it marked up as a membership)? | Waiting on the client (added 26 Oct 2026). |
| `/about` | Is 好人的秘密 released in full (Spotify, Apple Music)? Any other original songs? The year of the ABRSM Grade 8 certificate? | Waiting on the client (added 26 Oct 2026). |
| `/about` | Which acting credits to feature, and in what order (nine from IMDb shown, plus Moments on Channel 8)? | Waiting on the client (added 26 Oct 2026). |
| `/about` | Which social profiles are De Zhong's own (Instagram, Facebook, TikTok, X, LinkedIn)? | Waiting on the client (added 26 Oct 2026). |
| `/our-work` | Permission to show each of the 33 brands and their logos, and what we did for each (event, role, year). | Waiting on the client (added 26 Oct 2026). |
| `/our-work` | Keep the Youth Olympic Games logo out (Olympic marks are restricted)? It is also still in the logo strips on several service pages. | Waiting on the client (added 26 Oct 2026). |
| `/our-work` | Nirvana Memorial Garden: which website is theirs? Shown without a link until confirmed. | Waiting on the client (added 26 Oct 2026). |
| `/our-work/[case-study]` | Who took and owns the case-study photos, and may they be reused? (The photo credit line is a sample.) | Waiting on the client (added 26 Oct 2026). |
| `/legal` | Where is the website hosted (named in the privacy section)? | Waiting on the client (added 26 Oct 2026). |
| `Case studies and reviews` | Missing content marked "Client to supply" on the boards: a D&D the team planned end to end; a second D&D case study; a CNY-dinner review; a team-building case study and review; a campaign testimonial; a school, party or family-day review; launches besides SOMA; public-sector clients we may name; a conference case study or testimonial. | Waiting on the client (added 26 Oct 2026). |
| `/events/[session]` | Run public, dated sessions anyone can book? If so: real names, dates, venue, ages, places, prices and refund terms (all shown are samples). | Waiting on the client (added 26 Oct 2026). |
| `/videos` | The real chapter times of each video, and which wedding the wedding video shows (uploaded Mar 2024; the page places it at the Jan 2026 Sheraton wedding). | Waiting on the client (added 26 Oct 2026). |
| `/insights/lo-hei-phrases` | Confirm the six phrases and the ingredient each goes with; set the publish date. | Waiting on the client (added 26 Oct 2026). |
| `/insights/resources` | Free downloads, or sent by email in exchange for a name and email address? | Waiting on the client (added 26 Oct 2026). |
| `/press` | Any other real coverage to list (the second item is a sample)? A meWATCH link for the Channel 8 segment? | Waiting on the client (added 26 Oct 2026). |
| `/about/crew/[name]` | Which crew members want a public profile (photo, role, languages, short bio they approve)? | Waiting on the client (added 26 Oct 2026). |
| `/work-with-us/[role]` | Any real, open role to publish? (The Event Facilitator role shown is a sample.) | Waiting on the client (added 26 Oct 2026). |

## 7. Redirects

There are 192 old WordPress URLs to handle (162 301, 29 KEEP, 1 GONE). They're all in [redirects.md](redirects.md); set them up in `next.config` `redirects()` or in middleware.

## 8. Done means

- Every route in section 4 exists, with its sections in the order of its page file and its Figma board.
- Headings match the page file exactly: one H1, with the H2 and H3 levels as given.
- Every button goes to its stated target.
- Each page has its SEO title, meta description and JSON-LD.
- No **Note:** text or other brief text is published.
- Every <mark>highlighted</mark> item is replaced or signed off by the client before launch.
- The redirects are live.
