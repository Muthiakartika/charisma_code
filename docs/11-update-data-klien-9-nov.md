# 11 — Peta Update dari Data Klien (9 Nov 2026)

**Sumber:** tiga workbook yang kita kirim ke De Zhong pada 30 Okt, dan diisi olehnya pada **5 Nov 2026** (Google Drive, folder yang sama dengan ProposalV2):

| Workbook | Isi | Yang dijawab klien |
|---|---|---|
| **Pricing Details to Supply** | Harga 27 item, layanan "quoted", syarat booking, detail lain | Sebagian besar harga emcee + semua syarat booking |
| **Other Details to Supply** | Foto yang perlu diganti, detail layanan, review, 33 brand | Detail layanan dijawab; foto & review hampir kosong |
| **Details to Supply** | Studi kasus per halaman, brand baru, checklist studi kasus | Nama klien per halaman + 12 brand baru (tanpa detail studi kasus) |

**Status (10 Nov 2026):** bagian A sudah diterapkan di brief Inggris dan draf Mandarin, di-import ke database **lokal**, dan dicek di 20 halaman Inggris dan 11 halaman /zh. /legal, TikTok dan logo Olimpiade juga sudah (lewat `src/seed/handoff/client-data-2026-11-09.ts`). Belum di-commit, belum ke staging. Lihat bagian E di bawah untuk keputusan sementara yang diambil saat menerapkan.

> Catatan: di folder Drive yang sama ada **ProposalV2.xlsx** yang diubah 6 Nov (sehari setelah jawaban ini). Belum dibaca; mungkin berisi info tambahan.

---

## Ringkasan cepat

- **Harga emcee berubah besar.** Hampir semua harga placeholder kita terlalu rendah. Contoh: D&D dan CNY dari S$888 menjadi **mulai S$2,800**, wedding dari S$588 menjadi **S$988**.
- **Struktur paket wedding salah.** Klien hanya punya **satu paket** (S$988), bukan tiga.
- **Kids & Youth Programs belum pernah dijalankan** ("haven't done any of it yet"). Ini mempengaruhi seluruh halaman `/kids-youth-programs`.
- **Coaching belum final** ("boutique, haven't finalised yet").
- **SOMA dan Kuok Maritime perlu dikurangi penekanannya** (hubungan kerja kurang baik / klien tertutup).
- **Alamat jangan dipublikasikan** (alamat rumah).
- **Foto pengganti, review, dan detail studi kasus belum dikirim.** Klien hanya menyebut nama-nama klien.

---

## A. Sudah jelas: bisa langsung diterapkan

Semua copy diubah lewat brief `docs/handoff/pages/<halaman>.md` (lalu `npm run import:handoff`), **dan** versi Mandarinnya di `docs/zh-draft/pages/<halaman>.md`. Harga yang sama juga muncul di home, `/emcee`, `/rates`, FAQ, meta description dan schema; semuanya ikut diganti.

### Harga dan isi layanan

