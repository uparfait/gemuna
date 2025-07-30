import React from 'react';

function Header() {
  return (
    <header className="w-full py-6 px-4 bg-black bg-opacity-80 shadow-lg flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-wide text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Gemuna
      </h1>
      <nav>
        <ul className="flex gap-6 text-lg">
          <li><a href="#home" className="hover:text-pink-400 transition">Home</a></li>
          <li><a href="#games" className="hover:text-pink-400 transition">Games</a></li>
          <li><a href="#community" className="hover:text-pink-400 transition">Community</a></li>
          <li><a href="#about" className="hover:text-pink-400 transition">About</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
