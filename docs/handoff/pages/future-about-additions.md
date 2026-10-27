# About — credentials, music and acting credits

_The Charisma Code  ·  /about (additions)  ·  draft 25 Oct 2026  ·  new content for future schema (dummy values highlighted)_

Source: `copy/future/about-additions.json` (same content as `copy/future/about-additions.docx`).

> _How to read this: headings are tagged H1 / H2 / H3. [BUTTON TEXT] → where it goes. This draft is filled with DUMMY CONTENT so it reads as a finished page: every dummy value is highlighted yellow, and the yellow CLIENT TO CONFIRM notes list what to replace. Nothing highlighted may be published as written._

> _Why this content: row B8, B9 and B10 of the Future Schema - Future Content tab. Schema it unlocks: hasCredential / award / memberOf; MusicRecording; Movie / TVEpisode with PerformanceRole. Google result today: None; entity strength for the founder. The page must visibly say everything the markup says, so the markup goes live only with the real values._

> _Researched 25 Oct 2026 from De Zhong's own sources (old-site résumé post, chiadezhong.carrd.co, his YouTube channel), IMDb (nm8069283) and the National Arts Council busker register. Every underlined name is a link (target after →). Only the two finalist years are still sample values._

## Addition 1 — Credentials and recognition (after "Meet Chia De Zhong")

**H2 ·** Credentials and recognition

- Corporate Communications graduate, **Singapore Management University** → https://www.smu.edu.sg
- Trainer with **Zenitant**, **Edublitz** and **Aktivate** → https://www.zenitanteducation.com · https://www.edublitz.com/sg/ · https://www.aktivate.sg
- Hosted at the inaugural **Singapore Youth Olympic Games**, 2010 → https://en.wikipedia.org/wiki/2010_Summer_Youth_Olympics
- Performed at the **Esplanade Theatre Studio** and the **Drama Centre Theatre** → https://www.esplanade.com/visit/venues-and-spaces/venues/theatre-studio · https://www.nlb.gov.sg/main/visit-us/drama-centre
- **ABRSM** Grade 8 Piano, with Merit → https://www.abrsm.org
- Busker endorsed by the **National Arts Council**, to November 2028 → https://eservices.nac.gov.sg/Busking/busker/profile/175a3ecb-a79f-4962-b04b-e94bcc808eda
- Finalist, **SAFRA's The Ultimate Talent**, <mark>2015</mark> → https://www.safra.sg
- Finalist, **UFM100.3**'s The Wedding Singer, <mark>2018</mark> → https://audio.sph.com.sg/ufm1003/
- Invited to the **COMPASS Awards Presentation** for several consecutive years, including the 28th in 2025 → https://www.compass.org.sg

> **Note:** The years of both finalist mentions (no public source found; his portfolio also lists 987TVStar 2014: add it?). The year of the ABRSM certificate. Whether De Zhong is a COMPASS member (only then is memberOf used). Whether the Youth Olympic Games role is "hosted" (portfolio: canoeing and rowing) or "performed at the athletes' welcome" (old About page).

## Addition 2 — Music (after the hosting reel)

**H2 ·** Music

De Zhong writes and performs songs as well as singing live at weddings and events.

- **好人的秘密** · original song by De Zhong · 2023 → https://www.youtube.com/watch?v=IMGeQI-Z5jY (teaser, 26 Sep 2023)
- **今天你要嫁给我** · cover → https://www.youtube.com/watch?v=ZjcxSHayLEQ
- **当你** · cover → https://www.youtube.com/watch?v=BnT8kIuAjWM
- **爱情** · cover of Karen Mok → https://www.youtube.com/watch?v=XLeuxEvMrMo

**Button:** `WATCH THE SINGING REEL` → /videos#singing-reel

**Button:** `LISTEN ON SOUNDCLOUD` → https://soundcloud.com/chia-de-zhong

> **Note:** Is 好人的秘密 released in full (Spotify, Apple Music)? If so, link the release instead of the teaser. Any other original songs, especially those registered with COMPASS.

