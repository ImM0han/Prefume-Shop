import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calculatePriceBySize, formatPrice } from '../utils/priceCalculator';

const ProductCard = ({ product, onClick, onAddToCart, isLoggedIn }) => {
  const navigate = useNavigate();

  const smallestSize =
    product.sizes.length > 0
      ? [...product.sizes].sort(
          (a, b) => parseInt(a) - parseInt(b)
        )[0]
      : product.sizes[0];

  const displayPrice = calculatePriceBySize(
    product.price,
    smallestSize,
    product.sizes
  );

  return (
    <div className="bg-white rounded shadow cursor-pointer" onClick={onClick}>
      <img src={product.images[0]} alt={product.name} />

      <h3>{product.name}</h3>
      <p>{product.shortDescription}</p>

      <div>
        <span>{formatPrice(displayPrice)}</span>
        <span>{product.category}</span>
      </div>

      <button
        disabled={!isLoggedIn}
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
        {isLoggedIn ? 'Add to Cart' : 'Login to Add'}
      </button>
    </div>
  );
};

export default ProductCard;