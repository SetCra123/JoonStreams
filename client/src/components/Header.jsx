import React from 'react';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent px-12 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 text-3xl font-bold">STREAMFLIX</h1>
          <nav className="flex gap-6 text-sm">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">TV Shows</a>
            <a href="#" className="hover:text-gray-300">Movies</a>
            <a href="#" className="hover:text-gray-300">New & Popular</a>
            <a href="#" className="hover:text-gray-300">My List</a>
          </nav>
        </div>
        <div className="w-8 h-8 bg-red-600 rounded"></div>
      </div>
    </header>
  );
}

export default Header;