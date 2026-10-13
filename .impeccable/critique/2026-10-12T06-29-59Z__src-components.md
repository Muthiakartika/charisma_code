---
target: homepage, corporate team building, theme pages
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:D:\\Next.js Data\\charisma-code\\src\\components"
timestamp: 2026-10-12T06-29-59Z
slug: src-components
closed: true
---
# Critique — The Charisma Code (homepage, /corporate-team-building, theme pages)

Method: dual-agent (A: design review + tasteskill check · B: Impeccable detector + browser overlays), isolated.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Form pending/error/reference states; no reply-time expectation |
| 2 | Match System / Real World | 3 | Plain B2B copy; unordered objectives numbered 01–06 |
| 3 | User Control and Freedom | 3 | Breadcrumbs, Escape closes menus, values kept on error |
| 4 | Consistency and Standards | 3 | Strong tokens/radius; 3 different contact CTA labels on team-building page |
| 5 | Error Prevention | 3 | Optional fields marked; budget "not a commitment" |
| 6 | Recognition Rather Than Recall | 2 | No mobile header CTA (SiteNavigation.tsx:144 hidden sm:inline-flex); form ~17 screens down on mobile |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 2 | Team-building page 13 sections; bilingual / read-the-room claims repeated 4x |
| 9 | Error Recovery | 3 | Inline errors, top alert, focus management |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **22/32** | Solid, not yet distinctive |

## Design Specificity Verdict

LLM: competent, above template quality, but structurally category-interchangeable (split hero collage → client marquee → dark text+image → services bento → numbered process → projects → founder → testimonials → CTA band). The "Spotlight Studio" idea barely appears: spark disc half-hidden behind hero photo (Hero.tsx:87-91); ProcessSteps commented as run-of-show but renders a plain 01–05 list; "bilingual" claimed 8+ times but no Mandarin visible on EN pages; homepage hero never names De Zhong.

Deterministic: source scan 0 findings (64 .tsx). Rendered scan, 7 rule types: content-hidden-at-rest (error; 32% of home text, 38% of team-building text at opacity 0 before scroll, `.reveal` globals.css:440-445) — real; marquee without keyboard/touch pause (WCAG 2.2.2) — real minor; hard-coded error hex (#b42318 etc.) EnquiryForm.tsx:72, ApplicationForm.tsx:78, globals.css:73,356-378 — real minor; cream-palette — hex is brand-derived (logo bg), but long text-only cream stretches read as default; bounce-easing (kids theme, intentional), overused-font Geist (taste), gpt-thin-border-wide-shadow on nav dropdown (false positive), tight-leading 1.3 on quotes (false positive, rounding edge).

## What's Working
1. Priority bento (ServiceCards.tsx:46-122): business priority encoded in tile size.
2. Form + accessibility craft: labels/hints, aria-describedby, focus to status, skip link, reduced-motion fallbacks.
3. Theme system genuinely changes mood (radius, heading weight, wedding arches, kids tilted frames).

## Priority Issues
- [P1] Team-building page buries proof and conversion: form at 8,586px desktop / 13,534px mobile; client names at section 9; testimonials about pool party / charity event; no mobile header CTA. Fix: client strip + one testimonial under hero; merge repetitive sections to 7–8 total; sticky mobile CTA bar (Request a proposal + WhatsApp). Command: distill → layout.
- [P1] Homepage hero generic and under-uses De Zhong: generic H1, 27-word subtext, ~50% empty floor in main photo, half-hidden spark disc, client strip below fold at 1280x800. Fix: differentiator-led headline, ≤20-word subtext, recrop to faces/crowd, deliberate follow-spot disc, client strip above fold. Command: bolder + clarify + animate.
- [P2] Photo repetition / mismatched meaning: 4 photos fill 8 slots on team-building page; nightclub crowd for "What your team takes away"; studio headshot twice. Fix: text-only programme cards, one strong image per section, on-stage founder photo. Command: distill.
- [P2] Flat rhythm: FeatureGrid x3, consecutive text-left/image-right splits, three equal cream group-size cards, numbered unordered objectives. Fix: group-size comparison strip using form ranges, drop numbering, ProcessSteps as run-of-show cue sheet. Command: layout.
- [P2] Form reassurance + consent bug: consent renders "…in line with the Privacy Policy. Privacy Policy" (dictionaries.ts:94 + link); vague success copy. Fix: fix string, success state repeats next steps + WhatsApp shortcut, reply-time promise only if client confirms. Command: harden.

## Persona Red Flags
- HR manager on mobile: no header CTA; mobile menu 12 links with CTA cut off; programme cards lack duration/group size; no team-building testimonial; client proof ~13 screens down.
- Engaged couple: warm short page works; no inclusions/booking flow, no wedding FAQ, nav files weddings under "Emceeing".
- TV/Instagram fan: hero never names De Zhong; studio headshot not stage persona; TV work invisible; Instagram handle only near bottom.

## tasteskill violations
Three equal cards (group size); hero subtext >20 words; section-layout repetition; CTA >3 words and duplicated ("Explore Corporate Team Building" x2 on home); numbered unordered items; three bullet systems (CheckCircle, check-in-disc, "+"). Passes: radius lock, button contrast, no CTA wrap, no h-screen, single icon family, no emoji, left-aligned heroes, one accent per page.

## Minor Observations
Impeccable bans eyebrows above headings (several sections use them); Title Case mid-sentence "We Bring the Spark, You Shine."; "Google review" testimonials unlinked; kids pastel 3x2 grid feels edtech-template; ~130px dead space under mobile hero collage; current motion tasteful but does not express the stage idea.

## Questions to Consider
1. If De Zhong's voice and energy are the product, why is the homepage silent?
2. What if bilingualism were visible in the typography instead of asserted in copy?
3. Does one discovery call need 13 sections to sell?