| Halaman | Sekarang di website | Ganti menjadi (jawaban klien) |
|---|---|---|
| `/wedding-emcee` | 3 paket: S$588 / S$888 / S$1,288, "about 3–4 hours" | **S$988** untuk maksimal **4 jam termasuk rehearsal dan sound check**; **S$150 per jam tambahan**; 1–2 lagu opsional (pakai instrumental track; kalau ada piano di venue, dia main sambil nyanyi; bawa keyboard sendiri / set lebih panjang = tanya dulu); games/aktivitas sesuai kebutuhan; **deposit S$300** untuk booking, sisa dibayar di akhir hari acara |
| `/wedding-emcee` | Lunch/dinner/solemnisation di venue | Semua masuk blok 4 jam yang sama (dia dibayar per blok 4 jam) |
| `/wedding-emcee` | "Transport outside Singapore" sebagai extra | Bisa wedding di luar negeri ("I would love to"); transport + hotel ditagihkan |
| `/dinner-and-dance-emcee` | From S$888, "most D&Ds S$888–2,888" | **Mulai S$2,800**, emcee saja, blok hingga 4 jam; DJ/sound system tambahan |
| `/dinner-and-dance-emcee` | Add-on "custom song and backing track" | Hapus. Ganti: **1–2 lagu gratis** (bukan lagu custom) |
| `/dinner-and-dance-emcee` | Siapa sediakan properti games? | Disediakan klien; De Zhong bisa bantu belikan **dengan biaya** |
| `/chinese-new-year-emcee` | Dinner Emcee from S$888 | **Mulai S$2,800** (sama dengan D&D: emcee saja, hingga 4 jam, DJ/sound tambahan). Harga direct-to-client |
| `/conference-emcee` | From S$1,588 full day, S$888 half day | **S$350 per jam**, minimum engagement sekitar S$1,000 (lihat pertanyaan 6) |
| `/roadshow-emcee` | S$128–228 per jam, minimum 3 jam | **S$250 per jam**, minimum **S$600** (lihat pertanyaan 7) |
| `/government-community-emcee` | From S$888 | **S$300 per jam**, minimum **S$600** (walau acara 1 jam) |
| `/school-family-emcee` | Badge MOST POPULAR di School Event Emcee; jam hosting tetap | Hapus badge (bukan yang paling laku). Jam hosting jangan dipatok ("timing is boutique" = disesuaikan) |
| `/corporate-workshops` | Hero memakai S$120 (harga coaching); FAQ "workshops in Mandarin?" | Hapus S$120. Workshop **hanya bahasa Inggris**, disesuaikan per perusahaan; harga mengikuti budget, biasanya "beberapa ribu" untuk korporat |
| `/corporate-workshops`, `/kids-youth-programs` | Program 3 hari S$388 dari materi lama | **Salah** (dibuat web producer lama). Hapus dari semua halaman |
| `/dinner-and-dance-planning` | Hadiah lucky draw "agreed with your committee" | Hadiah dari klien; bisa dibantu carikan **dengan biaya tambahan** |
| `/creative-campaigns` | Hak konten belum disebut | Disesuaikan per diskusi; masa pakai konten biasanya **1 bulan sampai 1 tahun** |
| `/event-support` | Foto/video "edited and delivered", tanpa waktu | Biasanya **1–2 minggu** (atau sesuai permintaan). Tambah: **live band** bisa dibooking lewat partner |
| `/government-community-emcee` | Proposal "format procurement" | Bisa quote lewat **GeBIZ** dan menyediakan dokumen procurement. **Semua** klien sektor publik boleh disebut |
| `/roadshow-emcee` | School roadshow? | Ya (sudah ada di halaman, tetap) |
| `/services` | Tidak menyebut luar negeri | Menerima acara **di luar Singapura** |

### Syarat booking (`/rates` dan `/legal`)

| Topik | Jawaban klien | Yang ditulis |
|---|---|---|
| Deposit | 50/50 "works for me" | 50% saat konfirmasi, 50% di hari acara. Tampilkan juga di `/rates` (kecuali wedding: S$300, lihat pertanyaan 3) |
| Peak dates | "quoted, based on demand" | FAQ: harga tanggal ramai ditentukan per permintaan |
| GST | "no" | Tidak terdaftar GST, jadi tidak ada GST yang ditambahkan |
| Overtime | "yes" | Ada biaya overtime (tarifnya: pertanyaan 16) |
| Transport | Sentosa: biaya transport. Luar negeri: transport + hotel | Tulis di `/rates` dan FAQ wedding |
| Masa berlaku quotation | 2 minggu | Tulis di `/rates` |
| Pembayaran | PayNow lebih disukai | Tulis di `/rates` dan `/legal` |

### Kontak dan About

