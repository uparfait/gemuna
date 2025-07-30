import React from 'react';

import SEO from './SEO';
import GamesList from './games_list';
import SearchBar from './search_bar';
import SectionTitle from './section_title';

import React, { useState, useEffect, useRef } from 'react';
import { games_registry } from '../games/games_registry';

function get_random_games(games, count, exclude = []) {
  const filtered = games.filter(g => !exclude.includes(g.name));
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function Main() {
  // Simulate featured and most played (could be dynamic in future)
  const featured_games = get_random_games(games_registry, 4);
  const most_played_games = get_random_games(games_registry, 4, featured_games.map(g => g.name));
  const [all_games, set_all_games] = useState(get_random_games(games_registry, 12, [...featured_games.map(g => g.name), ...most_played_games.map(g => g.name)]));
  const [loaded_count, set_loaded_count] = useState(12);
  const all_games_ref = useRef(all_games.map(g => g.name));

  // Infinite scroll for all games
  useEffect(() => {
    function on_scroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        // Load more games if available
        if (all_games.length < games_registry.length) {
          const more = get_random_games(games_registry, 4, [...featured_games.map(g => g.name), ...most_played_games.map(g => g.name), ...all_games_ref.current]);
          if (more.length) {
            set_all_games(prev => {
              const updated = [...prev, ...more];
              all_games_ref.current = updated.map(g => g.name);
              return updated;
            });
            set_loaded_count(c => c + more.length);
          }
        }
      }
    }
    window.addEventListener('scroll', on_scroll);
    return () => window.removeEventListener('scroll', on_scroll);
  }, [all_games, featured_games, most_played_games]);

  // Ad spaces and futuristic dark theme
  return (
    <main className="flex-1 min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 relative overflow-x-hidden">
      <SEO />
      {/* Top ad space */}
      <div className="w-full h-16 flex items-center justify-center bg-gradient-to-r from-gray-900 via-yellow-900 to-gray-900 opacity-80 mb-4 sticky top-0 z-10">
        <span className="text-xs text-yellow-300 tracking-widest">Ad Space (Google Ads)</span>
      </div>
      <div className="flex flex-row w-full max-w-7xl mx-auto">
        {/* Left ad space */}
        <div className="hidden lg:flex flex-col w-48 items-center justify-center mr-4">
          <div className="w-40 h-96 bg-gradient-to-b from-gray-900 via-green-900 to-black rounded-3xl shadow-inner flex items-center justify-center">
            <span className="text-xs text-green-300">Ad Space</span>
          </div>
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center px-2 md:px-8">
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8 mt-4">
            <SectionTitle>Featured Games</SectionTitle>
            <GamesList games={featured_games} />
          </div>
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
            <SectionTitle>Most Played</SectionTitle>
            <GamesList games={most_played_games} />
          </div>
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center mb-8">
            <SectionTitle>All Games</SectionTitle>
            <GamesList games={all_games} />
          </div>
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8">
            <SearchBar />
          </div>
        </div>
        {/* Right ad space */}
        <div className="hidden lg:flex flex-col w-48 items-center justify-center ml-4">
          <div className="w-40 h-96 bg-gradient-to-b from-gray-900 via-green-900 to-black rounded-3xl shadow-inner flex items-center justify-center">
            <span className="text-xs text-green-300">Ad Space</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
