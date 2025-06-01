import React from "react";

export default function GameCard({ game }) {
  return (
    <div className="card h-full flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-300 p-3 rounded-2xl bg-gradient-to-br from-purple-100 via-white to-purple-50 shadow-xl hover:shadow-2xl border border-purple-200 hover:border-purple-400">
      <div className="w-43 h-43 mb-2 rounded-xl overflow-hidden shadow-lg border-2 border-white group-hover:scale-105 group-hover:border-purple-400 transition-all duration-300 bg-white flex items-center justify-center">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h2 className="text-lg font-extrabold text-center text-purple-700 drop-shadow-sm group-hover:text-purple-900 transition-colors duration-300">
        {game.name}
      </h2>
      <p className="text-xs text-center text-purple-500 mt-1 group-hover:text-purple-700 transition-colors duration-300">
        {game.description}
      </p>
      <div className="absolute top-2 right-2 bg-purple-500/90 text-white text-[10px] px-2 py-1 rounded-full shadow group-hover:bg-purple-700 transition-all duration-300 font-semibold uppercase tracking-wider">
        Top Up
      </div>
    </div>
  );
}