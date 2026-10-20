# 02 — Arsitektur, Arah Desain & Rencana Implementasi

## 1. Sitemap baru

Prioritas bisnis tercermin di urutan navigasi, ukuran kartu layanan, dan internal link.

```
/                                   Homepage (EN)          /zh/   (Mandarin, setelah disetujui)
├── /corporate-team-building        ★ Prioritas 1 — landing page utama
├── /corporate-emcee                ★ Prioritas 2
├── /dinner-and-dance-emcee         ★ Prioritas 3 (intent D&D, beda dari corporate emcee)
├── /chinese-new-year-emcee         Landing page musim Imlek (Jan to Mar), ditambah 20 Okt 2026
├── /corporate-workshops            Prioritas 4
├── /communication-coaching         Prioritas 4 (individu & korporat)
├── /wedding-emcee                  Prioritas 5 — tema visual "Wedding"
├── /kids-youth-programs            Prioritas 6 — tema visual "Kids"
├── /creative-campaigns             Prioritas 7 (sekunder)
├── /event-support                  Prioritas 7 (sekunder)
├── /services                       Ringkasan semua layanan (mempertahankan URL lama /services/)
├── /our-work                       Portofolio + filter kategori
│   └── /our-work/[slug]            Detail proyek
├── /about                          Brand, founder, nilai, partner network
├── /insights                       Blog
│   ├── /insights/[slug]            Artikel
│   └── /insights/category/[slug]   Kategori
├── /contact                        Form enquiry
├── /work-with-us                   Rekrutmen freelancer (terpisah dari enquiry)
├── /legal                          Terms & Privacy (URL lama dipertahankan)
├── /sitemap.xml  /robots.txt
└── /admin                          Payload CMS
```

**Navigasi utama (desktop)**: Team Building · Emceeing ▾ (Corporate Emcee, Dinner & Dance, Chinese New Year, Weddings) · Workshops ▾ (Corporate Workshops, Communication Coaching, Kids & Youth) · Our Work · About · Insights · tombol **Let's Talk**.
Creative Campaigns & Event Support ada di menu "Services" (footer + halaman /services) karena sekunder.

## 2. Arah desain: "The Spotlight Studio"

**Konsep**: website ini terasa seperti *rundown acara* yang disusun oleh emcee profesional. Bagian-bagian halaman diberi label "cue" bernomor (misalnya `01 — The Brief`), proses kerja ditampilkan seperti susunan acara, dan aksen warna "Spark" muncul seperti lampu sorot — jarang, tetapi selalu di titik penting (CTA, angka langkah, highlight). Ini terhubung langsung dengan keahlian founder (emcee) tanpa menjadi gimmick.

**Satu identitas, tiga "pencahayaan"** — tipografi, logo, grid, spasi, komponen sama; yang berubah hanya token warna, radius, dan nuansa foto:

| | Corporate (default) | Wedding | Kids & Youth |
|---|---|---|---|
| Nuansa | Terstruktur, kredibel, tegas | Hangat, elegan, personal | Ceria, bulat, energik |
| Latar | Ivory `#F8F3EA` + Stage Ink `#1B1F1E` | Blush `#F6ECE6` | Ivory + blok warna cerah |
| Aksen | Spark vermilion `#D9481F` | Rosewood `#9C4A3E` + champagne | Sunny, Sky, Mint, Coral |
| Bentuk | Sudut tegas (radius kecil), garis tipis | Bingkai foto melengkung (arch) | Radius besar, badge "stiker", animasi mikro halus |
| Headline | Fraunces tegak | Fraunces *italic* | Fraunces "soft" (sumbu SOFT) |

**Tipografi**
- Display: **Fraunces** (variable font; satu keluarga font yang bisa tegas untuk korporat, italic untuk wedding, dan lembut untuk kids — memberi kesatuan brand). Nuansa serif ini melanjutkan logo monogram "CC".
- Teks: **Instrument Sans** — bersih, modern, mudah dibaca.
- Mandarin: font sistem (PingFang SC / Microsoft YaHei / Noto Sans SC) — tanpa mengunduh font CJK besar, demi performa.

**Prinsip yang dihindari**: gradien berlebihan, animasi berlebihan, foto stok, kartu layanan seragam, layout yang berulang. Setiap section punya pola komposisi berbeda (split editorial, bento bertingkat, rundown/timeline, daftar tipografi klien, kutipan besar).

