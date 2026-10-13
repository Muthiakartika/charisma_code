# 01 — Audit Website Lama (thecharismacode.co)

Tanggal audit: 12 Oktober 2026
Metode: sitemap Yoast, WordPress REST API publik (`/wp-json/wp/v2/...`), HTML halaman, file CSS Elementor, dan pemeriksaan visual foto.
Semua data mentah hasil ekspor **tidak** disalin ke repo (hanya ringkasan di dokumen ini).

---

## 1. Platform & teknologi lama

| Komponen | Temuan |
|---|---|
| CMS | WordPress + Elementor + Jeg Elementor Kit |
| SEO | Yoast SEO (sitemap index, title & meta description) |
| Form | MetForm (form kontak: Name, Email, Subject, Message) |
| Ulasan | Widget Trustindex (menarik ulasan Google) |
| Chat | Tombol WhatsApp mengambang (`+65 9437 8083`) |
| Domain | `https://www.thecharismacode.co` (apex & http → 301 ke www + https) |
| robots.txt | Ada `Crawl-delay: 10` (tidak perlu untuk Google, akan dihapus) |

## 2. Inventaris konten

| Jenis | Jumlah | Catatan |
|---|---|---|
| Halaman (pages) | 10 | home, about, services, services/emcee, services/events-planning, services/workshops, portfolio-testimonials, blog, contact, legal, + `sample-page` bawaan WordPress |
| Artikel (posts) | 70 | Semua di root URL: `/{slug}/` |
| Kategori | 7 | blog, campaigns, emcee, event, invites, uncategorized, workshops |
| Tag | ±100 | Banyak tag tipis (thin content) — tidak akan dimigrasi |
| Media | 327 file | 256 JPEG, 35 WebP, 12 PNG, **10 HEIC** (tidak tampil di browser), 11 video MOV/MP4, 2 PDF (resume), **1 DOCX** |

### Halaman utama dan pesan yang ada

- **Home**: "Lead With Charisma — Empowering Voices. Elevating Events. Entertaining You." Tiga layanan: Emceeing/Performances/Event Planning, Workshops & Coaching, Campaign Management.
- **About**: "The Story Behind the Stage". **Masih ada teks Lorem ipsum** (bagian "Knowing More", "Selling Tips", dst.) → tidak dimigrasi.
- **Services**: 4 layanan inti + harga workshop (lihat bagian 7).
- **services/emcee, events-planning, workshops**: artikel panjang bergaya "ultimate guide" yang generik (bukan halaman penjualan). Isinya umum ("What is an emcee?") dan kurang menonjolkan keunggulan klien.
- **portfolio-testimonials**: 5 video YouTube, daftar 34 logo "Partners we worked with", galeri 44 screenshot testimoni, galeri 30 foto. **Ada Lorem ipsum** di bagian "Our Working Process".
- **contact**: email, telepon, UEN, sosial media, form sederhana.
- **legal**: Terms & Conditions + Privacy Policy (PDPA) + Cookie Notice dalam satu halaman.

### Fakta bisnis yang tercantum di website lama (bisa dipakai, tetap perlu konfirmasi)

| Fakta | Sumber di website lama |
|---|---|
| Email: `hello@thecharismacode.co` | Contact |
| Telepon/WhatsApp: `+65 9437 8083` | Contact |
| UEN: `53505860L` | Contact |
| Instagram: `@deprinceofzhong` · Facebook, LinkedIn `/in/deprinceofzhong` · YouTube channel | Contact |
| Tagline: "We Bring the Spark, You Shine." | Home, About |
| Founder: Chia De Zhong — emcee bilingual (EN/中文), penyanyi-pianis, aktor, edukator | Artikel "Meet Chia De Zhong" (Sep 2026) |
| Lulusan Singapore Management University (SMU), jurusan Corporate Communications | Artikel yang sama |
| Host di Singapore Youth Olympic Games 2010 | Artikel yang sama + Services |
| Tampil di Esplanade Studio & Drama Centre Theatre | Services, artikel |
| Finalis SAFRA "The Ultimate Talent" dan UFM100.3 "The Wedding Singer" | Artikel founder |
| Pengalaman mengajar dengan Zenitant, Edublitz, Aktivate | Artikel founder |
| Wawancara MediaCorp Channel 8 (23 Sep 2025) | Artikel |
| Diundang ke 28th COMPASS Awards Presentation 2025 | Artikel |
| **Tidak ada alamat bisnis** yang dipublikasikan | — |

> ⚠️ **Inkonsistensi**: Home/About menulis "over 15 years on stage and 5 years in classrooms", artikel September 2026 menulis "16 years". Perlu satu angka resmi dari klien.

> ⚠️ **Angka statistik** ("k+ Hearts Touched", "Events led", "Satisfied Clients") adalah counter animasi; nilai aslinya tidak terbaca dari HTML. **Tidak akan dipakai** sampai klien memberi angka yang bisa dipertanggungjawabkan.

## 3. Identitas brand

