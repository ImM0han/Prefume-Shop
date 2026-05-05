import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Homepage = ({ addToCart, isLoggedIn }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadError, setLoadError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setLoadError('');
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoadError('Unable to load products right now. Please check backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) => {
      const searchable = `${product.name} ${product.category} ${product.brand}`.toLowerCase();
      return searchable.includes(normalized);
    });
  }, [products, searchTerm]);

  return (
    <div className="min-h-screen">
      
      {/* Banner */}
      <section className="h-[500px] flex items-center justify-center text-center text-white relative bg-cover bg-center">
        <div className="relative z-10 max-w-4xl px-8">
          <h1 className="text-5xl font-bold mb-4">
            Discover Your Signature Scent
          </h1>
          <p className="text-xl mb-8">
            Explore our exclusive collection of luxury fragrances
          </p>
          <button
            className="bg-yellow-400 px-8 py-3 rounded-full font-bold"
            onClick={() =>
              document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Products */}
      <section className="products-section py-16 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-center mb-12 text-gray-800">
            Featured Collections
          </h2>

          {/* Search */}
          <div className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full border rounded-xl px-4 py-3"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')}>
                  Clear
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : loadError ? (
            <div className="text-red-600 text-center">{loadError}</div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => handleCardClick(product._id)}
                  onAddToCart={addToCart}
                  isLoggedIn={isLoggedIn}
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