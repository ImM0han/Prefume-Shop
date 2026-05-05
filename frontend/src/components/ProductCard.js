import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calculatePriceBySize, formatPrice } from '../utils/priceCalculator';

const ProductCard = ({ product, onClick, onAddToCart, isLoggedIn }) => {
  const navigate = useNavigate();

  const smallestSize =
    product.sizes.length > 0
      ? [...product.sizes].sort((a, b) => parseInt(a) - parseInt(b))[0]
      : product.sizes[0];

  const displayPrice = calculatePriceBySize(product.price, smallestSize, product.sizes);

  const categoryColors = {
    Men: 'bg-blue-100 text-blue-700',
    Women: 'bg-pink-100 text-pink-700',
    Unisex: 'bg-purple-100 text-purple-700',
  };
  const badgeColor = categoryColors[product.category] || 'bg-gray-100 text-gray-600';

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col overflow-hidden group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-56">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80`;
          }}
        />
        {/* Category badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <div>
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">{product.brand}</p>
          <h3 className="font-bold text-gray-800 text-base leading-snug mt-0.5 line-clamp-2">{product.name}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.shortDescription}</p>
        </div>

        {/* Sizes */}
        <div className="flex gap-1.5 flex-wrap mt-1">
          {product.sizes.map((size) => (
            <span key={size} className="text-xs border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
              {size}
            </span>
          ))}
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-blue-800 font-bold text-lg">{formatPrice(displayPrice)}</span>
          <button
            className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 border-none cursor-pointer
              ${isLoggedIn
                ? 'bg-blue-700 hover:bg-blue-800 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
              }`}
            onClick={(e) => {
              e.stopPropagation();
              const added = onAddToCart({
                productId: product._id,
                name: product.name,
                image: product.images[0],
                size: smallestSize,
                price: displayPrice,
              });
              if (!added) navigate('/login');
            }}
          >
            {isLoggedIn ? '+ Cart' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;