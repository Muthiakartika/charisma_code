# 06 — Panduan Desain & Kode untuk Pemula

## 1. Arah desain singkat: "The Spotlight Studio"

- **Satu brand, tiga nuansa**: tipografi, logo, jarak, dan komponen sama di seluruh situs. Yang berubah per halaman hanya warna aksen, latar, dan bentuk sudut:
  - **Corporate** (default): ivory + charcoal "panggung" + aksen *Spark* (oranye). Section selang-seling berwarna ivory lebih dalam (sejak 20 Okt 2026, sebelumnya peach), sehingga warna brand hanya sekitar 15% halaman: tombol, kata sorotan, blok warna di banner, band CTA. Selaras dengan kartu nama & lanyard klien.
  - **Wedding**: latar blush, aksen rosewood, foto berbentuk lengkung (arch), judul lebih ringan.
  - **Kids & Youth**: kartu kuning/biru/mint/coral, sudut bulat besar, foto sedikit miring, animasi "lompat" kecil saat hover.
- **Warna ivory diambil dari latar logo asli** agar logo raster menyatu tanpa kotak.
- **Font**: *Plus Jakarta Sans* (judul, bersih & tebal) + *Geist* (teks). Teks Mandarin memakai font sistem (PingFang/YaHei) agar cepat.
- **Masukan klien (Okt 2026)**: judul harus lebih bersih dibaca, lebih banyak aksi, lebih berwarna, dan warna aksi **oranye** (bukan merah). Karena itu: font judul diganti, tombol aksi oranye dengan teks gelap, section "tinted" berwarna peach (20 Okt 2026 diganti ivory lebih dalam, lihat di atas), dan tombol aksi utama halaman diulang otomatis di antara section (lihat bagian 2a).
- **Ciri khas**: section gelap seperti panggung dengan foto di dalam **lingkaran sorot lampu** (hero *Stage*; sejak 19 Okt 2026 homepage memakai hero terang *Colour block*: foto lingkaran keluar dari blok warna brand, dengan line art lampu sorot yang samar), langkah kerja seperti **cue sheet run-of-show** emcee, foto "selfie dengan kerumunan" khas De Zhong, dan tulisan **English & 中文** yang terlihat (bukan hanya diklaim).
- **Aturan rasa (tasteskill + Impeccable)**: satu warna aksen per halaman; tanpa tanda pisah panjang (— atau –) di teks yang tampil, tulis "20 to 50"; nomor hanya bila urutan bermakna; satu gaya bullet (`src/components/ui/Bullet.tsx`); hover hanya untuk perangkat dengan mouse.
- **Hasil kritik desain** tersimpan di `.impeccable/critique/` (skor & daftar masalah) sebagai riwayat.

## 2. Mengubah warna

Buka **`src/styles/globals.css`**, bagian `@theme`:

```css
--color-paper: #f9f3ea;        /* latar ivory */
--color-paper-deep: #f1e8da;   /* latar section "tinted" (lewat --color-surface-alt) */
--color-ink: #1e2322;          /* teks & section gelap */
--color-flame: #f7741f;        /* oranye aksi: tombol, band CTA, lingkaran, bullet, marker sorotan */
--color-flame-text: #e0560b;   /* nomor langkah di latar terang */
--color-spark: #ad440d;        /* teks aksen kecil di latar terang (eyebrow, label) */
--color-spark-bright: #ff8a3d; /* aksen & tombol di section gelap */
```

Ganti nilai hex → simpan → website langsung berubah (saat `npm run dev`).
Kelas Tailwind otomatis ikut: `bg-paper`, `text-ink`, `bg-action`, `text-accent`, dst.

Komponen tidak memakai hex di atas secara langsung, tetapi token yang mengikuti tema halaman:

| Token | Dipakai untuk | Kelas |
|---|---|---|
| `--color-action` + `--color-on-action` | blok warna yang bisa diklik/menonjol (tombol utama, band CTA) + warna teks di atasnya | `bg-action text-on-action` |
| `--color-accent` | teks/ikon aksen kecil | `text-accent` |
| `--color-highlight` | kata `*berbintang*` di section gelap, nomor langkah | otomatis |
| `--color-marker` | garis "stabilo" di belakang kata `*berbintang*` di latar terang (teks tetap hitam). Halaman Wedding & Kids tetap memakai warna teks tema | otomatis |

