import React from 'react';
import { games_registry } from '../games/games_registry';
import { useNavigate } from 'react-router-dom';

function GamesList({ filter = '' }) {
  const navigate = useNavigate();
  const filtered = games_registry.filter(g =>
    g.display_name.toLowerCase().includes(filter.toLowerCase()) ||
    g.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
      {filtered.map(game => (
        <div key={game.name} className="bg-gradient-to-br from-black via-gray-900 to-pink-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center hover:scale-105 transition cursor-pointer" onClick={() => navigate(`/play?game=${game.name}`)}>
          <img src={game.display_image} alt={game.display_name} className="w-32 h-32 object-contain mb-4 rounded-xl shadow-lg" />
          <h4 className="text-xl font-bold text-white mb-2">{game.display_name}</h4>
          <p className="text-gray-300 text-center">{game.description}</p>
        </div>
      ))}
      {filtered.length === 0 && (
        <div className="col-span-full text-center text-pink-400 text-lg">No games found.</div>
      )}
    </div>
  );
}

export default GamesList;
