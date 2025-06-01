# Tzbronzstore.id

Tzbronzstore.id adalah web aplikasi top up game, voucher, pulsa, dan listrik dengan harga murah, proses cepat, dan sistem konfirmasi otomatis. Dibangun menggunakan [Next.js](https://nextjs.org) dan MongoDB.

## Fitur Utama

- **Top Up Game**: Mobile Legends, Free Fire, PUBG, Genshin Impact, Valorant, Honkai, dan banyak lagi.
- **Voucher Digital**: Steam Wallet, PlayStation, Discord Nitro, Nintendo eShop, dll.
- **Pulsa & Listrik**: Isi ulang pulsa operator dan token PLN.
- **Checkout Otomatis**: Pilih produk, metode pembayaran, dan langsung terhubung ke WhatsApp admin.
- **Admin Dashboard**: Konfirmasi & hapus pesanan, monitoring transaksi real-time.
- **Login/Register User**: Sistem autentikasi sederhana berbasis username & password.
- **Responsive Design**: Tampilan mobile & desktop.
- **Bubble WhatsApp**: Tombol chat CS di kanan bawah.

## Instalasi & Menjalankan

1. **Clone repo ini**
   ```bash
   git clone https://github.com/username/tzbronzstore.git
   cd tzbronzstore
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Konfigurasi environment**
   - Buat file `.env.local` dan isi dengan:
     ```
     MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
     ```
   - (Opsional) Tambahkan konfigurasi lain sesuai kebutuhan.

4. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. **Buka di browser**
   ```
   http://localhost:3000
   ```

## Struktur Fitur

- `app/page.js` — Halaman utama & filter produk.
- `app/product/game/[slug]/page.js` — Halaman detail & checkout produk game.
- `app/product/voucher/[slug]/page.js` — Halaman detail voucher.
- `app/product/pulsa/[slug]/page.js` — Halaman pulsa/listrik.
- `app/admin/page.js` — Dashboard admin (konfirmasi & hapus pesanan).
- `app/api/orders/route.js` — API pesanan (POST, GET, PATCH, DELETE).
- `app/login/page.js` — Login & register user.

## Teknologi

- [Next.js App Router](https://nextjs.org/docs/app)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/) (konfirmasi admin)
- [WhatsApp API](https://wa.me/) (checkout & CS)

## Kontribusi

Pull request & issue sangat diterima!  
Silakan fork, buat branch, dan ajukan PR.

## Lisensi

MIT

---

> Tzbronzstore.id — Solusi top up game, voucher, pulsa, dan listrik terpercaya!
