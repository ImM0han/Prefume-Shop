import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewSection from '../components/ReviewSection';
import ImageGallery from '../components/ImageGallery';
import ShareButton from '../components/ShareButton';
import { calculatePriceBySize, formatPrice } from '../utils/priceCalculator';

const ProductDetail = ({ addToCart, isLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);

      if (response.data.sizes?.length > 0) {
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
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <button onClick={() => navigate('/')} className="mb-6">
        ← Back to Home
      </button>

      <div className="grid lg:grid-cols-2 gap-10 bg-white p-6 rounded shadow">
        <ImageGallery
          images={product.images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p>{product.description}</p>

          <h3 className="mt-4">Sizes</h3>
          {product.sizes.map((size) => (
            <button key={size} onClick={() => setSelectedSize(size)}>
              {size}
            </button>
          ))}

          <h2 className="text-2xl mt-4">
            {formatPrice(currentPrice)}
          </h2>

          <button
            disabled={!isLoggedIn}
            onClick={() => {
              const added = addToCart({
                productId: product._id,
                name: product.name,
                image: product.images[0],
                size: selectedSize,
                price: currentPrice,
              });

              if (!added) navigate('/login');
            }}
          >
            {isLoggedIn ? 'Add to Cart' : 'Login to Add'}
          </button>

          <ShareButton product={product} />
        </div>
      </div>

      <ReviewSection productId={id} />
    </div>
  );
};

export default ProductDetail;