import React, { useState } from 'react';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
const Navbar = ({ cartCount, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
=======
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
>>>>>>> a64a82d16c2e1cd3862e1cdc3dc9c8a1974235d1

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-primary to-primary-dark shadow-lg sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold hover:scale-105 transition-transform">
          <span className="text-3xl"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-perfume"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 6v3" /><path d="M14 6v3" /><path d="M5 11a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -8" /><path d="M10 15a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M9 3h6v3h-6l0 -3" /></svg></span>
          <span className="font-serif">Perfume Shop</span>
        </Link>
        
        <div className={`md:flex md:gap-8 md:static md:flex-row md:w-auto md:bg-transparent md:shadow-none md:p-0 fixed left-0 top-[70px] flex-col  bg-transparent
  w-full text-center transition-all duration-300 shadow-lg py-8 gap-4 ${
          isMenuOpen ? 'left-0' : '-left-full'
        }`}>
          <Link 
            to="/" 
            className="text-white font-medium hover:text-yellow-300 transition-colors relative py-4 px-4 block md:py-0 md:px-0 after:content-[''] after:absolute after:bottom-[-5px] md:after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300" 
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
<<<<<<< HEAD
          <Link
            to="/collections"
=======
          <Link 
            to="/" 
>>>>>>> a64a82d16c2e1cd3862e1cdc3dc9c8a1974235d1
            className="text-white font-medium hover:text-yellow-300 transition-colors relative py-4 px-4 block md:py-0 md:px-0 after:content-[''] after:absolute after:bottom-[-5px] md:after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300" 
            onClick={() => setIsMenuOpen(false)}
          >
            Collections
          </Link>
<<<<<<< HEAD
          <button
            className="text-white font-medium hover:text-yellow-300 transition-colors text-left py-4 px-4 md:py-0 md:px-0"
            onClick={() => {
              setShowAboutModal(true);
              setIsMenuOpen(false);
            }}
          >
            About Us
          </button>
          <button
            className="text-white font-medium hover:text-yellow-300 transition-colors text-left py-4 px-4 md:py-0 md:px-0"
            onClick={() => {
              setShowContactModal(true);
              setIsMenuOpen(false);
            }}
          >
            Contact Us
          </button>
          <Link
            to="/cart"
            className="text-white font-medium hover:text-yellow-300 transition-colors relative py-4 px-4 block md:py-0 md:px-0"
            onClick={() => setIsMenuOpen(false)}
          >
            Cart ({cartCount})
          </Link>
          {currentUser ? (
            <button
              className="text-white font-medium hover:text-yellow-300 transition-colors text-left py-4 px-4 md:py-0 md:px-0"
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
            >
              Logout ({currentUser.name})
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white font-medium hover:text-yellow-300 transition-colors relative py-4 px-4 block md:py-0 md:px-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white font-medium hover:text-yellow-300 transition-colors relative py-4 px-4 block md:py-0 md:px-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
=======
          <Link 
            to="/" 
            className="text-white font-medium hover:text-yellow-300 transition-colors relative py-4 px-4 block md:py-0 md:px-0 after:content-[''] after:absolute after:bottom-[-5px] md:after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300" 
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/" 
            className="text-white font-medium hover:text-yellow-300 transition-colors relative py-4 px-4 block md:py-0 md:px-0 after:content-[''] after:absolute after:bottom-[-5px] md:after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300" 
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
>>>>>>> a64a82d16c2e1cd3862e1cdc3dc9c8a1974235d1
        </div>

        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer" onClick={toggleMenu}>
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </div>
<<<<<<< HEAD

      {showAboutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">About Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Perfume Shop is a curated fragrance destination built for perfume lovers. We bring
              together premium and everyday scents across men, women, and unisex categories with
              size-based pricing and a smooth shopping experience.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our goal is simple: help you discover your signature scent with confidence through
              authentic product listings and detailed fragrance information.
            </p>
            <button
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-semibold"
              onClick={() => setShowAboutModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span> support@perfumeshop.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span> +91 98765 43210
              </p>
              <p>
                <span className="font-semibold">WhatsApp:</span> +91 98765 43210
              </p>
              <p>
                <span className="font-semibold">Address:</span> MG Road, Pune, India
              </p>
            </div>
            <button
              className="w-full mt-6 bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-semibold"
              onClick={() => setShowContactModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
=======
>>>>>>> a64a82d16c2e1cd3862e1cdc3dc9c8a1974235d1
    </nav>
  );
};

export default Navbar;

