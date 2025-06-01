import { FaBolt, FaGift, FaMoneyCheckAlt, FaHeadset, FaTruck, FaUserFriends } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-purple-100 text-purple-700 pt-10 pb-6 mt-10">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-xl font-bold mb-2 text-purple-700">Tzbronzstore Indonesia</h3>
        <p className="mb-6 text-purple-400 text-sm">
          Tzbronzstore: Website top-up terbesar, tercepat dan terpercaya di Indonesia.<br />
          Jutaan gamers menggunakan Tzbronzstore untuk top-up game favorit mereka secara instan dan aman.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-start gap-3">
            <FaBolt className="text-purple-500 text-xl mt-1" />
            <div>
              <div className="font-semibold">Bayar dalam hitungan detik</div>
              <div className="text-xs text-purple-400">Pembayaran mudah & cepat, tanpa ribet.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaTruck className="text-purple-500 text-xl mt-1" />
            <div>
              <div className="font-semibold">Pengiriman instan</div>
              <div className="text-xs text-purple-400">Item langsung masuk ke akunmu tanpa menunggu lama.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaMoneyCheckAlt className="text-purple-500 text-xl mt-1" />
            <div>
              <div className="font-semibold">Metode pembayaran lengkap</div>
              <div className="text-xs text-purple-400">E-wallet, bank transfer, pulsa, dan lainnya.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaHeadset className="text-purple-500 text-xl mt-1" />
            <div>
              <div className="font-semibold">CS cepat & ramah</div>
              <div className="text-xs text-purple-400">Tim support siap membantu 24/7.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaGift className="text-purple-500 text-xl mt-1" />
            <div>
              <div className="font-semibold">Promo menarik</div>
              <div className="text-xs text-purple-400">Diskon & bonus rutin untuk pelanggan setia.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaUserFriends className="text-purple-500 text-xl mt-1" />
            <div>
              <div className="font-semibold">Referral & reward</div>
              <div className="text-xs text-purple-400">Ajak teman, dapatkan bonus top-up.</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-purple-400 font-semibold tracking-widest text-center mt-8">
          &copy; {new Date().getFullYear()} Tzbronzstore.id. All rights reserved.
        </p>
      </div>
    </footer>
  );
}