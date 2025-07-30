import React from 'react';
import { games_registry } from '../games/games_registry';
import { useNavigate } from 'react-router-dom';

function GamesList({ filter = '', games }) {
  const navigate = useNavigate();
  let list = games || games_registry;
  if (filter) {
    list = list.filter(g =>
      g.display_name.toLowerCase().includes(filter.toLowerCase()) ||
      g.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  // Remove duplicates by name
  const seen = new Set();
  list = list.filter(g => {
    if (seen.has(g.name)) return false;
    seen.add(g.name);
    return true;
  });
  // Limit to 20
  list = list.slice(0, 20);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
      {list.map(game => (
        <div key={game.name} className="bg-gradient-to-br from-black via-gray-900 to-green-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center">
          <img src={game.display_image} alt={game.display_name} className="w-32 h-32 object-contain mb-4 rounded-xl shadow-lg" />
          <h4 className="text-xl font-bold text-white mb-2">{game.display_name}</h4>
          <p className="text-gray-300 text-center mb-4">{game.description}</p>
          <button
            onClick={() => navigate(`/play?game=${game.name}`)}
            className="px-6 py-2 rounded-full font-bold text-white text-lg shadow-lg transition hover:scale-105 focus:outline-none"
            style={{
              background: 'linear-gradient(90deg, #ff9800 0%, #ffb347 50%, #ff9800 100%)',
              boxShadow: '0 4px 24px 0 rgba(255,152,0,0.4), 0 1.5px 0 #fff inset',
              border: 'none',
              textShadow: '0 1px 8px #ff9800, 0 0.5px 0 #fff',
              filter: 'drop-shadow(0 0 8px #ff9800aa)'
            }}
          >
            Play
          </button>
        </div>
      ))}
      {list.length === 0 && (
        <div className="col-span-full text-center text-pink-400 text-lg">No games found.</div>
      )}
    </div>
  );
}

export default GamesList;
