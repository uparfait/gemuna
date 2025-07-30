
import SkitBirdGame from './skit_bird.jsx';
import SkipBird from './skip_bird.jsx';

export const games_registry = [
  {
    name: 'skit-bird',
    display_name: 'Skit Bird',
    display_image: '/assets/skit_bird.png', // Add this image to public/assets
    component: SkitBirdGame,
    description: 'Jump and avoid the ground!'
  },
  {
    name: 'skip-bird',
    display_name: 'Skip Bird',
    display_image: '/assets/skip_bird.png',
    component: SkipBird,
    description: 'Skip obstacles and fly high!'
  },
];

export function get_game_by_name(name) {
  return games_registry.find(g => g.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) !== -1 || g.display_name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) !== -1 || g.description.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) !== -1);
}
