import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewSection from '../components/ReviewSection';
import ImageGallery from '../components/ImageGallery';
import ShareButton from '../components/ShareButton';
import { calculatePriceBySize, formatPrice } from '../utils/priceCalculator';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      if (response.data.sizes && response.data.sizes.length > 0) {
        const initialSize = response.data.sizes[0];
        setSelectedSize(initialSize);
        const price = calculatePriceBySize(
          response.data.price, 
          initialSize, 
          response.data.sizes
        );
        setCurrentPrice(price);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product && selectedSize) {
      const price = calculatePriceBySize(
        product.price, 
        selectedSize, 
        product.sizes
      );
      setCurrentPrice(price);
    }
  }, [selectedSize, product]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <button 
          onClick={() => navigate('/')} 
          className="bg-gradient-to-r from-primary to-primary-dark text-white border-none px-6 py-3 rounded-full cursor-pointer text-base font-medium transition-all duration-300 shadow-md hover:-translate-x-1 hover:shadow-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <button 
        onClick={() => navigate('/')} 
        className="bg-gradient-to-r from-primary to-primary-dark text-white border-none px-6 py-3 rounded-full cursor-pointer text-base font-medium transition-all duration-300 shadow-md hover:-translate-x-1 hover:shadow-lg mb-8"
      >
        ← Back to Home
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-md mb-12">
        {/* Image Gallery Section */}
        <div className="flex flex-col gap-4">
          <ImageGallery 
            images={product.images} 
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>

        {/* Product Information Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">{product.brand}</span>
            <h1 className="text-4xl md:text-5xl text-gray-800 m-0">{product.name}</h1>
            <div className="inline-block bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-1.5 rounded-full text-sm font-medium w-fit">
              {product.category}
            </div>
          </div>

          <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200">
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold text-primary">{formatPrice(currentPrice)}</span>
              <span className="text-sm text-gray-500 mt-1">for {selectedSize}</span>
            </div>
            {product.inStock ? (
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-500 text-white">
                In Stock
              </span>
            ) : (
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-red-500 text-white">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl text-gray-800 mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl text-gray-800 mb-4">Available Sizes</h3>
            <div className="flex gap-4 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-6 py-3 border-2 rounded-lg cursor-pointer text-base font-medium transition-all duration-300 ${
                    selectedSize === size
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white border-transparent'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-primary hover:text-primary'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white border-none px-8 py-4 rounded-lg text-lg font-bold cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
              Add to Cart
            </button>
            <ShareButton product={product} />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection productId={id} />
    </div>
  );
};

export default ProductDetail;

