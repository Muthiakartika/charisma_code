# 07 — Deploy ke Produksi (Langkah demi Langkah)

> ⚠️ **Belum ada yang di-deploy.** Deploy ke produksi, perubahan DNS, dan penggantian WordPress hanya dilakukan setelah ada persetujuan eksplisit dari klien.
> Semua akun di bawah harus dibuat oleh pemilik bisnis (atau dengan izinnya).

## Arsitektur produksi yang direkomendasikan

| Bagian | Layanan | Catatan |
|---|---|---|
| Hosting Next.js + CMS | **Vercel Pro** | Build otomatis dari GitHub, preview per branch, rollback instan |
| Database | **Neon** (PostgreSQL, region Singapore `aws-ap-southeast-1`) | Gunakan *pooled connection string* (`-pooler`). Fitur *branching* untuk staging |
| File/foto & CV | **Cloudflare R2** (bucket **privat**) | Foto disajikan lewat CMS, CV hanya lewat akses login |
| Email notifikasi | SMTP (Google Workspace / Zoho / penyedia transaksional) | Dari `hello@thecharismacode.co` atau `no-reply@…` |
| Analytics | Google Analytics 4 + Search Console | Lihat `08-analytics-dan-laporan.md` |

Alternatif yang juga cocok: Supabase (database), Railway/Render (hosting Node.js).

---

## Langkah 1 — Simpan kode di GitHub (repo privat baru)

Repo lokal sudah di-*init* (`git init`) tetapi belum ada commit maupun remote. Buat repo **privat** baru di GitHub, lalu hubungkan dan push. Jangan menimpa repo lain yang sudah ada.

## Langkah 2 — Database Neon

1. Buat project di neon.tech, region **Singapore**.
2. Salin **pooled connection string** → ini menjadi `DATABASE_URL`.
3. (Disarankan) buat branch `staging` untuk Preview deployment.

## Langkah 3 — Cloudflare R2

1. Buat bucket, misalnya `charisma-code-files`. **Jangan** aktifkan akses publik (CV harus privat).
2. Buat **R2 API token** (Object Read & Write, khusus bucket ini) → catat *Access Key ID*, *Secret Access Key*, dan *Account ID*.
3. Atur **CORS** bucket agar admin bisa mengunggah langsung dari browser (mengatasi batas 4,5 MB Vercel):

```json
[
  {
    "AllowedOrigins": ["https://www.thecharismacode.co", "https://*.vercel.app"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

## Langkah 4 — Vercel

1. *Add New Project* → pilih repo GitHub.
2. **Build Command**: sudah diatur otomatis lewat file `vercel.json` di project (`npm run ci`: menjalankan migrasi database lalu build), jadi tidak perlu diubah di dashboard. Tanpa ini Vercel hanya menjalankan `npm run build`, migrasi terlewat, dan build gagal dengan error database `42703` (kolom tidak ditemukan).
3. **Environment Variables** (Settings → Environment Variables):

| Variabel | Production | Preview (staging) |
|---|---|---|
| `DATABASE_URL` | Neon branch `main` | Neon branch `staging` |
| `PAYLOAD_SECRET` | teks acak 64 karakter | teks acak lain |
| `PREVIEW_SECRET` | teks acak | teks acak lain |
| `NEXT_PUBLIC_SITE_URL` | `https://www.thecharismacode.co` | URL preview Vercel |
| `NEXT_PUBLIC_SITE_ENV` | **`production`** | `staging` (otomatis noindex) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-…` | kosongkan |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | dari penyedia email | sama / kosong |
| `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME` | | |
| `R2_BUCKET`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | | bucket terpisah disarankan |

Buat teks acak dengan:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. Deploy. Buka `https://<project>.vercel.app/admin` → buat **akun Super Admin pertama**.

## Langkah 5 — Isi konten ke database produksi (sekali saja)

Dari komputer Anda, arahkan sementara variabel ke database & R2 produksi lalu jalankan seed dan migrasi WordPress
(foto akan diunggah ke R2). Paling aman dengan membuat file `.env.production.local` sementara, lalu menghapusnya setelah selesai.

```bash
npm run seed
```

```bash
npm run migrate:wordpress
```

Setelah itu, semua perubahan konten dilakukan lewat `/admin`.

