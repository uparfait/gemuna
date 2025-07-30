import React from 'react';
import { useSearchParams } from 'react-router-dom';
import GamesList from '../components/games_list';

function SearchyPage() {
  const [params] = useSearchParams();
  const query = params.get('query') || '';
  return (
    <div className="py-10 px-4">
      <h2 className="text-2xl font-bold text-pink-400 mb-6">Search Results for "{query}"</h2>
      <GamesList filter={query} />
    </div>
  );
}

export default SearchyPage;
