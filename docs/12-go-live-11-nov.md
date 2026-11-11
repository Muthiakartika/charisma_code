# 12 — Perubahan Go-Live dan Rencana Blog (11 Nov 2026)

**Sumber:** dua dokumen dari tim, 11 Nov 2026:

| Dokumen | Isi |
|---|---|
| `D:\Office\go-live-changes.md` | 8 bagian: harga jadi "Quoted", layanan yang belum ada dihapus, SOMA dikurangi, 15 tukar foto, konten lain, versi Mandarin disembunyikan, yang tidak boleh diubah, hari launch |
| `D:\Office\blog-plan.md` | 70 artikel blog lama: 7 tetap, 6 digabung jadi satu panduan baru, 57 di-redirect. Menggantikan bagian "After launch (optional)" di dokumen pertama |

**Status (11 Nov 2026):** semua yang bisa dikerjakan di kode sudah diterapkan dan diimpor ke database **lokal** (backup sebelumnya: database `charisma_before_2026_11_11`), lalu dicek dengan skrip (385 cek konten + 191 cek smoke test, termasuk 160 redirect). **Belum di-commit, belum di-push, staging belum berubah.** Staging mendapat semuanya otomatis saat deploy berikutnya lewat update `2026-11-11` di `src/seed/handoff/deploy.ts` dan `deploy-zh.ts`.

---

## 1. Harga jadi "Quoted"

Diubah di brief (`docs/handoff/pages/*.md`), termasuk hero, kartu paket, tabel harga, FAQ, band penutup, dan judul/deskripsi SEO yang berisi harga.

| Halaman | Sebelum | Sesudah |
|---|---|---|
| /school-family-emcee | S$588 / S$888 / S$1,288 | Tiga nama paket tetap, harga jadi "Quoted for your event". Hero: "Three packages, quoted for your event" |
| /corporate-team-building | From S$88 per participant, S$88–128 | "Quoted for your group size and objectives"; rentang harga di FAQ dihapus |
| /communication-coaching | S$120 per session | "Quoted" (hero: "One-to-one coaching, quoted for your goal") |
| /corporate-workshops | 1-to-1 coaching from S$120 | "1-to-1 coaching for team leads, quoted" |
| /rates | baris School & family, Team building, Coaching, Modular school programme | Keempatnya "Quoted". Hero: "Emcee hosting from S$600" saja |
| /emcee | kartu dan baris tabel School & family S$588 | "Quoted" (baris dipindah ke bawah tabel) |
| /services | "Starting prices from S$120", kartu Team Building, Coaching, Kids, FAQ | "Starting prices on our rates page", kartu "Quoted", FAQ disesuaikan |
| / (home) | kartu Team Building, Coaching, Kids; FAQ; hero "team building from S$88" | kartu "Quoted"; FAQ persis teks dokumen; S$88 di hero ikut dihapus |

Harga kartu layanan di seluruh situs ikut berubah, karena kartu layanan mengambil harganya dari brief beranda. Schema `Offer` untuk layanan yang jadi "Quoted" otomatis hilang.

## 2. Layanan yang belum ada: dihapus

- **/communication-coaching:** kartu "Public speaking course" dihapus; judul jadi "What coaching covers". Kalimat lain yang menawarkan kursus juga disesuaikan (hero, satu tick, FAQ harga, pilihan "course" di form), begitu juga judul SEO ("Public Speaking Coaching Singapore | One-to-One and Teams").
- **/kids-youth-programs:** tiga kartu format, semua harga, "around 10 hours", "three full days" dan FAQ "Do you run holiday camps?" dihapus (seluruh bagian "Programme formats"). Hero: "Programmes designed with your school, quoted per school". Tombol hero "See the formats" jadi "See what we teach". Pendekatan, materi dan Maris Stella tetap.
- **Menu:** deskripsi Kids & Youth "School programmes and camps" jadi "School programmes".
- **/chinese-new-year-emcee:** satu paket (Dinner Emcee, from S$2,800, up to 4 hours) plus kartu "Add to your dinner" (festive games, full festive programme, DJ/sound: quoted). Badge "MOST POPULAR" dan bagian "Which package suits your dinner?" hilang; tabel harga, FAQ, form dan band penutup disesuaikan.
- **/product-launch-events:** kartu "Hybrid launch" dihapus (juga pilihan "hybrid" di form).

## 3. SOMA dikurangi

