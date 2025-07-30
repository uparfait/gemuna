import React from 'react';
import SEO from './SEO';
import HeroSection from './HeroSection';
import GamesSection from './GamesSection';
import CommunitySection from './CommunitySection';
import AboutSection from './AboutSection';

function Main() {
  return (
    <main className="flex-1">
      <SEO />
      <HeroSection />
      <GamesSection />
      <CommunitySection />
      <AboutSection />
    </main>
  );
}

export default Main;
