import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection';
import ImageGallery from '../components/ImageGallery';
import { calculatePriceBySize, formatPrice } from '../utils/priceCalculator';
import { fetchProductById } from '../utils/dataService';

const ProductDetail = ({ addToCart, isLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState('');

  const loadProduct = useCallback(() => {
    try {
      const data = fetchProductById(id);
      setProduct(data);
      if (data?.sizes?.length > 0) {
        const initialSize = data.sizes[0];
        setSelectedSize(initialSize);
        setCurrentPrice(calculatePriceBySize(data.price, initialSize, data.sizes));
      }
    } catch (err) {
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadProduct(); }, [loadProduct]);

  // Update price whenever size changes
  useEffect(() => {
    if (product && selectedSize) {
      setCurrentPrice(calculatePriceBySize(product.price, selectedSize, product.sizes));
    }
  }, [selectedSize, product]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) { navigate('/login'); return; }
    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: product._id,
        name: product.name,
        image: product.images[0],
        size: selectedSize,
        price: currentPrice,
      });
    }
    showToast(`✓ ${quantity} × ${product.name} (${selectedSize}) added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 border-none cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  const totalPrice = currentPrice * quantity;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold transition-all duration-300">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium mb-8 bg-transparent border-none cursor-pointer text-base transition-colors"
        >
          ← Back to Home
        </button>

        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Left — Image Gallery */}
            <div className="p-6 bg-gray-50 border-r border-gray-100">
              <ImageGallery
                images={product.images}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>

            {/* Right — Product Info */}
            <div className="p-8 flex flex-col gap-5">

              {/* Brand + Category */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{product.brand}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">{product.category}</span>
                {product.inStock
                  ? <span className="text-xs bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full font-medium">In Stock</span>
                  : <span className="text-xs bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-medium">Out of Stock</span>
                }
              </div>

              {/* Name */}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>

              <hr className="border-gray-100" />

              {/* Size Selector */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Select Size
                  <span className="ml-2 text-blue-600 font-normal">— price updates per size</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => {
                    const sizePrice = calculatePriceBySize(product.price, size, product.sizes);
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex flex-col items-center px-4 py-2.5 rounded-xl border-2 text-sm font-semibold cursor-pointer transition-all duration-200
                          ${isSelected
                            ? 'border-blue-600 bg-blue-600 text-white shadow-md scale-105'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600'
                          }`}
                      >
                        <span>{size}</span>
                        <span className={`text-xs font-normal mt-0.5 ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                          {formatPrice(sizePrice)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Price */}
              <div className="bg-blue-50 rounded-xl px-5 py-4">
                <p className="text-xs text-blue-500 font-medium uppercase tracking-wider mb-1">Price for {selectedSize}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-blue-800">{formatPrice(currentPrice)}</span>
                  <span className="text-sm text-gray-400">per bottle</span>
                </div>
                {quantity > 1 && (
                  <p className="text-sm text-blue-600 mt-1 font-medium">
                    Total for {quantity}: <span className="font-bold">{formatPrice(totalPrice)}</span>
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-full border-2 border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center font-bold text-lg bg-white cursor-pointer transition-all"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-lg font-bold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(10, q + 1))}
                    className="w-9 h-9 rounded-full border-2 border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center font-bold text-lg bg-white cursor-pointer transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl text-base font-bold transition-all duration-200 border-none cursor-pointer
                  ${isLoggedIn
                    ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {isLoggedIn
                  ? `🛒 Add ${quantity > 1 ? `${quantity} items` : 'to Cart'} — ${formatPrice(totalPrice)}`
                  : '🔒 Login to Add to Cart'
                }
              </button>

              {!isLoggedIn && (
                <p className="text-center text-sm text-gray-400">
                  <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer font-medium">Login</button>
                  {' '}or{' '}
                  <button onClick={() => navigate('/signup')} className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer font-medium">Sign up</button>
                  {' '}to purchase
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <ReviewSection productId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;