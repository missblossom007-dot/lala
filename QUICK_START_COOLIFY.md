# Quick Start - Deploy ke Coolify

## 📋 Checklist File

Pastikan file-file ini ada:
- ✅ `whatsapp_bot.js`
- ✅ `package.json`
- ✅ `Dockerfile`
- ✅ `docker-compose.yml`
- ✅ `REKAP BUKU MISSBLOSSOM.xlsx`
- ✅ `.dockerignore`
- ✅ `.gitignore`
- ✅ `healthcheck.js`

## 🚀 Langkah Deploy (5 Menit)

### 1. Upload ke GitHub
```bash
git init
git add .
git commit -m "WhatsApp Bot ready for Coolify"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### 2. Deploy di Coolify
1. Login Coolify → **+ New Resource**
2. Pilih **Docker Compose**
3. Paste URL GitHub Anda
4. Branch: `main`
5. Klik **Deploy**

### 3. Scan QR Code
1. Buka **Logs** di Coolify
2. Tunggu QR Code muncul (2-3 menit)
3. Scan dengan WhatsApp
4. ✅ Bot siap!

## 🔧 Konfigurasi Coolify

### Volumes (Wajib!)
Tambahkan di Coolify:
```
./wwebjs_auth:/app/.wwebjs_auth
./wwebjs_cache:/app/.wwebjs_cache
```

### Environment Variables (Optional)
```
NODE_ENV=production
```

## 📱 Test Bot

Kirim pesan ke nomor WhatsApp Anda:
```
halo miss blossom
```

Bot akan balas otomatis!

## 🔄 Update Bot

1. Edit code di GitHub
2. Push changes
3. Klik **Redeploy** di Coolify
4. Done!

## ⚠️ Troubleshooting

**QR Code tidak muncul?**
→ Cek logs, tunggu 2-3 menit

**Bot tidak merespons?**
→ Restart container di Coolify

**Session hilang?**
→ Pastikan volumes sudah di-set

## 📞 Support

WhatsApp: 082141733187

---

**Selamat! Bot Anda sudah online 24/7!** 🎉
