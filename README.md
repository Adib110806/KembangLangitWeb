# Kembanglangit Park — Website Desa Wisata (Tugas UAS Pemrograman Web)

Website profil & booking tiket untuk **Kembanglangit Park**, desa wisata hutan pinus di
Kecamatan Blado, Kabupaten Batang, Jawa Tengah. Dibangun dengan **React + Vite +
JavaScript + jQuery + Bootstrap**.

Semua kode komponen, context (login & wishlist), dan data website sekarang
digabung menjadi **satu file `src/App.jsx`** (ditambah `src/App.css` untuk semua
gaya/CSS-nya), mengikuti format proyek referensi.

## Struktur proyek

```
├── index.html            # Entry HTML + CDN jQuery & Bootstrap
├── package.json
├── vite.config.js
├── public/                # Semua gambar (wahana, villa, paket, dll) & icons.svg
└── src/
    ├── main.jsx           # Entry React, render <App />
    ├── index.css          # Variabel warna, font, reset global
    ├── App.css            # Seluruh CSS tampilan (digabung dari semua komponen)
    └── App.jsx            # SELURUH kode React (data, context, komponen, halaman)
```

Di dalam `App.jsx`, kodenya dibagi per-bagian dengan komentar pemisah supaya tetap
mudah dibaca meski dalam satu file:

1. **DATA** — data brand, wahana, paket, villa, testimoni, FAQ, dll.
2. **UTIL** — fungsi `formatIDR` untuk format Rupiah.
3. **ICON** — komponen ikon SVG bersama.
4. **AUTH CONTEXT** — login / daftar / logout, tersimpan di `localStorage`.
5. **WISHLIST CONTEXT** — wahana favorit pengunjung.
6. **LOGIN GATE** — halaman wajib login sebelum masuk website.
7. **LAYOUT** — TopBar, Navbar, Footer.
8. **HOME SECTIONS** — Hero (slider jQuery), About, Wahana, Paket, Peta lokasi, dll.
9. **EXTRA** — Ulasan, tombol WhatsApp mengambang, drawer wishlist.
10. **BOOKING** — Struk (Receipt) & halaman booking tiket/staycation dengan PPN 10%.
11. **APP SHELL** — `HomePage`, `SiteShell`, `Gate`, `App` (komponen utama).

Tidak ada tampilan yang diubah — semua className, teks, gambar, dan logika tetap
sama persis seperti versi sebelumnya, hanya dipindahkan ke satu file.

## Menjalankan proyek (development)

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

> Proyek ini **belum di-build**, sesuai permintaan — silakan ikuti tutorial build
> & deploy di bawah ini saat Anda siap.

## Tutorial Build & Deploy (Hosting Gratis)

### 1. Build produksi

Build akan menghasilkan folder `dist/` berisi HTML/CSS/JS siap upload.

```bash
npm install        # sekali saja, kalau belum pernah
npm run build
```

Setelah selesai, coba dulu hasil build-nya secara lokal (opsional):

```bash
npm run preview
```

### 2. Upload ke hosting gratis

Pilih salah satu cara berikut (semua gratis dan cukup untuk tugas UAS):

**Opsi A — Netlify (drag & drop, paling mudah)**
1. Buka [app.netlify.com](https://app.netlify.com) → daftar/login (bisa pakai akun Google/GitHub).
2. Setelah masuk dashboard, cari tombol **"Add new site" → "Deploy manually"**.
3. Seret (drag & drop) folder **`dist`** hasil `npm run build` ke area upload tersebut.
4. Tunggu beberapa detik, Netlify akan memberi Anda URL publik (mis. `nama-acak.netlify.app`).
5. Anda bisa ganti nama domainnya lewat **Site settings → Change site name**.

**Opsi B — Vercel**
1. Install Vercel CLI: `npm install -g vercel`
2. Di folder project, jalankan: `vercel`
3. Ikuti instruksi di terminal (login, pilih project baru, dsb).
4. Saat ditanya *Build Command* isi `npm run build`, *Output Directory* isi `dist`.
5. Vercel akan memberi URL publik otomatis setiap kali deploy.

**Opsi C — GitHub Pages**
1. Push seluruh folder project ini ke repository GitHub.
2. Tambahkan `base: '/nama-repo-anda/'` di `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/nama-repo-anda/',
   })
   ```
3. Install plugin deploy: `npm install --save-dev gh-pages`
4. Tambahkan script di `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && npx gh-pages -d dist"
   }
   ```
5. Jalankan: `npm run deploy`
6. Aktifkan GitHub Pages di **Settings → Pages** repo Anda, pilih branch `gh-pages`.

### 3. Setelah online

- Catat URL hasil deploy untuk dilampirkan di laporan/tugas.
- Jika ada perubahan kode, ulangi langkah **build** lalu **upload/redeploy** sesuai
  opsi hosting yang dipakai.

## Catatan

- Data login/daftar tersimpan di `localStorage` browser masing-masing pengunjung,
  bukan di server — jadi setiap browser/perangkat punya akun sendiri-sendiri.
- Gambar galeri memakai foto lokal di folder `public/` serta beberapa link foto
  publikasi media untuk galeri hero. Ganti sesuai kebutuhan bila perlu.
- Nomor WhatsApp, telepon, dan email masih data contoh — ganti dengan kontak asli
  sebelum publikasi final.
