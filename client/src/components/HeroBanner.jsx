import React from 'react';
import { Play, Plus } from 'lucide-react';

function HeroBanner({ featured }) {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src={featured.image}
          alt="Featured"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center h-full px-12 max-w-2xl">
        <h2 className="text-6xl font-bold mb-4">{featured.title}</h2>
        <div className="flex gap-4 mb-4 text-sm">
          <span className="text-green-500 font-bold">{featured.rating}</span>
          <span>{featured.genre}</span>
        </div>
        <p className="text-lg mb-8 leading-relaxed">{featured.description}</p>
        <div className="flex gap-4">
          <button className="bg-white text-black px-8 py-3 rounded font-bold flex items-center gap-2 hover:bg-opacity-80 transition">
            <Play size={24} fill="black" />
            Play
          </button>
          <button className="bg-gray-700 bg-opacity-80 text-white px-8 py-3 rounded font-bold flex items-center gap-2 hover:bg-gray-600 transition">
            <Plus size={24} />
            My List
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;