- **Logo**: monogram serif "CC" + wordmark "THE CHARISMA CODE" warna charcoal di atas cream. Hanya tersedia sebagai **raster WebP dengan latar cream** (`logo.webp`, `logo-horizontal.webp`). **Belum ada versi SVG/transparan** → diminta dari klien (dibutuhkan untuk header gelap, favicon tajam, dan OG image).
- **Warna Elementor**: cream `#F9F2E8`, charcoal `#4B5151`, `#313535`, `#2A2E37`, teks `#606060`.
- **Font**: Raleway (semua heading & body).
- **Kesan visual saat ini**: template Elementor generik; banyak blok teks panjang; hierarki layanan tidak jelas (semua layanan tampak setara, team building nyaris tidak muncul).

## 4. Foto & video

**Foto** — mayoritas foto asli dari acara, bukan stok:
- Kekuatan: autentik, energik, berwarna; menunjukkan interaksi nyata De Zhong dengan audiens (pernikahan, D&D, acara komunitas, pesta anak, roadshow, sekolah).
- Set foto profesional terbaik: **peluncuran parfum SOMA** (fotografer profesional, pencahayaan rapi) dan beberapa foto pernikahan.
- Kelemahan: banyak **selfie panggung** dari ponsel; kualitas & rasio tidak konsisten; 10 file HEIC tidak bisa tampil di web (perlu konversi).
- Foto anak sekolah (Maris Stella) sudah di-blur wajahnya — praktik yang baik dan **akan dipertahankan** (PDPA/anak di bawah umur).
- ❗ **Tidak ditemukan foto corporate team building** sama sekali, padahal ini prioritas bisnis #1. **Klien wajib menyediakan foto team building/workshop korporat.** Sementara itu desain memakai foto keterlibatan grup yang paling relevan dan ditandai "ganti dengan foto team building" di CMS.

**Video (YouTube)** — siap dipakai sebagai embed ringan (thumbnail dulu, iframe saat diklik):

| Judul di website lama | ID YouTube |
|---|---|
| Hosting Reel (2023) | `Wo9XVBQohEg` |
| Singing Reel (2023) | `b-b5ePeUW4o` |
| Wedding Emcee & Singer in Action | `ANC2fV9moMw` |
| Children's Games / Party Hosting & Science Magic Show | `4FZJoAGRiRU` |
| Acting Reel (2023) | `N1JgStPpe0g` |
| Caregiving Welfare Association (CWA) event | `OSz2OrNO_jg` |
| MediaCorp Channel 8 interview | `jChcHL4x9jI` |

Video MOV/MP4 mentah di media library (11 file) belum dioptimasi untuk web; sebaiknya diunggah ke YouTube/Instagram lalu di-embed.

## 5. Testimoni

**Ulasan Google (via Trustindex) — 9 ulasan tampil di homepage:**

| Nama | Konteks | Status |
|---|---|---|
| Grace Lim | Wedding emcee | ✅ Asli, relevan |
| missionyesido | Wedding emcee (piano & menyanyi gratis) | ✅ Asli, relevan |
| RA DL | Event emcee, improvisasi | ✅ Asli, relevan |
| Sheena Mulani | Charity event klien | ✅ Asli, relevan |
| Jaz Hang | Pool party (korporat/komunitas) | ✅ Asli, relevan |
| Yeo Xiao Yu Zenna | Wedding emcee | ✅ Asli, relevan |
| Alphonsus Ang | Luncheon (lagu, script, yum seng, improv) | ✅ Asli, relevan |
| Jeff Png | Wedding emcee | ✅ Asli, relevan |
| **Dr Fin Ariffin** | **Tentang perawatan estetika** | ❌ **Salah tempat — bukan ulasan The Charisma Code. TIDAK dimigrasi.** Klien sebaiknya memeriksa sumber widget Trustindex. |

**44 screenshot testimoni** (WhatsApp/Instagram) di halaman portfolio: memuat nama, foto profil, dan percakapan pihak ketiga. Untuk kepatuhan PDPA, **tidak akan diunggah ulang sebagai screenshot**. Rekomendasi: klien memilih 5–10 terbaik, meminta izin, lalu kita ubah menjadi kutipan teks (nama/inisial sesuai izin).

> Catatan: belum ada testimoni dari klien **corporate team building**. Ini perlu dikumpulkan (prioritas tinggi untuk konversi).

## 6. Logo klien ("Partners we worked with")

34 nama: Youth Olympic Games, Singapore Sports Council, People's Association, Singtel, Samsung, MediaCorp, SuperSports Arena, OCBC, Maybank, HSBC, AVIVA, Singapore Street Festival, Book Council SG, Marriott Vacation Club, Singapore Food Show, Smeg, Dolce & Gabbana, SMARTIES APAC, FairPrice Xtra, Carlsberg, Shopee, Lazada, Alpecin, Cocoa Trees, Marigold, Energizer, Monkey Shoulder, The Smart Local, Titan Digital Media, StarHub, Sentosa, Kaboodle, Hyundai, Nirvana Memorial Garden.

