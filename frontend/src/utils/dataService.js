/**
 * dataService.js
 * Replaces backend API calls with localStorage-backed data.
 * Products are seeded once on first load; reviews are stored per product.
 */

const PRODUCTS_KEY = 'perfume_shop_products';
const REVIEWS_KEY = 'perfume_shop_reviews';

// ─── Seed data (mirrors backend/seed.js) ─────────────────────────────────────

const imageSets = [
  [
    'https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/b/u/c/50-0-whisky-smoke-edp-perfume-for-men-strong-long-lasting-eau-de-original-imahckwnbez23ue9.jpeg?q=70',
    'https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/k/l/v/100-0-whisky-smoke-edp-mafia-edp-perfume-set-perfume-beardo-men-original-imahcjqupxc5tumh.jpeg?q=70',
    'https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/i/d/0/50-0-whisky-smoke-edp-perfume-for-men-original-imahckwnzuasfthg.jpeg?q=70',
  ],
  [
    'https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/d/c/y/50-vanilla-noir-unisex-original-imahhwz68qvhjrus.jpeg?q=70',
    'https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/x/h/8/50-vanilla-noir-unisex-original-imahhwz6ygraas47.jpeg?q=70',
    'https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/z/2/z/50-vanilla-noir-unisex-original-imahhwz6fucwd9tf.jpeg?q=70',
  ],
];

const brands = ['Beardo', 'EM5', 'Ajmal', 'Nisara'];
const accords = ['Oud', 'Vanilla', 'Amber', 'Citrus', 'Musk', 'Spice'];
const categories = ['Men', 'Women', 'Unisex'];
const sizesList = [
  ['50ml', '100ml'],
  ['30ml', '50ml', '100ml'],
];

const manualProducts = [
  {
    name: 'Beardo Whisky Smoke',
    description: 'Bold smoky whisky fragrance with deep woody undertones that linger all day.',
    shortDescription: 'Smoky whisky scent',
    price: 699,
    images: imageSets[0],
    sizes: ['50ml', '100ml'],
    category: 'Men',
    brand: 'Beardo',
    inStock: true,
  },
  {
    name: 'EM5 Vanilla Noir',
    description: 'Vanilla woody luxury perfume with a rich, sensuous blend of dark vanilla and sandalwood.',
    shortDescription: 'Vanilla woody scent',
    price: 899,
    images: imageSets[1],
    sizes: ['50ml', '100ml'],
    category: 'Unisex',
    brand: 'EM5',
    inStock: true,
  },
];

const generatedProducts = Array.from({ length: 20 }, (_, i) => ({
  name: `${brands[i % brands.length]} ${accords[i % accords.length]}`,
  description: `Premium ${categories[i % categories.length]} perfume with a rich, long-lasting ${accords[i % accords.length].toLowerCase()} accord.`,
  shortDescription: `${accords[i % accords.length]} fragrance`,
  price: 399 + i * 20,
  images: imageSets[i % imageSets.length],
  sizes: sizesList[i % sizesList.length],
  category: categories[i % categories.length],
  brand: brands[i % brands.length],
  inStock: true,
}));

const seedReviews = [
  { userName: 'Raj', rating: 5, comment: 'Amazing perfume!' },
  { userName: 'Priya', rating: 4, comment: 'Nice fragrance' },
  { userName: 'Amit', rating: 5, comment: 'Long lasting!' },
  { userName: 'Sneha', rating: 4, comment: 'Worth it' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

function getProducts() {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function getReviews() {
  const raw = localStorage.getItem(REVIEWS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

// ─── Seed on first load ───────────────────────────────────────────────────────

function ensureSeeded() {
  if (getProducts()) return; // already seeded

  const allProducts = [...manualProducts, ...generatedProducts].map((p, i) => ({
    ...p,
    _id: generateId(),
    createdAt: new Date(Date.now() - i * 60000).toISOString(),
  }));

  saveProducts(allProducts);

  // Seed reviews assigned round-robin to first products
  const reviewsMap = {};
  seedReviews.forEach((rev, i) => {
    const product = allProducts[i % allProducts.length];
    const productReviews = reviewsMap[product._id] || [];
    productReviews.push({
      _id: generateId(),
      productId: product._id,
      userName: rev.userName,
      rating: rev.rating,
      comment: rev.comment,
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    });
    reviewsMap[product._id] = productReviews;
  });

  saveReviews(reviewsMap);
}

// ─── Public API (mirrors the backend endpoints) ───────────────────────────────

export function fetchAllProducts() {
  ensureSeeded();
  const products = getProducts();
  return [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export function fetchProductById(id) {
  ensureSeeded();
  const products = getProducts();
  return products.find((p) => p._id === id) || null;
}

export function fetchReviewsByProductId(productId) {
  ensureSeeded();
  const reviews = getReviews();
  return reviews[productId] || [];
}

export function addReview({ productId, userName, rating, comment }) {
  ensureSeeded();
  const reviews = getReviews();
  const productReviews = reviews[productId] || [];
  const newReview = {
    _id: generateId(),
    productId,
    userName,
    rating: Number(rating),
    comment,
    createdAt: new Date().toISOString(),
  };
  reviews[productId] = [...productReviews, newReview];
  saveReviews(reviews);
  return newReview;
}