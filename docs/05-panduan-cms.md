# 05 — Panduan Admin CMS (Payload)

Buka **http://localhost:3000/admin** (di produksi: `https://www.thecharismacode.co/admin`).

Menu admin dikelompokkan:

| Kelompok | Isi |
|---|---|
| **Content** | Pages, Services, Programs, Portfolio Projects, Testimonials, Clients, FAQs, Founder's Updates, Media |
| **Insights (Blog)** | Blog Posts, Categories |
| **Inbox** | Enquiries, Freelancer Applications, Résumés (hanya terlihat oleh yang berhak) |
| **Admin** | Users |
| **Settings** | Header, Navigation, Footer, Contact Information, Social Links, SEO Defaults, Redirects |

---

## 1. Draft, Preview, Publish, Unpublish

Pages, Blog Posts, Portfolio Projects, Services, Programs, FAQs, Testimonials dan Founder's Updates memakai **draft**:

- Saat Anda mengetik, perubahan **tersimpan otomatis sebagai draft** — belum tampil di website.
- Ikon **mata** (Live Preview) menampilkan halaman di samping editor dan ikut berubah saat Anda mengedit. Pilih ukuran Mobile/Tablet/Desktop di atas pratinjau.
- Ikon **kotak-panah** membuka pratinjau di tab baru.
- Tombol **Publish changes** menerbitkan perubahan ke website.
- **Unpublish**: klik menu titik tiga (⋮) di sebelah tombol Publish → *Unpublish*. Halaman hilang dari website, tetap tersimpan di CMS.
- **Versions**: riwayat perubahan; bisa membandingkan dan mengembalikan versi lama.

> Hanya pengguna yang login yang bisa melihat draft. Pengunjung selalu melihat versi yang sudah terbit.

---

## 2. Mengedit halaman (Pages)

**Content → Pages** → pilih halaman. Setiap halaman terdiri dari:

- Tab **Page**: judul + **Page sections** (daftar blok dari atas ke bawah).
- Tab **SEO**: judul SEO, deskripsi, gambar untuk share sosial media, dan pratinjau tampilan di Google.
- Sidebar kanan:
  - **Visual style** — *Corporate* (default), *Wedding* (hangat & elegan), *Kids & Youth* (ceria).
  - **Slug** — alamat halaman. ⚠️ **Jangan ubah slug halaman inti** (`home`, `corporate-team-building`, `corporate-emcee`, `dinner-and-dance-emcee`, `chinese-new-year-emcee`, `corporate-workshops`, `communication-coaching`, `wedding-emcee`, `kids-youth-programs`, `creative-campaigns`, `event-support`, `services`, `our-work`, `about`, `insights`, `contact`, `work-with-us`, `legal`) karena alamatnya ditentukan oleh folder di kode.
  - **Chinese translation (中文)** — lihat bagian 9.
  - **Content review** — catatan internal: *Needs client review* / *Approved by client*. Tidak tampil di website.

### Mengelola section (blok)

- **Tambah**: tombol **Add Page section** di bawah daftar → pilih jenis blok.
- **Urutkan**: seret ikon titik-titik (⠿) di kiri blok.
- **Edit**: klik blok untuk membuka.
- **Sembunyikan sementara**: buka blok → *Section settings* → centang **Hide this section**.
- **Hapus**: menu titik tiga (⋯) pada blok → *Remove*.
- **Anchor ID** (di *Section settings*): untuk tombol yang melompat ke bagian itu, misalnya anchor `enquire` → tombol ke `/corporate-team-building#enquire`.

### Menyorot kata pada judul

Bungkus kata dengan bintang: `Experiences built around *your people*.` → "your people" tampil dengan warna aksen.

### Jenis blok yang tersedia

