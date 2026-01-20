import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-white font-bold' : 'text-gray-300 hover:text-white';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent px-12 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-red-600 text-3xl font-bold cursor-pointer hover:text-red-500 transition">
              JOONSTREAMS
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
            {isAuthenticated() && (
              <Link to="/my-list" className={isActive('/my-list')}>
                My List
              </Link>
            )}
            {isAdmin() && (
              <Link to="/admin" className={isActive('/admin')}>
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated() ? (
            <>
              <span className="text-gray-300 text-sm">
                Hello, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 px-4 py-2 rounded text-sm hover:bg-red-700 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;