> **Penting:** seed dari komputer lokal membuat tabel dalam mode *dev push*, bukan lewat migrasi. Akibatnya `payload migrate` di build Vercel berhenti dan bertanya *"Would you like to proceed?"*, lalu build menggantung (Okt 2026). Perbaikannya sekali saja: jalankan isi `scripts/production-db-catch-up.sql` di SQL editor database produksi, lalu Redeploy. Mulai sekarang, setiap perintah dari komputer lokal yang diarahkan ke database produksi (seed, `migrate:wordpress`, skrip lain) harus memakai mode production, mis. `npx cross-env NODE_ENV=production npm run migrate:wordpress`. Tanpa itu penanda *dev push* muncul lagi (sudah diuji, Okt 2026). Untuk database baru: jalankan `npm run migrate` dulu, lalu seed dengan cara yang sama.

## Langkah 6 — Uji staging sebelum launch

```bash
TEST_BASE_URL=https://<project>.vercel.app npm run test:smoke
```

Checklist manual:
- [ ] Login admin, edit + preview + publish sebuah halaman
- [ ] Kirim 1 enquiry & 1 lamaran freelancer (dengan CV) → muncul di Inbox + email notifikasi diterima
- [ ] Unduh CV hanya bisa setelah login
- [ ] `robots.txt` staging = *Disallow: /* (karena `NEXT_PUBLIC_SITE_ENV=staging`)
- [ ] Semua item "Wajib sebelum peluncuran" di `04-konfirmasi-klien.md` selesai

## Langkah 7 — Domain & peluncuran (butuh persetujuan klien)

1. Vercel → Settings → Domains → tambah `www.thecharismacode.co` dan `thecharismacode.co` (redirect ke www).
2. Ubah DNS di registrar sesuai instruksi Vercel. **Simpan backup WordPress** (ekspor + file) sebelum DNS dipindah; biarkan bisa diakses 30 hari di subdomain sementara dengan `noindex`.
3. Setelah aktif: jalankan `npm run test:smoke` terhadap domain asli, submit `https://www.thecharismacode.co/sitemap.xml` di Search Console, pantau laporan *Pages* 4–6 minggu.

---

## Mengubah skema CMS setelah launch (penting!)

Saat development, database lokal menyesuaikan diri otomatis (*push mode*). **Produksi tidak.** Alurnya:

1. Ubah koleksi/blok/field di kode, cek di lokal (`npm run dev`).
2. Buat file migrasi:

```bash
npm run migrate:create
```

3. Commit file baru di `src/migrations/` bersama perubahan kode.
4. Push → Vercel menjalankan `npm run ci` → `payload migrate` menerapkan perubahan ke database produksi.

Migrasi awal (`src/migrations/20261012_060329_initial.ts`) sudah diuji pada database kosong: 188 tabel terbentuk tanpa error.

## Backup & pemulihan

- **Database**: aktifkan *point-in-time restore* Neon (retensi sesuai paket) + ekspor mingguan:

```bash
pg_dump "$DATABASE_URL" --format=custom --file=backup-YYYY-MM-DD.dump
```

- **File (R2)**: aktifkan *object versioning*/replikasi bucket, atau sinkronisasi berkala ke penyimpanan kedua.
- **Kode**: GitHub. **Rollback**: Vercel → Deployments → *Instant Rollback*.
- Uji pemulihan backup setiap 3 bulan.

## Catatan keamanan

- Semua rahasia hanya di Environment Variables Vercel — tidak pernah di kode atau GitHub.
- Form publik: validasi server, honeypot, cek waktu pengisian, rate limit 3 kiriman/15 menit per IP (IP hanya disimpan sebagai *hash*).
- Koleksi Enquiries/Freelancer Applications/Résumés tertutup untuk API publik (diuji: 403).
- CV: tipe file & isi file diperiksa (PDF/DOC/DOCX, maks 4 MB), nama file diacak, disimpan privat.
- GraphQL dimatikan; header keamanan aktif; login dikunci setelah 5 kali gagal.
- `npm audit` (12 Okt 2026): celah kritis Next.js sudah ditutup (upgrade ke 16.4.0) dan `undici` di-override ke versi aman. Sisa peringatan berasal dari dependensi bawaan Payload (`nodemailer` 9.x — risiko praktis rendah karena hanya satu transport SMTP dan penerima email tidak berasal dari input pengunjung) dan tooling build (`braces`). Pantau rilis Payload berikutnya dan jalankan `npm audit` setiap bulan.
- PDPA: tunjuk Data Protection Officer, perbarui Privacy Policy (form baru, penyimpanan CV, GA4, masa simpan data), dan hapus lamaran/enquiry lama secara berkala.
