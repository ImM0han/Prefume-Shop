import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold tracking-wide no-underline">
          <span className="text-yellow-400 text-3xl">✦</span>
          Perfume Shop
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {[
            { label: 'Home', to: '/' },
            { label: 'Collections', to: '/collections' },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-blue-100 hover:text-white transition-colors duration-200 no-underline"
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => setShowAboutModal(true)}
            className="text-blue-100 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer text-sm font-medium p-0"
          >
            About Us
          </button>
          <button
            onClick={() => setShowContactModal(true)}
            className="text-blue-100 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer text-sm font-medium p-0"
          >
            Contact Us
          </button>

          <Link
            to="/cart"
            className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-4 py-2 rounded-full transition-colors duration-200 no-underline text-sm"
          >
            🛒 Cart {cartCount > 0 && <span className="bg-blue-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{cartCount}</span>}
          </Link>

          {currentUser ? (
            <button
              onClick={onLogout}
              className="text-blue-100 hover:text-white border border-blue-400 hover:border-white px-4 py-1.5 rounded-full transition-all duration-200 bg-transparent cursor-pointer text-sm"
            >
              Logout ({currentUser.name})
            </button>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="text-blue-100 hover:text-white border border-blue-400 hover:border-white px-4 py-1.5 rounded-full transition-all duration-200 no-underline text-sm">
                Login
              </Link>
              <Link to="/signup" className="bg-white text-blue-800 hover:bg-blue-50 font-semibold px-4 py-1.5 rounded-full transition-colors duration-200 no-underline text-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl bg-transparent border-none cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 px-6 py-4 flex flex-col gap-4 text-sm font-medium border-t border-blue-600">
          {[
            { label: 'Home', to: '/' },
            { label: 'Collections', to: '/collections' },
            { label: 'Cart', to: '/cart' },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsMenuOpen(false)}
              className="text-blue-100 hover:text-white no-underline"
            >
              {label} {label === 'Cart' && cartCount > 0 && `(${cartCount})`}
            </Link>
          ))}
          <button onClick={() => { setShowAboutModal(true); setIsMenuOpen(false); }} className="text-blue-100 hover:text-white text-left bg-transparent border-none cursor-pointer text-sm p-0">About Us</button>
          <button onClick={() => { setShowContactModal(true); setIsMenuOpen(false); }} className="text-blue-100 hover:text-white text-left bg-transparent border-none cursor-pointer text-sm p-0">Contact Us</button>
          {currentUser ? (
            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="text-blue-100 hover:text-white text-left bg-transparent border-none cursor-pointer text-sm p-0">Logout ({currentUser.name})</button>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-blue-100 no-underline">Login</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-blue-100 no-underline">Sign Up</Link>
            </div>
          )}
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowAboutModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-blue-800 mb-3">About Us</h2>
            <p className="text-gray-600 leading-relaxed">Perfume Shop helps you discover your signature scent from our curated collection of luxury fragrances from top brands around the world.</p>
            <button onClick={() => setShowAboutModal(false)} className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors cursor-pointer border-none">Close</button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowContactModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Contact Us</h2>
            <p className="text-gray-600">📧 support@perfumeshop.com</p>
            <p className="text-gray-600 mt-2">📞 +91 98765 43210</p>
            <button onClick={() => setShowContactModal(false)} className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors cursor-pointer border-none">Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;