Bagian studi kasus SOMA (angka dan foto) di /product-launch-events dan /creative-campaigns diganti satu baris: "Example: talent and influencer coordination for a fragrance launch, 2025", yang link ke /our-work/soma-fragrances-brand-launch. Halaman studi kasusnya sendiri tetap.

Supaya link di baris itu bisa diklik, paragraf di blok teks (TextImage) sekarang mendukung link `[teks](/alamat)`.

## 4. Tukar foto

Diatur di `src/seed/handoff/recipes.ts` (`heroImages`, `photoFor`). Aturan "satu foto hanya sekali per halaman" membuat beberapa pilihan menyimpang dari dokumen; yang menyimpang ditandai ⚠.

| Halaman | Bagian | Sekarang |
|---|---|---|
| /chinese-new-year-emcee | Hero | Foto banquet dengan mikrofon ⚠ foto ini tadinya di band "Leading the lo hei", band itu sekarang memakai foto gala stage |
| /corporate-emcee | Award ceremony | Foto podium Resorts World Sentosa ⚠ foto itu tadinya foto kedua di hero; hero kedua sekarang foto gala stage |
| /conference-emcee | Hero | Foto podium RWS |
| /conference-emcee | Speaker introductions | Fasilitator bertanya ke ballroom (dari team building) |
| /conference-emcee | Panel moderation | "On stage in front of a large seated audience" |
| /government-community-emcee | Government and ministry events | ⚠ Foto Caregiving Week untuk Caregiving Welfare Association (foto CWA yang biasa sudah jadi hero) |
| /corporate-workshops | Hero | Kolega menjelaskan rencana di meja bundar |
| /corporate-workshops | Presenting with confidence | Tim mempresentasikan pitch di panggung |
| /communication-coaching | Clearer everyday communication | Potret kemeja putih ⚠ band "Individual and corporate coaching" yang tadinya memakai potret itu sekarang memakai foto kolega di meja bundar |
| /roadshow-emcee | Mall roadshows | ⚠ Foto acara keluarga di atrium (foto panggung atrium mal sudah jadi hero) |
| /roadshow-emcee | Hero foto kedua | Acara komunitas di atrium mal |
| /roadshow-emcee | Trade shows and exhibitions | ⚠ Foto game booth di acara brand (foto atrium komunitas sudah di hero) |
| /roadshow-emcee | Product launches and live demos | Demo masak di toko |
| /event-support | Sound and AV | Foto panggung gala brand ⚠ band "Why one point of contact" yang tadinya memakai foto itu sekarang memakai foto seminar stage |
| /about | The crew behind the spark | Tanpa foto (foto kerumunan bersorak sudah ada di halaman ini) |
| /kids-youth-programs | A safe space…; A moment for every child… | ⚠ Tanpa foto. Foto Maris Stella dipakai studi kasus, foto pesta anak dipakai hero |

## 5. Konten lain

- **Review "Pool party":** label acara dihapus dari review Jaz Hang (berlaku di semua halaman yang menampilkannya).
- **/rates:** FAQ baru "What if we need to cancel?" → "Cancellation terms are set out in your quotation." /legal tidak diubah.
- **/event-planning:** "Fully planned events usually start from around S$10,000." di bagian harga dan di FAQ biaya.
- **/contact:** "Based in Singapore. Meetings by arrangement." di bawah "Choose how to reach us".
- **CV PDF:** kedua CV (emcee dan acting) sudah dibuka: **tidak ada alamat rumah**.
- **Foto anak:** foto pesta anak (`ser-01.webp`, hero /kids-youth-programs dan /school-family-emcee) memperlihatkan dua wajah anak yang jelas. Dibuat versi baru dengan wajah di-blur (`src/seed/photos/kids-party-games-faces-blurred.webp`). Foto kerumunan dengan wajah anak di hero /school-family-emcee diganti foto acara keluarga di atrium. Foto Maris Stella sudah di-blur sejak awal.

## 6. Versi Mandarin: disembunyikan

Satu saklar: `chineseForVisitors = false` di `src/i18n/config.ts`.

- Tombol 中文 tidak tampil di header halaman Inggris (di halaman /zh tetap ada tombol kembali ke EN).
- Tag hreflang zh-SG tidak ada lagi di halaman maupun sitemap.
- Halaman /zh mendapat `noindex` dan tidak masuk sitemap. Di staging /zh masih bisa dibuka lewat URL untuk review.

