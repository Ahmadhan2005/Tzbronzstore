'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

// Data produk Top Up Diamond Mobile Legends
const mlbbDiamondOptions = [
  { label: "5 Diamonds", price: "Rp. 2.000" },
  { label: "10 Diamonds", price: "Rp. 4.000" },
  { label: "12 Diamonds", price: "Rp. 4.500" },
  { label: "14 Diamonds", price: "Rp. 5.500" },
  { label: "18 Diamonds", price: "Rp. 6.000" },
  { label: "19 Diamonds", price: "Rp. 6.200" },
  { label: "28 Diamonds", price: "Rp. 9.000" },
  { label: "36 Diamonds", price: "Rp. 11.500" },
  { label: "44 Diamonds", price: "Rp. 13.500" },
  { label: "46 Diamonds", price: "Rp. 15.000" },
  { label: "54 Diamonds", price: "Rp. 17.000" },
  { label: "59 Diamonds", price: "Rp. 17.500" },
  { label: "71 Diamonds", price: "Rp. 21.000" },
  { label: "74 Diamonds", price: "Rp. 22.500" },
  { label: "85 Diamonds", price: "Rp. 25.000" },
  { label: "88 Diamonds", price: "Rp. 26.000" },
  { label: "110 Diamonds", price: "Rp. 32.500" },
  { label: "113 Diamonds", price: "Rp. 33.000" },
  { label: "128 Diamonds", price: "Rp. 38.000" },
  { label: "148 Diamonds", price: "Rp. 44.000" },
  { label: "170 Diamonds", price: "Rp. 48.500" },
  { label: "176 Diamonds", price: "Rp. 51.000" },
  { label: "184 Diamonds", price: "Rp. 53.000" },
  { label: "222 Diamonds", price: "Rp. 63.000" },
  { label: "258 Diamonds", price: "Rp. 74.000" },
  { label: "277 Diamonds", price: "Rp. 78.000" },
  { label: "284 Diamonds", price: "Rp. 80.000" },
  { label: "296 Diamonds", price: "Rp. 83.000" },
  { label: "301 Diamonds", price: "Rp. 84.000" },
  { label: "305 Diamonds", price: "Rp. 88.000" },
  { label: "333 Diamonds", price: "Rp. 96.000" },
  { label: "346 Diamonds", price: "Rp. 98.000" },
  { label: "356 Diamonds", price: "Rp. 101.000" },
  { label: "370 Diamonds", price: "Rp. 105.500" },
  { label: "384 Diamonds", price: "Rp. 109.500" },
  { label: "408 Diamonds", price: "Rp. 113.000" },
  { label: "424 Diamonds", price: "Rp. 119.500" },
  { label: "452 Diamonds", price: "Rp. 125.000" },
  { label: "518 Diamonds", price: "Rp. 145.000" },
  { label: "568 Diamonds", price: "Rp. 152.000" },
  { label: "601 Diamonds", price: "Rp. 162.000" },
  { label: "642 Diamonds", price: "Rp. 174.000" },
  { label: "716 Diamonds", price: "Rp. 195.000" },
  { label: "758 Diamonds", price: "Rp. 207.000" },
  { label: "790 Diamonds", price: "Rp. 215.000" },
  { label: "845 Diamonds", price: "Rp. 231.000" },
  { label: "875 Diamonds", price: "Rp. 235.000" },
  { label: "938 Diamonds", price: "Rp. 256.000" },
  { label: "966 Diamonds", price: "Rp. 264.500" },
  { label: "1045 Diamonds", price: "Rp. 271.000" },
  { label: "1136 Diamonds", price: "Rp. 305.000" },
];

// Data produk bonus 2x recharge
const mlbbBonusOptions = [
  { label: "50 Diamonds (2x Bonus)", price: "Rp. 17.500" },
  { label: "150 Diamonds (2x Bonus)", price: "Rp. 48.000" },
  { label: "250 Diamonds (2x Bonus)", price: "Rp. 79.000" },
  { label: "500 Diamonds (2x Bonus)", price: "Rp. 170.000" },
];

