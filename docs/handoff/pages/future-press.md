# In the press — new page

_The Charisma Code  ·  /press (NEW)  ·  draft 25 Oct 2026  ·  new content for future schema (dummy values highlighted)_

Source: `copy/future/press.json` (same content as `copy/future/press.docx`).

> _How to read this: headings are tagged H1 / H2 / H3. [BUTTON TEXT] → where it goes. This draft is filled with DUMMY CONTENT so it reads as a finished page: every dummy value is highlighted yellow, and the yellow CLIENT TO CONFIRM notes list what to replace. Nothing highlighted may be published as written._

> _Why this content: row B7 of the Future Schema - Future Content tab. Schema it unlocks: subjectOf on the founder, linking to the coverage (VideoObject / NewsArticle). Google result today: None; it strengthens the founder and business as entities. The page must visibly say everything the markup says, so the markup goes live only with the real values._

**H1 ·** In the press

Interviews and features about De Zhong and The Charisma Code.

**H2 ·** On MediaCorp Channel 8's 狮城有约

[Embedded YouTube video]

> _Caption: 狮城有约  ·  MediaCorp Channel 8  ·  aired 16 Sep 2025  ·  10:15  (https://youtu.be/jChcHL4x9jI, uploaded to De Zhong's channel 26 Sep 2025)_

On 16 September 2025, De Zhong was a guest on 狮城有约 on MediaCorp Channel 8, in a segment about freelance and self-employed life. He spoke about building a career outside the traditional path, the sacrifices along the way, and why doing what you love is worth it.

**Button:** `WATCH THE INTERVIEW` → https://www.youtube.com/watch?v=jChcHL4x9jI

> **Note:** Confirmed from De Zhong's YouTube upload: programme 狮城有约, aired 16 September 2025 (an earlier post said 23 September). If MediaCorp has the segment on meWATCH, link that as well; the clip on his channel is his own upload.

**H2 ·** <mark>Lifestyle feature — careers in events</mark>

<mark>A lifestyle magazine feature, March 2026, on young Singaporeans building careers in hosting and events, with De Zhong as one of the people profiled.</mark>

**Button:** `READ THE ARTICLE` → ==https://www.example-magazine.sg/careers-in-events==

> **Note:** The second item is a SAMPLE. Replace it with real coverage (articles, radio such as UFM100.3, podcasts, school or industry features), each with a link, or remove it.

**Button:** `ABOUT DE ZHONG` → /about


· · ·

## Website developer — schema for this page

| Field | Value |
|---|---|
| Schema | CollectionPage. On the founder (defined on /about): subjectOf = each item of coverage (VideoObject or NewsArticle with name, url, datePublished, publisher as an Organization such as Mediacorp). |
| Channel 8 interview | VideoObject (@id …/press/#channel-8-interview): name "Channel 8 Interview on MediaCorp 狮城有约 16 September 2025", thumbnailUrl https://i.ytimg.com/vi/jChcHL4x9jI/maxresdefault.jpg, uploadDate 2025-09-26, duration PT10M15S, embedUrl https://www.youtube.com/embed/jChcHL4x9jI, about = the founder by @id. isPartOf = TVEpisode (broadcast 2025-09-16, partOfSeries TVSeries 狮城有约, productionCompany Organization Mediacorp). The founder gets subjectOf = this VideoObject. |
| Rule | Third-party coverage only, each with a working link. Never mark up the sample item. |

