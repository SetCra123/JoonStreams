import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-white font-bold' : 'text-gray-300 hover:text-white';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent px-12 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-red-600 text-3xl font-bold cursor-pointer hover:text-red-500 transition">
              STREAMFLIX
            </h1>
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
            <Link to="/tv-shows" className={isActive('/tv-shows')}>
              TV Shows
            </Link>
            <Link to="/movies" className={isActive('/movies')}>
              Movies
            </Link>
            <Link to="/browse" className={isActive('/browse')}>
              New & Popular
            </Link>
            <Link to="/my-list" className={isActive('/my-list')}>
              My List
            </Link>
          </nav>
        </div>
        <div className="w-8 h-8 bg-red-600 rounded"></div>
      </div>
    </header>
  );
}

export default Header;