⚠️ Cek kontras: teks harus minimal **4.5:1** terhadap latar (gunakan https://webaim.org/resources/contrastchecker/). Oranye aksi hanya lolos dengan **teks gelap** (5.7:1); teks putih di atas oranye gagal (2.8:1), jadi jangan diganti putih. Warna sekarang sudah lolos WCAG AA.

Warna tema Wedding & Kids ada di bagian **"2. Page themes"** di file yang sama.

### Warna lain yang pernah dicoba (disimpan sebagai kode saja)

Sampai 21 Okt 2026 website punya link preview warna (`/colour-options/...`). Setelah klien memilih **oranye** (website, kartu nama, dan lanyard), preview itu dihapus supaya kode lebih ringan. Kode warnanya disimpan di sini. Untuk mencoba lagi, ganti nilai di `@theme` `globals.css` dengan satu baris di bawah.

| Warna | `--color-flame` | `--color-flame-text` | `--color-spark` | `--color-spark-bright` | `--color-peach` | Teks di tombol (`--color-on-action`) |
|---|---|---|---|---|---|---|
| **Oranye (dipakai)** | #f7741f | #e0560b | #ad440d | #ff8a3d | #fde6d2 | ink (gelap) |
| Gold terang | #edb94a | #a07000 | #825a00 | #f6c862 | #fdf1d8 | ink |
| Gold madu | #dfa52f | #9c6c00 | #7f5800 | #f2c25b | #fbeed3 | ink |
| Kuning | #ffc93c | #a37400 | #856000 | #ffd15c | #fff4d1 | ink |
| Oranye muda | #ff9a3d | #dc6a10 | #a8500c | #ffa652 | #ffeedd | ink |
| Ungu | #7442d9 | #7442d9 | #6a35c9 | #b794ff | #f0eafc | paper (ivory) |

Catatan kalau memakai salah satunya:
- **Kuning & gold**: garis line art di hero Colour block dibuat lebih gelap (`--hero-art-line: color-mix(in srgb, var(--color-action) 82%, var(--color-ink))`), dan cahaya panggung di hero Stage dibuat amber (`#ffae2b` 24%), karena kuning di atas charcoal terlihat kehijauan.
- **Ungu**: stabilo memakai lavender (`--color-marker: #b794ff`), dan cahaya putih di band CTA serta blok hero dibuat lebih samar.
- Kode lengkap preview ada di riwayat git: `git show 9ae2cb3:src/components/palette/palettes.css`.

## 2a. Tombol aksi yang diulang otomatis

Agar pengunjung tidak pernah lebih dari ±2 section dari sebuah tombol, `src/components/blocks/RenderBlocks.tsx` menambahkan tombol aksi utama halaman (sama dengan bar aksi di HP, mis. "Check your D&D date" atau "Let's Talk") di akhir blok **Text & Image** (yang tidak punya tombol), **Process Steps**, **Feature Grid**, **Testimonials** dan **Video**. Aturannya: blok menawarkan tombol setelah ada satu section tanpa tombol, kecuali blok berikutnya sudah punya tombol atau form sendiri. Tidak perlu diatur di CMS.

## 3. Mengubah font

Buka **`src/styles/fonts.ts`**. Contoh mengganti font teks ke *Manrope*:

```ts
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google'

export const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body-family',
  display: 'swap',
  preload: false,
})
```

Nama `variable` jangan diubah — `globals.css` memakainya.

## 4. Mengubah ukuran judul, jarak, dan sudut

Masih di `globals.css`:

- `@utility heading-xl` / `heading-lg` / `heading-md` → ukuran judul (memakai `clamp()` agar responsif).
- `@utility section-space` → jarak atas-bawah setiap section.
- `--radius-card`, `--radius-media`, `--radius-field` → kelengkungan sudut kartu, foto, input.

## 5. Membuat halaman baru

**Cara termudah (tanpa kode):** buat di CMS → Pages (lihat `05-panduan-cms.md`). Alamatnya otomatis `/slug`.

**Halaman dengan folder sendiri** (seperti halaman layanan) — misalnya `/team-retreats`:

1. Buat folder `src/app/(frontend)/[locale]/team-retreats/`
2. Salin `page.tsx` dari `corporate-team-building/` ke folder baru.
3. Ganti `const SLUG = 'corporate-team-building'` menjadi `'team-retreats'` dan nama fungsinya.
4. Di CMS, buat Page dengan slug `team-retreats`.
5. Tambahkan URL ke daftar `pages` di `scripts/smoke-test.mjs` agar ikut diuji.

## 6. Membuat blok page builder baru (4 langkah)

1. **Skema CMS**: buat `src/blocks/NamaBlok.ts` (contoh termudah: `src/blocks/CallToAction.ts`).
2. Daftarkan di `src/blocks/index.ts` (array `pageBlocks`).
3. Jalankan `npm run generate:types` → tipe TypeScript baru muncul di `src/payload-types.ts`.
4. **Tampilan**: buat `src/components/blocks/NamaBlok.tsx`, lalu tambahkan satu baris di `src/components/blocks/RenderBlocks.tsx`.

Setelah mengubah skema CMS (blok/koleksi/field): **sebelum deploy** jalankan `npm run migrate:create` (lihat `07-deploy-produksi.md`).

## 7. Mengubah teks tetap (label form, tombol)

`src/i18n/dictionaries.ts` — objek `en` (Inggris) dan `zh` (Mandarin). Teks konten halaman **tidak** ada di sini; itu di CMS.

## 8. Ikon

Ikon memakai paket **Phosphor Icons** (`@phosphor-icons/react`). Daftar ikon: https://phosphoricons.com
Di komponen server: `import { Phone } from '@phosphor-icons/react/ssr'`; di komponen client (`'use client'`): `import { Phone } from '@phosphor-icons/react'`.

## 9. Animasi

**Prinsip yang disetujui (genjutsu cast, 12 Okt 2026):** website bergerak seperti panggung yang dinyalakan. Ada satu momen utama di hero, lalu isyarat tenang yang mengikuti scroll. Semuanya CSS bawaan browser (tanpa library), hanya `transform`, `opacity`, dan `clip-path`, dengan satu kurva `cubic-bezier(0.16, 1, 0.3, 1)` untuk semua kedatangan.

| Gerak | Di mana | Angka |
|---|---|---|
| `.rise` | Teks hero muncul berurutan | 800 ms, jeda 90 ms per baris |
| **Follow-spot** | Hero *Stage*: sorot lampu mulai dari focal point foto lalu melebar ke lingkaran penuh | 900 ms, lingkaran kecil +180 ms |
| **Colour block** | Hero *Colour block*: blok warna masuk dari tepi layar, foto terbuka seperti follow-spot, lampu line art berayun lalu diam, sketsa muncul pelan | blok 900 ms; foto +160 ms (kecil +340 ms); line art 1 s mulai 600 ms |
| **Cue live** | Process Steps: nomor berubah dari abu-abu ke aksen, garis terisi menuju cue berikutnya | terikat posisi scroll |
| `.reveal` (settle) | Section bergeser 16px ke posisi akhir saat di-scroll. **Tidak pernah tersembunyi** (opacity tidak disentuh) | terikat posisi scroll |
| Marquee | Daftar klien berjalan pelan, berhenti saat hover atau tombol jeda | 60 s per putaran |
| Bar aksi HP | Muncul dari bawah | 300 ms |

Semua didefinisikan di bagian **"5. Motion"** `globals.css`. Untuk pengunjung yang mengaktifkan *Reduce motion*, semuanya diam di posisi akhir. Browser tanpa dukungan animasi scroll (mis. Firefox) juga langsung menampilkan posisi akhir. Warna "redup" nomor cue tetap minimal 4,5:1 agar lolos kontras di setiap frame.

## 10. Server Component vs Client Component (singkat)

- Default di folder `app/` dan `components/` adalah **Server Component**: dirender di server, tidak menambah JavaScript di browser. Boleh mengambil data CMS langsung.
- File yang diawali `'use client'` adalah **Client Component**: berjalan di browser (untuk interaksi: menu mobile, form, filter portofolio, video).
- Aturan: ambil data di server, kirim ke client hanya data yang diperlukan.
