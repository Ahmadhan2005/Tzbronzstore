'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

// Data produk Honor of Kings Token
const hokProductOptions = [
  { label: "16 Token", price: "Rp. 4.000" },
  { label: "23 Token", price: "Rp. 5.000" },
  { label: "32 Token", price: "Rp. 6.500" },
  { label: "48 Token", price: "Rp. 8.500" },
  { label: "80 Token", price: "Rp. 14.000" },
  { label: "160 Token", price: "Rp. 25.500" },
  { label: "240 Token", price: "Rp. 37.000" },
  { label: "400 Token", price: "Rp. 61.000" },
  { label: "560 Token", price: "Rp. 88.000" },
  { label: "800 + 30 Token", price: "Rp. 144.000" },
  { label: "1200 + 45 Token", price: "Rp. 225.000" },
  { label: "2400 + 108 Token", price: "Rp. 435.000" },
  { label: "4000 + 180 Token", price: "Rp. 720.000" },
  { label: "8000 + 360 Token", price: "Rp. 1.430.000" },
];

// Data produk skin Honor of Kings
const hokSkinOptions = [
  { label: "Tombol (Joystick)", price: "Rp. 15.000" },
  { label: "Basic", price: "Rp. 15.000" },
  { label: "Rare", price: "Rp. 40.000" },
  { label: "Epic", price: "Rp. 90.000" },
  { label: "Limited", price: "Rp. 100.000" },
  { label: "Legend", price: "Rp. 160.000" },
];

// Data produk BP (Battle Pass) Honor of Kings
const hokBpOptions = [
  { label: "Pass mini", price: "Rp. 15.000" },
  { label: "Pass elite", price: "Rp. 30.000" },
  { label: "Pass diluxe", price: "Rp. 100.000" },
];

// Data info game
const hokGameInfo = {
  name: "Honor of Kings",
  image: "/HOK.png",
  desc: "Top Up Token Honor of Kings untuk membeli skin, hero, dan item in-game lainnya. Harga terbaik & proses instan di tzbronzstore.id.",
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
  const [userId, setUserId] = useState(""); // User ID Honor of Kings
  const [productType, setProductType] = useState("token"); // "token" | "skin" | "bp"
  const [product, setProduct] = useState(hokProductOptions[0].label);
  const [payment, setPayment] = useState(paymentOptions[0].value);

  const WA_NUMBER = "6285862064460"; // Ganti dengan nomor WhatsApp penjual

  const handleCheckout = async () => {
    const order = {
      user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}").username : "guest",
      game: hokGameInfo.name,
      userId,
      product: product,
      productType,
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
      let pesan = "";
      if (productType === "token") {
        pesan =
          `Halo Admin, saya ingin order Honor of Kings (Token):\n` +
          `• User ID: ${userId}\n` +
          `• Paket: ${product}\n` +
          `• Pembayaran: ${paymentOptions.find((p) => p.value === payment)?.label}\n` +
          `Terima kasih.`;
      } else if (productType === "skin") {
        pesan =
          `Halo Admin, saya ingin gift skin Honor of Kings:\n` +
          `• User ID: ${userId}\n` +
          `• Skin: ${product}\n` +
          `• Pembayaran: ${paymentOptions.find((p) => p.value === payment)?.label}\n` +
          `Terima kasih.`;
      } else if (productType === "bp") {
        pesan =
          `Halo Admin, saya ingin gift BP (Battle Pass) Honor of Kings:\n` +
          `• User ID: ${userId}\n` +
          `• BP: ${product}\n` +
          `• Pembayaran: ${paymentOptions.find((p) => p.value === payment)?.label}\n` +
          `Terima kasih.`;
      }
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
              src={hokGameInfo.image}
              alt={hokGameInfo.name}
              className="w-full h-full object-contain"
              style={{ maxHeight: "120px", maxWidth: "120px" }}
            />
          </div>
          <h2 className="text-2xl font-extrabold mb-2 text-purple-700 drop-shadow text-center md:text-left">{hokGameInfo.name}</h2>
          <p className="text-purple-500 text-sm text-center md:text-left">{hokGameInfo.desc}</p>
        </div>

        {/* Main Form */}
        <div className={`flex-1 ${bgCard} ${borderCard} rounded-xl shadow-lg p-4 sm:p-6 animate-fade-in`}>
          {/* Pilih Jenis Produk */}
          <div className="mb-6 flex gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setProductType("token");
                setProduct(hokProductOptions[0].label);
              }}
              className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200 ${
                productType === "token"
                  ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow"
                  : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              Top Up Token
            </button>
            <button
              type="button"
              onClick={() => {
                setProductType("skin");
                setProduct(hokSkinOptions[0].label);
              }}
              className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200 ${
                productType === "skin"
                  ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow"
                  : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              Gift Skin
            </button>
            <button
              type="button"
              onClick={() => {
                setProductType("bp");
                setProduct(hokBpOptions[0].label);
              }}
              className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200 ${
                productType === "bp"
                  ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow"
                  : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              Gift BP (Battle Pass)
            </button>
          </div>

          {/* Step 1: Masukkan User ID */}
          <div className="mb-6">
            <label className={labelClass}>Masukkan User ID Honor of Kings</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={inputClass}
              placeholder="Contoh: 123456789"
            />
          </div>

          {/* Step 2: Pilih Paket Token, Skin, atau BP */}
          <div className="mb-6">
            <label className={labelClass}>
              {productType === "token"
                ? "Pilih Paket Token"
                : productType === "skin"
                ? "Pilih Jenis Skin"
                : "Pilih Paket BP (Battle Pass)"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(productType === "token"
                ? hokProductOptions
                : productType === "skin"
                ? hokSkinOptions
                : hokBpOptions
              ).map((opt) => (
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