| Blok | Kegunaan |
|---|---|
| **Hero** | Bagian pembuka: judul, subjudul, 2 tombol, foto, dan maks. 3 *highlights* pendek (mis. "Hosted in English & 中文"). Layout: *Split* (foto kanan), *Colour block* (latar terang, 2 foto lingkaran keluar dari blok warna brand, dengan **Line art** samar di blok: lampu sorot, tirai panggung, skyline Singapura, atau tanpa; dipakai di homepage), *Stage* (latar gelap, 2 foto dalam lingkaran sorot lampu, desain homepage sebelum 19 Okt 2026), *Full photo*, *Simple* (teks saja) |
| **Text and Image** | Teks + foto + poin-poin + tombol. Latar: terang/krem/gelap |
| **Feature Grid** | Daftar poin: *List* (bergaris, tanpa nomor, pilihan utama), *Numbered* (hanya bila urutan penting), *Comparison strip* (perbandingan 2 sampai 4 kolom dengan judul pendek besar, mis. ukuran grup), *Cards*, atau *Checklist* |
| **Process Steps** | Langkah bernomor seperti *run-of-show* emcee: nomor "menyala" dan garisnya terisi saat pengunjung scroll |
| **Service Cards** | Kartu layanan. *Priority* = layanan pertama paling besar (homepage) |
| **Program Cards** | Format program dari koleksi Programs |
| **Client Logo Grid** | *Scrolling row*: judul besar di tengah (bungkus kata dengan \*bintang\* untuk sorotan warna, mis. `we have *worked with*.`) lalu logo berjalan pelan; ikon jeda kecil di ujung kanan. *Compact list*: grid logo ringkas (atur jumlahnya) + satu kutipan testimoni di sampingnya, cocok tepat di bawah hero sebagai bukti |
| **Featured Projects** | 1–6 proyek portofolio |
| **Portfolio with filters** | Semua proyek + tombol filter kategori (halaman Our Work) |
| **Blog list** | Daftar artikel (halaman Insights) |
| **Testimonials** | Testimoni (manual atau per kategori) |
| **Founder Introduction** | Profil founder + kutipan + fakta |
| **Statement** | Ide besar brand di latar gelap panggung: judul, paragraf, daftar peran yang tampil besar seperti poster teater (menyala satu per satu saat di-scroll), dan baris bahasa (mis. `Hosted in *English & 中文*`). Dipakai di homepage untuk "What is The Charisma Code?" |
| **Founder's Updates** | 3 update terbaru dari koleksi Founder's Updates |
| **Team** | Foto, nama, peran, dan bio singkat anggota tim (maks. 12). Tanpa foto, inisial nama yang tampil. Di halaman About sudah ada tapi disembunyikan: isi anggota crew lalu hilangkan centang *Hide this section* |
| **Gallery** | 3–12 foto (mosaik atau grid) |
| **Video** | Video YouTube (dimuat hanya saat diklik, agar cepat) |
| **FAQ** | Tanya-jawab per layanan |
| **Call to Action** | Ajakan menghubungi + telepon/WhatsApp/email |
| **Enquiry Form** | Form enquiry klien (bisa pre-select layanan) |
| **Freelancer Application Form** | Form lamaran freelancer |
| **Text** | Teks panjang dengan editor (mis. halaman legal) |

Pilihan warna, ukuran, dan layout sengaja dibatasi agar desain tetap rapi apa pun yang diubah editor.

### Bar aksi di HP (otomatis)

Di layar HP, setelah pengunjung melewati hero, muncul bar kecil di bawah layar berisi tombol utama + WhatsApp. Tidak perlu diatur:
- Halaman yang punya **Enquiry Form**: tombol melompat ke form, labelnya diambil dari tombol utama hero bila tombol itu menuju form (mis. "Request a proposal").
- Halaman lain: memakai tombol header (**Settings → Header**, mis. "Let's Talk").
- Bar otomatis menyingkir saat form atau footer terlihat.

### Membuat halaman baru

**Pages → Create New** → isi judul, tambahkan blok, **Publish**. Halaman langsung tersedia di `https://…/slug-halaman` (melalui `[...slug]`). Tambahkan ke menu lewat **Settings → Navigation** bila perlu.

---

## 3. Mengedit homepage

**Pages → Home**. Urutan section saat ini:
Hero (*Colour block*, line art *Stage spotlight*) → Client Logo Grid (Background *Soft tint*, ivory gelap) → Statement ("What is The Charisma Code?") → Text and Image (Team Building) → Service Cards → Process Steps → Featured Projects → Founder Introduction (*Stage*, foto di panggung) → Testimonials → Founder's Updates → Call to Action.

**Kembali ke desain homepage lama (gelap):** di Hero pilih Layout *Stage*, lalu di Client Logo Grid pilih Background *Dark (stage)*, kemudian Publish. Tampilan lamanya juga bisa dilihat kapan saja tanpa mengubah apa pun di `/hero-options/dark-stage`.