// Data produk Weekly Diamond Pass
const mlbbWeeklyPassOptions = [
  { label: "Weekly Diamond Pass", price: "Rp. 30.500" },
  { label: "Twilight Pass", price: "Rp. 170.000" },
];

// Data info game
const mlbbGameInfo = {
  name: "Mobile Legends",
  image: "/ML.png",
  desc: "Mobile Legends adalah game MOBA paling populer di Indonesia. Top up diamond, bonus 2x recharge, dan weekly pass dengan harga terbaik dan proses instan di tzbronzstore.id.",
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
  const [productType, setProductType] = useState("diamond"); // diamond | bonus | weekly
  const [product, setProduct] = useState(mlbbDiamondOptions[0].label);
  const [payment, setPayment] = useState(paymentOptions[0].value);

  const WA_NUMBER = "6285862064460"; // Ganti dengan nomor WhatsApp penjual

  const handleCheckout = async () => {
    const order = {
      user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}").username : "guest",
      game: mlbbGameInfo.name,
      userId,
      product,
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
      if (productType === "diamond") {
        pesan =
          `Halo Admin, saya ingin top up Diamond Mobile Legends:\n` +
          `• User ID: ${userId}\n` +
          `• Paket: ${product}\n` +
          `• Pembayaran: ${paymentOptions.find((p) => p.value === payment)?.label}\n` +
          `Terima kasih.`;
      } else if (productType === "bonus") {
        pesan =
          `Halo Admin, saya ingin top up Bonus 2x Recharge Mobile Legends:\n` +
          `• User ID: ${userId}\n` +
          `• Paket: ${product}\n` +
          `• Pembayaran: ${paymentOptions.find((p) => p.value === payment)?.label}\n` +
          `Terima kasih.`;
      } else if (productType === "weekly") {
        pesan =
          `Halo Admin, saya ingin order Weekly Diamond Pass Mobile Legends:\n` +
          `• User ID: ${userId}\n` +
          `• Paket: ${product}\n` +
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
              src={mlbbGameInfo.image}
              alt={mlbbGameInfo.name}
              className="w-full h-full object-contain"
              style={{ maxHeight: "120px", maxWidth: "120px" }}
            />
          </div>
          <h2 className="text-2xl font-extrabold mb-2 text-purple-700 drop-shadow text-center md:text-left">{mlbbGameInfo.name}</h2>
          <p className="text-purple-500 text-sm text-center md:text-left">{mlbbGameInfo.desc}</p>
        </div>

        {/* Main Form */}
        <div className={`flex-1 ${bgCard} ${borderCard} rounded-xl shadow-lg p-4 sm:p-6 animate-fade-in`}>
          {/* Pilih Jenis Produk */}
          <div className="mb-6 flex gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setProductType("diamond");
                setProduct(mlbbDiamondOptions[0].label);
              }}
              className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200 ${
                productType === "diamond"
                  ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow"
                  : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              Top Up Diamond
            </button>
            <button
              type="button"
              onClick={() => {
                setProductType("bonus");
                setProduct(mlbbBonusOptions[0].label);
              }}
              className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200 ${
                productType === "bonus"
                  ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow"
                  : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              Bonus 2x Recharge
            </button>
            <button
              type="button"
              onClick={() => {
                setProductType("weekly");
                setProduct(mlbbWeeklyPassOptions[0].label);
              }}
              className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200 ${
                productType === "weekly"
                  ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow"
                  : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              Weekly Diamond Pass
            </button>
          </div>

          {/* Step 1: Masukkan ID */}
          <div className="mb-6">
            <label className={labelClass}>Masukkan User ID Mobile Legends</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={inputClass}
              placeholder="Contoh: 123456789 (ID + Server)"
            />
          </div>

          {/* Step 2: Pilih Paket */}
          <div className="mb-6">
            <label className={labelClass}>
              {productType === "diamond"
                ? "Pilih Jumlah Diamond"
                : productType === "bonus"
                ? "Pilih Paket Bonus 2x Recharge"
                : "Pilih Paket Weekly Pass"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(productType === "diamond"
                ? mlbbDiamondOptions
                : productType === "bonus"
                ? mlbbBonusOptions
                : mlbbWeeklyPassOptions
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