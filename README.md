# The Charisma Code — Website (Next.js + Payload CMS)

Website baru untuk **The Charisma Code** (studio experiential & event di Singapura).
Dibangun dengan **Next.js 16**, **Payload CMS 3** (admin di `/admin`), **PostgreSQL** dan **Tailwind CSS 4**.

> Dokumen ini untuk pemula. Ikuti langkahnya berurutan. Penjelasan lebih detail ada di folder [`docs/`](docs/).

---

## 1. Peta dokumentasi

| Dokumen | Isi |
|---|---|
| [docs/01-audit-website-lama.md](docs/01-audit-website-lama.md) | Hasil audit website WordPress lama |
| [docs/02-arsitektur-dan-rencana.md](docs/02-arsitektur-dan-rencana.md) | Sitemap, arah desain, arsitektur CMS, tahapan |
| [docs/03-peta-migrasi-url.md](docs/03-peta-migrasi-url.md) | URL lama → URL baru (redirect 301) |
| [docs/04-konfirmasi-klien.md](docs/04-konfirmasi-klien.md) | Hal yang harus dikonfirmasi klien sebelum launch |
| [docs/05-panduan-cms.md](docs/05-panduan-cms.md) | Cara memakai admin: halaman, portofolio, artikel, enquiry, freelancer |
| [docs/06-panduan-desain-dan-kode.md](docs/06-panduan-desain-dan-kode.md) | Mengubah warna/font, membuat halaman & blok baru |
| [docs/07-deploy-produksi.md](docs/07-deploy-produksi.md) | Deploy ke Vercel + database + R2 + email + domain |
| [docs/08-analytics-dan-laporan.md](docs/08-analytics-dan-laporan.md) | GA4, Search Console, laporan bulanan |
| [docs/09-hasil-pengujian.md](docs/09-hasil-pengujian.md) | Hasil pengujian (Lighthouse, form, hak akses, redirect) |

---

## 2. Menjalankan website di komputer sendiri

Yang dibutuhkan: **Node.js 20.18+** (sudah terpasang: v22) dan koneksi internet (untuk `npm install`).

### Langkah pertama kali

```bash
npm install
```

Salin file pengaturan contoh menjadi `.env` lalu isi `PAYLOAD_SECRET` dan `PREVIEW_SECRET` dengan teks acak panjang
(di komputer ini file `.env` sudah dibuat otomatis):

```bash
cp .env.example .env
```

Buka **terminal pertama** dan jalankan database lokal (biarkan jendela ini tetap terbuka):

```bash
npm run db:local
```

> Ini menjalankan PostgreSQL 17 asli dari folder `.local-database/` — tanpa Docker, tanpa installer.

Buka **terminal kedua**, isi konten awal (foto & teks dari website lama), lalu impor 70 artikel blog lama:

```bash
npm run seed
```

```bash
npm run migrate:wordpress
```

Jalankan website:

```bash
npm run dev
```

Buka di browser:

- Website: http://localhost:3000
- Admin CMS: http://localhost:3000/admin

### Membuat akun admin pertama

Saat pertama kali membuka `/admin`, muncul layar **"Create first user"**. Isi email, password, dan nama.
**Akun pertama otomatis menjadi Super Admin.** Akun berikutnya dibuat dari menu **Admin → Users** dan diberi role.

### Setiap hari (setelah langkah pertama)

1. Terminal 1: `npm run db:local`
2. Terminal 2: `npm run dev`

---

## 3. Di mana letak file penting?

```
src/
├── app/(frontend)/[locale]/        ← HALAMAN WEBSITE
│   ├── layout.tsx                  ← kerangka: header, footer, font, Google Analytics
│   ├── page.tsx                    ← Homepage
│   ├── corporate-team-building/    ← satu folder = satu alamat (URL)
│   ├── our-work/[slug]/            ← halaman detail proyek portofolio
│   ├── insights/[slug]/            ← halaman artikel blog
│   └── [...slug]/                  ← halaman CMS lain (mis. /legal) + redirect dari CMS
├── app/(payload)/                  ← panel admin Payload (jangan diubah)
├── collections/                    ← SKEMA CMS: Pages, Services, Enquiries, …
├── globals/                        ← PENGATURAN: Header, Navigation, Footer, Kontak, Sosial, SEO
├── blocks/                         ← skema "blok" page builder (field yang diisi editor)
├── components/
│   ├── blocks/                     ← TAMPILAN setiap blok (Hero, Service Cards, FAQ, …)
│   ├── layout/                     ← Header, Footer, menu, breadcrumb
│   ├── forms/                      ← form enquiry & lamaran freelancer (+ validasi & anti-spam)
│   ├── portfolio/  insights/       ← kartu proyek & artikel
│   └── ui/                         ← tombol, gambar, video
├── styles/globals.css              ← WARNA, FONT, RADIUS, JARAK (design system)
├── styles/fonts.ts                 ← pilihan font
├── i18n/dictionaries.ts            ← teks tetap (label form, tombol) EN & 中文
├── lib/                            ← fungsi bantu (ambil data CMS, SEO, analytics, redirect lama)
├── seed/                           ← skrip isi awal & migrasi WordPress
├── migrations/                     ← migrasi database untuk produksi
├── proxy.ts                        ← bahasa (/zh), redirect 301 URL lama, garis miring di akhir URL
└── payload.config.ts               ← konfigurasi utama CMS
```

**Aturan praktis:** isi/teks website diubah di **CMS** (`/admin`), bukan di kode.
Kode hanya diubah untuk tampilan (desain) atau fitur baru.

---

## 4. Perintah yang tersedia

| Perintah | Fungsi |
|---|---|
| `npm run db:local` | Menjalankan database PostgreSQL lokal |
| `npm run dev` | Menjalankan website untuk pengembangan (otomatis refresh) |
| `npm run seed` | Mengisi/menyegarkan konten awal (aman dijalankan ulang) |
| `npm run migrate:wordpress` | Mengimpor 70 artikel dari WordPress lama |
| `npm run typecheck` | Mengecek kesalahan TypeScript |
| `npm run lint` | Mengecek kualitas kode |
| `npm run build` | Membuat versi produksi (cek sebelum deploy) |
| `npm run test:smoke` | Uji 125 hal: redirect 301, halaman utama, tag SEO (website harus berjalan) |
| `npm run test:permissions` | Uji hak akses 4 role ke API CMS (website harus berjalan) |
| `npm run generate:types` | Membuat ulang tipe TypeScript setelah skema CMS diubah |
| `npm run migrate:create` | Membuat file migrasi setelah skema CMS diubah (wajib sebelum deploy) |
| `npm run ci` | Dipakai server produksi: jalankan migrasi lalu build |

---

## 5. Hal penting yang perlu diingat

- **Jangan commit file `.env`** — berisi rahasia. Contoh variabel ada di `.env.example`.
- Teks Mandarin (`/zh/…`) hanya tampil jika status **Chinese translation = Approved** di CMS. Teks UI Mandarin di `src/i18n/dictionaries.ts` masih draf dan **wajib dicek penutur asli**.
- Semua copy baru hasil redesign ditandai **"Needs client review"** di CMS. Lihat daftar konfirmasi di `docs/04-konfirmasi-klien.md`.
- Belum ada deploy ke produksi, perubahan DNS, atau perubahan pada website WordPress. Itu semua menunggu persetujuan.
