import React, { useState, useEffect, useRef } from 'react';
import SEO from './SEO';
import GamesList from './games_list.jsx';
import SearchBar from './search_bar.jsx';
import SectionTitle from './section_title.jsx';
import { games_registry } from '../games/games_registry';

function get_random_games(games, count, exclude = []) {
  const filtered = games.filter(g => !exclude.includes(g.name));
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function Main() {
  const [featured_games] = useState(get_random_games(games_registry, 4));
  const [most_played_games] = useState(get_random_games(games_registry, 4, featured_games.map(g => g.name)));
  const [all_games, set_all_games] = useState(get_random_games(games_registry, 12, [...featured_games.map(g => g.name), ...most_played_games.map(g => g.name)]));
  const [loaded_count, set_loaded_count] = useState(12);
  const all_games_ref = useRef(all_games.map(g => g.name));
  const [isLoading, setIsLoading] = useState(false);

  // Infinite scroll with loading state
  useEffect(() => {
    function on_scroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
        if (all_games.length < games_registry.length) {
          setIsLoading(true);
          setTimeout(() => { // Simulate network delay
            const more = get_random_games(games_registry, 4, [...featured_games.map(g => g.name), ...most_played_games.map(g => g.name), ...all_games_ref.current]);
            if (more.length) {
              set_all_games(prev => {
                const updated = [...prev, ...more];
                all_games_ref.current = updated.map(g => g.name);
                return updated;
              });
              set_loaded_count(c => c + more.length);
            }
            setIsLoading(false);
          }, 800);
        }
      }
    }
    
    window.addEventListener('scroll', on_scroll);
    return () => window.removeEventListener('scroll', on_scroll);
  }, [all_games, featured_games, most_played_games, isLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-100 relative overflow-x-hidden">
      <SEO />
      
      {/* Top ad space - Sticky */}
      <div className="w-full h-16 flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 shadow-lg sticky top-0 z-50">
        <span className="text-xs text-white font-medium tracking-wider">ADVERTISEMENT</span>
      </div>
      
      <div className="flex flex-row w-full max-w-7xl mx-auto px-2 sm:px-4">
        {/* Left ad space - Desktop only */}
        <div className="hidden lg:flex flex-col w-48 items-center justify-start pt-8 mr-4 sticky top-16 h-[calc(100vh-4rem)]">
          <div className="w-40 h-96 bg-white rounded-xl shadow-2xl flex items-center justify-center border-2 border-green-100 transform hover:rotate-1 transition-transform duration-300">
            <span className="text-xs text-gray-500 font-medium">ADVERTISEMENT</span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center px-2 md:px-4 py-6">
          {/* Hero section with search */}
          <div className="w-full max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
                Play Awesome Games
              </span>
            </h1>
            <div className="w-full max-w-2xl mx-auto mb-12">
              <SearchBar />
            </div>
          </div>
          
          {/* Featured Games - 3D Card Effect */}
          <div className="w-full max-w-6xl mx-auto mb-16">
            <SectionTitle 
              title="Featured Games" 
              subtitle="Our top picks for you" 
              icon="⭐"
              className="mb-8"
            />
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl opacity-20 blur-lg"></div>
              <GamesList 
                games={featured_games} 
                cardClassName="transform hover:-translate-y-2 transition-transform duration-300 shadow-xl"
              />
            </div>
          </div>
          
          {/* Most Played - Glass Morphism */}
          <div className="w-full max-w-6xl mx-auto mb-16">
            <SectionTitle 
              title="Most Played" 
              subtitle="Community favorites" 
              icon="🔥"
              className="mb-8"
            />
            <div className="relative p-1 rounded-2xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30">
              <GamesList 
                games={most_played_games} 
                cardClassName="bg-white bg-opacity-70 hover:bg-opacity-90 transition-all duration-300"
              />
            </div>
          </div>
          
          {/* All Games - Infinite Scroll */}
          <div className="w-full max-w-6xl mx-auto mb-12">
            <SectionTitle 
              title="All Games" 
              subtitle={`${loaded_count} of ${games_registry.length} games`} 
              icon="🎮"
              className="mb-8"
            />
            <GamesList 
              games={all_games} 
              cardClassName="hover:shadow-lg transition-all duration-200"
            />
            {isLoading && (
              <div className="w-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right ad space - Desktop only */}
        <div className="hidden lg:flex flex-col w-48 items-center justify-start pt-8 ml-4 sticky top-16 h-[calc(100vh-4rem)]">
          <div className="w-40 h-96 bg-white rounded-xl shadow-2xl flex items-center justify-center border-2 border-blue-100 transform hover:-rotate-1 transition-transform duration-300">
            <span className="text-xs text-gray-500 font-medium">ADVERTISEMENT</span>
          </div>
        </div>
      </div>
      
      {/* Bottom spacing */}
      <div className="h-16"></div>
    </main>
  );
}

export default Main;