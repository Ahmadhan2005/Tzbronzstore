"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameCard from "./components/GameCard";

// Data produk lengkap sesuai permintaan
export const products = [
  // Game
  { slug: "/game/honor-of-kings", name: "Honor of Kings", image: "/HOK.png", description: "Top up Honor of Kings cepat & murah.", category: "Game" },
  { slug: "/game/mlbb", name: "Mobile Legends", image: "/ML.png", description: "Top up diamond Mobile Legends dengan harga terbaik.", category: "Game" },
  { slug: "/game/ff", name: "Free Fire", image: "/free fire.png", description: "Isi diamond Free Fire cepat & aman.", category: "Game" },
  { slug: "/game/pubg", name: "PUBG Mobile", image: "/PUBG.png", description: "Top up UC PUBG Mobile terpercaya.", category: "Game" },
  { slug: "/game/genshin-impact", name: "Genshin Impact", image: "/Genshin Impact.png", description: "Top up Genesis Crystal Genshin Impact.", category: "Game" },
  { slug: "/game/blood-strike", name: "Blood Strike", image: "/Blood Strike.png", description: "Top up Blood Strike instan.", category: "Game" },
  { slug: "/game/valorant", name: "Valorant", image: "/VALO.png", description: "Top up Valorant Point resmi.", category: "Game" },
  { slug: "/game/delta-force", name: "Delta Force", image: "/Delta Force.png", description: "Top up Delta Force mudah & cepat.", category: "Game" },
  { slug: "/game/codm", name: "CODM", image: "/CODM.png", description: "Top up Call of Duty Mobile.", category: "Game" },
  { slug: "/game/magic-chess", name: "Magic Chess Go Go", image: "/MCGG.png", description: "Top up Magic Chess Go Go.", category: "Game" },
  { slug: "/game/roblox", name: "Roblox", image: "/ROBLOX.png", description: "Top up Robux Roblox.", category: "Game" },
  { slug: "/game/honkai-star-rail", name: "Honkai Star Rail", image: "/honkai starrail.png", description: "Top up Honkai Star Rail.", category: "Game" },
  { slug: "/game/stumble-guys", name: "Stumble Guys", image: "/Stumble Guys.png", description: "Top up Stumble Guys.", category: "Game" },
  { slug: "/game/zenless-zone-zero", name: "Zenless Zone Zero", image: "/ZZZ.png", description: "Top up Zenless Zone Zero.", category: "Game" },
  { slug: "/game/punishing-gray-raven", name: "Punishing: Gray Raven", image: "/pgr.png", description: "Top up Punishing: Gray Raven.", category: "Game" },
  { slug: "/game/aov", name: "Arena Of Valor : AOV", image: "/aov.png", description: "Top up Arena Of Valor.", category: "Game" },
  { slug: "/game/point-blank", name: "Point Blank", image: "/point blank.png", description: "Top up Point Blank.", category: "Game" },
  { slug: "/game/fc-mobile", name: "FC MOBILE", image: "/FC Mobile.png", description: "Top up FC Mobile.", category: "Game" },
  { slug: "/game/racing-master", name: "Racing Master", image: "/RACE MASTER.png", description: "Top up Racing Master.", category: "Game" },
  { slug: "/game/once-human", name: "Once Human", image: "/ONCE HUMAN.png", description: "Top up Once Human.", category: "Game" },
  { slug: "/game/wild-rift", name: "Wild Rift : League of Legends", image: "/WILD RIFT.png", description: "Top up Wild Rift.", category: "Game" },
  { slug: "/game/arena-breakout", name: "Arena Breakout", image: "/ar.png", description: "Top up Arena Breakout.", category: "Game" },
  { slug: "/game/garena-undawn", name: "Garena Undawn", image: "/UNDAWN.png", description: "Top up Garena Undawn.", category: "Game" },
  { slug: "/game/sausage-man", name: "Sausage Man", image: "/SAUSAGE MAN.png", description: "Top up Sausage Man.", category: "Game" },
  { slug: "/game/the-ants", name: "The Ants", image: "/THE ANTS.png", description: "Top up The Ants.", category: "Game" },
  { slug: "/game/nikke", name: "Nikke : Goddess of Victory", image: "/NIKKE.png", description: "Top up Nikke.", category: "Game" },
  { slug: "/game/honkai-impact-3", name: "Honkai Impact 3", image: "/HONKAI IMPACT.png", description: "Top up Honkai Impact 3.", category: "Game" },
  { slug: "/game/super-sus", name: "Super SUS", image: "/SUPERSUS.png", description: "Top up Super SUS.", category: "Game" },

  // Voucher
  { slug: "/voucher/bstation", name: "Bstation", image: "/voucher/bstation.png", description: "Voucher Bstation resmi.", category: "Voucher" },
  { slug: "/voucher/discord-nitro", name: "Discord Nitro", image: "/voucher/discord nitro.jpg", description: "Voucher Discord Nitro.", category: "Voucher" },
  { slug: "/voucher/megaxus", name: "Megaxus", image: "/voucher/megaxus.png", description: "Voucher Megaxus.", category: "Voucher" },
  { slug: "/voucher/nintendo-eshop", name: "Nintendo eShop", image: "/voucher/Nintendo Eshop.jpg", description: "Voucher Nintendo eShop.", category: "Voucher" },
  { slug: "/voucher/playstation", name: "PlayStation", image: "/voucher/playstation .jpg", description: "Voucher PlayStation Network.", category: "Voucher" },
  { slug: "/voucher/viu", name: "Viu", image: "/voucher/VIU.jpg", description: "Voucher Viu.", category: "Voucher" },
  { slug: "/voucher/wetv", name: "WeTV", image: "/voucher/WeTV.png", description: "Voucher WeTV.", category: "Voucher" },
  { slug: "/voucher/xbox", name: "Xbox", image: "/voucher/xbox.jpg", description: "Voucher Xbox.", category: "Voucher" },
  { slug: "/voucher/exitlag", name: "Exitlag", image: "/voucher/Exitlag.jpg", description: "Voucher Exitlag.", category: "Voucher" },
  { slug: "/voucher/vidio", name: "Vidio", image: "/voucher/vidio.png", description: "Voucher Vidio.", category: "Voucher" },
  { slug: "/voucher/steam-wallet", name: "Steam Wallet", image: "/voucher/steam.png", description: "Voucher Steam Wallet.", category: "Voucher" },
  { slug: "/voucher/mangga-toon", name: "Mangga Toon", image: "/voucher/Mangga toon.jpg", description: "Voucher Mangga Toon.", category: "Voucher" },

  // Pulsa & Listrik
  { slug: "/pulsa/axis", name: "Axis", image: "/pulsa/AXIS.png", description: "Isi ulang pulsa Axis.", category: "Pulsa" },
  { slug: "/pulsa/byu", name: "by.U", image: "/pulsa/BY.U.png", description: "Isi ulang pulsa by.U.", category: "Pulsa" },
  { slug: "/pulsa/im3", name: "IM3", image: "/pulsa/IM3.png", description: "Isi ulang pulsa IM3.", category: "Pulsa" },
  { slug: "/pulsa/pln-listrik", name: "PLN Listrik", image: "/pulsa/PLN.png", description: "Token PLN Listrik prabayar.", category: "Pulsa" },
  { slug: "/pulsa/smartfren", name: "Smartfren", image: "/pulsa/SMARTFREN.png", description: "Isi ulang pulsa Smartfren.", category: "Pulsa" },
  { slug: "/pulsa/telkomsel", name: "Telkomsel", image: "/pulsa/TELKOMSEL.png", description: "Isi ulang pulsa Telkomsel instan.", category: "Pulsa" },
  { slug: "/pulsa/tree", name: "Tri (3)", image: "/pulsa/TREE.png", description: "Isi ulang pulsa Tri.", category: "Pulsa" },
  { slug: "/pulsa/xl", name: "XL", image: "/pulsa/XL.png", description: "Isi ulang pulsa XL cepat & mudah.", category: "Pulsa" },
];

