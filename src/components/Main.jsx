import React from 'react';
import SEO from './SEO';
import HeroSection from './HeroSection';
import CommunitySection from './CommunitySection';
import AboutSection from './AboutSection';
import GamesList from './games_list';
import SearchBar from './search_bar';

function Main() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh]">
      <SEO />
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-8">
          <HeroSection />
          <SearchBar />
        </div>
        <div className="w-full bg-gradient-to-br from-black via-gray-900 to-pink-900 rounded-3xl shadow-2xl p-6 my-8 flex flex-col items-center">
          <GamesList />
        </div>
        <CommunitySection />
        <AboutSection />
      </div>
    </main>
  );
}

export default Main;
