# Crew profile — page template, shown with a sample member

_The Charisma Code  ·  /about/crew/[name] (NEW)  ·  draft 25 Oct 2026  ·  new content for future schema (dummy values highlighted)_

Source: `copy/future/about-crew-profile.json` (same content as `copy/future/about-crew-profile.docx`).

> _How to read this: headings are tagged H1 / H2 / H3. [BUTTON TEXT] → where it goes. This draft is filled with DUMMY CONTENT so it reads as a finished page: every dummy value is highlighted yellow, and the yellow CLIENT TO CONFIRM notes list what to replace. Nothing highlighted may be published as written._

> _Why this content: row B6 of the Future Schema - Future Content tab. Schema it unlocks: ProfilePage with a Person (worksFor the business). Google result today: Profile page. The page must visibly say everything the markup says, so the markup goes live only with the real values._

> **Note:** Who are the regular crew members willing to have a public profile? Each needs a real photo, role, languages and a short bio they approve. The sample person below is fictional.

**H1 ·** <mark>Daniel Tan</mark>

**<mark>Facilitator</mark>** · The Charisma Code crew

[Photo]

<mark>Daniel leads team challenges and family-day games for The Charisma Code. A former outdoor educator, he loves getting quiet teams talking and making sure every group finishes with a story to tell.</mark>

- ✓ **Languages:** <mark>English and Mandarin</mark>
- ✓ **Works on:** <mark>team building, family days and youth camps</mark>
- ✓ **With the crew since:** <mark>2024</mark>

**Button:** `MEET DE ZHONG` → /about

**Button:** `PLAN YOUR EVENT` → /contact

**H4 ·** On /about — a crew strip under "The crew behind the spark"

- [Photo] <mark>Daniel Tan · Facilitator</mark> → /about/crew/<mark>daniel-tan</mark>
- [Photo] <mark>Priya Nair · Host</mark> → /about/crew/<mark>priya-nair</mark>
- [Photo] <mark>Marcus Lee · Performer</mark> → /about/crew/<mark>marcus-lee</mark>

· · ·

## Website developer — schema for this page

| Field | Value |
|---|---|
| Schema | ProfilePage with mainEntity = Person (name, jobTitle, image, knowsLanguage, worksFor = the business by @id). /about lists them with employee or member on the business (each written out with core facts). |
| @id | https://www.thecharismacode.co/about/crew/<name>/#person |
| Go-live rule | Only real, consenting crew members. |