| Halaman | Jawaban klien | Yang dilakukan |
|---|---|---|
| `/contact` | Alamat = rumah, **jangan dipublikasikan** | Hapus kartu "Studio address" dan placeholder peta "Singapore 000000". Schema LocalBusiness tanpa alamat jalan (cukup area layanan Singapura) |
| `/contact` | "can put as hidden text if it helps SEO" | **Jangan.** Teks tersembunyi melanggar aturan spam Google dan alamatnya tetap terbaca di kode halaman. Cukup Google Business Profile sebagai *service-area business* (alamat disembunyikan) |
| `/contact` | Waktu balas | "We reply within 3 days" |
| `/about` | Timeline milestone | Sudah benar |
| `/about` | Youth Olympic Games 2010 | **Keduanya**: host (canoeing & rowing) **dan** tampil di athletes' welcome |
| `/about` | COMPASS | Dia **member**, tapi di COMPASS Awards hanya **tamu**: jangan ditonjolkan; foto COMPASS di Corporate Emcee harus diganti (memberi kesan dia yang host) |
| `/about` | 好人的秘密 | **Belum dirilis**. Jangan tulis seolah sudah rilis. Lagu baru direncanakan rilis sekitar Jan 2027 |
| `/about` | Acting credits | Utamakan **Crimewatch** (bertahun-tahun, acara besar di Singapura) dan **Titan Academy**; sisanya bebas |
| `/about` | Media sosial | **@deprinceofzhong** di semua platform. Perusahaan belum punya akun, hanya website |
| `/about`, `/product-launch-events`, `/creative-campaigns`, `/our-work` | SOMA disebut terlalu sering (30 kali di brief) | Kurangi: cukup sebagai **satu contoh**, jangan jadi sorotan (lihat pertanyaan 22) |
| `/work-with-us/[role]` | Gaji contoh S$35/jam | Crew **mulai S$15/jam**, lainnya dibicarakan (tapi lowongan nyata belum ada) |
| `/insights/lo-hei-phrases` | "find on google" | Kita sendiri yang memverifikasi 6 frasa lo hei dari sumber terpercaya |

### Brand di `/our-work`

- 33 brand lama: kolom izin baris pertama berisi **"all ok"** dan tahun "can't remember for most". Artinya kemungkinan besar semua 33 boleh tampil (konfirmasi: pertanyaan 33).
- Logo Youth Olympic Games tetap **tidak dipakai** (tidak ada jawaban, merek Olimpiade dilindungi).
- 12 brand di workbook "Details to Supply", semuanya izin "OK": 9 baru (Kuok Maritime Group, McDonald's, Clarins, Prudential, M1, Giga, Burger King, Amazon Prime, ThinkAds) + 3 yang sudah ada di website (People's Association, Banyan Tree, Caregiving Welfare Association). Beberapa masih perlu dicek (pertanyaan 28–32).

### Kandidat studi kasus per halaman (baru nama, detail belum ada)

| Prioritas | Halaman | Pilihan klien |
|---|---|---|
| HIGH | `/corporate-team-building` | Kuok Maritime Group (The Big Pitch, Rasa Sentosa Shangri-La, 2026: planning, AV, media team, fasilitator) |
| HIGH | `/dinner-and-dance-planning` | United E&P |
| HIGH | `/dinner-and-dance-emcee` | Banyan D&D, Clarins (Maison Clarins D&D 2026), Foxy Affairs, DNA Brands |
| HIGH | `/product-launch-events` | Amazon Prime; SOMA (jangan ditonjolkan, kliennya tertutup) |
| HIGH | `/conference-emcee` | Grassroots Club Singapore |
| MEDIUM | `/corporate-workshops` | Kuok Maritime Group |
| MEDIUM | `/roadshow-emcee` | McDonald's (Samurai Burger 2026, direct), Burger King, Cocoa Tree, UOB |
| MEDIUM | `/government-community-emcee` | People's Association (beberapa kali setahun sejak 2010) |
| MEDIUM | `/chinese-new-year-emcee` | Daikin |
| NICE | `/school-family-emcee` | Sparkle Tots Preschool Family Day |
| NICE | `/communication-coaching` | "School workshops through vendors" |
| NICE | `/event-support` | Kuok Maritime Group |

Studi kasus belum bisa ditulis: checklist (brief, apa yang dikerjakan, hasil, 5–10 foto, testimoni, izin) belum dikirim untuk satu pun.

---

## B. Ambigu: perlu ditanyakan ke klien

> **Versi terbaru untuk klien (10 Nov 2026):** 51 pertanyaan bernomor, sudah disesuaikan dengan yang diterapkan, di halaman https://claude.ai/artifact/4zZxqT54kjW5Rq6zTRUgmT (privat sampai dibagikan lewat menu Share). Daftar di bawah ini versi 9 Nov.