const sliderImages = [
  "/baner/1.png",
  "/baner/2.png",
  "/baner/3.png",
];

function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center mb-8">
      <div className="w-full max-w-3xl aspect-[16/6] rounded-xl overflow-hidden shadow-lg relative">
        {sliderImages.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`slide-${idx}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            draggable={false}
          />
        ))}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {sliderImages.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-purple-600" : "bg-white/70 border border-purple-300"} block`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ...existing code...

export default function HomePage() {
  const router = useRouter();

  // State untuk filter kategori
  const [selectedCategory, setSelectedCategory] = useState("Game");

  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("user");

  const handleCardClick = (slug) => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push(`/product/${slug}`);
    }
  };

  // Grouping
  const categories = [
    { label: "Game", value: "Game" },
    { label: "Voucher", value: "Voucher" },
    { label: "Pulsa & Listrik", value: "Pulsa" },
  ];

  // Nomor WhatsApp CS
  const WA_NUMBER = "6285862064460";

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      <ImageSlider />
      <h1 className="text-3xl font-bold mb-2 text-center">
        Tzbronzstore.id - Jual Beli Top Up Game Online
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Top up game favoritmu dengan harga murah, proses cepat & terpercaya!
      </p>

      {/* Tombol filter kategori */}
      <div className="flex justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-full font-bold border-2 transition-all duration-150
              ${selectedCategory === cat.value
                ? "bg-purple-600 text-white border-purple-600 shadow"
                : "bg-white text-purple-700 border-purple-200 hover:bg-purple-50"}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hanya tampilkan produk sesuai kategori yang dipilih */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-purple-700 mb-4 mt-8">{categories.find(c => c.value === selectedCategory)?.label}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-stretch">
          {products.filter((p) => p.category === selectedCategory).map((game) => (
            <div
              key={game.slug}
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleCardClick(game.slug)}
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Bubble */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo Admin, saya ingin bertanya seputar top up di Tzbronzstore.id")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 flex items-center group"
        aria-label="Hubungi CS via WhatsApp"
      >
        <span className="hidden md:block mr-2 bg-green-600 text-white px-3 py-2 rounded-l-full font-semibold shadow-lg group-hover:bg-green-700 transition">
          Chat CS
        </span>
        <div className="w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center hover:bg-green-600 transition">
          <svg viewBox="0 0 32 32" width="32" height="32" fill="white">
            <g>
              <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.234 6.393L4 29l7.824-2.206C13.41 27.597 14.684 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.17 0-2.314-.188-3.397-.558l-.243-.08-4.646 1.31 1.32-4.527-.158-.234C7.188 18.314 7 17.17 7 16c0-4.963 4.037-9 9-9s9 4.037 9 9-4.037 9-9 9zm5.07-6.29c-.276-.138-1.635-.808-1.888-.9-.253-.093-.437-.138-.62.138-.184.276-.713.9-.874 1.085-.161.184-.322.207-.598.069-.276-.138-1.166-.429-2.223-1.367-.822-.733-1.377-1.637-1.54-1.913-.161-.276-.017-.425.122-.563.126-.125.276-.322.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.62-1.497-.849-2.05-.224-.539-.453-.466-.62-.475l-.528-.009c-.161 0-.46.069-.701.322-.241.253-.92.899-.92 2.192 0 1.293.943 2.544 1.074 2.721.131.184 1.857 2.838 4.504 3.868.63.217 1.121.346 1.504.443.632.161 1.208.138 1.663.084.507-.06 1.635-.668 1.867-1.314.23-.646.23-1.2.161-1.314-.069-.115-.253-.184-.529-.322z"/>
            </g>
          </svg>
        </div>
      </a>
    </div>
  );
}