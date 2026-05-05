const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const Review = require('./models/Review');

// ---------------- IMAGE SETS ----------------
const imageSets = [
  [
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/b/u/c/50-0-whisky-smoke-edp-perfume-for-men-strong-long-lasting-eau-de-original-imahckwnbez23ue9.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/k/l/v/100-0-whisky-smoke-edp-mafia-edp-perfume-set-perfume-beardo-men-original-imahcjqupxc5tumh.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/i/d/0/50-0-whisky-smoke-edp-perfume-for-men-original-imahckwnzuasfthg.jpeg?q=70"
  ],
  [
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/d/c/y/50-vanilla-noir-unisex-original-imahhwz68qvhjrus.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/x/h/8/50-vanilla-noir-unisex-original-imahhwz6ygraas47.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/z/2/z/50-vanilla-noir-unisex-original-imahhwz6fucwd9tf.jpeg?q=70"
  ]
];

// ---------------- ARRAYS ----------------
const brands = ["Beardo", "EM5", "Ajmal", "Nisara"];
const accords = ["Oud", "Vanilla", "Amber", "Citrus", "Musk", "Spice"];
const categories = ["Men", "Women", "Unisex"];
const sizesList = [["50ml", "100ml"], ["30ml", "50ml", "100ml"]];

// ---------------- MANUAL PRODUCTS ----------------
const products = [
  {
    name: "Beardo Whisky Smoke",
    description: "Bold smoky whisky fragrance",
    shortDescription: "Smoky whisky scent",
    price: 699,
    images: imageSets[0],
    sizes: ["50ml", "100ml"],
    category: "Men",
    brand: "Beardo"
  },
  {
    name: "EM5 Vanilla Noir",
    description: "Vanilla woody luxury perfume",
    shortDescription: "Vanilla woody scent",
    price: 899,
    images: imageSets[1],
    sizes: ["50ml", "100ml"],
    category: "Unisex",
    brand: "EM5"
  }
];

// ---------------- AUTO GENERATE MORE PRODUCTS ----------------
const makeProduct = (i) => ({
  name: `${brands[i % brands.length]} ${accords[i % accords.length]}`,
  description: `Premium ${categories[i % categories.length]} perfume`,
  shortDescription: `${accords[i % accords.length]} fragrance`,
  price: 399 + i * 20,
  images: imageSets[i % imageSets.length],
  sizes: sizesList[i % sizesList.length],
  category: categories[i % categories.length],
  brand: brands[i % brands.length]
});

const generatedProducts = Array.from({ length: 20 }, (_, i) => makeProduct(i));

// ✅ Merge manual + generated
const allProducts = [...products, ...generatedProducts];

// ---------------- REVIEWS ----------------
const reviews = [
  { userName: "Raj", rating: 5, comment: "Amazing perfume!" },
  { userName: "Priya", rating: 4, comment: "Nice fragrance" },
  { userName: "Amit", rating: 5, comment: "Long lasting!" },
  { userName: "Sneha", rating: 4, comment: "Worth it" }
];

// ---------------- SEED FUNCTION ----------------
async function seedDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/perfume-shop"
    );

    console.log("✅ MongoDB Connected");

    // Clear old data
    await Product.deleteMany();
    await Review.deleteMany();

    console.log("🧹 Old data cleared");

    // Insert products
    const createdProducts = await Product.insertMany(allProducts);

    console.log(`📦 ${createdProducts.length} products inserted`);

    // Assign reviews (round robin)
    const reviewPromises = reviews.map((rev, index) => {
      const product = createdProducts[index % createdProducts.length];

      return Review.create({
        ...rev,
        productId: product._id
      });
    });

    await Promise.all(reviewPromises);

    console.log("⭐ Reviews added");
    console.log("🎉 Database Seeded Successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seedDatabase();