Daftar di bawah dalam bahasa Inggris supaya bisa langsung dikirim ke De Zhong. Urutannya dari yang paling menghambat update harga.

### Prices (needed before we update any price)

1. **Wedding packages.** You have one standard package (S$988, up to 4 hours). Shall we replace the three packages on the page with this one package plus add-ons (extra hour S$150, own keyboard or longer sets quoted)? You asked what else could be extra: our suggestion is a tea ceremony on another day, a second venue on the same day, or a written bilingual script.
2. **Tea ceremony** on a different day: a separate 4-hour block at S$988, or charged by the hour?
3. **Deposit.** Weddings: S$300 to book, balance at the end of the day. All other services: 50% on confirmation, 50% on the event day. Is that right?
4. **Headline emcee price.** Home, /emcee and /rates say "Emcee from S$___". The lowest is now S$600 (roadshow and government minimum). Use "from S$600"?
5. **Corporate Emcee page** (award nights, annual dinners, company events). Which starting price? Suggestion: "Roadshows from S$600 · dinners and award nights from S$2,800".
6. **Conference:** S$350 per hour with a minimum of S$1,000. Is the minimum exactly S$1,000? Shall we show the hourly rate only, or also a full-day figure?
7. **Roadshow:** S$250 per hour, minimum S$600. How many hours does the S$600 minimum cover (the site says 3 hours)? Any rate for several days in a row?
8. **D&D and CNY from S$2,800** (emcee only, up to 4 hours). Should DJ and sound system show a starting price, or "quoted"?
9. **CNY packages.** Keep three packages (Dinner Emcee / Festive Games Host / Full Festive Programme)? If yes, the prices of the other two and which one is most booked. If not, one package from S$2,800.
10. **Product launch hosting.** You wrote it "matches the D&D price, but can go to 1+k". Show "from S$2,800" or "from S$1,000"?
11. **School, kids and family emcee.** S$588 / S$888 / S$1,288 were our placeholders from the proposal. What are your real starting prices, or should we show "quoted"?
12. **Team building:** is S$88 per participant (2 to 3 hours) right? Is there a minimum group size or minimum fee?
13. **Coaching:** keep S$120 per one-to-one session (from the old site) or show "quoted" until you finalise? Remove the sample "presentation skills course, S$480 for 4 sessions"?
14. **Corporate workshops:** may we write "most corporate workshops start from S$X,000"? Which figure? Or just "quoted to your budget"?
15. **Event planning:** may we publish "planned events usually start from S$10,000"?
16. **Overtime** for events other than weddings: the same hourly rate as that service? (Weddings: S$150 per hour.)
17. **Extras on /rates:** live singing, bilingual scripts, rehearsals. Show as "included" (1 to 2 songs and rehearsal are already in the wedding package) or "quoted"?

### Terms

18. **Cancellation.** You suggested: within 7 days, no refund; 1 month before, 50% refund. What happens between 8 and 29 days, and more than a month before? Is it 50% of the amount paid, or of the full fee? Our suggestion (fair and simple): more than 30 days before: 50% of the amount paid refunded; 8 to 30 days: 25%; 7 days or less: no refund; one free date change if booked more than 30 days before.

### Content

19. **Kids & Youth Programs:** you haven't run these yet. Hide the page until you are ready, or keep it as "enquire for your school" without prices, hours or camp details? Should the Maris Stella school programme stay as the example?
20. **Communication Coaching:** keep the page live with general copy and "quoted", until the format is final?
21. **Kuok Maritime Group:** you chose them for team building, workshops and event support, but also said they were a difficult client who may not like a page about them. Full case study with their name, an anonymous one ("a maritime group, 2026"), or logo only?
22. **SOMA:** keep the SOMA case study page on Our Work (with less emphasis), or remove it and only name SOMA once as an example?
23. **Address:** we will not publish your address anywhere, including hidden text (Google treats hidden text as spam, and it can still be read in the page code). OK? Do you meet clients somewhere else (their office, online)?
24. **About photos "look too digital":** which photos? May we upscale them with AI and send them to you for approval before they go live?
25. **Music:** mention the new single ("coming in 2027") now, or wait until it is out? Should 好人的秘密 stay on the page as an unreleased original, or be removed?
26. **COMPASS:** mention your membership quietly on About, or leave it out?
27. **Overseas weddings:** may we write "Available for overseas weddings; transport and accommodation are charged at cost"?