## Addition 3 — Acting credits (after the acting reel)

**H2 ·** Acting credits

Selected screen credits. The full list is on IMDb.

- **Provocative** · TV series · 2025 · Joey → https://www.imdb.com/title/tt35292564/
- **Moments 时光倾城** · Mediacorp Channel 8 · 2024 · 香蕉 (Banana) → https://www.youtube.com/watch?v=DT9j7nrsjqA
- **Sunny Side Up** · TV series · 2022–2024 · Ong Wei Long → https://www.imdb.com/title/tt22393540/
- **Titan Academy** · web series · Timmy, Class N4-T1 → https://www.youtube.com/@jianhao2
- **Fried Rice Paradise** · TV series · 2019 · Young Rickson → https://www.imdb.com/title/tt11580660/
- **Kin** · TV series · 2018 · Willy Lee → https://www.imdb.com/title/tt12422990/
- **Crimewatch** · TV series · Alex → https://www.imdb.com/title/tt5782022/
- **Tanglin** · TV series · 2015 · Vincent → https://www.imdb.com/title/tt4721442/
- **Code of Law** · TV series · 2015 · Yee Fong → https://www.imdb.com/title/tt2399334/

**Button:** `SEE ALL CREDITS ON IMDB` → https://www.imdb.com/name/nm8069283/

> **Note:** Which credits to feature, and in what order. IMDb also lists Mata Mata, Zero Calling, Lion Moms, Verdict, A Selfie's Tale, Senior Management, After Love and Love by Numbers. The Titan Academy role is Timmy (Titan Academy wiki), not Jimmy as first guessed. Moments has no IMDb page, so it links to his own clip.


· · ·

## Website developer — schema for this page

| Field | Value |
|---|---|
| Founder sameAs | Add to the Person (not the Organization): https://www.imdb.com/name/nm8069283/, https://www.youtube.com/@deprinceofzhong, https://soundcloud.com/chia-de-zhong, https://chiadezhong.carrd.co, plus his Instagram, Facebook, TikTok and X profiles once he confirms them. |
| Education | alumniOf = CollegeOrUniversity Singapore Management University (url https://www.smu.edu.sg, sameAs its Wikipedia page). |
| Trainer roles | affiliation = Organization per company (name, url): Zenitant, Edublitz, Aktivate. |
| Youth Olympic Games | performerIn = Event "2010 Summer Youth Olympics" (startDate 2010-08-14, location Singapore, sameAs https://en.wikipedia.org/wiki/2010_Summer_Youth_Olympics). |
| Venues | No markup: no dated performance to describe. The links stay as plain page links. |
| Credentials | hasCredential = EducationalOccupationalCredential: "ABRSM Grade 8 Piano (Merit)" (credentialCategory certificate, recognizedBy Organization ABRSM, url https://www.abrsm.org) and "Busking Letter of Endorsement" (credentialCategory license, recognizedBy Organization National Arts Council, url = the NAC profile). |
| Competitions | award (Text) in the confirmed wording only, e.g. "Finalist, SAFRA's The Ultimate Talent (year)". Not emitted until the years are confirmed. |
| COMPASS | memberOf Organization COMPASS (url https://www.compass.org.sg) only if he is a member; the invitation alone is not markup. |
| Acting | One TVSeries (or CreativeWorkSeries for Titan Academy) per credit: name, sameAs = the IMDb title URL, actor = PerformanceRole { actor = the founder by @id, characterName }. Plus sameAs IMDb on the Person. |
| Music | 好人的秘密: MusicRecording (byArtist = the founder, datePublished 2023-09-26, url = the YouTube link) with recordingOf = MusicComposition (composer and lyricist = the founder, once confirmed). Covers: MusicRecording with byArtist = the founder; recordingOf names the original song, no composer claimed. |
| Go-live rule | Mark up only confirmed lines; the two finalist years are still samples. |

