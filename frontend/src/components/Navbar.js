import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link 
            to="/" 
            className="text-white font-medium hover:text-yellow-300 transition-colors relative py-4 px-4 block md:py-0 md:px-0 after:content-[''] after:absolute after:bottom-[-5px] md:after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300" 
            onClick={() => setIsMenuOpen(false)}
          >
            Collections
          </Link>
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
        </div>

        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer" onClick={toggleMenu}>
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

