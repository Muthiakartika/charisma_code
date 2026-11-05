# Draf Bahasa Mandarin (中文) untuk website

**Dibuat:** 4 Nov 2026
**Bahasa:** Mandarin Sederhana versi Singapura (简体中文, istilah yang dipakai di Singapura)
**Status:** DRAF. Belum masuk CMS, belum tampil di website. **Wajib dicek penutur asli** (De Zhong atau orang yang dia tunjuk) sebelum dipakai.

## Isi folder ini

| File | Isi | Untuk siapa |
|---|---|---|
| [glossary.md](glossary.md) | Daftar istilah EN → 中文 dan aturan gaya penulisan | Reviewer Mandarin |
| [pages/](pages/) | 24 halaman website, satu file per halaman, dengan nama file yang sama seperti brief Inggris di `docs/handoff/pages/` | Reviewer, lalu developer |
| [shared.md](shared.md) | Teks yang tidak ada di brief: header, menu, footer, SEO umum, kredensial di About, halaman Work With Us, 7 studi kasus | Reviewer, lalu developer |
| [proofreading-2026-11-05.md](proofreading-2026-11-05.md) | Hasil proofreading kedua (5 Nov): 352 perbaikan tata bahasa, arti dan gaya, plus 12 pilihan gaya untuk diputuskan De Zhong | Reviewer, klien |

## Kenapa "Mandarin Singapura" berbeda

Singapura memakai huruf sederhana (简体) seperti Tiongkok, tetapi sebagian kosakatanya berbeda. Draf ini sengaja memakai istilah Singapura, misalnya:

| Inggris | Singapura (dipakai) | Tiongkok (dihindari) |
|---|---|---|
| Mandarin (bahasa) | 华语 | 普通话 |
| package (paket harga) | 配套 | 套餐 |
| founder | 创办人 | 创始人 |
| year-end dinner / D&D | 年终晚宴, 公司晚宴（D&D） | 年会 |
| seniors | 乐龄人士 | 老年人 |
| email | 电邮 | 邮箱 |

Daftar lengkapnya ada di [glossary.md](glossary.md).

## Keputusan yang saya ambil (bisa diubah reviewer)

1. **Nama brand tetap "The Charisma Code"**, tidak dibuatkan nama Mandarin (belum ada nama resmi, lihat docs/04 item 15).
2. **Nama founder: 谢德忠**, sesuai kartu namanya. Penyebutan pertama di tiap halaman: 谢德忠（Chia De Zhong）, selanjutnya 德忠.
3. **Ulasan klien (Google review) tetap dalam bahasa Inggris** karena itu kata-kata asli orang lain. Hanya label "Google review" yang diterjemahkan jadi "Google 评价".
4. **Hanya menyebut English & 中文**, tidak ada Bahasa Melayu (sesuai keputusan 22 Okt).
5. **Harga tidak diubah**, ditulis "S$588 起" (mulai S$588). Teks yang di brief Inggris ditandai `<mark>` (konten contoh/belum dikonfirmasi) tetap ditandai `<mark>` di versi Mandarin.
6. **Tidak diterjemahkan dulu:** halaman Terms & Privacy (teks hukum), 70 artikel blog, dan halaman "future" yang masih berisi konten contoh. Alasannya ada di [shared.md §9](shared.md).

## Pertanyaan untuk reviewer

Daftar lengkap pilihan gaya setelah proofreading 5 Nov ada di [proofreading-2026-11-05.md](proofreading-2026-11-05.md). Yang paling perlu diputuskan penutur asli (detailnya ada di baris `> **Note (译注):**` di tiap file):

1. **H1 Corporate Emcee.** Versi Inggris menjanjikan "guarantees the fun". Draf memakai 包您玩得尽兴 (janji ringan); ada alternatif tanpa janji di catatannya.
2. **Ucapan 捞鱼生 di halaman Chinese New Year.** Enam ucapan keberuntungan perlu dicocokkan dengan yang benar-benar diucapkan De Zhong.
3. **Istilah sekolah:** "speech day" = 颁奖日, "prize-giving" = 颁奖礼. Mungkin sekolah Singapura memakai 常年颁奖典礼.
4. **常年晚宴** (annual dinner) dipisahkan dari **年终晚宴** (year-end dinner). Perlu dikonfirmasi.
5. **Nama Mandarin resmi** untuk kompetisi SAFRA *The Ultimate Talent*, UFM100.3 *The Wedding Singer* dan Caregiving Welfare Association, kalau ada.
6. **Nama paket harga** (婚宴司仪, 新春游戏主持, 儿童派对主持, dan lainnya) adalah usulan, daftar lengkapnya di glossary §9.
7. **Ulasan klien tetap bahasa Inggris.** Kalau klien lebih suka diterjemahkan, itu keputusan klien.

