# Public sessions — event page template and first page

_The Charisma Code  ·  /events/[session] (NEW)  ·  draft 25 Oct 2026  ·  new content for future schema (dummy values highlighted)_

Source: `copy/future/events-public-sessions.json` (same content as `copy/future/events-public-sessions.docx`).

> _How to read this: headings are tagged H1 / H2 / H3. [BUTTON TEXT] → where it goes. This draft is filled with DUMMY CONTENT so it reads as a finished page: every dummy value is highlighted yellow, and the yellow CLIENT TO CONFIRM notes list what to replace. Nothing highlighted may be published as written._

> _Why this content: row B1 of the Future Schema - Future Content tab. Schema it unlocks: Event (EducationEvent) + CourseInstance. Google result today: Event results: date, place and price in Search. The page must visibly say everything the markup says, so the markup goes live only with the real values._

> _Google's rules for Event markup: a physical venue with a street address, bookable by the general public, one page (URL) per session. Private corporate bookings, online-only sessions and on-school-premises events for minors are not eligible. These pages only exist if The Charisma Code runs public sessions._

> **Note:** Does The Charisma Code want to run public, dated sessions anyone can book? If yes: real session names, dates, times, venue, ages, places, prices, booking link and refund terms replace every highlighted value.

## Part 1 — Page template, shown with a sample session

**H1 ·** <mark>Public speaking for teens</mark>: <mark>Saturday 13 December 2026</mark>

<mark>A one-day workshop for 12 to 16 year olds who want to speak up with confidence in class, at interviews and on stage.</mark>

- ✓ **<mark>13 Dec 2026, 9.30am to 4.30pm</mark>**
- ✓ **<mark>The Charisma Code studio, 10 Placeholder Road, #01-01, Singapore 000000</mark>**
- ✓ **<mark>Ages 12 to 16</mark>**
- ✓ **<mark>16 places</mark>**

**Price line:** S$<mark>180</mark> per participant

**Button:** `BOOK A PLACE` → ==/events/public-speaking-teens-dec-2026#book==

**Button:** `WHATSAPP DE ZHONG` → https://wa.me/6594378083

**H2 ·** What happens in the session

<mark>Warm-up games first, so nobody feels put on the spot. Then short speaking rounds in pairs and small groups, with kind, specific feedback. The day ends with every participant giving a one-minute talk to the group.</mark>

**H2 ·** Who runs it

Led by Chia De Zhong, a bilingual emcee, actor and trainer with over 15 years on stage and more than five years of teaching. <mark>He is joined by one facilitator from The Charisma Code crew.</mark>

**H2 ·** Before you book

- <mark>Bring a water bottle and a packed lunch.</mark>
- <mark>Drop-off from 9.15am, pick-up by 4.45pm.</mark>
- <mark>Full refund up to 7 days before; after that, a place can be transferred to a friend or a later date.</mark>

## Part 2 — First page, worked example

**H1 ·** School-holiday confidence camp: <mark>December 2026</mark>

Three full days of games, drama and speaking for <mark>7 to 12 year olds</mark>, ending in a showcase for parents. The same multi-day camp as on the Kids & Youth Programs page, run as a public intake anyone can book.

- ✓ **<mark>16 to 18 Dec 2026, 9am to 4pm</mark>**
- ✓ **<mark>The Charisma Code studio, 10 Placeholder Road, #01-01, Singapore 000000</mark>**
- ✓ **<mark>Ages 7 to 12</mark>**
- ✓ **<mark>20 places</mark>**

**Price line:** S$388 per participant

**Button:** `BOOK A PLACE` → ==/events/holiday-camp-dec-2026#book==

**Button:** `WHATSAPP DE ZHONG` → https://wa.me/6594378083

**H2 ·** Three days, one showcase

**H3 ·** Day 1 — Play first

Games and warm-ups so nobody feels put on the spot.

**H3 ·** Day 2 — Practise in a safe space

Small steps from pairs to the whole group, with kind, specific feedback.

**H3 ·** Day 3 — A moment to shine

Rehearsal, then a showcase for parents <mark>at 3pm</mark>.

> **Note:** Camp dates, times, venue, ages and places; whether the published camp price (S$388) applies to public intakes.


· · ·

## Website developer — schema for this page

| Field | Value |
|---|---|
| Schema | EducationEvent (subtype of Event), one per page. location = Place with name and PostalAddress. offers = Offer (price, priceCurrency SGD, availability, url, validFrom). organizer and performer = the business and the founder by @id. eventAttendanceMode = OfflineEventAttendanceMode. eventStatus = EventScheduled. |
| Link to the course | The Course on /kids-youth-programs gains hasCourseInstance pointing at each dated session (CourseInstance with courseMode onsite and the session dates). |
| Required by Google | name, startDate (ISO 8601 with time zone +08:00), location.name and location.address. |
| @id | https://www.thecharismacode.co/events/<session-slug>/#event |
| After the date | Keep the page live with eventStatus unchanged; do not reuse the URL for the next intake. |
| Go-live rule | Emit the markup only once the highlighted values are real. |