Catatan: draf Mandarin (`docs/zh-draft`) **belum** disesuaikan dengan perubahan di atas. Setelah impor ulang, 5 halaman /zh sebagian masih berbahasa Inggris (CNY 48 teks, creative campaigns 52, product launch 35, kids 23, contact 6). Halaman /zh lain juga masih memuat harga lama. Ini sesuai dokumen: Mandarin diaktifkan lagi setelah klien menyetujui dan draf diperbarui.

## 7. Tidak diubah (sesuai dokumen)

Logo strip 33 brand (tanpa logo Youth Olympic Games), brand yang izinnya belum ada, link "Read more Google reviews", dan halaman yang belum dibangun (/videos, /press, /events/…, /about/crew/…, /insights/resources, /insights/lo-hei-phrases: tetap draft, tidak di menu dan sitemap).

## 8. Hari launch: belum (butuh akses Vercel dan DNS)

- `NEXT_PUBLIC_SITE_URL=https://www.thecharismacode.co` dan `NEXT_PUBLIC_SITE_ENV=production` di Vercel production. Kodenya sudah membaca keduanya: canonical, hreflang, sitemap dan JSON-LD memakai SITE_URL; header `noindex` dan `Disallow: /` hilang otomatis bila SITE_ENV=production.
- Setelah DNS pindah: `TEST_BASE_URL=https://www.thecharismacode.co npm run test:smoke`. Smoke test sekarang benar-benar membaca daftar redirect (sebelumnya pola pencariannya mencari tanda kutip ganda, sehingga 0 redirect yang dicek).
- Search Console: verifikasi domain dan kirim sitemap.

---

## Rencana blog

- **7 artikel tetap** di /insights dengan slug yang sama (termasuk COMPASS yang "OPTIONAL": dibiarkan tetap).
- **63 artikel di-unpublish** (jadi draft di CMS, tidak dihapus): 6 artikel naskah wedding, 56 artikel SEO, dan artikel SOMA /hello-world.
- **Redirect** (`src/lib/legacy-redirects.ts`, 160 entri): URL WordPress lama dan salinan `/insights/<slug>` masing-masing satu kali 301 ke tujuan di tabel rencana. Daftar artikel yang dipensiunkan (`retiredPostSlugs`) diambil dari daftar redirect ini, jadi cukup diubah di satu tempat.
- **Panduan baru** `/insights/wedding-emcee-script-singapore`: belum ada (copy dari tim). Sementara 12 redirect-nya ke /wedding-emcee. Begitu panduan terbit, ganti 12 tujuan itu (ada komentar di file).
- **Kategori kosong:** disembunyikan dari daftar kategori dan sitemap; halamannya redirect ke /insights. Yang masih punya artikel: founder-updates, weddings, kids-programs. Redirect lama `/category/event` dan `/category/workshops` sekarang langsung ke /insights (tetap satu hop).
- **Link internal:** tidak ada halaman layanan yang link ke artikel yang dipensiunkan. Lima artikel yang tetap berisi 11 link ke alamat WordPress lama (dua ke artikel yang dipensiunkan); semuanya diarahkan langsung ke halaman tujuannya.
- **Impor ulang dari WordPress:** artikel yang dipensiunkan disimpan sebagai draft, jadi tidak muncul lagi.

## File yang berubah

- Brief: `docs/handoff/pages/` (14 halaman).
- Importer: `src/seed/handoff/recipes.ts` (foto), `import.ts` (foto anak yang di-blur, opsi `NO_PHOTO`), `deploy.ts` dan `deploy-zh.ts` (update 2026-11-11), `go-live-2026-11-11.ts` (baru: unpublish artikel, relink, menu, label review).
- Situs: `TextImage.tsx` (link di paragraf), `PostArchive.tsx`, halaman kategori, `sitemap.ts`, `cms.ts` (kategori kosong), `SiteNavigation.tsx`, `seo.ts`, `i18n/config.ts` (Mandarin), `legacy-redirects.ts`.
- Seed: `data.ts`, `index.ts`, `wordpress-posts.ts`. Tes: `scripts/smoke-test.mjs`.

## Hal yang perlu diketahui saat deploy

- Deploy pertama setelah ini lebih lama dari biasanya, karena 20 halaman diimpor ulang dan seluruh draf Mandarin diterapkan ulang (terakhir kali sekitar 28 menit).
- Mengimpor ulang halaman menimpa editan di /admin pada 20 halaman itu (seperti update sebelumnya).
