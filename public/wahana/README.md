# Cara Mengganti Gambar Wahana

Gambar untuk 6 kartu di section "6 Wahana Paling Diminati Pengunjung" diatur di
`src/data/parkData.js`, pada field `img` di setiap item array `featuredFacilities`.

Saat ini:
- Forest Train, Dino Ride, Avante Coaster -> pakai foto asli dokumentasi Kembanglangit Park
  yang dipublikasikan media (kredit tercantum di komentar `parkData.js`), sumbernya adalah
  URL eksternal (hotlink), sama seperti foto hero di bagian atas web ini.
- Rainbow Slide, Fun Slide, Balon Sultan -> untuk 3 wahana ini belum ada foto media yang
  spesifik per-wahana yang aman dipakai ulang (yang tersedia hanya foto kantor berita
  berbayar dengan wajah pengunjung terlihat jelas), jadi sementara memakai foto suasana
  umum Kembanglangit Park yang sudah ada di project ini.

## Cara mengganti dengan foto Anda sendiri (paling gampang)

1. Simpan foto (screenshot/unduhan dari akun Instagram @kembanglangit_park yang memang Anda
   kelola, atau hasil observasi/foto sendiri) ke folder ini, `public/wahana/`. Contoh nama file:
   `forest-train.jpg`, `dino-ride.jpg`, `rainbow-slide.jpg`, `avante-coaster.jpg`,
   `fun-slide.jpg`, `balon-sultan.jpg`.
2. Buka `src/data/parkData.js`, cari item wahana yang sesuai di array `featuredFacilities`,
   lalu ganti value `img` menjadi path lokal, contoh:
   ```js
   img: '/wahana/forest-train.jpg',
   ```
3. Simpan — gambar otomatis berubah, tidak perlu ubah bagian kode lainnya.

Rekomendasi ukuran: rasio landscape (misal 800x600 atau 4:3), ukuran file di bawah 500KB
agar loading tetap cepat.

## Menambah wahana baru

1. Tambahkan file gambar baru di folder ini, misal `wahana-baru.jpg`.
2. Buka `src/data/parkData.js`, tambahkan objek baru di array `featuredFacilities` dengan
   field `img: '/wahana/wahana-baru.jpg'`.
3. Simpan — kartu baru otomatis muncul di grid.