### Brands and case studies

28. **Work through partner agencies** (Clarins, M1, Burger King, Amazon Prime, Banyan Tree): which agency was it, and does the agency allow you to show the brand?
29. **ThinkAds** is a partner agency. Show it as a brand on Our Work, or leave it out?
30. **Prudential:** what did you do for them (event, year)?
31. **Giga:** is it StarHub's giga!?
32. **New names in your notes** that are not on the brand list: United E&P, Foxy Affairs, DNA Brands, Grassroots Club Singapore, UOB, Daikin, Sparkle Tots Preschool. May we show the name and logo, and what did you do for each?
33. **"All ok" on the brand list:** does it mean all 33 brands may be shown with their logo?
34. **Coaching example "school workshops through vendors":** which school and vendor, and may we name them?
35. **Case study details:** for each chosen case study we need the checklist (brief, what we did, result, 5 to 10 photos, testimonial, permission). Could you start with the five HIGH pages: Kuok (team building), United E&P (D&D planning), Clarins (D&D emcee), Amazon Prime (launch), Grassroots Club (conference)?

### Reviews and photos

36. Please send the **review screenshots** you mentioned and your **Google Business Profile link** (for the reviews button).
37. **Photos:** the "your photo" column was left empty. Could you share a folder of event photos (conference, CNY, roadshow, workshop, kids, crew)?

---

## C. Belum dijawab sama sekali (masih kosong di workbook)

Bukan ambigu, hanya belum diisi. Bisa diingatkan bersama daftar di atas.

| Topik | Item kosong |
|---|---|
| Foto | Semua 33 foto pengganti; foto Instagram pribadi di homepage boleh atau tidak; siapa pemilik foto studi kasus; izin tertulis untuk foto anak-anak |
| Review | Semua halaman kecuali satu jawaban umum ("pakai yang cocok dari Google reviews / screenshots") |
| Harga | Storybook/character guests; presentation course; youth masterclass; public session teens; harga full launch, creative campaigns, event support |
| Layanan | Hybrid launch & lead time; apa yang klien terima di akhir campaign; durasi/bahasa/online untuk coaching; jam camp & rasio anak |
| About | Tahun final SAFRA & UFM100.3 ("need to check"); tahun ABRSM Grade 8; 987TVStar 2014 |
| Our Work | Website Nirvana Memorial Garden; SuperSports Arena & Singapore Food Show tanpa website |
| Halaman baru | Chapter video & video wedding yang mana; tanggal terbit artikel lo hei; resources gratis atau tukar email; liputan press lain + link meWATCH; profil crew; lowongan nyata |
| Legal | Hosting website: **ini bisa kita isi sendiri** (Vercel, database Neon di Singapura, file di Cloudflare R2) |

---

## D. Cara menerapkan (untuk developer)

1. Ubah brief `docs/handoff/pages/*.md` (+ `src/seed/handoff/recipes.ts` bila foto/section berubah), jalankan `npm run import:handoff -- <slug>` secara lokal.
2. Ubah versi Mandarin di `docs/zh-draft/pages/*.md` dengan angka dan syarat yang sama (270 penyebutan harga di draf Mandarin), lalu `npm run import:zh`.
3. Tambah baris baru di `UPDATES` pada `src/seed/handoff/deploy.ts` (versi + slug halaman) agar staging ikut ter-update saat deploy.
4. Halaman yang tidak lewat brief (`/legal`, konten CMS lama) diubah di `/admin` atau lewat migrasi konten.
5. Catat item yang selesai di `docs/04-konfirmasi-klien.md` dan `docs/handoff/README.md` §6.

