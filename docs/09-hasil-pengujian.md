# 09 — Hasil Pengujian (12 Oktober 2026)

Semua pengujian dijalankan di komputer lokal (Windows 10, Node 22, PostgreSQL 17 lokal).

## 1. Kualitas kode & build

| Uji | Hasil |
|---|---|
| `npm run typecheck` (TypeScript strict) | ✅ 0 error |
| `npm run lint` (ESLint, aturan Next.js + React Hooks) | ✅ 0 error, 0 warning |
| `npm run build` (produksi) | ✅ sukses, 194 halaman statis, tanpa warning |
| Migrasi database awal pada database kosong (`payload migrate`) | ✅ 188 tabel dibuat |

## 2. Redirect, halaman & SEO — `npm run test:smoke`

✅ **125 / 125 lolos**
- 97 URL WordPress lama → masing-masing **satu** redirect 301 ke tujuan yang benar (termasuk URL dengan emoji dan slug lama)
- 19 halaman utama → 200
- `/about/` → 301 `/about`, `/en/about` → 301 `/about`, halaman tak dikenal → 404
- Halaman Team Building: canonical, hreflang `en-SG`, tepat satu `<h1>`, meta description, JSON-LD BreadcrumbList + Service + Organization

## 3. Hak akses role — `npm run test:permissions`

✅ **26 / 26 lolos** (melalui REST API asli, sebagai 4 akun uji sementara yang langsung dihapus)

| | Baca enquiry | Lihat nama/email | Ubah enquiry | Lamaran freelancer | Edit halaman | Daftar user | Naikkan role sendiri |
|---|---|---|---|---|---|---|---|
| Super Admin | ✅ | ✅ | ✅ | ✅ | ✅ | semua | – |
| Editor | ⛔ 403 | – | ⛔ | ⛔ | ✅ | diri sendiri | diblokir |
| Marketing | ✅ | **disembunyikan** | ⛔ | ⛔ | ⛔ | diri sendiri | diblokir |
| Enquiry Manager | ✅ | ✅ | ✅ | ⛔ | ⛔ | diri sendiri | diblokir |

Akses publik (tanpa login): `GET/POST /api/enquiries`, `/api/freelancer-applications`, `/api/resumes`, `/api/users`, unggah ke `/api/media` → semua **403**. Email penerima notifikasi tidak bocor lewat API publik.
Akun pertama yang mendaftar selalu menjadi Super Admin (meskipun mencoba memilih role lain).

## 4. Form

| Uji | Hasil |
|---|---|
| Enquiry dari halaman Team Building | ✅ tersimpan lengkap (layanan terpilih otomatis, ukuran grup, budget, halaman form, halaman pertama, channel, bahasa, IP ter-hash), nomor referensi tampil, notifikasi email dibuat |
| Email notifikasi | ⚠️ di lokal SMTP belum diisi → email dicetak di terminal (perilaku yang diharapkan). Pengiriman nyata diuji setelah SMTP produksi diisi |
| Lamaran freelancer + CV PDF | ✅ tersimpan, nama file CV diacak, status awal *New* |
| CV PDF tidak valid | ✅ ditolak (validasi Payload) dengan pesan error di field CV |
| Unduh CV | ✅ tanpa login 403 · Super Admin 200 · tebak path langsung 404 |
| Nilai form tetap ada setelah error | ✅ (diperbaiki: dropdown sebelumnya ter-reset) |

## 5. CMS: draft, preview, bahasa

| Uji | Hasil |
|---|---|
| Simpan draft homepage → pengunjung publik | ✅ tidak melihat draft |
| Editor login + preview | ✅ melihat draft; secret salah 403; tanpa login 403 |
| Live Preview di admin (panel samping, mobile/tablet/desktop) | ✅ tampil |
| `/zh/…` sebelum *Approved* | ✅ 307 ke versi Inggris, tanpa hreflang zh |
| `/zh/…` setelah *Approved* | ✅ 200, `lang="zh-SG"`, hreflang en/zh/x-default, canonical `/zh/…`, label UI Mandarin |

