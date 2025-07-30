import React from 'react';

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-orange-400 via-yellow-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
      {children}
    </h2>
  );
}

export default SectionTitle;