**Urutan yang disarankan:** terapkan dulu bagian A yang tidak bergantung pada jawaban (syarat booking, kontak, About, workshop bahasa Inggris, D&D/CNY S$2,800, roadshow, government, add-on D&D, event support, creative campaigns). Harga yang masih menunggu (pertanyaan 1–17) tetap placeholder sampai klien menjawab.

---

## E. Yang sudah diterapkan (9 Nov 2026)

**File yang diubah:** 26 brief di `docs/handoff/pages/`, kredensial About di `src/seed/handoff/recipes.ts`, schema di `src/lib/seo.ts`, TikTok di `src/seed/index.ts`, langkah deploy di `src/seed/handoff/deploy.ts` (versi `2026-11-09`, 24 halaman) dan `deploy-zh.ts` (versi `2026-11-09`). Draf Mandarin di `docs/zh-draft/` ikut disesuaikan.

**Cadangan database lokal sebelum import:** `charisma_before_2026_11_09` (salinan database `charisma`).

### Keputusan sementara (sampai klien menjawab pertanyaan di bagian B)

| Halaman | Yang ditulis sekarang | Kenapa | Pertanyaan |
|---|---|---|---|
| Home, `/emcee`, `/rates` | "Emcee hosting from **S$600**" | Harga terendah yang dikonfirmasi (minimum roadshow dan government). S$588 sudah pasti salah | 4 |
| `/corporate-emcee` | "Dinners and award nights from S$2,800 · roadshows from S$250 per hour" | Kalimat klien sendiri: "DND is $2800 onwards, roadshows … $250/hour" | 5 |
| `/conference-emcee` | "From S$1,000 · S$350 per hour" | "min engagement 1K+" | 6 |
| `/chinese-new-year-emcee` | Dinner Emcee S$2,800; dua paket lain **"Quoted"** | Harga lama (S$1,588, S$2,888) jadi tidak masuk akal di bawah S$2,800 | 9 |
| `/product-launch-events` | Hanya "Quoted per launch" | S$888 "way too low", angka baru belum jelas | 10 |
| `/corporate-workshops` | "Quoted per programme, adapted to your budget"; S$120 coaching dihapus dari hero | Klien: tanya budget dulu, biasanya beberapa ribu | 14 |
| `/kids-youth-programs`, `/rates` | Camp 3 hari **"Quoted"** (S$388 dihapus) | Klien: S$388 salah, dibuat web producer lama | 19 |
| `/wedding-emcee` | Satu paket S$988 + kartu "Add to your day" | Klien: "this is my package"; tiga paket "the same thing" | 1 |
| About | Member COMPASS; tahun final kompetisi dihapus | Klien: COMPASS "nothing to shout about"; tahun "need to check" | 26 |
| Home | Kartu SOMA diganti studi kasus Caregiving Welfare Association | SOMA "mentioned too frequently" | 22 |
| Schema | Profil sosial dipindah dari Organization ke Person (De Zhong) | "company only has website so far" | – |

### Belum dikerjakan

- ~~`/legal`~~ **selesai 10 Nov**: deposit 50/50 (wedding S$300), PayNow, quotation 2 minggu, hosting (Vercel Singapura, Neon Singapura, Cloudflare), "Last updated" 10 Nov 2026. Aturan pembatalan menunggu pertanyaan 18.
- ~~TikTok di Social Links~~ **selesai 10 Nov** (ikut otomatis ke staging saat deploy). X/Twitter belum punya kolom.
- **Logo Youth Olympic Games** disembunyikan dari strip logo (10 Nov): merek Olimpiade dilindungi dan klien tidak mengirim izin tertulis. Bisa dinyalakan lagi di /admin → Clients.
- **FAQ roadshow** "weekends or public holidays" kini terisi (10 Nov): "quoted based on demand", sesuai jawaban klien soal tanggal ramai.
- **Logo sektor publik** di `/government-community-emcee` (klien: semua boleh disebut).
- **Foto**: tidak ada foto pengganti dari klien, jadi foto COMPASS di Corporate Emcee dan foto lain yang "CHANGE" belum diganti.
- **Artikel lo hei**: klien bilang "find on google"; frasanya perlu kita verifikasi sendiri.
