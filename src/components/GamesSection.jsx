import React from 'react';

function GamesSection() {
  // Placeholder for games, can be replaced with dynamic data
  const games = [
    { name: 'Valorant', desc: 'Tactical shooter with team-based gameplay.' },
    { name: 'League of Legends', desc: 'Popular MOBA with global esports.' },
    { name: 'Minecraft', desc: 'Sandbox creativity and adventure.' },
    { name: 'Fortnite', desc: 'Battle royale action and building.' },
  ];

  return (
    <section id="games" className="py-16 px-4">
      <h3 className="text-3xl font-bold mb-8 text-center text-pink-400">Trending Games</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {games.map((game, idx) => (
          <div key={idx} className="bg-black bg-opacity-70 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-2 text-white">{game.name}</h4>
            <p className="text-gray-400">{game.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GamesSection;
