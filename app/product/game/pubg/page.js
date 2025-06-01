'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

// Data produk Top Up UC PUBG Mobile
const pubgProductOptions = [
  { label: "60 UC", price: "Rp. 15.500" },
  { label: "120 UC", price: "Rp. 29.500" },
  { label: "180 UC", price: "Rp. 44.500" },
  { label: "240 UC", price: "Rp. 58.500" },
  { label: "300 + 25 UC", price: "Rp. 74.500" },
  { label: "360 + 25 UC", price: "Rp. 88.000" },
  { label: "420 + 25 UC", price: "Rp. 103.500" },
  { label: "480 + 25 UC", price: "Rp. 116.500" },
  { label: "540 + 25 UC", price: "Rp. 130.500" },
  { label: "600 + 60 UC", price: "Rp. 145.500" },
  { label: "660 + 60 UC", price: "Rp. 160.500" },
  { label: "720 + 60 UC", price: "Rp. 175.500" },
  { label: "780 + 60 UC", price: "Rp. 190.500" },
  { label: "840 + 60 UC", price: "Rp. 204.500" },
  { label: "900 + 85 UC", price: "Rp. 219.000" },
  { label: "1020 + 85 UC", price: "Rp. 250.500" },
  { label: "1080 + 85 UC", price: "Rp. 263.500" },
  { label: "1200 + 120 UC", price: "Rp. 294.500" },
  { label: "1320 + 120 UC", price: "Rp. 320.500" },
  { label: "1380 + 120 UC", price: "Rp. 332.500" },
  { label: "1500 + 300 UC", price: "Rp. 368.500" },
  { label: "1620 + 300 UC", price: "Rp. 395.000" },
  { label: "1680 + 300 UC", price: "Rp. 410.500" },
  { label: "1800 + 325 UC", price: "Rp. 435.500" },
  { label: "2100 + 360 UC", price: "Rp. 510.500" },
  { label: "2400 + 385 UC", price: "Rp. 574.500" },
  { label: "2700 + 420 UC", price: "Rp. 655.000" },
  { label: "3000 + 850 UC", price: "Rp. 725.000" },
  { label: "3180 + 850 UC", price: "Rp. 767.000" },
  { label: "3300 + 875 UC", price: "Rp. 797.000" },
];

// Data info game
const pubgGameInfo = {
  name: "PUBG Mobile",
  image: "/PUBG.png",
  desc: "Top up UC PUBG Mobile untuk membeli skin, crate, dan item in-game lainnya. Harga terbaik & proses instan di tzbronzstore.id.",
};

// Data metode pembayaran beserta gambar/logo
const paymentOptions = [
  { value: "bsi", label: "BSI", img: "/pembayaran/BANK BSI.png" },
  { value: "dana", label: "DANA", img: "/pembayaran/DANA.png" },
  { value: "gopay", label: "GOPAY", img: "/pembayaran/GOPAY.jpg" },
  { value: "ovo", label: "OVO", img: "/pembayaran/OVO.png" },
  { value: "qris", label: "QRIS", img: "/pembayaran/QRIS.jpg" },
  { value: "shopeepay", label: "ShopeePay", img: "/pembayaran/SHOPEEPAY.jpg" },
];

export default function ProductPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [product, setProduct] = useState(pubgProductOptions[0].label);
  const [payment, setPayment] = useState(paymentOptions[0].value);

  const WA_NUMBER = "6285862064460"; // Ganti dengan nomor WhatsApp penjual

  const handleCheckout = async () => {
    const order = {
      user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}").username : "guest",
      game: pubgGameInfo.name,
      userId,
      product,
      payment,
      status: "pending",
      createdAt: new Date(),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      const pesan =
        `Halo Admin, saya ingin order PUBG Mobile:\n` +
        `• User ID: ${userId}\n` +
        `• Paket: ${product}\n` +
        `• Pembayaran: ${paymentOptions.find((p) => p.value === payment)?.label}\n` +
        `Terima kasih.`;
      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
      window.open(waUrl, "_blank");
    } else {
      alert("Gagal menyimpan pesanan. Silakan coba lagi.");
    }
  };

  // Selaraskan warna dengan navbar (ungu & putih)
  const bgCard = "bg-white";
  const borderCard = "border border-purple-100";
  const labelClass = "block mb-2 font-semibold text-purple-700";
  const inputClass =
    "w-full border border-purple-200 px-4 py-2 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-purple-700 placeholder-purple-400";
  const buttonClass =
    "w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-purple-700 hover:to-purple-500 transition-all uppercase tracking-widest";

  return (
    <div className="max-w-4xl mx-auto mt-8 p-2 sm:p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Game Info */}
        <div className={`md:w-1/3 w-full flex flex-col items-center md:items-start ${bgCard} ${borderCard} rounded-xl shadow-lg p-4 animate-fade-in`}>
          <div className="w-36 h-36 mb-4 rounded-xl overflow-hidden shadow-lg border-4 border-purple-400 flex items-center justify-center bg-white">
            <img
              src={pubgGameInfo.image}
              alt={pubgGameInfo.name}
              className="w-full h-full object-contain"
              style={{ maxHeight: "120px", maxWidth: "120px" }}
            />
          </div>
          <h2 className="text-2xl font-extrabold mb-2 text-purple-700 drop-shadow text-center md:text-left">{pubgGameInfo.name}</h2>
          <p className="text-purple-500 text-sm text-center md:text-left">{pubgGameInfo.desc}</p>
        </div>

        {/* Main Form */}
        <div className={`flex-1 ${bgCard} ${borderCard} rounded-xl shadow-lg p-4 sm:p-6 animate-fade-in`}>
          {/* Step 1: Masukkan User ID */}
          <div className="mb-6">
            <label className={labelClass}>Masukkan User ID PUBG Mobile</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={inputClass}
              placeholder="Contoh: 123456789"
            />
          </div>

          {/* Step 2: Pilih Paket UC */}
          <div className="mb-6">
            <label className={labelClass}>Pilih Paket UC</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {pubgProductOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setProduct(opt.label)}
                  className={`flex flex-col items-center justify-center border-2 rounded-lg px-2 py-3 font-bold text-sm transition-all duration-200
                    ${
                      product === opt.label
                        ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow-lg"
                        : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
                    }`}
                >
                  <span>{opt.label}</span>
                  <span className="text-xs font-semibold mt-1">{opt.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Pilih Pembayaran */}
          <div className="mb-6">
            <label className={labelClass}>Metode Pembayaran</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition
                    ${
                      payment === opt.value
                        ? "border-purple-600 bg-purple-100"
                        : "border-purple-200 bg-purple-50 hover:border-purple-400"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={payment === opt.value}
                    onChange={() => setPayment(opt.value)}
                    className="accent-purple-600 w-5 h-5"
                  />
                  <img
                    src={opt.img}
                    alt={opt.label}
                    className="w-14 h-14 object-contain"
                    style={{ maxHeight: "42px", maxWidth: "42px" }}
                  />
                  <span className="font-semibold text-purple-700 text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className={`${buttonClass} animate-pop`}
            disabled={!userId}
          >
            Lanjut ke Checkout
          </button>
        </div>
      </div>

      {/* Animasi CSS */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        .animate-pop {
          animation: popBtn 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes popBtn {
          0% { transform: scale(0.95);}
          60% { transform: scale(1.05);}
          100% { transform: scale(1);}
        }
      `}</style>
    </div>
  );
}