## 6. Responsif & aksesibilitas

- 19 halaman pada lebar **375 px**: ✅ tidak ada scroll horizontal, tepat satu `<h1>` per halaman.
- Kontras warna disesuaikan hingga Lighthouse Accessibility **100**.
- Animasi dimatikan untuk pengguna *Reduce motion*; fokus keyboard terlihat (outline warna aksen); tautan "Skip to content".

## 7. Lighthouse (mobile, build produksi lokal, simulasi 4G lambat + CPU 4×)

| Halaman | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 86–90 | 100 | 100 | 100 | 3,6–3,9 s | 0 |
| `/corporate-team-building` | 85–91 | 100 | 100 | 100 | 3,3–3,9 s | 0 |
| `/corporate-emcee` | 93 | 100 | 100 | 100 | 3,2 s | 0 |
| `/dinner-and-dance-emcee` | 93 | 100 | 100 | 100 | 3,2 s | 0 |
| `/contact` | 92 | 100 | 100 | 100 | 3,3 s | 0 |
| `/wedding-emcee` | 91 | 100 | 100 | 100 | 3,5 s | 0 |
| `/kids-youth-programs` | 94 | 100 | 100 | 100 | 3,2 s | 0 |
| Artikel blog | 93 | 100 | 100 | 100 | 3,2 s | 0 |

Tanpa throttling, halaman Team Building tergambar penuh dalam **0,22 s** (FCP = LCP = 217 ms).
LCP lab di atas adalah simulasi HP lambat; target Core Web Vitals (LCP ≤ 2,5 s) diukur dari data pengguna nyata setelah live di CDN Vercel (lihat Search Console → Core Web Vitals).
Homepage kadang di bawah 90 karena paling banyak konten; sudah dioptimasi (font 131→78 KB, favicon 48→10 KB, logo berukuran tepat, foto hero `fetchpriority=high` kualitas 70).

## 7b. Pembaruan desain: Impeccable + tasteskill + genjutsu (12 Oktober 2026)

**Kritik awal (Impeccable critique, dua penilaian terpisah):** skor heuristik 22/32, 0 masalah P0, 2 masalah P1 (halaman Team Building mengubur bukti & form; hero homepage generik), 3 masalah P2. Arsip: `.impeccable/critique/`.

| Uji | Sebelum | Sesudah |
|---|---|---|
| Section halaman Team Building | 13 | 9 (bukti klien + kutipan langsung di bawah hero) |
| Tinggi halaman Team Building, desktop 1440px | 10.343 px | 8.305 px |
| Posisi form enquiry, desktop | 8.586 px | 6.599 px |
| Posisi form enquiry, HP 375px | 13.534 px | 10.533 px |
| CTA di HP | hanya di hero & menu | bar aksi menempel di bawah layar (proposal + WhatsApp), menyingkir saat form/footer terlihat |
| Detektor Impeccable: `content-hidden-at-rest` (error) | 32% teks homepage, 38% teks Team Building transparan sebelum di-scroll | ✅ 0 |
| Detektor: marquee tanpa jeda (WCAG 2.2.2) | tidak bisa dijeda | ✅ tombol jeda/lanjut + berhenti saat hover |
| Detektor: warna error di-hardcode | 5 nilai hex | ✅ token `--color-danger*`, `--color-field-*` |
| Bug teks persetujuan "…Privacy Policy. Privacy Policy" | ada | ✅ diperbaiki (EN & 中文) |
| Tanda pisah panjang (– / —) di teks yang tampil | 8 label opsi form | ✅ 0 |

Temuan detektor yang tersisa dan **disengaja**: warna ivory (diambil dari logo), font Geist (selera), marquee di homepage (sudah bisa dijeda), padding atas 0 pada strip ukuran grup (digabung dengan section program yang berlatar sama), border+bayangan dropdown sudah diganti bayangan saja.

