import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Call to Action Banner */}
      <section 
        className="h-[500px] flex items-center justify-center text-center text-white relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%), url('https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/i/d/0/50-0-whisky-smoke-edp-perfume-for-men-strong-long-lasting-eau-de-original-imahckwnzuasfthg.jpeg?q=70&crop=false')`
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fadeInUp">
            Discover Your Signature Scent
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 animate-fadeInUp-delay-1">
            Explore our exclusive collection of luxury fragrances
          </p>
          <button 
            className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-800 border-none px-12 py-4 text-xl font-bold rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0 animate-fadeInUp-delay-2"
            onClick={() => document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section py-16 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-center mb-12 text-gray-800 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-gradient-to-r after:from-primary after:to-primary-dark after:rounded">
            Featured Collections
          </h2>
          {loading ? (
            <div className="text-center py-12 text-lg text-gray-600">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => handleCardClick(product._id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;

