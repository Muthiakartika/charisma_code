# 04 — Daftar Konfirmasi untuk Klien (De Zhong)

Item di bawah ini **belum bisa diverifikasi** dari website lama. Selama belum dikonfirmasi, item tersebut ditandai di CMS (`Review status: Needs client review`) atau tidak ditampilkan.

## A. Wajib sebelum peluncuran

| # | Item | Kenapa penting | Status di website baru |
|---|---|---|---|
| 1 | **Foto corporate team building & workshop korporat** (min. 10–15 foto berkualitas) | Prioritas bisnis #1 belum punya bukti visual | Sementara memakai foto keterlibatan grup yang paling relevan, ditandai di CMS |
| 2 | **Testimoni klien korporat / team building** (dengan izin) | Konversi B2B sangat bergantung pada bukti sosial | Belum ada — section memakai ulasan Google yang ada |
| 3 | Daftar **klien/logo** final (34 nama dari website lama), konteks proyek, dan izin menampilkan logo | Hindari klaim yang tidak bisa dipertanggungjawabkan & masalah merek dagang | **Logo resmi sudah dipasang** (12 Okt 2026, atas permintaan): diambil dari file resmi publik (Wikimedia/situs brand) atau file yang dulu diunggah klien sendiri; sumber tiap logo di `src/seed/client-logos.ts`. Status klien tetap "Needs confirmation". **Sebelum live: klien wajib mengonfirmasi daftar & izin**, hapus/sembunyikan yang tidak bisa dikonfirmasi (CMS → Clients → *Show on website*) |
| 4 | **Logo The Charisma Code dalam SVG / PNG transparan** (versi gelap & terang) | Logo saat ini raster dengan latar cream | Wordmark sementara + logo WebP lama |
| 5 | Angka pengalaman resmi: **15 atau 16 tahun**? | Konsistensi & kredibilitas | Ditulis "over 15 years" sampai dikonfirmasi |
| 6 | Format program team building yang benar-benar ditawarkan (durasi, ukuran grup min–maks, indoor/outdoor, virtual?) | Halaman team building menampilkan format program | Draft copy, ditandai "Needs client review" |
| 7 | Alamat email penerima notifikasi enquiry & aplikasi freelancer | Notifikasi form | Default: `hello@thecharismacode.co` |
| 8 | Persetujuan semua **copy baru** (homepage, team building, FAQ) | Copy ditulis ulang saat redesign | Ditandai "Needs client review" di CMS |
| 9 | Kebijakan privasi diperbarui (form baru, penyimpanan CV, GA4, masa simpan data) + nama **Data Protection Officer** (PDPA) | Kepatuhan PDPA | Halaman /legal lama dimigrasi, perlu revisi |
| 10 | Akun & akses: domain/DNS, Google Search Console, GA4, hosting (Vercel), database (Neon/Supabase), Cloudflare R2, SMTP | Deployment | Belum dibuat — harus dibuat oleh pemilik bisnis |

## B. Penting, bisa menyusul

| # | Item |
|---|---|
| 11 | Testimoni screenshot WhatsApp/Instagram: pilih 5–10 terbaik + izin dari pemberi testimoni untuk ditampilkan sebagai teks |
| 12 | Ulasan Google "Dr Fin Ariffin" (tentang perawatan estetika) muncul di widget lama — periksa sumber widget Trustindex |
| 13 | File `Edits.docx` di media WordPress dapat diunduh publik — periksa isinya & hapus bila internal |
| 14 | Harga workshop lama ($388 / $880 / $120) — masih berlaku dan ingin ditampilkan? (default: tidak ditampilkan) |
| 15 | Nama Mandarin resmi founder (terlihat "谢德忠" di tayangan TV) dan penulisan nama brand dalam Mandarin |
| 16 | Reviewer native Mandarin untuk menyetujui terjemahan halaman prioritas |
| 17 | Detail proyek portofolio (objective, outcome, izin menyebut nama klien) untuk: Banyan Group D&D, Lectrix Engineering Christmas, SOMA launch, CWA, Maris Stella, wedding Sheraton Towers |
| 18 | Video showreel terbaru (reel 2023 yang ada mungkin sudah lama) |
| 19 | Google Business Profile: apakah sudah ada? Kategori bisnis, area layanan (tanpa alamat publik = "service-area business") |
| 20 | Data Search Console 12 bulan untuk menentukan nasib 58 artikel SEO generik |

