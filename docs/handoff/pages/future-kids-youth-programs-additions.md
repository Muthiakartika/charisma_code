# Kids & Youth Programs — parent reviews and upcoming camps

_The Charisma Code  ·  /kids-youth-programs (additions)  ·  draft 25 Oct 2026  ·  new content for future schema (dummy values highlighted)_

Source: `copy/future/kids-youth-programs-additions.json` (same content as `copy/future/kids-youth-programs-additions.docx`).

> _How to read this: headings are tagged H1 / H2 / H3. [BUTTON TEXT] → where it goes. This draft is filled with DUMMY CONTENT so it reads as a finished page: every dummy value is highlighted yellow, and the yellow CLIENT TO CONFIRM notes list what to replace. Nothing highlighted may be published as written._

> _Why this content: row B1 and B4 of the Future Schema - Future Content tab. Schema it unlocks: Review on Course; CourseInstance links to public Event pages. Google result today: Review stars on Course; Event results on the session pages. The page must visibly say everything the markup says, so the markup goes live only with the real values._

## Addition 1 — reviews block (after the Maris Stella case study)

**H2 ·** What parents and teachers say

> "<mark>My son used to hide behind me at parties. On the last day of camp he did a two-minute talk in front of everyone, and he hasn't stopped talking about it.</mark>" — <mark>Michelle</mark>, parent, <mark>multi-day confidence camp</mark>, <mark>June 2026</mark>

> "<mark>The students looked forward to every session. Even the quietest ones had a turn, and the final showcase was a proud moment for the class.</mark>" — <mark>Mr Lim</mark>, <mark>form teacher</mark>, <mark>modular school programme</mark>, <mark>2026</mark>

> "<mark>Two masterclasses before her school interview and she walked in prepared and smiling.</mark>" — <mark>Grace</mark>, parent, <mark>one-to-one masterclass</mark>, <mark>September 2026</mark>

**Button:** `PLAN A SCHOOL PROGRAMME` → #enquiry

> **Note:** Replace the three sample reviews with real ones from parents or teachers, with permission to publish name and role. A school's name only with the school's agreement.

## Addition 2 — upcoming camps block (inside Programme formats, under the camp card)

**H3 ·** Upcoming public camps

- <mark>16 to 18 Dec 2026</mark> · <mark>The Charisma Code studio</mark> · <mark>ages 7 to 12</mark> · <mark>8 places left</mark> → [BOOK A PLACE] /events/holiday-camp-dec-2026
- <mark>9 to 11 Mar 2027</mark> · <mark>The Charisma Code studio</mark> · <mark>ages 7 to 12</mark> · <mark>20 places</mark> → [BOOK A PLACE] /events/holiday-camp-mar-2027

School-holiday camps are open to every family. Schools can also book a private camp for their students.

> **Note:** Only shown if public camp intakes are run (see the events brief). Real dates, venue and places.


· · ·

## Website developer — schema for this page

| Field | Value |
|---|---|
| Reviews | Review on the Course each review is about (multi-day camp, modular programme, masterclass). Not on the Organization. |
| CourseInstance | hasCourseInstance on the camp Course, one per dated public intake, linking to its /events page. |
| Go-live rule | No markup for sample reviews or sample dates. |

