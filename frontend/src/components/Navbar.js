import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-primary to-primary-dark shadow-lg sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold">
          Perfume Shop
        </Link>

        <div className={`md:flex md:gap-8 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/collections" onClick={() => setIsMenuOpen(false)}>Collections</Link>

          <button onClick={() => setShowAboutModal(true)}>About Us</button>
          <button onClick={() => setShowContactModal(true)}>Contact Us</button>

          <Link to="/cart">Cart ({cartCount})</Link>

          {currentUser ? (
            <button onClick={onLogout}>Logout ({currentUser.name})</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={toggleMenu}>Menu</button>
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h2>About Us</h2>
            <p>Perfume Shop helps you discover your signature scent.</p>
            <button onClick={() => setShowAboutModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h2>Contact Us</h2>
            <p>Email: support@perfumeshop.com</p>
            <button onClick={() => setShowContactModal(false)}>Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;