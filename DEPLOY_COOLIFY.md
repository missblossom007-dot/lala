# Deploy WhatsApp Bot ke Coolify

Panduan lengkap untuk deploy Miss Blossom WhatsApp Bot ke Coolify.

## Persiapan

### 1. File yang Diperlukan
Pastikan file-file ini ada di repository:
- ✅ `whatsapp_bot.js` - Bot utama
- ✅ `package.json` - Dependencies
- ✅ `Dockerfile` - Container config
- ✅ `docker-compose.yml` - Docker compose
- ✅ `REKAP BUKU MISSBLOSSOM.xlsx` - Database buku

### 2. Upload ke Git Repository
```bash
# Inisialisasi git (jika belum)
git init

# Add files
git add whatsapp_bot.js package.json Dockerfile docker-compose.yml
git add "REKAP BUKU MISSBLOSSOM.xlsx"
git add .dockerignore .gitignore

# Commit
git commit -m "Initial commit: WhatsApp Bot"

# Push ke GitHub/GitLab
git remote add origin YOUR_REPO_URL
git push -u origin main
```

## Deploy di Coolify

### Step 1: Buat Project Baru
1. Login ke Coolify dashboard
2. Klik **"+ New"** → **"Resource"**
3. Pilih **"Docker Compose"**

### Step 2: Konfigurasi
1. **Name:** `missblossom-whatsapp-bot`
2. **Git Repository:** Paste URL repository Anda
3. **Branch:** `main` (atau branch yang Anda gunakan)
4. **Docker Compose Location:** `./docker-compose.yml`

### Step 3: Environment Variables (Optional)
Tambahkan jika diperlukan:
```
NODE_ENV=production
```

### Step 4: Volumes (Penting!)
Tambahkan persistent volumes untuk session WhatsApp:
```
./wwebjs_auth:/app/.wwebjs_auth
./wwebjs_cache:/app/.wwebjs_cache
```

### Step 5: Deploy
1. Klik **"Deploy"**
2. Tunggu build selesai (5-10 menit pertama kali)
3. Cek logs untuk QR Code

## Scan QR Code

### Cara 1: Via Coolify Logs
1. Buka **Logs** di Coolify dashboard
2. QR Code akan muncul di logs
3. Scan dengan WhatsApp

### Cara 2: Via Terminal (jika ada akses SSH)
```bash
# Lihat logs container
docker logs -f missblossom-wa-bot

# QR Code akan muncul di terminal
```

### Cara 3: Screenshot QR Code
1. Ambil screenshot QR Code dari logs
2. Scan menggunakan WhatsApp di HP

## Troubleshooting

### QR Code Tidak Muncul
```bash
# Restart container
docker restart missblossom-wa-bot

# Cek logs
docker logs missblossom-wa-bot
```

### Bot Tidak Merespons
1. Cek apakah container running:
   ```bash
   docker ps | grep missblossom
   ```

2. Cek logs untuk error:
   ```bash
   docker logs missblossom-wa-bot --tail 100
   ```

3. Restart bot:
   ```bash
   docker restart missblossom-wa-bot
   ```

### Session Hilang Setelah Restart
Pastikan volumes sudah di-mount dengan benar:
```yaml
volumes:
  - ./wwebjs_auth:/app/.wwebjs_auth
  - ./wwebjs_cache:/app/.wwebjs_cache
```

### Update Database Excel
1. Upload file Excel baru ke repository
2. Commit dan push
3. Redeploy di Coolify
4. Atau mount volume untuk Excel:
   ```yaml
   - ./REKAP BUKU MISSBLOSSOM.xlsx:/app/REKAP BUKU MISSBLOSSOM.xlsx:ro
   ```

## Monitoring

### Cek Status Bot
```bash
# Via Coolify dashboard
# Lihat di "Resources" → Status harus "Running"

# Via Docker
docker ps | grep missblossom
```

### Cek Logs Real-time
```bash
docker logs -f missblossom-wa-bot
```

### Restart Bot
```bash
# Via Coolify: Klik "Restart"
# Via Docker:
docker restart missblossom-wa-bot
```

## Update Bot

### Update Code
1. Edit file di repository
2. Commit dan push
3. Di Coolify, klik **"Redeploy"**
4. Bot akan rebuild dan restart otomatis

### Update Database
1. Upload Excel baru ke repository
2. Push changes
3. Redeploy

## Backup Session

### Backup WhatsApp Session
```bash
# Backup folder session
tar -czf wwebjs_backup.tar.gz .wwebjs_auth .wwebjs_cache

# Download backup
# Via Coolify file manager atau SCP
```

### Restore Session
```bash
# Extract backup
tar -xzf wwebjs_backup.tar.gz

# Restart bot
docker restart missblossom-wa-bot
```

## Tips

1. **Persistent Storage:** Pastikan volumes untuk session di-mount dengan benar
2. **Auto Restart:** Set restart policy ke `unless-stopped`
3. **Monitoring:** Cek logs secara berkala
4. **Backup:** Backup session WhatsApp secara rutin
5. **Update:** Update dependencies secara berkala untuk security

## Support

Jika ada masalah:
1. Cek logs di Coolify
2. Cek dokumentasi Coolify: https://coolify.io/docs
3. Restart container jika perlu

## Keamanan

⚠️ **PENTING:**
- Jangan share QR Code dengan orang lain
- Backup session secara rutin
- Gunakan private repository untuk code
- Set environment variables untuk data sensitif
- Monitor logs untuk aktivitas mencurigakan

---

**Bot siap melayani pelanggan 24/7!** 🚀
