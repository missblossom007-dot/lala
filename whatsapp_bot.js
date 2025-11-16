const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const XLSX = require('xlsx');

// Inisialisasi WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Load database buku dari Excel
let bukuDatabase = [];

function loadBukuDatabase() {
    try {
        const workbook = XLSX.readFile('REKAP BUKU MISSBLOSSOM.xlsx');
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        bukuDatabase = data.map(row => ({
            judul: row['File Name'] || '',
            author: row['Unnamed: 15'] || 'Unknown',
            kategori: row['Unnamed: 13'] || 'General',
            harga: row['Unnamed: 14'] || 0,
            deskripsi: row['deskripsi'] || '',
            link: row['Link'] || '',
            cover: row['Unnamed: 10'] || ''
        }));
        
        console.log(`✓ Database loaded: ${bukuDatabase.length} buku`);
    } catch (error) {
        console.error('Error loading database:', error);
    }
}

// Fungsi search buku
function searchBuku(keyword) {
    keyword = keyword.toLowerCase();
    return bukuDatabase.filter(buku => 
        buku.judul.toLowerCase().includes(keyword) ||
        buku.author.toLowerCase().includes(keyword) ||
        buku.kategori.toLowerCase().includes(keyword)
    );
}

// Fungsi format harga
function formatHarga(harga) {
    return `Rp ${parseInt(harga).toLocaleString('id-ID')}`;
}

// Fungsi extract judul bersih
function extractJudulBersih(filename) {
    let judul = filename.replace(/\.pdf$/i, '');
    const match = judul.match(/^(.+?)\s*\(/);
    if (match) {
        judul = match[1].trim();
    }
    return judul;
}

// Event: QR Code untuk login
client.on('qr', (qr) => {
    console.log('\n=== SCAN QR CODE DENGAN WHATSAPP ANDA ===\n');
    qrcode.generate(qr, { small: true });
    console.log('\nBuka WhatsApp > Linked Devices > Link a Device');
});

// Event: Bot siap
client.on('ready', () => {
    console.log('\n✓ WhatsApp Bot siap digunakan!');
    console.log('Bot akan merespons pesan yang masuk...\n');
    loadBukuDatabase();
});

// Event: Terima pesan
client.on('message', async (message) => {
    const chat = await message.getChat();
    const pesan = message.body.toLowerCase().trim();
    
    // Ignore pesan dari grup (opsional)
    if (chat.isGroup) return;
    
    console.log(`Pesan dari ${message.from}: ${message.body}`);
    
    // Command: halo miss blossom
    if (pesan === 'halo miss blossom' || pesan === '/start' || pesan === 'halo' || pesan === 'hi' || pesan === 'hello') {
        const response = `👋 *Halo! Selamat datang di Miss Blossom Book Store*

Saya adalah asisten virtual yang siap membantu Anda mencari buku.

📚 *Cara Menggunakan Bot:*
• Ketik judul buku yang dicari
• Ketik nama author
• Ketik kategori (misal: "programming", "business")
• Ketik "/kategori" untuk lihat semua kategori
• Ketik "/info" untuk informasi toko

*Contoh:*
- "python"
- "john maxwell"
- "storytelling"

💡 *Tips:* Ketik "halo miss blossom" kapan saja untuk melihat menu ini lagi.

Silakan ketik apa yang Anda cari! 😊`;
        
        await message.reply(response);
        return;
    }
    
    // Command: /kategori
    if (pesan === '/kategori') {
        const kategoris = [...new Set(bukuDatabase.map(b => b.kategori))].sort();
        const response = `📂 *Kategori Buku Tersedia:*\n\n${kategoris.map((k, i) => `${i + 1}. ${k}`).join('\n')}\n\n_Ketik nama kategori untuk melihat buku dalam kategori tersebut_`;
        await message.reply(response);
        return;
    }
    
    // Command: /info
    if (pesan === '/info') {
        const response = `ℹ️ *Miss Blossom Book Store*

📚 Total Koleksi: ${bukuDatabase.length.toLocaleString()} buku digital
💰 Harga: Rp 25.000 - Rp 250.000
📱 WhatsApp: 082141733187

Kami menyediakan berbagai buku digital berkualitas dalam berbagai kategori.

Ketik judul atau kategori untuk mulai mencari! 🔍`;
        await message.reply(response);
        return;
    }
    
    // Search buku
    if (pesan.length >= 3) {
        const hasil = searchBuku(pesan);
        
        if (hasil.length === 0) {
            await message.reply(`❌ Maaf, tidak ditemukan buku dengan kata kunci "*${message.body}*"\n\nCoba kata kunci lain atau ketik /kategori untuk melihat kategori yang tersedia.`);
            return;
        }
        
        // Batasi hasil maksimal 10
        const maxResults = 10;
        const displayResults = hasil.slice(0, maxResults);
        
        let response = `🔍 *Ditemukan ${hasil.length} buku*\n`;
        response += `_Menampilkan ${displayResults.length} hasil teratas_\n\n`;
        
        displayResults.forEach((buku, index) => {
            const judulBersih = extractJudulBersih(buku.judul);
            response += `*${index + 1}. ${judulBersih}*\n`;
            response += `   👤 ${buku.author}\n`;
            response += `   📂 ${buku.kategori}\n`;
            response += `   💰 ${formatHarga(buku.harga)}\n`;
            if (buku.link) {
                response += `   🔗 ${buku.link}\n`;
            }
            response += `\n`;
        });
        
        if (hasil.length > maxResults) {
            response += `_...dan ${hasil.length - maxResults} buku lainnya_\n\n`;
        }
        
        response += `💬 *Ingin info lebih detail?*\nBalas dengan nomor buku (1-${displayResults.length})`;
        
        await message.reply(response);
        
        // Simpan hasil search untuk detail nanti
        chat.lastSearchResults = displayResults;
        return;
    }
    
    // Jika angka (untuk detail buku)
    if (/^\d+$/.test(pesan)) {
        const index = parseInt(pesan) - 1;
        
        if (chat.lastSearchResults && chat.lastSearchResults[index]) {
            const buku = chat.lastSearchResults[index];
            const judulBersih = extractJudulBersih(buku.judul);
            
            let response = `📖 *${judulBersih}*\n\n`;
            response += `👤 *Author:* ${buku.author}\n`;
            response += `📂 *Kategori:* ${buku.kategori}\n`;
            response += `💰 *Harga:* ${formatHarga(buku.harga)}\n\n`;
            
            if (buku.deskripsi) {
                response += `📝 *Deskripsi:*\n${buku.deskripsi.substring(0, 300)}...\n\n`;
            }
            
            if (buku.link) {
                response += `🔗 *Link:* ${buku.link}\n\n`;
            }
            
            response += `📱 *Untuk pemesanan, hubungi:*\nWhatsApp: 082141733187`;
            
            await message.reply(response);
            return;
        }
    }
    
    // Default response
    await message.reply(`Maaf, saya tidak mengerti perintah tersebut.\n\nKetik *halo miss blossom* untuk melihat panduan penggunaan bot.`);
});

// Event: Error
client.on('auth_failure', () => {
    console.error('❌ Autentikasi gagal!');
});

client.on('disconnected', (reason) => {
    console.log('❌ Bot terputus:', reason);
});

// Health check server (optional, untuk Coolify monitoring)
if (process.env.NODE_ENV === 'production') {
    require('./healthcheck');
}

// Jalankan bot
console.log('🚀 Memulai WhatsApp Bot...');
client.initialize();
