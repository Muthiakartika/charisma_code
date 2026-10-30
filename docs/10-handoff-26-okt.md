# 10 — Menerapkan developer handoff (26 Okt 2026)

Sumber: folder `D:\Office\Clients\charisma code\dev-handoff`, disalin ke `docs/handoff/` (README, `redirects.md`, 35 brief halaman di `docs/handoff/pages/`).

## Cara kerjanya

Teks website tidak diketik ulang. Skrip **importer** membaca setiap brief `.md` kata per kata dan menulisnya ke CMS (Pages, Services, Testimonials, menu dan footer):

| File | Isi |
|---|---|
| `src/seed/handoff/parse-brief.ts` | Membaca brief: heading H1–H4, paragraf, centang, tombol, baris harga, badge, kutipan, video. Catatan untuk developer/klien (`> **Note:**`, `> _..._`) tidak pernah ikut tayang. |
| `src/seed/handoff/to-blocks.ts` | Memilih blok untuk tiap section (hero, kartu, langkah, FAQ, review, video, form, CTA). Label tombol berhuruf kapital diubah ke gaya website ("WHATSAPP DE ZHONG" → "WhatsApp De Zhong"). |
| `src/seed/handoff/recipes.ts` | Satu resep per halaman: judul, tema, foto hero, dan section yang diatur manual. |
| `src/seed/handoff/import.ts` | Menulis ke CMS, menjaga foto/warna section lama yang judulnya sama, membuat service baru, mengatur menu dan footer sesuai Figma. |

Menjalankan ulang (aman diulang, mencocokkan berdasarkan slug):

```bash
npm run import:handoff                       # semua halaman
npm run import:handoff -- phase=2            # satu fase
npm run import:handoff -- home rates         # halaman tertentu
```

## Fase

1. Home + 192 redirect URL WordPress lama (`src/lib/legacy-redirects.ts`, `/sample-page` → 410).
2. 10 halaman layanan yang sudah ada.
3. 9 halaman baru: `/emcee`, `/conference-emcee`, `/roadshow-emcee`, `/government-community-emcee`, `/school-family-emcee`, `/dinner-and-dance-planning`, `/event-planning`, `/product-launch-events`, `/rates`.
4. `/services`, `/our-work`, `/about` (+ kredensial, musik, akting), `/contact`.
5. Halaman "future" sebagai **draft** (tidak tampil publik, bisa dilihat di admin): `/videos`, `/press`, `/insights/lo-hei-phrases`, `/insights/resources`, 2 halaman `/events/...`, `/about/crew/daniel-tan`, `/work-with-us/event-facilitator`. Isinya masih contoh (orang fiktif, tanggal/harga contoh).

## Blok yang diperluas

Hero: baris harga, tombol ketiga, sampai 6 centang, heading kedua. Text & Image: foto opsional, baris harga, judul daftar, tombol. Feature Grid: kartu paket (badge, harga, "Ideal for", daftar isi, tombol), gaya "Quick match", judul yang meloncat ke section di bawahnya (↓), teks penutup, tombol. FAQ: pertanyaan langsung di halaman + data FAQPage untuk Google. Service: baris harga di kartu. Video, Process Steps, Testimonials, CTA: tombol/teks tambahan. Migrasi: `src/migrations/20261027_032516_handoff_blocks.ts` (hanya menambah kolom/tabel).

## Penyesuaian desain dari Figma (27 Okt 2026)

Warna dasar Figma sama dengan website (ivory `#f9f3ea`, beige `#f1e8da`, oranye `#f7741f`, rust `#ad440d`). Yang disesuaikan:

- Latar section selang-seling ivory dan beige; section gelap dan band oranye memutus urutannya (`alternateBackgrounds` di `src/seed/handoff/import.ts`).
- Band teks (judul, teks, centang) diberi foto kiri/kanan bergantian dari daftar `bandPhotos` di `recipes.ts`.
- Kartu beige dengan titik oranye, harga besar warna rust, kartu paket dengan badge.
- "Please read before booking" dan "Which package" dalam kotak lembut dua kolom (gaya Feature Grid "Notes box").
- "Not sure where to start?" dalam kotak beige dua kolom.
- Home: 12 kartu layanan dengan harga dan tombol (gaya Service Cards "Price cards").
- Hero: centang berbentuk ikon bulat dua kolom, urutan intro → centang → harga → tombol.
- Tabel harga (Wedding, CNY, Emcee, School & Family) memakai kolom "Table" di blok Text and Image.
- Halaman Kids & Youth: band penutup kuning.
- Section yang terlihat terlalu polos diberi tampilan khusus: band tanpa foto menaruh daftar centang di panel lembut dengan cahaya oranye; section teks saja menjadi panel "callout" dengan garis aksen; daftar tujuan bertanda ↓ menjadi tile yang bisa diklik; quick-match menjadi tile rata; hero teks saja (Coaching, Campaigns, Event Support, Rates, Services, Our Work, Contact) diberi foto.
- Stabilo kuning di Figma adalah penanda harga/konten yang **belum dikonfirmasi** (README §2), jadi tidak dipakai sebagai warna di website. Kotak kuning "Photo needed" di Figma juga penanda: di website diganti foto yang ada, atau band dibiarkan tanpa foto.

## Perbaikan dengan skill design-taste-frontend (27 Okt 2026)

- Home: section "Join our talent and vendor database" sekarang kartu dengan foto (gaya CTA baru "Card with a photo"), supaya tidak sama dengan band oranye penutup di bawahnya.
- Satu logo strip "Brands and organisations" per halaman: yang pertama dipertahankan (di bawah hero kalau brief menaruhnya di sana), duplikat di bagian review dihapus otomatis oleh importer.
- "Please read before booking" dan "Which package": tiap poin punya ikon sesuai isinya (kalender, tanda tangan, kerja sama, orang, cuaca, dll.), dan pertanyaan penutup serta tombol WhatsApp ada di dalam kotak.
- Tidak ada lagi tanda pisah (— –) di teks yang tampil: "2010 — hosts" menjadi "2010: hosts", "S$88–128" menjadi "S$88-128".

## CV De Zhong di halaman About (27 Okt 2026)

- Dua PDF dari De Zhong (CV emcee dan CV akting, Okt 2026) disimpan di `src/seed/documents/` dan diunggah ke Media oleh importer. Tampil sebagai dua kartu unduhan di profil founder ("Meet Chia De Zhong"), di bawah daftar kredensial, dengan jenis dan ukuran file otomatis.
- Untuk mengganti CV nanti: unggah PDF baru di CMS (Media), lalu pilih di Pages → About → blok Founder Introduction → "Files to download". Atau timpa file di `src/seed/documents/` dengan nama yang sama.
- Jarak section: dua section gelap yang bersebelahan sekarang berbagi satu jarak, sama seperti dua section terang atau dua section beige.

## Audit ruang kosong (27 Okt 2026)

Semua 24 halaman diukur otomatis di lebar desktop (1280px) dan HP (375px): celah kosong di dalam section dan kolom yang tingginya timpang. Perbaikan di komponen, jadi berlaku di semua halaman:

- Langkah booking ("How booking works" dan sejenisnya): judul di atas, langkah berjajar di satu garis bernomor (di HP garis vertikal). Tidak ada lagi judul pendek di samping kolom panjang.
- FAQ dan form permintaan: kolom kiri (judul, tombol, langkah berikutnya, kontak) ikut menempel saat menggulir di samping daftar yang panjang.
- Profil founder: foto ikut menempel di samping cerita dan unduhan CV.
- Statement gelap: teks sejajar dengan bagian tengah daftar peran.
- Panel teks-saja: padding di dalam panel dikecilkan.

## Foto tidak dobel dalam satu halaman (27 Okt 2026)

Beberapa halaman menampilkan foto yang sama dua kali (hero = kartu proyek atau hero = foto band). Penggantinya diambil dari reel Instagram De Zhong, dipilih sesuai jenis acara di halaman itu:

| Halaman | Diganti | Foto baru |
|---|---|---|
| Corporate Team Building | foto kedua hero, band "Clearer communication", band "Onboarding" | game booth di acara brand, presentasi di seminar, game booth (2) |
| Corporate Emcee | foto kedua hero | podium di Resorts World Sentosa |
| Communication Coaching | band "Confidence for nervous speakers" | di panggung depan penonton besar |
| Kids & Youth Programs | foto kedua hero (foto Maris Stella dipakai di studi kasus) | family event di atrium |
| Creative Campaigns | band "Strategy before production", "Short-form content creation" | acara produk di toko, live-selling |
| Event Support | band "Highlight videos", "Why one point of contact helps" | wedding banquet, gala brand di ballroom |
| Event Planning | foto pertama hero | gala brand di ballroom |
| Services | foto ketiga hero | acara komunitas di atrium mal |
| Our Work | ketiga foto hero (sama dengan cover proyek di bawahnya) | gala, wedding banquet, panggung atrium mal |
| Roadshow Emcee | foto pertama hero (README §6 minta foto roadshow mal) | panggung atrium mal |

- File ada di `src/seed/instagram/ig-<kode reel>-<nama>.jpg`, diambil dari frame video (720px, resolusi rendah) dan ditandai "needs replacement" di Media. Ganti dengan foto asli saat klien mengirimnya.
- Importer sekarang menjaga aturan ini sendiri: foto band tidak boleh sama dengan foto hero, cover proyek di halaman itu, atau band sebelumnya. Foto khusus per band diatur lewat `photoFor` di `recipes.ts`.

## Credentials and recognition di About (30 Okt 2026)

- Section baru dari Figma (board About, section 03 `#credentials`), tepat setelah profil founder: daftar kredensial De Zhong, masing-masing dengan link ke organisasinya (terbuka di tab baru, ditandai ↗). Isinya ada di `recipes.ts` (konstanta `credentials`).
- Tampilannya dibuat lebih kaya dari daftar polos di Figma: gaya baru **Credentials** di blok Feature Grid (`src/components/blocks/Credentials.tsx`, migrasi `20261030_023857_credentials_style`). Kredensial pertama (Youth Olympic Games) tampil besar di kartu gelap dengan tahun 2010 sebagai angka besar; delapan lainnya dalam dua kolom bergaris, masing-masing dengan ikon dan label jenisnya (Education, Training, Theatre, Music, Busking, Competition, Recognition).
- Di CMS: judul item = kalimat kredensialnya; teks item = link organisasi sebagai `[Nama](https://…)`, dan nama yang sama di judul otomatis menjadi link; badge = jenisnya (menentukan ikon).
- Tahun 2015 (SAFRA's The Ultimate Talent) dan 2018 (UFM100.3's The Wedding Singer) ditandai *dummy highlight* di Figma, jadi belum ditampilkan. Tambahkan setelah klien mengonfirmasi.
- Empat poin di profil founder tetap seperti di Figma.
- Figma juga punya dua section baru lain di About yang belum dibuat: 06 `#acting-credits` (Acting credits) dan 14 `#music` (Music).
- Staging: diterapkan saat deploy sebagai update `2026-10-30` (hanya halaman About, lihat `07-deploy-produksi.md`).

## Keputusan yang perlu diketahui

- Tampilan tetap desain preview; huruf kapital tombol dari Figma tidak dipakai.
- Review contoh (bertanda `<mark>`) disimpan dengan status "Permission pending", jadi tidak tampil. Tambahan contoh di Coaching dan Kids & Youth disimpan sebagai section tersembunyi.
- Tombol "Watch the hosting reel" di halaman tanpa video mengarah ke `/emcee#reel`.
- Foto dari Instagram @deprinceofzhong (resolusi rendah, ditandai "needs replacement"): semua file `src/seed/instagram/ig-*.jpg` (lihat bagian foto tidak dobel di atas).
- Form permintaan penawaran masih form umum yang sudah ada (judul dan intro dari brief). Field khusus per halaman di brief belum dibuat.
- Link "Read more Google reviews" sementara memakai pencarian Google, karena link Google Business Profile belum ada.
- Posting blog lama yang sekarang di-redirect ke halaman layanan masih ada di `/insights/...` sampai daftar Insights disetujui klien.
- Staging: konten diterapkan saat deploy oleh `npm run import:handoff:deploy` (sekali saja, lihat `07-deploy-produksi.md`). Database lokal sebelum impor disimpan sebagai `charisma_before_handoff`.
- Foto di band teks selalu bergantian kanan-kiri dari atas (foto pertama di kanan), kecuali foto yang dipilih resep untuk section tertentu.

Daftar yang masih menunggu klien: `docs/handoff/README.md` §6.