- Foto hero: buka blok **Hero** → *Photos* (foto pertama = lingkaran besar, foto kedua = lingkaran kecil). Atur **focal point** setiap foto (lihat bagian Foto): sorot lampu pada animasi pembuka dimulai dari titik ini, jadi letakkan di wajah De Zhong.
- Proyek yang tampil: centang **Feature on the homepage** di proyek (Portfolio Projects).
- Urutan & isi kartu layanan: **Content → Services** (angka *Priority*: 1 = paling penting & paling besar).

---

## 4. Foto (Media)

- Unggah lewat **Content → Media** atau langsung dari field foto.
- **Alt text wajib**: jelaskan isi foto (penting untuk aksesibilitas & SEO).
- Klik foto → atur **focal point** (titik fokus) agar crop tetap menampilkan wajah/aksi. Pada hero *Stage* dan *Colour block*, animasi sorot lampu juga mulai dari titik ini.
- Centang **Placeholder — replace with a better photo** untuk foto sementara. Foto seperti ini sudah ditandai untuk halaman team building (belum ada foto team building asli).
- Format yang diterima: JPG, PNG, WebP, AVIF, PDF. Website otomatis mengecilkan & mengonversi foto ke AVIF/WebP.

---

## 5. Portofolio (Portfolio Projects)

**Content → Portfolio Projects → Create New**:

1. Judul, kategori (Team Building, Corporate Events, Dinner & Dance, Weddings, Kids & Youth, Campaigns), tanggal.
2. Nama klien (**hanya dengan izin klien**) & venue.
3. Ringkasan + foto sampul.
4. *Case study*: Objective, Our approach (solution), On the day (execution), Outcomes — **hanya hasil nyata, tanpa angka karangan**.
5. Galeri, link YouTube, testimoni terkait (opsional).
6. Sidebar: **Feature on the homepage**, **Has its own page** (hapus centang jika konten belum cukup — proyek hanya tampil sebagai kartu).
7. **Publish**.

---

## 6. Artikel blog (Insights)

**Insights (Blog) → Blog Posts → Create New**: judul, ringkasan (excerpt), foto sampul, isi artikel, kategori (sidebar), lalu **Publish**. Tanggal terbit terisi otomatis.
70 artikel lama sudah diimpor dari WordPress dan ditandai *Needs client review* — 58 di antaranya adalah artikel SEO generik yang sebaiknya ditinjau dengan data Search Console (lihat `01-audit`).

Kategori dikelola di **Categories**. Halaman kategori: `/insights/category/{slug}`.

---

## 7. Founder's Updates

Section "Founder's Updates" di homepage sekarang menampilkan **postingan Instagram terbaru** sebagai deretan sampul reel (6 terbaru, tiap kotak membuka postingannya di Instagram).

- **Content → Instagram Posts**: gambar (sampul reel/foto + alt text), link Instagram, tanggal posting, jenis (reel/foto/carousel), caption opsional.
- **Menyembunyikan postingan pribadi**: buka postingannya → hilangkan centang **Show on website** → Save. Postingan berikutnya otomatis mengisi tempatnya. Tidak perlu dihapus.
- Isi awal: 9 postingan terbaru @deprinceofzhong per 12 Okt 2026 (tanpa postingan yang di-pin), diambil dari profil publik.
- **Nanti, setelah API Instagram disambungkan**, postingan baru masuk otomatis ke koleksi yang sama (gambar disimpan di server sendiri, karena link gambar Instagram kedaluwarsa). Postingan yang disembunyikan tetap tersembunyi.
- Di blok **Founder's Updates** (Pages → Home) bisa dipilih: *Latest Instagram posts* atau *Founder's Updates cards*. Bila tidak ada postingan Instagram yang tampil, kartu Founder's Updates dipakai otomatis.

**Content → Founder's Updates** (kartu manual): judul, foto, deskripsi singkat (maks 220 karakter), tanggal, link Instagram **atau** link halaman website. Centang **Show on the homepage**. Dipakai bila sumbernya diatur ke kartu, atau sebagai cadangan.

---

## 8. Testimonials & Clients

- **Testimonials**: jangan pernah mengarang atau mengubah makna testimoni. Field **Permission to publish**:
  *Public review* (mis. ulasan Google) · *Written permission received* · *Permission pending* (**tidak akan tampil**).
