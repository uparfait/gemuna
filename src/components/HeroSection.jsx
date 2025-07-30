import React from 'react';

function HeroSection() {
  return (
    <section id="home" className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-black/80 to-body-gradient-end">
      <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Welcome to Gemuna
      </h2>
      <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl">
        Discover trending games, connect with the gaming community, and stay updated with the latest in gaming.
      </p>
      <a href="#games" className="inline-block px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full shadow-lg transition">
        Explore Games
      </a>
    </section>
  );
}

export default HeroSection;
