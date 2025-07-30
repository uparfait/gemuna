import React from 'react';

function Footer() {
  return (
    <footer className="w-full py-4 px-4 bg-black bg-opacity-80 text-center mt-auto">
      <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Gemuna. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
