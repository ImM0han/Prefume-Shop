import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchAllProducts } from '../utils/dataService';

const Homepage = ({ addToCart, isLoggedIn }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = fetchAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

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
      <section
        className="h-[500px] flex items-center justify-center text-center text-white relative bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1541643600914-78b084683702?w=1600&q=80')",
        }}
      >
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
                <button onClick={() => setSearchTerm('')}>Clear</button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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