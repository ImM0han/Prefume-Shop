import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

