import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { get_game_by_name } from '../games/games_registry';

function PlayGamePage() {
  const [params] = useSearchParams();
  const game_name = params.get('game');
  const game = get_game_by_name(game_name);

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-5xl text-pink-500 mb-4 animate-pulse">😢</div>
        <h2 className="text-2xl font-bold text-white mb-2">Game Not Found</h2>
        <p className="text-gray-400">Sorry, the game you are looking for does not exist. Please check the name or explore other games!</p>
      </div>
    );
  }
  const GameComponent = game.component;
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold text-pink-400 mb-4">{game.display_name}</h2>
      <GameComponent />
    </div>
  );
}

export default PlayGamePage;