## Cara membaca file halaman

Formatnya sama dengan brief Inggris (lihat `docs/handoff/README.md` §2), supaya nanti bisa dimasukkan ke CMS secara otomatis, blok demi blok:

- Judul bagian (`## Section 3 — What we are`) dan penanda seperti `**H2 ·**`, `**Button:**`, `**Price line:**` sengaja **tetap bahasa Inggris**. Yang diterjemahkan hanya teks sesudahnya.
- Tujuan tombol (link setelah `→`) tidak berubah.
- Baris `> **Note (译注):** …` adalah catatan penerjemah untuk reviewer, **tidak akan tampil** di website.
- Di akhir tiap file ada judul SEO, meta description, pesan WhatsApp otomatis dan teks ALT foto dalam bahasa Mandarin.

## Pengecekan struktur

Setiap file halaman sudah dicek dengan:

```bash
npx tsx scripts/check-zh-draft.ts
```

Skrip ini memastikan tiap file Mandarin punya bagian, urutan teks dan tujuan tombol yang sama persis dengan brief Inggrisnya, dan tidak memakai tanda pisah (—). Jalankan lagi setelah reviewer mengedit file.

## Teks tombol, form dan pesan error

Teks tetap website (tombol, label form, pesan error) tidak ada di folder ini, tetapi di `src/i18n/dictionaries.ts` (bagian `zh`). Itu juga draf yang perlu dicek reviewer yang sama. Pada 4 Nov 2026 ditambahkan label Mandarin untuk 3 pilihan peran di form Work With Us yang sebelumnya belum ada: Coach (教练), Partner vendor (合作供应商), Fringe activity provider (周边活动提供者).

## Memasukkan ke CMS

Sejak 5 Nov 2026 ada perintah:

```bash
npm run import:zh
```

Perintah ini mengisi versi 中文 di CMS dari folder ini: 24 halaman beserta bagian tambahan dari brief *future*, header, menu, footer, SEO umum, layanan, dan 7 studi kasus. Status halaman dan studi kasus diset *Draft, needs native-speaker review*. Susunan halaman, foto dan link tidak berubah; yang diisi hanya teks versi 中文. Caranya: tiap teks Inggris di CMS dicocokkan dengan pasangan Mandarinnya dari brief, `shared.md` dan `glossary.md`. Teks yang tidak ketemu pasangannya tetap bahasa Inggris dan dicetak di akhir. Pada 5 Nov tinggal nama venue Sheraton Towers Singapore dan Mandai Rainforest Resort (memang sengaja). Perintah ini aman dijalankan ulang setelah reviewer mengedit file. Perintah ini **tidak** ikut jalan saat deploy ke Vercel.

**Staging mendapatkannya otomatis saat deploy.** `npm run ci` di Vercel menjalankan `npm run import:zh:deploy` (`src/seed/handoff/deploy-zh.ts`) sekali per versi. Penandanya `content:zh-draft` di database, jadi edit Mandarin yang dibuat di CMS staging sesudahnya tidak tertimpa. Kalau draf diperbarui setelah review, tambahkan versi baru di daftar `UPDATES` di file itu. Halaman yang sudah di-*Approve* tetap *Approved*.

**Kapan versi Mandarin tampil** (fungsi `showsChinese` di `src/i18n/config.ts`):

| Situs | Halaman *needs review* | Halaman *Approved* |
|---|---|---|
| Lokal (`npm run dev`) dan staging (`NEXT_PUBLIC_SITE_ENV` bukan `production`) | Tampil, tombol 文A 中文 aktif | Tampil |
| Situs resmi (`NEXT_PUBLIC_SITE_ENV=production`) | Dialihkan ke versi Inggris | Tampil, masuk sitemap dan hreflang |

Jadi De Zhong bisa mereview langsung di situs staging, sedangkan di situs resmi nanti hanya halaman yang sudah disetujui yang terbit. Sitemap di mana pun hanya memuat halaman *Approved*.

## Langkah berikutnya

1. **Review penutur asli.** Reviewer bisa langsung mengedit file `.md` di sini (lalu jalankan `npm run import:zh` lagi), atau mengecek lewat Preview di CMS. Kalau lebih nyaman, bisa dibuatkan versi Word/Google Docs.
2. **Setujui per halaman.** Setelah dicek di admin (Locale: 中文), ubah status *Chinese translation* jadi *Approved*. Halaman itu lalu tampil di `/zh/…`, masuk sitemap, dan dapat tag hreflang.
3. **Sebelum situs resmi diluncurkan**, ubah setiap halaman yang sudah dicek jadi *Approved*. Halaman yang masih *needs review* tidak akan tampil di situs resmi.
