import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    navigate(query ? `/?search=${encodeURIComponent(query)}` : '/');
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-6 py-4">
          <button
            className="md:hidden text-stone-600"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <Link to="/" className="text-2xl font-semibold tracking-tight text-amber-700 shrink-0">
            Bloom
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for gifts…"
              className="w-full border border-stone-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
              <FiSearch size={16} />
            </button>
          </form>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium ml-auto">
            <Link to="/" className="hover:text-amber-700">Shop</Link>
            <Link to="/about" className="hover:text-amber-700">About</Link>
            <Link to="/contact" className="hover:text-amber-700">Contact</Link>
            <Link to="/cart" className="relative flex items-center gap-1 hover:text-amber-700">
              <FiShoppingBag size={18} />
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-amber-400 text-stone-900 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-stone-500">
                  <FiUser size={16} /> {user.username}
                </span>
                <button onClick={logout} className="hover:text-amber-700">
                  Log out
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-amber-700">Log in</Link>
            )}
          </div>

          <Link to="/cart" className="md:hidden relative ml-auto text-stone-600">
            <FiShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-stone-900 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3 text-sm font-medium">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for gifts…"
                className="w-full border border-stone-300 rounded-full pl-4 pr-10 py-2 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                <FiSearch size={16} />
              </button>
            </form>
            <div className="flex flex-col gap-3 pt-1">
              <Link to="/" onClick={() => setMobileOpen(false)}>Shop</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
              {user ? (
                <button onClick={logout} className="text-left">Log out ({user.username})</button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}>Log in</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
