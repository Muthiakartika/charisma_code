# Communication Coaching — third course and course reviews

_The Charisma Code  ·  /communication-coaching (additions)  ·  draft 25 Oct 2026  ·  new content for future schema (dummy values highlighted)_

Source: `copy/future/communication-coaching-additions.json` (same content as `copy/future/communication-coaching-additions.docx`).

> _How to read this: headings are tagged H1 / H2 / H3. [BUTTON TEXT] → where it goes. This draft is filled with DUMMY CONTENT so it reads as a finished page: every dummy value is highlighted yellow, and the yellow CLIENT TO CONFIRM notes list what to replace. Nothing highlighted may be published as written._

> _Why this content: row B2 and B4 of the Future Schema - Future Content tab. Schema it unlocks: Course list (three Courses on one page) and Review / AggregateRating on Course. Google result today: Course list carousel; review stars on Course. The page must visibly say everything the markup says, so the markup goes live only with the real values._

> _The page has two courses today (one-to-one coaching, the public speaking course). A third distinct course makes it eligible for Google's Course list, as the Kids & Youth page already is. The reviews block collects first-hand reviews that may be marked up on the Course (not on the business)._

## Addition 1 — a third card in "Choose how you want to learn"

**H3 ·** Presentation skills course

**Price line:** S$<mark>480</mark> for <mark>4</mark> sessions

**Ideal for:** professionals who present to clients, management or a conference audience and want their slides, story and voice to work together.

<mark>Four</mark> sessions built around a real presentation you have coming up: structure and story first, then slides that support you, then delivery practised until it flows.

- ✓ Built around your real presentation
- ✓ Story, slides and voice together
- ✓ A final run-through before the day

**Button:** `ASK ABOUT THE COURSE` → #enquiry (format: presentation skills)

> **Note:** Is a presentation skills course offered as its own course? If not, name the third course that is. Number of sessions, format (one-to-one or small group) and price.

## Addition 2 — reviews block (after "Why learn from De Zhong")

**H2 ·** What participants say

> "<mark>I had a keynote in three weeks and no idea how to open it. After two sessions I had a structure I believed in, and I walked on stage calm.</mark>" — <mark>Wei Ling</mark>, <mark>conference keynote</mark>, <mark>August 2026</mark>

> "<mark>De Zhong made me rehearse my pitch until it sounded like me, not a script. We won the account.</mark>" — <mark>Arjun</mark>, <mark>client pitch</mark>, <mark>June 2026</mark>

> "<mark>I used to freeze in interviews. The mock interviews were tough but kind, and I got the scholarship.</mark>" — <mark>Shu Hui</mark>, <mark>scholarship interview</mark>, <mark>March 2026</mark>

**Button:** `BOOK A CONSULTATION` → #enquiry

> **Note:** Replace all three sample reviews with real ones, collected directly from participants with permission to publish first name and occasion. Sample reviews must never go live.

**H4 ·** Review request — message to send after the last session

Hi [first name], thank you for working with me on [your talk / pitch / interview]. Would you share two or three sentences about how the coaching helped? With your permission I'd like to put it on our website with your first name. Thank you! De Zhong


· · ·

## Website developer — schema for this page

| Field | Value |
|---|---|
| Course list | Three Course nodes on the page, each with name, description (≤ 60 characters shows best), provider (the business by @id) and offers. Wrap them in an ItemList for the list result. |
| Reviews | Review nodes on the Course they describe (itemReviewed = the Course), with author (Person, first name), datePublished and reviewBody. AggregateRating only once there are enough genuine reviews to average. Never on the Organization: Google treats that as self-serving. |
| @id | …/communication-coaching/#course/presentation-skills |
| Go-live rule | No markup for the sample reviews or the sample price. |

