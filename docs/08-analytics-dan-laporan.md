# 08 — SEO, Analytics & Laporan Bulanan

## 1. SEO yang sudah dibangun

| Fitur | Di mana |
|---|---|
| Judul & deskripsi unik per halaman (tab **SEO** di CMS) | `src/lib/seo.ts` → `buildMetadata()` |
| Canonical URL & hreflang (`en-SG`, `zh-SG` hanya jika terjemahan *Approved*, `x-default`) | sama |
| Open Graph & Twitter card (gambar share) | sama |
| `sitemap.xml` (halaman, proyek, artikel, kategori; versi `/zh` hanya jika disetujui) | `src/app/sitemap.ts` |
| `robots.txt` (staging/lokal otomatis *Disallow: /* + header `noindex`) | `src/app/robots.ts`, `next.config.ts` |
| Structured data: Organization (setiap halaman), Person (founder), Service (halaman layanan), Article (blog), BreadcrumbList | `src/lib/seo.ts` |
| Breadcrumb terlihat di halaman dalam | `src/components/layout/Breadcrumbs.tsx` |
| Satu `<h1>` per halaman, heading berurutan | diuji di 19 halaman |
| 97 redirect 301 URL WordPress lama (satu langkah) | `src/lib/legacy-redirects.ts` + `src/proxy.ts` |
| Gambar AVIF/WebP responsif, font self-hosted, video YouTube dimuat saat diklik | `CmsImage`, `fonts.ts`, `YouTubePlayer` |

Hanya fakta bisnis terverifikasi yang dipakai di structured data (nama, URL, email, telepon, area layanan Singapura, media sosial, nama founder, SMU). **Tidak ada alamat** yang dipublikasikan.

## 2. Target keyword per halaman

> Volume pencarian **tidak** diriset (sesuai instruksi, Ahrefs tidak dipakai). Daftar di bawah adalah **kandidat** dari brief, bukan data. Jangan mengutip angka volume/difficulty yang belum diukur.

| Halaman | Keyword utama (kandidat) | Pendukung |
|---|---|---|
| `/corporate-team-building` | corporate team building Singapore | team building activities Singapore, team bonding Singapore, corporate team building activities, team building facilitator Singapore |
| `/corporate-emcee` | corporate emcee Singapore | professional emcee Singapore, bilingual emcee Singapore, event emcee Singapore |
| `/dinner-and-dance-emcee` | dinner and dance emcee Singapore | D&D emcee Singapore, corporate dinner emcee Singapore |
| `/corporate-workshops` | corporate workshops Singapore | communication workshops Singapore, corporate communication training |
| `/communication-coaching` | public speaking coaching Singapore (perlu riset) | presentation skills training, stage presence coaching |
| `/wedding-emcee` | wedding emcee Singapore | bilingual wedding emcee, wedding emcee and singer |
| `/kids-youth-programs` | kids public speaking Singapore (perlu riset) | school enrichment programmes, kids team building |
| `/zh/...` (setelah disetujui) | 新加坡企业团建 · 新加坡团队建设活动 · 新加坡双语司仪 · 新加坡公司晚宴司仪 · 新加坡婚礼司仪 | Perlu validasi penutur asli & data volume |

Halaman D&D dan Corporate Emcee sengaja punya isi, judul, dan struktur berbeda (alur malam D&D, games, lucky draw vs. konferensi, peluncuran, award) agar tidak saling bersaing.

**Validasi yang disarankan (gratis):** ekspor **query nyata dari Google Search Console** website lama (12 bulan) dan, bila perlu, Google Keyword Planner (akun Google Ads, negara Singapura). Sesuaikan judul/deskripsi SEO di CMS berdasarkan data tersebut.

## 3. Google Analytics 4

### Pemasangan
1. Buat properti GA4 (zona waktu Singapore, mata uang SGD) → *Web data stream* untuk `https://www.thecharismacode.co`.
2. Salin **Measurement ID** (`G-XXXXXXX`) ke variabel `NEXT_PUBLIC_GA_MEASUREMENT_ID` di Vercel (Production saja).
3. Tidak ada kode lain yang perlu diubah. Tanpa variabel ini, GA4 tidak dimuat sama sekali.

### Event yang dikirim website

| Event | Kapan | Parameter |
|---|---|---|
| `generate_lead` | Enquiry **berhasil disimpan** di CMS (bukan saat tombol diklik) | `service` (mis. `team-building`, `corporate-emcee`, `dinner-and-dance`, `wedding-emcee`, `corporate-workshops`…), `form_type`, `language` |
| `freelancer_application_submit` | Lamaran freelancer berhasil disimpan | `language` |
| `contact_phone_click` | Klik nomor telepon | `page_path`, `link_location` |
| `contact_email_click` | Klik email | sama |
| `contact_whatsapp_click` | Klik WhatsApp | sama |
| `social_instagram_click` | Klik Instagram | sama |

Pageview dihitung otomatis oleh GA4 (termasuk navigasi antar halaman).

### Pengaturan di GA4 (sekali)
1. **Admin → Events** → tandai **`generate_lead`** sebagai *Key event*. **Hanya event ini** — agar enquiry tidak terhitung dua kali.
2. **Admin → Custom definitions → Create custom dimension** (scope: Event): `service`, `language`, `form_type`, `link_location`.
3. Hubungkan GA4 dengan Search Console (Admin → Product links).

Dengan begitu laporan "enquiry Team Building vs Corporate Emcee vs D&D vs Wedding vs Workshop" cukup dari **satu** key event yang difilter per `service`.

### Privasi
GA4 tidak menyimpan IP penuh. Perbarui Privacy Policy agar menyebut GA4 dan cookie analytics. Keputusan memasang banner persetujuan cookie ada di klien (PDPA tidak mewajibkan secara eksplisit untuk analytics, tetapi transparansi tetap diperlukan).

## 4. Google Search Console

1. Tambah properti **Domain** `thecharismacode.co` (verifikasi via DNS TXT — disarankan), atau properti URL-prefix dengan kode HTML di **CMS → Settings → SEO Defaults → Google Search Console verification code**.
2. Setelah launch: *Sitemaps* → submit `https://www.thecharismacode.co/sitemap.xml`.
3. Pantau *Pages* (indexing) dan *Performance* 4–6 minggu setelah migrasi.

## 5. Laporan bulanan (resep)

| Metrik | Sumber | Cara |
|---|---|---|
| Total enquiry | CMS → Inbox → Enquiries | Filter tanggal bulan berjalan; abaikan status *Spam* |
| Enquiry berkualitas | CMS | Status *Qualified*, *Proposal sent*, *Won* |
| Enquiry per layanan | CMS (kolom Service) atau GA4 `generate_lead` per `service` | |
| Enquiry organik | CMS kolom **Channel = Organic search** | |
| Enquiry EN vs 中文 | CMS kolom **Website language** atau GA4 `language` | |
| Conversion rate | GA4: `generate_lead` ÷ sesi | Per halaman landing (Explore → landing page + key events) |
| Landing page terbaik | GA4 *Landing page* report + CMS kolom **First page visited** | |
| Klik telepon/WhatsApp/email/Instagram | GA4 event `contact_*`, `social_instagram_click` | Indikator minat yang tidak lewat form |
| Performa Search Console | GSC *Performance* | Klik, impresi, posisi rata-rata, query & halaman teratas |
| Google Business Profile | GBP *Performance* | Panggilan, klik website, pencarian, tampilan |

**Utamakan kualitas lead** (qualified & won) di atas jumlah trafik.

## 6. Rencana Google Business Profile (lokal Singapura)

- Daftar sebagai **service-area business** (tanpa alamat publik — tidak ada alamat yang dikarang). Area layanan: Singapore.
- Nama bisnis persis: *The Charisma Code*. Telepon & website sama dengan yang di website (konsistensi NAP).
- Kategori: pilih yang paling sesuai dari daftar resmi Google saat membuat profil (misalnya kategori terkait event/team building/emcee) — **konfirmasi bersama klien**.
- Isi deskripsi dengan layanan utama (team building, corporate emcee, D&D emcee, workshops), unggah foto asli acara, posting update bulanan (bisa sama dengan Founder's Updates).
- Minta klien korporat menulis ulasan Google setelah acara; ulasan publik dapat ditampilkan sebagai testimoni (permission *Public review*).
- Catatan: ulasan "Dr Fin Ariffin" yang muncul di widget lama perlu diperiksa sumbernya (lihat `04-konfirmasi-klien.md`).