## C. Ditemukan saat pembangunan (12 Okt 2026)

| # | Item | Status |
|---|---|---|
| 21 | Foto sampul proyek **Banyan Group D&D** adalah screenshot video (kualitas rendah) | Ditandai *Placeholder* di Media |
| 22 | Foto anak-anak (pesta princess, pesta anak) menampilkan wajah tanpa blur — pastikan ada izin orang tua, atau ganti/blur seperti foto Maris Stella | Perlu konfirmasi |
| 23 | Foto "bow tie" memakai telinga kelinci (properti photo booth) — tidak dipakai di halaman korporat | Disimpan di Media, tidak ditampilkan |
| 24 | Rentang **budget** di form enquiry (di bawah S$2.000 … di atas S$10.000) dan rentang **ukuran grup** — sesuaikan dengan harga & kapasitas sebenarnya | `src/lib/forms/options.ts` |
| 25 | 4 **format program team building** dan 6 **FAQ team building** ditulis sebagai usulan | *Needs client review* di CMS |
| 26 | Kutipan testimoni ditampilkan **apa adanya** dari ulasan Google (termasuk salah ketik), dipotong dengan "…" bila terlalu panjang | Bisa diganti dengan izin penulis |
| 27 | Teks UI Mandarin (`src/i18n/dictionaries.ts`) adalah draf | Perlu penutur asli |
| 28 | Riset volume keyword tidak dijalankan (atas instruksi, Ahrefs tidak dipakai). Prioritas keyword memakai kandidat dari brief; validasi nanti dengan data Search Console | Lihat `08-analytics-dan-laporan.md` |

## D. Dari pembaruan desain (Impeccable + tasteskill + genjutsu, 12 Okt 2026)

| # | Item | Status |
|---|---|---|
| 29 | Judul homepage baru **"We get the whole room involved."**, subjudul yang menyebut nama De Zhong, dan highlight *Hosted in English & 中文 · Founder-led · Based in Singapore* | Usulan copy, *Needs client review* |
| 30 | Strip bukti di halaman Team Building memakai kutipan **Jaz Hang** (ulasan Google, konteks *Pool party*, ditulis apa adanya). Idealnya diganti testimoni klien team building korporat (lihat #2) | Ditampilkan dengan label konteks yang jujur |
| 31 | Bagian founder di homepage kini memakai foto De Zhong memegang mikrofon di acara malam (foto *Placeholder*). Lebih baik: foto profesional di panggung acara korporat | Perlu foto dari klien |
| 32 | Strip "Planned for your group size" memakai rentang **Under 20 / 20 to 100 / Over 100**, mengikuti batas di form enquiry | Sesuaikan dengan kapasitas sebenarnya (lihat #24) |
| 33 | **Feed Instagram di homepage**: 7 dari 9 postingan terbaru bersifat pribadi (di rumah, dua tanpa baju, gym, klinik gigi), beberapa juga menampilkan orang lain. Semuanya tampil karena diminta "postingan terbaru" | Klien memilih mana yang disembunyikan (CMS → Instagram Posts → *Show on website*), atau setelah API tersambung, kita filter otomatis (mis. hanya postingan dengan hashtag tertentu) |
| 34 | **Akses API Instagram**: akun @deprinceofzhong harus akun Professional (Creator/Business); token dari aplikasi Meta (berlaku 60 hari, diperpanjang otomatis oleh server) | Menunggu token dari pemilik akun untuk menyambungkan sinkronisasi otomatis |