**Animasi (genjutsu cast):** rencana gerak disetujui lewat pratinjau artifact, varian **B. Follow-spot** dipilih. Semua CSS bawaan browser, tanpa library baru.
- Diperiksa di sini (dengan bukti): *Reduce motion* menonaktifkan follow-spot, cue live, settle, dan hover (`globals.css`, blok `prefers-reduced-motion`); tidak ada animasi properti layout (hanya transform/opacity/clip-path/warna); tidak ada `outline: none` tanpa pengganti; tidak ada `will-change`; tidak ada hex di komponen TSX; kontras warna redup nomor cue 4,78:1 (terang) dan 4,67:1 (gelap).
- **Perlu dicek manual (belum diverifikasi):** Chrome DevTools → Performance saat scroll di halaman Team Building (target tidak ada frame > 16,7 ms); uji di HP asli dengan *Reduce motion* menyala.

**Lighthouse setelah pembaruan** (mobile, build produksi, 2 kali per halaman):

| Halaman | Performance | Accessibility | Best Practices | SEO | LCP |
|---|---|---|---|---|---|
| `/` | 88–90 | 100 | 100 | 100 | 3,6–3,9 s |
| `/corporate-team-building` | 92 | 100 | 100 | 100 | 3,3–3,4 s |
| `/wedding-emcee` | 91–93 | 100 | 100 | 100 | 3,3–3,5 s |
| `/kids-youth-programs` | 92 | 100 | 100 | 100 | 3,3 s |

**Lainnya:** `npm run lint` ✅, `npm run typecheck` ✅, `npm run build` ✅ (194 halaman), `npm run test:smoke` ✅ 125/125. Migrasi baru (`20261012_064509_design_stage_blocks`, `20261012_064510_feature_grid_default_list`) diuji di database kosong terpisah: ✅ ketiga migrasi berjalan. Migrasi dipecah dua karena Postgres tidak mengizinkan nilai enum baru dipakai di transaksi yang sama.

## 7c. Logo klien (12 Oktober 2026)

- 34 logo resmi dipasang (sumber per logo di `src/seed/client-logos.ts`), diolah menjadi siluet transparan satu warna. Total 106 KB untuk 34 file.
- Logo dimuat **setelah** halaman selesai dimuat (`DeferredLogos`), agar tidak berebut bandwidth dengan foto hero. Tanpa JavaScript, logo tetap tampil (`<noscript>`).
- Grid ringkas di Team Building: 4 kolom × 3 baris (desktop), 3 × 4 (HP), tanpa logo yatim. Tidak ada scroll horizontal di 375px.
- Lighthouse mobile (build produksi, 3 run): `/` Performance 87–90, `/corporate-team-building` 91–95; Accessibility, Best Practices, SEO **100**; CLS 0. Tanpa penundaan, logo sempat menurunkan Team Building ke 87–89.
- Lint ✅, typecheck ✅, smoke test 125/125 ✅, detektor Impeccable: tidak ada temuan baru.

## 8. Belum diuji / batasan yang diketahui

- Pengiriman email nyata (butuh SMTP produksi), penyimpanan Cloudflare R2, deploy Vercel, GA4 di properti nyata (event `generate_lead` dikirim hanya setelah server menyimpan enquiry — diverifikasi di kode, belum di GA4 DebugView).
- Unggah foto lewat antarmuka admin (seed memakai Local API) — perlu dicoba sekali setelah login.
- Uji keyboard menyeluruh untuk dropdown menu & menu mobile, serta uji screen reader.
- Belum ada konten Mandarin (sengaja; menunggu penerjemah/penutur asli).
- Belum ada foto team building asli → foto pengganti ditandai *Placeholder* di Media.
- 58 artikel SEO generik dimigrasi apa adanya (tautan di dalamnya masih ke URL lama; akan ter-redirect 301 setelah domain dipindah).
- Riset volume keyword tidak dijalankan (sesuai instruksi); validasi nanti memakai data Search Console.