- 26 logo dimuat dari layanan pihak ketiga `img.logo.dev` (dengan token API terekspos di HTML) — **tidak akan dipakai**.
- Hubungan kerja tiap nama tidak dijelaskan (emcee? roadshow? kampanye KOL?).
- **Tindakan**: semua dimigrasi ke koleksi **Clients** di CMS dengan status `Perlu konfirmasi klien`. Sampai logo resmi tersedia, website menampilkan nama klien sebagai daftar tipografi (lebih elegan dan aman dari masalah merek dagang). Klien perlu mengonfirmasi: (1) daftar final, (2) konteks proyek, (3) izin menampilkan logo.

## 7. Harga yang ada di website lama

- 3-day immersive program: $388 per peserta
- Modular programme (±10 jam): $880 per grup sekolah
- 1-on-1 Masterclass: $120 per sesi

Website baru memakai pendekatan "proposal yang disesuaikan" (tailored), sehingga **harga tidak ditampilkan** kecuali klien mengonfirmasi harga terbaru dan ingin menampilkannya.

## 8. Artikel blog (70 post)

**A. Konten asli founder/proyek (bernilai tinggi — jadi bahan portofolio, Founder's Updates & bukti E-E-A-T):**

| Artikel | Pemakaian di website baru |
|---|---|
| The Banyan Group D&D di Mandai Rainforest Resort (Nov 2025) | Proyek D&D + artikel |
| Christmas party Lectrix Engineering di InterContinental (Des 2025) | Proyek korporat + artikel |
| Wedding Pao & Zhi Qin di Sheraton Towers (Jan 2026) | Proyek wedding + artikel |
| Caregiving Welfare Association event (Sep 2026) | Proyek komunitas + artikel |
| SOMA Fragrances brand launch (2025) | Proyek kampanye + artikel |
| Videografi di Maris Stella High School (11 sesi × 2 jam) | Proyek kids & youth + artikel |
| Princess birthday party (Sep 2025) | Proyek kids/event support |
| MediaCorp Channel 8 interview | Founder update |
| 28th COMPASS Awards | Founder update |
| Meet Chia De Zhong — Portfolio 2026 (+ PDF resume) | Halaman About |
| Why choose an emcee who does more than weddings | Artikel wedding |
| Trendjacking in content strategy | Artikel campaigns |

**B. ±58 artikel SEO generik** (judul "keyword-stuffed", misalnya *"Can Wedding Emcee Speak Confidently? Emcee Singapore Rate in 2026"*). Masalah:
- Banyak topik saling bertabrakan (kanibalisasi: ±6 artikel "best event company Singapore").
- Beberapa meta description salah total (contoh: artikel wedding emcee berisi deskripsi tentang "web hosting & email hosting").
- Nada generik, tidak menonjolkan pengalaman nyata De Zhong.

**Rekomendasi**: jangan hapus begitu saja. Langkah aman:
1. Migrasikan semua artikel ke `/insights/{slug}` dengan redirect 301 dari URL lama (menjaga ranking/backlink).
2. Ambil data Google Search Console (klik, impresi, backlink) 12 bulan terakhir.
3. Artikel tanpa trafik → digabung (consolidate) ke artikel/halaman layanan terkuat + 301.
4. Artikel dengan trafik → ditulis ulang dengan pengalaman nyata.

## 9. Struktur SEO lama

- Title Yoast cukup terarah ke keyword, tetapi **halaman layanan tidak memiliki keyword team building sama sekali** (prioritas #1 bisnis tidak tercakup).
- Halaman `/services/` bertarget "celebrity emcee Singapore", `/about/` bertarget "event organizer Singapore" — tidak sesuai isi halaman.
- Dua sitemap bersaing: `sitemap.xml` statis (generator online, usang) dan `sitemap_index.xml` Yoast.
- Tidak ada hreflang / versi Mandarin.
- Tidak ada structured data khusus (selain bawaan Yoast).

## 10. Risiko migrasi

| Risiko | Mitigasi |
|---|---|
| Kehilangan ranking artikel yang URL-nya pindah | Peta redirect 301 lengkap (lihat `03-peta-migrasi-url.md`) + uji otomatis |
| Gambar lama di-hotlink dari luar (`/wp-content/uploads/...`) | Gambar penting dimigrasi ke R2; PDF resume diberi redirect khusus |
| `Edits.docx` di media library **bisa diunduh publik** | Klien perlu memeriksa & menghapus dari WordPress jika berisi data internal |
| Lorem ipsum & ulasan salah tempat | Tidak dimigrasi |
| Screenshot testimoni berisi data pribadi pihak ketiga | Diganti kutipan teks dengan izin |
| Foto HEIC & video mentah | Dikonversi/diunggah ulang |
| Belum ada foto & testimoni team building | Dicatat sebagai kebutuhan konten prioritas |
| Konten Mandarin belum ada | Tidak memakai terjemahan mesin untuk halaman SEO; perlu reviewer native |
