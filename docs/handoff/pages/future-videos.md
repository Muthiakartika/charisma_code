# Videos — all five reels on one page

_The Charisma Code  ·  /videos (NEW)  ·  draft 25 Oct 2026  ·  new content for future schema (dummy values highlighted)_

Source: `copy/future/videos.json` (same content as `copy/future/videos.docx`).

> _How to read this: headings are tagged H1 / H2 / H3. [BUTTON TEXT] → where it goes. This draft is filled with DUMMY CONTENT so it reads as a finished page: every dummy value is highlighted yellow, and the yellow CLIENT TO CONFIRM notes list what to replace. Nothing highlighted may be published as written._

> _Why this content: row B3 of the Future Schema - Future Content tab. Schema it unlocks: VideoObject per reel, plus Clip (key moments). Google result today: Video results and key moments. The page must visibly say everything the markup says, so the markup goes live only with the real values._

> _One page, not five: each reel gets its own section with an H2, the embedded video, a short write-up, its chapters and a button to the matching service. The sections that show a reel on the service pages today keep it._

## Section 1 — Hero

**H1 ·** Watch De Zhong in action

Hosting, singing, acting and children's entertainment: five short reels from real events and performances.

## Section 2 — #hosting-reel

**H2 ·** Hosting reel

[Embedded YouTube video]

> _Caption: Chia De Zhong's hosting reel (2023)  ·  3:00  ·  19 Mar 2023  (https://youtu.be/Wo9XVBQohEg)_

Three minutes of De Zhong hosting on stage in English and Mandarin: openings, games, transitions and the moments that keep a room together. Recorded across corporate events and celebrations up to 2023.

**H4 ·** In this video

- 0:00 — <mark>Welcome and opening</mark>
- <mark>0:45</mark> — <mark>Games with the audience</mark>
- <mark>1:40</mark> — <mark>A bilingual segment</mark>
- <mark>2:30</mark> — <mark>Lucky draw and closing</mark>

> **Note:** The real chapters: which events and moments appear, with their start times.

**Button:** `SEE EMCEE SERVICES` → /emcee

**Button:** `CHECK YOUR DATE` → /contact

## Section 3 — #singing-reel

**H2 ·** Singing reel

[Embedded YouTube video]

> _Caption: Chia De Zhong's singing reel (2023)  ·  3:01  ·  8 Mar 2023  (https://youtu.be/b-b5ePeUW4o)_

De Zhong has been singing since a school karaoke competition. Since then he has reached the finals of several singing competitions and now sings live at weddings and events. This reel collects his performances up to 2023.

**H4 ·** In this video

- 0:00 — <mark>A wedding march-in song</mark>
- <mark>1:05</mark> — <mark>Live set at a dinner</mark>
- <mark>2:10</mark> — <mark>A competition performance</mark>

> **Note:** The real chapters: song titles and occasions, with their start times.

**Button:** `SEE THE LIVE SINGER PACKAGE` → /wedding-emcee#packages

## Section 4 — #acting-reel

**H2 ·** Acting reel

[Embedded YouTube video]

> _Caption: Chia De Zhong's acting reel (2023)  ·  2:49  ·  4 Mar 2023  (https://youtu.be/N1JgStPpe0g)_

Scenes from 15 years of acting for film students, producers and agencies. The same voice, timing and presence he brings to every event he hosts.

**H4 ·** In this video

- 0:00 — <mark>A drama scene</mark>
- <mark>0:55</mark> — <mark>Comedy</mark>
- <mark>1:50</mark> — <mark>Commercial work</mark>

> **Note:** The real chapters: productions and roles shown, with their start times.

**Button:** `ABOUT DE ZHONG` → /about

**Button:** `SEE COMMUNICATION COACHING` → /communication-coaching

## Section 5 — #party-games

**H2 ·** Children's games and science magic

[Embedded YouTube video]

> _Caption: Children's games, party hosting and science magic samples  ·  1:11  ·  28 Feb 2024  (https://youtu.be/4FZJoAGRiRU)_

Samples of De Zhong as a children's entertainer: party games, hosting and a science magic show. What a children's party with The Charisma Code looks like.

**H4 ·** In this video

- 0:00 — <mark>Party games</mark>
- <mark>0:30</mark> — <mark>The birthday moment</mark>
- <mark>0:50</mark> — <mark>Science magic show</mark>

> **Note:** The real chapters, with their start times.

**Button:** `BOOK A PARTY HOST` → /school-family-emcee#quote

**Button:** `SEE KIDS & YOUTH PROGRAMS` → /kids-youth-programs

## Section 6 — #wedding

**H2 ·** Wedding emcee and singer in action

[Embedded YouTube video]

> _Caption: Wedding emcee and singer in action  ·  1:30  ·  13 Mar 2024  (https://youtu.be/ANC2fV9moMw)_

De Zhong hosting and singing at <mark>a wedding banquet</mark>: the host, the songs and the games in one package.

**H4 ·** In this video

- 0:00 — <mark>Welcome and march-in</mark>
- <mark>0:30</mark> — <mark>A live song</mark>
- <mark>1:00</mark> — <mark>A guest game</mark>

> **Note:** Which wedding is this? It was uploaded on 13 Mar 2024, but the Wedding Emcee page places it at the Sheraton Towers wedding of Jan 2026. Name the right wedding, and the real chapters.

**Button:** `SEE WEDDING EMCEE PACKAGES` → /wedding-emcee#packages

**Button:** `CHECK YOUR WEDDING DATE` → /wedding-emcee#enquiry


· · ·

## Website developer — schema for this page

| Field | Value |
|---|---|
| Schema | WebPage (or CollectionPage) with five VideoObjects, one per section. Each: name, description, thumbnailUrl (https://i.ytimg.com/vi/<id>/maxresdefault.jpg), uploadDate (ISO 8601), duration, embedUrl https://www.youtube.com/embed/<id>, publisher = the business, actor or performer = the founder by @id. |
| Durations | hosting-reel: PT3M, singing-reel: PT3M1S, acting-reel: PT2M49S, party-games: PT1M11S, wedding: PT1M30S |
| @id | https://www.thecharismacode.co/videos/#<section-slug>, e.g. …/videos/#hosting-reel |
| Key moments | hasPart = one Clip per chapter (name, startOffset, endOffset, url with ?t=). Only with the real chapter times; the sample chapters are not marked up. |
| Trade-off | With five videos on one page Google may show a video result for only some of them; a page per reel would index better but is not worth the extra pages for now (client decision, 25 Oct 2026). |
| Service pages | The sections that show a reel today keep it and reference the VideoObject on /videos by @id with its core facts. |

