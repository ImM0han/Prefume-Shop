import React from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { calculatePriceBySize, formatPrice } from '../utils/priceCalculator';

const ProductCard = ({ product, onClick, onAddToCart, isLoggedIn }) => {
  const navigate = useNavigate();
=======
import { calculatePriceBySize, formatPrice } from '../utils/priceCalculator';

const ProductCard = ({ product, onClick }) => {
>>>>>>> a64a82d16c2e1cd3862e1cdc3dc9c8a1974235d1
  // Get the smallest size for display on card
  const smallestSize = product.sizes.length > 0 
    ? [...product.sizes].sort((a, b) => parseInt(a.replace('ml', '')) - parseInt(b.replace('ml', '')))[0]
    : product.sizes[0];
  
  const displayPrice = calculatePriceBySize(product.price, smallestSize, product.sizes);

  return (
<<<<<<< HEAD
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-2.5 hover:shadow-2xl"
=======
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-2.5 hover:shadow-2xl" 
>>>>>>> a64a82d16c2e1cd3862e1cdc3dc9c8a1974235d1
      onClick={onClick}
    >
      <div className="relative w-full pt-[100%] overflow-hidden bg-white">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Perfume';
          }}
        />
        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-bold text-xl uppercase tracking-wider">View Details</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
          {product.shortDescription}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">{formatPrice(displayPrice)}</span>
            <span className="text-xs text-gray-500">Starting from</span>
          </div>
          <span className="bg-gradient-to-r from-primary to-primary-dark text-white px-3 py-1.5 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>
<<<<<<< HEAD
        <button
          className="mt-4 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-60"
          disabled={!isLoggedIn}
          onClick={(event) => {
            event.stopPropagation();
            const wasAdded = onAddToCart({
              productId: product._id,
              name: product.name,
              image: product.images[0],
              size: smallestSize,
              price: displayPrice,
            });

            if (!wasAdded) {
              navigate('/login');
            }
          }}
        >
          {isLoggedIn ? 'Add to Cart' : 'Login to Add'}
        </button>
=======
>>>>>>> a64a82d16c2e1cd3862e1cdc3dc9c8a1974235d1
      </div>
    </div>
  );
};

export default ProductCard;

