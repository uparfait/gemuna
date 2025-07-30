import React from 'react';

function CommunitySection() {
  return (
    <section id="community" className="py-16 px-4 bg-gradient-to-t from-black/80 to-body-gradient-end">
      <h3 className="text-3xl font-bold mb-8 text-center text-pink-400">Community</h3>
      <div className="max-w-3xl mx-auto text-center text-gray-300">
        <p>Join our Discord, participate in forums, and connect with gamers worldwide. Share your achievements, tips, and gameplay moments!</p>
        <a href="#" className="inline-block mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow transition">Join Discord</a>
      </div>
    </section>
  );
}

export default CommunitySection;
