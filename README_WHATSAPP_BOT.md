# WhatsApp Bot - Miss Blossom Book Store

Bot WhatsApp otomatis untuk menjawab pertanyaan tentang buku dari database Excel.

## Fitur Bot

✅ Search buku berdasarkan judul, author, atau kategori
✅ Tampilkan info lengkap buku (harga, deskripsi, link)
✅ Lihat semua kategori tersedia
✅ Respons otomatis 24/7
✅ Support 12,519+ buku

## Cara Install

### 1. Install Node.js
Download dan install Node.js dari: https://nodejs.org/
(Pilih versi LTS)

### 2. Install Dependencies
Buka terminal/command prompt di folder ini, lalu jalankan:
```bash
npm install
```

### 3. Jalankan Bot
```bash
npm start
```

### 4. Scan QR Code
- QR Code akan muncul di terminal
- Buka WhatsApp di HP Anda
- Pilih Menu (3 titik) > Linked Devices > Link a Device
- Scan QR Code yang muncul di terminal

### 5. Bot Siap!
Setelah scan berhasil, bot akan otomatis merespons pesan yang masuk.

## Cara Menggunakan Bot

### Command untuk Customer:

**Mulai Percakapan:**
- Ketik: `halo` atau `/start`

**Cari Buku:**
- Ketik judul: `python`
- Ketik author: `john maxwell`
- Ketik kategori: `programming`

**Lihat Kategori:**
- Ketik: `/kategori`

**Info Toko:**
- Ketik: `/info`

**Detail Buku:**
- Setelah search, ketik nomor buku (1-10)

## Contoh Percakapan

```
Customer: halo
Bot: 👋 Halo! Selamat datang di Miss Blossom Book Store...

Customer: python
Bot: 🔍 Ditemukan 50 buku
     1. Python for Beginners
        👤 John Smith
        💰 Rp 75.000
     ...

Customer: 1
Bot: 📖 Python for Beginners
     👤 Author: John Smith
     💰 Harga: Rp 75.000
     📝 Deskripsi: ...
```

## Tips

1. **Jangan tutup terminal** selama bot berjalan
2. **Koneksi internet** harus stabil
3. **WhatsApp Web** harus tetap terkoneksi
4. Bot akan **auto-reply** ke semua pesan pribadi (bukan grup)
5. Untuk stop bot, tekan `Ctrl + C` di terminal

## Troubleshooting

**QR Code tidak muncul?**
- Pastikan Node.js sudah terinstall
- Jalankan `npm install` lagi

**Bot tidak merespons?**
- Cek koneksi internet
- Restart bot dengan `npm start`

**Error saat install?**
- Pastikan Node.js versi terbaru
- Hapus folder `node_modules` dan jalankan `npm install` lagi

## Update Database

Jika ada buku baru di Excel:
1. Stop bot (Ctrl + C)
2. Update file Excel
3. Jalankan bot lagi (`npm start`)
4. Database akan otomatis reload

## Keamanan

⚠️ **PENTING:**
- Jangan share QR Code dengan orang lain
- Bot ini menggunakan WhatsApp Web (tidak resmi)
- Untuk production, gunakan WhatsApp Business API (resmi)

## Support

WhatsApp: 082141733187
