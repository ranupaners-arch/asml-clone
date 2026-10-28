# ASML Website Clone

Reproduksi statis (tidak resmi) dari struktur navigasi utama situs ASML berbahasa Inggris, dibuat sebagai eksperimen desain/front-end oleh Ranupane Rimba Argana. Ditujukan untuk siapa pun yang ingin melihat contoh situs multi-halaman yang dibangun murni dari generator statis tanpa framework.

## Fitur Utama

- Generator statis (`generate.mjs`) yang membangun seluruh halaman HTML dari data terstruktur di `src/data.mjs`
- Menu navigasi bertingkat (mega menu) dengan panel per kategori, navigasi mundur ("Back"), dan drawer mobile
- Pencarian sisi klien yang membaca `search-index.json` hasil build
- Banner dan dialog preferensi cookie dengan penyimpanan pilihan di `localStorage`
- Carousel lokasi kantor (geser kiri/kanan) di halaman beranda
- Breadcrumb otomatis berdasarkan hierarki halaman
- Halaman riwayat perusahaan per dekade (1980-an sampai 2020-an)
- Footer dengan grup tautan (Learn, Work at ASML, Invest, Get in touch) dan tautan media sosial

## Tech Stack

- Node.js (ESM, `"type": "module"`) — tanpa dependency npm eksternal, hanya modul bawaan `node:fs/promises` dan `node:path`
- Vanilla JavaScript (`src/site.js`) untuk interaktivitas di browser
- CSS murni (`src/styles.css`)
- Python 3 `http.server` untuk menyajikan hasil build secara lokal
- Output statis berupa file HTML dan `search-index.json`

## Cara Menjalankan Lokal

Tidak ada dependency npm yang perlu diinstal dan tidak ada file environment (`.env`) yang dibutuhkan. Pastikan `Node.js` dan `Python 3` sudah terpasang.

Build sekaligus jalankan server lokal:

```sh
npm run dev
```

Ini akan membangun situs ke folder `dist/` lalu menyajikannya di `http://localhost:3000/en/`. Biarkan terminal tetap berjalan saat menjelajah antar halaman, dan jalankan ulang setiap kali mengubah file di `src/`.

Hanya membangun tanpa menjalankan server:

```sh
npm run build
```

Untuk preview manual setelah build:

```sh
python3 -m http.server 8000 --directory dist
```

lalu buka `http://localhost:8000/en/`.

## Struktur Folder

```
generate.mjs     Script generator/build utama
src/data.mjs      Data konten, navigasi, dan referensi gambar
src/site.js       Interaktivitas sisi klien (menu, pencarian, cookie, carousel)
src/styles.css    Styling halaman
public/           Aset statis (favicon) yang disalin ke dist/
dist/             Hasil build (digenerate otomatis, jangan diedit manual)
```

## Deploy / Rilis

Belum ada workflow CI/CD. Situs dihasilkan secara lokal dengan `npm run build`, dan folder `dist/` yang terbentuk bisa disajikan oleh server statis apa pun.

Catatan: ini adalah proyek latihan desain yang tidak resmi. Tautan News dan Investor mengarah ke situs investor ASML yang asli, dan berkas media diambil dari host media publik ASML sehingga ketersediaannya tergantung pada host tersebut.

## Kredit

Dibuat oleh **Ranupane Rimba Argana**, founder [Kukerjain](https://kukerjain.dev).

- Website: https://kukerjain.dev
- Portofolio: https://ranupane.kukerjain.dev