- **Clients**: nama, logo, status *Confirmed* / *Needs confirmation*, dan **Show on website**. 34 klien dari website lama berstatus *Needs confirmation* dan sudah memakai logo resmi.
  - **Logo**: unggah PNG/WebP dengan **latar transparan**, lebar minimal 300px. Warna logo tidak penting: website menggambarnya satu warna yang mengikuti section (abu tua di latar terang, ivory di latar gelap), dan ukurannya diseimbangkan otomatis.
  - Logo dengan latar putih/berwarna akan tampil sebagai kotak polos. Hapus latarnya dulu (mis. dengan fitur *remove background*) sebelum diunggah.
  - Bila sebagian besar klien punya logo, klien tanpa logo tidak ditampilkan agar barisan tetap rapi; bila sebagian besar tanpa logo, semua tampil sebagai nama.
  - Urutan tampil mengikuti angka **Order** (kecil = lebih dulu). Strip ringkas di halaman Team Building menampilkan 12 klien teratas.

---

## 9. Bahasa Mandarin (中文)

1. Pilih **Locale: 中文 (简体)** di kanan atas admin.
2. Isi teks Mandarin pada field yang sama (foto & struktur halaman ikut versi Inggris).
3. Minta penutur asli Mandarin memeriksa.
4. Ubah **Chinese translation** menjadi **Approved** → halaman `/zh/…` aktif, masuk sitemap & tag hreflang.

Selama belum *Approved*, pengunjung `/zh/…` diarahkan ke halaman Inggris. Terjemahan setengah jadi tidak pernah terbit.

---

## 10. Enquiries (Inbox)

Setiap form enquiry yang berhasil dikirim tersimpan di **Inbox → Enquiries** dan mengirim email notifikasi ke alamat di **Settings → Contact Information → Send new enquiries to**.

- Kolom penting: referensi (mis. `ENQ-20261012-K7Q4`), layanan, status, sumber (*channel*), bahasa, tanggal.
- **Status**: New → Contacted → Qualified → Proposal sent → Won / Lost / Not a fit / Spam.
- **Internal notes**: catatan tim (tidak terlihat klien).
- Bagian *Source*: halaman form, halaman pertama yang dikunjungi, referrer, UTM, channel (Organic search, Paid, Social, Referral, Email, Direct) → untuk laporan bulanan.
- Ekspor: gunakan tampilan daftar (filter + kolom) atau minta Super Admin mengekspor via API.

**Siapa bisa melihat?** Super Admin & Enquiry Manager (lengkap). Marketing hanya melihat statistik — nama, email, telepon, perusahaan dan pesan disembunyikan. Editor tidak bisa membuka enquiry.

---

## 11. Freelancer Applications

**Inbox → Freelancer Applications** — terpisah dari enquiry klien.

- **Status**: New → Reviewing → Shortlisted → Contacted → Closed.
- **Résumé**: klik file untuk mengunduh. File disimpan privat; tidak bisa dibuka tanpa login dan izin.
- Hanya **Super Admin** yang bisa melihat, kecuali Super Admin mencentang **Can manage freelancer applications** pada akun pengguna lain (menu Users).
- Untuk PDPA: hapus lamaran lama yang tidak lagi diperlukan (Super Admin → pilih → Delete).

---

## 12. Pengguna & role

**Admin → Users → Create New**: email, password, nama, **Role**:

| Role | Bisa |
|---|---|
| **Super Admin** | Semua, termasuk pengguna, enquiry, lamaran freelancer |
| **Editor** | Semua konten website & pengaturan (Header, Navigation, Footer, Kontak) |
| **Marketing** | Blog, Founder's Updates, Testimonials, Clients, Media, SEO Defaults, Social Links; statistik enquiry tanpa data pribadi |
| **Enquiry Manager** | Enquiry klien (baca & ubah status/catatan) |

Hak akses ini ditegakkan di server/API (sudah diuji otomatis: `npm run test:permissions`, 26/26 lolos).
Login dikunci 15 menit setelah 5 kali salah password.

---

## 13. Pengaturan (Settings)

| Menu | Isi |
|---|---|
| **Header** | Logo (opsional), tombol header ("Let's Talk"), pengumuman di atas header |
| **Navigation** | Menu utama & dropdown (maks 7 item) |
| **Footer** | Tagline, deskripsi, 3 kolom link, link legal |
| **Contact Information** | Email, telepon, nomor WhatsApp, UEN, area layanan, penerima notifikasi |
| **Social Links** | Instagram, Facebook, LinkedIn, YouTube, TikTok |
| **SEO Defaults** | Nama situs, akhiran judul, deskripsi default, gambar share default, fakta bisnis untuk Google, kode verifikasi Search Console |
| **Redirects** | Redirect baru (pilih 301 permanen / 302 sementara). Redirect URL WordPress lama sudah diatur di kode |
