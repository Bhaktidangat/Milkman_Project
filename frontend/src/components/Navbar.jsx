import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, Search, MapPin, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const submitSearch = () => {
    const q = searchQuery.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  return (
    <header className="sticky top-0 z-50 bg-milkman-primary-blue shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-wider text-milkman-white">MILKMAN</span>
          <span className="text-milkman-dark-blue font-black text-xs mt-2 ml-1 italic">.in</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="flex rounded-md overflow-hidden">
            <input 
              type="text" 
              className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
              placeholder="Search for dairy products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(); }}
            />
            <button onClick={submitSearch} className="bg-milkman-dark-blue hover:bg-milkman-light-blue px-4 flex items-center justify-center transition-colors">
              <Search className="w-5 h-5 text-milkman-white" />
            </button>
          </div>
        </div>

        {/* Right-side Navigation */}
        <div className="flex items-center gap-4">
          {/* Account/Login */}
          <Link to={user ? "/profile" : "/login"} className="flex items-center text-milkman-white hover:text-milkman-dark-blue transition-colors">
            <User className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">{user ? user.username : 'Login'}</span>
          </Link>

          {/* Subscriptions */}
          <Link to="/subscriptions" className="hidden sm:flex items-center text-milkman-white hover:text-milkman-dark-blue transition-colors">
            <span className="text-sm font-medium">Subscriptions</span>
          </Link>
          <Link to="/dashboard" className="hidden sm:flex items-center text-milkman-white hover:text-milkman-dark-blue transition-colors">
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          {user && (user.role === 'admin' || user.is_staff) && (
            <Link to="/admin" className="hidden sm:flex items-center text-milkman-white hover:text-milkman-dark-blue transition-colors">
              <span className="text-sm font-medium">Admin</span>
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="flex items-center text-milkman-white hover:text-milkman-dark-blue transition-colors relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-milkman-dark-blue text-milkman-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <button onClick={logout} className="text-sm font-medium text-milkman-white hover:text-milkman-dark-blue transition-colors">
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
