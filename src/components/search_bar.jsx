import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handle_submit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  }

  return (
    <form onSubmit={handle_submit} className="flex items-center gap-2 w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-l-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none"
        placeholder="Search games..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-r-lg font-semibold">Search</button>
    </form>
  );
}

export default SearchBar;