**Fotografi**: foto asli klien, dibingkai dengan rasio konsisten. Foto selfie panggung dipakai di konteks "behind the scenes" (Founder's Updates), foto paling rapi dipakai di hero/portfolio.

## 3. Arsitektur teknis

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript | Versi yang diuji resmi oleh Payload 3.90.2 |
| CMS | Payload 3.90.2, terintegrasi di proyek yang sama (`/admin`) | Satu aplikasi, satu deploy |
| Database | PostgreSQL (`@payloadcms/db-postgres`) | Lokal: `npm run db:local` (PostgreSQL asli via paket `embedded-postgres`, tanpa Docker). Produksi: Neon / Supabase / Vercel Postgres |
| Media | Disk lokal saat development → Cloudflare R2 (S3-compatible) di produksi via `@payloadcms/storage-s3` | Aktif otomatis bila variabel `R2_*` diisi |
| Styling | Tailwind CSS v4 (token di `src/styles/globals.css`) | Satu file untuk warna & font |
| Email | `@payloadcms/email-nodemailer` (SMTP) | Notifikasi enquiry & aplikasi |
| SEO | Metadata API, `sitemap.ts`, `robots.ts`, JSON-LD, plugin SEO & Redirects resmi Payload | |
| Analytics | GA4 via `next/script` (tanpa paket tambahan) | Event hanya dikirim setelah server sukses menyimpan form |

**Paket sengaja tidak dipakai** (agar sederhana): UI kit, react-hook-form, zod, clsx, ikon library, animation library.

### Struktur folder

```
src/
├── app/
│   ├── (frontend)/
│   │   ├── [locale]/                ← "en" (tanpa prefix di URL) atau "zh" (/zh/...)
│   │   │   ├── layout.tsx           ← kerangka situs: <html>, font, header, footer, GA4
│   │   │   ├── page.tsx             ← Homepage
│   │   │   ├── corporate-team-building/page.tsx
│   │   │   ├── ... (satu folder per halaman layanan)
│   │   │   ├── our-work/  insights/  contact/  work-with-us/  about/
│   │   │   └── [...slug]/page.tsx   ← halaman CMS lain (mis. /legal) + redirect dari CMS
│   │   └── next/preview/route.ts    ← draft preview
│   ├── (payload)/                   ← admin & API Payload (jangan diubah manual)
│   ├── sitemap.ts  robots.ts
├── blocks/            ← page builder: config.ts (field CMS) + Component.tsx (tampilan)
├── collections/       ← skema koleksi CMS (Pages, Services, Enquiries, ...)
├── globals/           ← Header, Footer, Navigation, ContactInformation, SocialLinks, SeoDefaults
├── components/
│   ├── layout/  home/  corporate/  emceeing/  weddings/  kids/  portfolio/  forms/  ui/
├── access/            ← aturan hak akses per role
├── fields/            ← field yang dipakai ulang (link, tombol, dsb.)
├── i18n/              ← teks UI (label form, tombol) EN & 中文
├── lib/               ← fungsi bantu (ambil data CMS, SEO, analytics, rate limit)
├── seed/              ← skrip isi awal CMS dari konten website lama
├── styles/            ← globals.css (warna, font, token desain)
├── proxy.ts           ← routing bahasa, redirect 301 URL lama, trailing slash
└── payload.config.ts  ← konfigurasi utama Payload
```

## 4. Arsitektur Payload CMS

### Koleksi (collections)

| Koleksi | Isi | Draft/Preview | Lokalisasi |
|---|---|---|---|
| Users | Akun admin + role | — | — |
| Pages | Halaman dengan page builder (blok) | ✅ + live preview | ✅ teks |
| Services | Katalog layanan (urutan prioritas, halaman tujuan, kunci GA4) | ✅ | ✅ |
| Programs | Format program (team building, workshop, kids) | ✅ | ✅ |
| Portfolio Projects | Klien, objective, solution, execution, outcomes, foto, video | ✅ + live preview | ✅ |
| Testimonials | Kutipan, sumber (Google/WhatsApp/…), kategori | ✅ | ✅ |
| Clients | Nama/logo klien + status konfirmasi | — | — |
| Media | Gambar publik (alt text wajib) | — | alt ✅ |
| Blog Posts | Artikel Insights | ✅ + live preview | ✅ |
| Categories | Kategori artikel | — | ✅ |
| FAQs | Tanya-jawab per layanan | ✅ | ✅ |
| Founder Updates | Kartu update (gambar, teks singkat, tanggal, link Instagram) | ✅ | ✅ |
| Enquiries | Enquiry klien (dari form) | — | — |
| Freelancer Applications | Lamaran freelancer + status | — | — |
| Resumes | File CV (privat, hanya bisa diunduh role berwenang) | — | — |
| Redirects | Redirect yang bisa dikelola admin | — | — |

### Global

Header · Navigation · Footer · Contact Information · Social Links · SEO Defaults

### Blok page builder

Hero · Text & Image · Service Cards · Client Logo Grid · Gallery · Testimonials · Video · FAQ · Call to Action · Founder Introduction · Program Cards · Featured Projects · Feature Grid (benefit/objective) · Process Steps (rundown) · Enquiry Form · Founder's Updates · Rich Text

Setiap blok punya: pilihan layout yang sudah ditentukan (bukan bebas warna/ukuran), batas panjang teks, alt text wajib, dan tombol **"Hide this section"**.

### Role & hak akses (ditegakkan di level API/server)

| | Super Admin | Editor | Marketing | Enquiry Manager |
|---|---|---|---|---|
| Konten (pages, services, projects, …) | ✅ | ✅ | Blog, Founder Updates, Testimonials, Clients, Media | — |
| Globals | ✅ | ✅ | SEO Defaults, Social Links | — |
| Enquiries | ✅ | — | Baca **tanpa** data pribadi (untuk laporan) | ✅ |
| Freelancer Applications & CV | ✅ | — | — | Hanya jika diberi izin khusus oleh Super Admin |
| Users | ✅ | Profil sendiri | Profil sendiri | Profil sendiri |

Form publik **tidak** menulis langsung ke API Payload. Form → *server action* → validasi, honeypot, cek waktu isi, rate limit → simpan via Local API. Koleksi enquiry & aplikasi tertutup total untuk publik.

### Bahasa (EN / 中文)

- URL: `/corporate-team-building` (EN) dan `/zh/corporate-team-building` (中文).
- Field teks di CMS punya versi EN & 中文 (tab bahasa di admin).
- Setiap halaman punya status **"Chinese translation"**: Not started → Draft (needs native review) → Approved.
- Halaman `/zh/...` hanya tampil, masuk sitemap, dan mendapat tag `hreflang` bila statusnya **Approved**. Selain itu pengunjung diarahkan ke versi Inggris. Dengan begitu terjemahan setengah jadi tidak pernah terbit.

## 5. Rencana implementasi bertahap

| Tahap | Isi | Status |
|---|---|---|
| 1. Audit | Dokumen 01 + data migrasi | ✅ selesai |
| 2. Arsitektur | Dokumen ini + peta URL (03) + daftar konfirmasi (04) | ✅ selesai |
| 3. Fondasi | Next.js + Tailwind + Payload + PostgreSQL + R2 + auth/role + layout global | ✅ selesai |
| 4a. Desain & halaman prioritas | Design system, Homepage, Corporate Team Building, Contact, Work With Us | ✅ selesai |
| 4b. Halaman layanan lain | Corporate Emcee, D&D, Workshops, Coaching, Wedding, Kids, Campaigns, Event Support, About, Our Work, Insights | ✅ versi pertama (copy menunggu review klien) |
| 5. Integrasi CMS | Semua konten dari CMS, preview, publish/unpublish | ✅ selesai |
| 6. SEO & migrasi | Impor 70 artikel, redirect 301, structured data, sitemap | ✅ selesai lokal; foto ke R2 saat deploy; validasi keyword via Search Console setelah launch |
| 7. Testing | Typecheck, lint, build, uji form, uji role, cek SEO, responsif, Lighthouse | ✅ lihat `09-hasil-pengujian.md` |
| 8. Dokumentasi | Panduan pemula (Bahasa Indonesia) | ✅ README + docs 05–09 |
| 9. Berikutnya | Konfirmasi klien, foto team building, terjemahan Mandarin, setup akun produksi, deploy staging | menunggu klien |

> Catatan desain: setelah audit kualitas, font judul diganti dari Fraunces (terlalu umum di desain buatan AI) ke **Bricolage Grotesque**, dan label "cue" bernomor di setiap section dibatalkan — penomoran hanya dipakai di langkah proses yang memang berurutan.

Batasan keamanan: tidak ada deploy ke produksi, perubahan DNS, atau penimpaan WordPress tanpa persetujuan eksplisit.
