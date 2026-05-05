import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Collections = ({ addToCart, isLoggedIn }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadError, setLoadError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoadError('');
      } catch (error) {
        console.error('Error fetching collections:', error);
        setLoadError('Unable to load collections right now. Please check backend server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) {
      return products;
    }

    return products.filter((product) => {
      const searchable = `${product.name} ${product.category} ${product.brand}`.toLowerCase();
      return searchable.includes(normalized);
    });
  }, [products, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-center mb-10 text-gray-800 font-bold">Our Collections</h1>

        <div className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search collections by name, category, or brand..."
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchTerm && (
              <button
                className="bg-gray-200 text-gray-700 px-4 rounded-xl font-medium"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}
          </div>
          {!loading && !loadError && (
            <p className="mt-3 text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-lg text-gray-600">Loading collections...</div>
        ) : loadError ? (
          <div className="text-center py-12 text-lg text-red-600">{loadError}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-lg text-gray-600">
            No collections found for "{searchTerm}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => navigate(`/product/${product._id}`)}
                onAddToCart={addToCart}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
