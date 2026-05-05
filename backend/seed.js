const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const Review = require('./models/Review');




const imageSets = [
  [
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/b/u/c/50-0-whisky-smoke-edp-perfume-for-men-strong-long-lasting-eau-de-original-imahckwnbez23ue9.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/k/l/v/100-0-whisky-smoke-edp-mafia-edp-perfume-set-perfume-beardo-men-original-imahcjqupxc5tumh.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/i/d/0/50-0-whisky-smoke-edp-perfume-for-men-strong-long-lasting-eau-de-original-imahckwnzuasfthg.jpeg?q=70&crop=false"
  ],
  [
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/d/c/y/50-vanilla-noir-unisex-perfume-vanilla-aromatic-woody-powdery-original-imahhwz68qvhjrus.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/x/h/8/50-vanilla-noir-unisex-perfume-vanilla-aromatic-woody-powdery-original-imahhwz6ygraas47.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/z/2/z/50-vanilla-noir-unisex-perfume-vanilla-aromatic-woody-powdery-original-imahhwz6fucwd9tf.jpeg?q=70&crop=false"
  ],
  [
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/i/d/2/-original-imahg93nrdg8pn2r.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/z/n/9/-original-imahg93np4kefuah.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/f/7/e/-original-imahg93nuhdsfr7b.jpeg?q=70&crop=false"
  ],
  [
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/m/6/k/100-oud-dubai-long-lasting-unisex-perfume-eau-de-parfum-ajmal-original-imahjcbpuphgkkkg.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/p/m/b/100-oud-dubai-long-lasting-unisex-perfume-eau-de-parfum-ajmal-original-imahjcbznuk4fcrn.jpeg?q=70&crop=false",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/t/8/e/100-oud-dubai-long-lasting-unisex-perfume-eau-de-parfum-ajmal-original-imahjcbpnz3r6u9m.jpeg?q=70&crop=false"
  ]
];

const brands = [
  "Beardo", "EM5", "Ajmal", "Nisara", "Skinn", "Fogg", "Wild Stone", "Bella Vita",
  "Denver", "Rasasi", "Lattafa", "Axe", "Park Avenue", "Ustraa", "Armaf"
];

const accordNames = [
  "Oud", "Vanilla", "Amber", "Citrus", "Musk", "Spice", "Aqua", "Rose",
  "Leather", "Woody", "Floral", "Smoky", "Fresh", "Noir", "Elixir", "Night"
];

const categories = ["Men", "Women", "Unisex", "Luxury", "Fresh"];
const sizePatterns = [
  ["30ml", "50ml", "100ml"],
  ["50ml", "100ml"],
  ["20ml", "50ml", "100ml"]
];

const manualProducts = [
  {
    name: "Beardo Whisky Smoke Single Malt",
    description: "A bold and intoxicating fragrance crafted with long-lasting woody notes. This sophisticated Eau de Parfum captures the essence of aged whisky with smoky undertones, combining rich amber, oak wood, and a hint of vanilla with the distinctive warmth of whisky notes. Perfect for evening occasions, it exudes confidence and masculine elegance. The long-lasting fragrance creates an aura of mystery and sophistication.",
    shortDescription: "Bold fragrance with aged whisky notes, smoky undertones, and rich amber for a sophisticated evening scent.",
    price: 699, // Base price for 50ml in INR (from Flipkart/Beardo)
    images: [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/b/u/c/50-0-whisky-smoke-edp-perfume-for-men-strong-long-lasting-eau-de-original-imahckwnbez23ue9.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/k/l/v/100-0-whisky-smoke-edp-mafia-edp-perfume-set-perfume-beardo-men-original-imahcjqupxc5tumh.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/i/d/0/50-0-whisky-smoke-edp-perfume-for-men-strong-long-lasting-eau-de-original-imahckwnzuasfthg.jpeg?q=70&crop=false"
    ],
    sizes: ["50ml", "100ml"],
    category: "Men",
    brand: "Beardo"
  },
  {
    name: "EM5 Vanilla Noir",
    description: "A luxurious unisex perfume featuring vanilla aromatic, woody, and powdery fragrance notes. This elegant Eau de Parfum combines the warmth of vanilla with sophisticated woody undertones and a soft powdery finish. Perfect for both men and women, it creates a sensual and refined aroma that lasts throughout the day. Ideal for evening wear and special occasions.",
    shortDescription: "Luxurious unisex fragrance with vanilla, woody, and powdery notes for a sensual, refined scent.",
    price: 899, // Base price for 50ml in INR
    images: [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/d/c/y/50-vanilla-noir-unisex-perfume-vanilla-aromatic-woody-powdery-original-imahhwz68qvhjrus.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/x/h/8/50-vanilla-noir-unisex-perfume-vanilla-aromatic-woody-powdery-original-imahhwz6ygraas47.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/z/2/z/50-vanilla-noir-unisex-perfume-vanilla-aromatic-woody-powdery-original-imahhwz6fucwd9tf.jpeg?q=70&crop=false"
    ],
    sizes: ["50ml", "100ml"],
    category: "Unisex",
    brand: "EM5"
  },
  {
    name: "Beardo Don",
    description: "A powerful and commanding fragrance that embodies strength and sophistication. This premium Eau de Parfum features bold notes of leather, tobacco, and dark spices combined with rich oud and amber. This masculine fragrance is perfect for confident individuals who want to make a statement. The complex blend creates an aura of authority and elegance with long-lasting projection.",
    shortDescription: "Powerful masculine fragrance with leather, tobacco, and dark spices for a bold, commanding presence.",
    price: 499, // Base price for 50ml in INR (from Beardo official)
    images: [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/i/d/2/-original-imahg93nrdg8pn2r.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/z/n/9/-original-imahg93np4kefuah.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/f/7/e/-original-imahg93nuhdsfr7b.jpeg?q=70&crop=false"
    ],
    sizes: ["50ml", "100ml"],
    category: "Men",
    brand: "Beardo"
  },
  {
    name: "Ajmal Oud Dubai",
    description: "A luxurious and opulent long-lasting unisex perfume featuring rare oud wood, rose petals, and saffron. This premium Eau de Parfum is crafted for those who appreciate the finest scents. The complex blend creates a rich, warm, and exotic aroma that lingers beautifully throughout the day. Inspired by the essence of Dubai, it combines traditional Middle Eastern notes with modern sophistication.",
    shortDescription: "Luxurious unisex fragrance with rare oud wood, rose petals, and saffron for an exotic, opulent scent.",
    price: 899, // Base price for 50ml in INR (100ml would be ~1299)
    images: [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/m/6/k/100-oud-dubai-long-lasting-unisex-perfume-eau-de-parfum-ajmal-original-imahjcbpuphgkkkg.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/p/m/b/100-oud-dubai-long-lasting-unisex-perfume-eau-de-parfum-ajmal-original-imahjcbznuk4fcrn.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/perfume/t/8/e/100-oud-dubai-long-lasting-unisex-perfume-eau-de-parfum-ajmal-original-imahjcbpnz3r6u9m.jpeg?q=70&crop=false"
    ],
    sizes: ["50ml", "100ml"],
    category: "Unisex",
    brand: "Ajmal"
  },
  {
    name: "Nisara Vanilla Rush",
    description: "A delightful long-lasting ambery Eau de Parfum designed for women. This enchanting fragrance features the warm sweetness of vanilla combined with rich amber notes and floral undertones. Perfect for daytime and evening wear, it creates a feminine and elegant aroma that captivates the senses. The vanilla rush provides a comforting and luxurious scent experience.",
    shortDescription: "Delightful women's fragrance with vanilla, amber, and floral notes for a warm, elegant scent.",
    price: 499, // Base price for 50ml in INR (100ml would be ~799)
    images: [
      "https://rukminim2.flixcart.com/image/832/832/l3khsi80/perfume/z/z/y/nisara-vanilla-rush-long-lasting-ambery-eau-de-parfum-100-ml-for-women-original-imag964911b47a407.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/832/832/l3khsi80/perfume/z/z/y/nisara-vanilla-rush-long-lasting-ambery-eau-de-parfum-100-ml-for-women-original-imag964911b47a407.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/832/832/l3khsi80/perfume/z/z/y/nisara-vanilla-rush-long-lasting-ambery-eau-de-parfum-100-ml-for-women-original-imag964911b47a407.jpeg?q=70"
    ],
    sizes: ["50ml", "100ml"],
    category: "Women",
    brand: "Nisara"
  },
  {
    name: "Beardo Oud Spice",
    description: "A long-lasting men fragrance by Beardo blending oud, spice, and woody accords. Crafted for balanced projection and smooth dry-down, this scent works well from daytime wear to evening occasions.",
    shortDescription: "Beardo blend with oud, spice, and woody notes.",
    price: 399,
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1619994403073-2cec9b8b8e8f?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["30ml", "50ml", "100ml"],
    category: "Men",
    brand: "Beardo"
  },
  {
    name: "EM5 Vanilla Aqua",
    description: "A long-lasting women fragrance by EM5 blending vanilla, aqua, and floral accords. Crafted for balanced projection and smooth dry-down, this scent works well from daytime wear to evening occasions.",
    shortDescription: "EM5 blend with vanilla, aqua, and floral notes.",
    price: 472,
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59e22?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["50ml", "100ml"],
    category: "Women",
    brand: "EM5"
  },
  {
    name: "Ajmal Amber Rose",
    description: "A long-lasting unisex fragrance by Ajmal blending amber, rose, and smoky accords. Crafted for balanced projection and smooth dry-down, this scent works well from daytime wear to evening occasions.",
    shortDescription: "Ajmal blend with amber, rose, and smoky notes.",
    price: 545,
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1615228939092-1f7e5ef1f8a8?auto=format&fit=crop&w=900&q=80"
    ],
    sizes: ["20ml", "50ml", "100ml"],
    category: "Unisex",
    brand: "Ajmal"
  }
];

const makeProduct = (index) => {
  const brand = brands[index % brands.length];
  const noteA = accordNames[index % accordNames.length];
  const noteB = accordNames[(index + 5) % accordNames.length];
  const noteC = accordNames[(index + 9) % accordNames.length];
  const category = categories[index % categories.length];
  const sizes = sizePatterns[index % sizePatterns.length];
  const basePrice = 399 + ((index * 73) % 1300);

  return {
    name: `${brand} ${noteA} ${noteB}`,
    description: `A long-lasting ${category.toLowerCase()} fragrance by ${brand} blending ${noteA.toLowerCase()}, ${noteB.toLowerCase()}, and ${noteC.toLowerCase()} accords. Crafted for balanced projection and smooth dry-down, this scent works well from daytime wear to evening occasions.`,
    shortDescription: `${brand} blend with ${noteA.toLowerCase()}, ${noteB.toLowerCase()}, and ${noteC.toLowerCase()} notes.`,
    price: basePrice,
    images: imageSets[index % imageSets.length],
    sizes,
    category,
    brand
  };
};

const generatedProducts = Array.from({ length: 60 }, (_, index) => makeProduct(index));
const manualNames = new Set(manualProducts.map((product) => product.name));
const products = [
  ...manualProducts,
  ...generatedProducts.filter((product) => !manualNames.has(product.name))
];

const reviews = [
  {
    productId: null,
    userName: "Rajesh Kumar",
    rating: 5,
    comment: "Bhai, yeh perfume bahut mast hai! Whisky ka smell aata hai aur poore din rahta hai. Office mein sab log puchte hain ki kya lagaya hai. Definitely worth the money!"
  },
  {
    productId: null,
    userName: "Priya Sharma",
    rating: 5,
    comment: "Love love love this fragrance! Vanilla ka scent bohot soothing hai. My husband also likes it. Long lasting bhi hai, morning se evening tak chal jata hai. Highly recommend!"
  },
  {
    productId: null,
    userName: "Amit Patel",
    rating: 4,
    comment: "Good perfume hai yaar. Don ka naam sunke liya tha, aur honestly it's quite strong. Party ke liye perfect hai. Thoda expensive lagta hai but quality is good."
  },
  {
    productId: null,
    userName: "Kavita Reddy",
    rating: 5,
    comment: "Oud Dubai wala perfume bohot luxurious feel deta hai. Middle Eastern vibes aate hain. Price thoda high hai but worth it hai. Special occasions ke liye perfect."
  },
  {
    productId: null,
    userName: "Vikram Singh",
    rating: 4,
    comment: "Vanilla Rush ka naam sahi hai, vanilla ka rush aata hai! Ladies perfume hai but unisex bhi use kar sakte hain. Smell sweet hai, my girlfriend loves it."
  },
  {
    productId: null,
    userName: "Anjali Mehta",
    rating: 5,
    comment: "Beardo Whisky Smoke is my husband's favorite now! Smoky aur woody notes bohot classy lagte hain. Packaging bhi acchi hai. Gift ke liye bhi perfect hai."
  },
  {
    productId: null,
    userName: "Rohit Gupta",
    rating: 4,
    comment: "EM5 Vanilla Noir decent hai. Vanilla ka smell aata hai but expected se thoda kam strong hai. Price reasonable hai, daily use ke liye theek hai."
  },
  {
    productId: null,
    userName: "Sneha Iyer",
    rating: 5,
    comment: "Nisara Vanilla Rush bohot accha hai! Vanilla aur amber ka combination perfect hai. Long lasting hai aur smell bohot feminine hai. My go-to perfume now."
  },
  {
    productId: null,
    userName: "Arjun Nair",
    rating: 4,
    comment: "Beardo Don perfume try kiya, overall good hai. Strong hai, ek baar spray kiya toh poore din raha. Price thoda kam hota toh aur better hota."
  },
  {
    productId: null,
    userName: "Divya Joshi",
    rating: 5,
    comment: "Ajmal Oud Dubai is amazing! Oud ka authentic smell aata hai. Dubai se gift mein aaya tha, ab yahan se order kar rahi hoon. Quality top notch hai."
  },
  {
    productId: null,
    userName: "Manish Agarwal",
    rating: 5,
    comment: "Beardo Whisky Smoke is the best perfume I've bought! Smoky aur woody notes bohot classy lagte hain. Office mein sab log notice karte hain. Worth every rupee!"
  },
  {
    productId: null,
    userName: "Neha Desai",
    rating: 4,
    comment: "Husband ko gift diya, unhe bahut pasand aaya. Whisky ka authentic smell aata hai. Packaging bhi acchi hai. Good quality product hai."
  },
  {
    productId: null,
    userName: "Rahul Malhotra",
    rating: 5,
    comment: "EM5 Vanilla Noir unisex hai, main aur meri wife dono use karte hain. Vanilla ka sweet smell hai, daily wear ke liye perfect. Long lasting bhi hai."
  },
  {
    productId: null,
    userName: "Deepak Verma",
    rating: 5,
    comment: "Beardo Don naam se hi strong lagta hai, aur perfume bhi utna hi strong hai! Party aur night out ke liye best hai. Friends ko bhi recommend kiya."
  },
  {
    productId: null,
    userName: "Shreya Kapoor",
    rating: 5,
    comment: "Ajmal Oud Dubai is premium quality! Oud ka authentic Middle Eastern smell aata hai. Price thoda high hai but quality justify karti hai. Love it!"
  },
  {
    productId: null,
    userName: "Pooja Shah",
    rating: 4,
    comment: "Nisara Vanilla Rush sweet hai, vanilla aur amber ka combination accha hai. Morning wear ke liye perfect. Price reasonable hai, value for money."
  },
  {
    productId: null,
    userName: "Karan Mehta",
    rating: 5,
    comment: "Whisky Smoke perfume bohot unique hai! Pehli baar try kiya aur ab regular use kar raha hoon. Smoky notes bahut appealing hain. Must try!"
  },
  {
    productId: null,
    userName: "Riya Choudhary",
    rating: 5,
    comment: "Vanilla Noir ka scent bohot elegant hai. Office mein bhi use kar sakte hain, formal occasions ke liye bhi perfect. Long lasting hai, worth it!"
  },
  {
    productId: null,
    userName: "Siddharth Rao",
    rating: 4,
    comment: "Beardo Don thoda strong hai for my taste, but quality acchi hai. Special occasions ke liye use karta hoon. Price reasonable hai."
  },
  {
    productId: null,
    userName: "Meera Nair",
    rating: 5,
    comment: "Oud Dubai perfume se Middle East ki yaad aati hai! Oud ka authentic smell, rose aur saffron ka perfect blend. Luxury feel deta hai."
  },
  {
    productId: null,
    userName: "Aditya Iyer",
    rating: 4,
    comment: "Vanilla Rush ladies perfume hai but main bhi try kiya. Sweet hai, vanilla ka smell aata hai. Girlfriend ko gift diya, unhe bahut pasand aaya."
  },
  {
    productId: null,
    userName: "Tanvi Patel",
    rating: 5,
    comment: "Beardo Whisky Smoke gift mein mila tha, ab regular use kar rahi hoon. Smoky aur woody notes perfect hain. Long lasting hai, morning se evening tak."
  },
  {
    productId: null,
    userName: "Vishal Agarwal",
    rating: 4,
    comment: "EM5 Vanilla Noir unisex hai, main aur meri sister dono use karte hain. Vanilla ka smell soothing hai. Price thoda kam hota toh better hota."
  },
  {
    productId: null,
    userName: "Ananya Reddy",
    rating: 5,
    comment: "Beardo Don perfume strong hai but classy lagta hai. Date night ke liye perfect hai. Smell unique hai, sab log notice karte hain."
  },
  {
    productId: null,
    userName: "Nikhil Joshi",
    rating: 5,
    comment: "Ajmal Oud Dubai premium hai! Oud ka authentic smell, long lasting hai. Special occasions ke liye best hai. Price high hai but worth it."
  },
  {
    productId: null,
    userName: "Isha Gupta",
    rating: 4,
    comment: "Nisara Vanilla Rush sweet aur feminine hai. Vanilla aur amber ka combination accha hai. Daily wear ke liye perfect. Price reasonable hai."
  },
  {
    productId: null,
    userName: "Rohan Deshmukh",
    rating: 5,
    comment: "Whisky Smoke perfume ka naam perfect hai! Whisky ka authentic smell aata hai. Office mein sab log puchte hain. Highly recommend!"
  },
  {
    productId: null,
    userName: "Aishwarya Menon",
    rating: 5,
    comment: "Vanilla Noir ka scent bohot sophisticated hai. Vanilla, woody aur powdery notes perfect blend hain. Long lasting hai, love it!"
  },
  {
    productId: null,
    userName: "Kunal Shah",
    rating: 4,
    comment: "Beardo Don perfume try kiya, strong hai. Party ke liye perfect hai. Price thoda kam hota toh aur better hota but quality good hai."
  },
  {
    productId: null,
    userName: "Swati Nair",
    rating: 5,
    comment: "Oud Dubai perfume se Dubai ki yaad aati hai! Oud ka authentic Middle Eastern smell. Special occasions ke liye perfect. Worth every penny!"
  },
  {
    productId: null,
    userName: "Harsh Mehta",
    rating: 4,
    comment: "Vanilla Rush ladies perfume hai, girlfriend ko gift diya. Unhe bahut pasand aaya. Vanilla ka sweet smell hai, long lasting hai."
  },
  {
    productId: null,
    userName: "Preeti Agarwal",
    rating: 5,
    comment: "Beardo Whisky Smoke husband ko gift diya, unhe bahut pasand aaya. Smoky aur woody notes classy hain. Packaging bhi acchi hai."
  },
  {
    productId: null,
    userName: "Abhishek Rao",
    rating: 4,
    comment: "EM5 Vanilla Noir decent hai. Vanilla ka smell aata hai but expected se thoda kam strong hai. Daily use ke liye theek hai."
  },
  {
    productId: null,
    userName: "Jyoti Iyer",
    rating: 5,
    comment: "Beardo Don perfume strong hai but appealing hai. Night out ke liye perfect hai. Smell unique hai, sab log notice karte hain."
  },
  {
    productId: null,
    userName: "Saurabh Choudhary",
    rating: 5,
    comment: "Ajmal Oud Dubai premium quality hai! Oud ka authentic smell, rose aur saffron ka perfect blend. Luxury feel deta hai. Must have!"
  },
  {
    productId: null,
    userName: "Kritika Patel",
    rating: 4,
    comment: "Nisara Vanilla Rush sweet hai, vanilla aur amber ka combination accha hai. Morning wear ke liye perfect. Price reasonable hai."
  },
  {
    productId: null,
    userName: "Varun Malhotra",
    rating: 5,
    comment: "Whisky Smoke perfume bohot unique hai! Whisky ka authentic smell aata hai. Office mein sab log puchte hain ki kya lagaya hai."
  },
  {
    productId: null,
    userName: "Nisha Reddy",
    rating: 5,
    comment: "Vanilla Noir ka scent bohot elegant hai. Vanilla, woody aur powdery notes perfect blend hain. Long lasting hai, highly recommend!"
  },
  {
    productId: null,
    userName: "Prateek Verma",
    rating: 4,
    comment: "Beardo Don perfume try kiya, overall good hai. Strong hai, ek baar spray kiya toh poore din raha. Price thoda kam hota toh better hota."
  },
  {
    productId: null,
    userName: "Radhika Joshi",
    rating: 5,
    comment: "Oud Dubai perfume se Middle East ki yaad aati hai! Oud ka authentic smell, long lasting hai. Special occasions ke liye best hai."
  },
  {
    productId: null,
    userName: "Mohit Agarwal",
    rating: 4,
    comment: "Vanilla Rush ladies perfume hai but unisex bhi use kar sakte hain. Sweet hai, vanilla ka smell aata hai. Girlfriend ko pasand aaya."
  },
  {
    productId: null,
    userName: "Shruti Mehta",
    rating: 5,
    comment: "Beardo Whisky Smoke is amazing! Smoky aur woody notes bohot classy lagte hain. Long lasting hai, morning se evening tak chal jata hai."
  },
  {
    productId: null,
    userName: "Aakash Nair",
    rating: 4,
    comment: "EM5 Vanilla Noir unisex hai, main aur meri wife dono use karte hain. Vanilla ka smell soothing hai. Price reasonable hai."
  },
  {
    productId: null,
    userName: "Divya Choudhary",
    rating: 5,
    comment: "Beardo Don perfume strong hai but classy lagta hai. Party aur night out ke liye perfect hai. Smell unique hai, sab log notice karte hain."
  },
  {
    productId: null,
    userName: "Ravi Iyer",
    rating: 5,
    comment: "Ajmal Oud Dubai premium hai! Oud ka authentic Middle Eastern smell. Price high hai but quality justify karti hai. Worth every rupee!"
  },
  {
    productId: null,
    userName: "Sakshi Patel",
    rating: 4,
    comment: "Nisara Vanilla Rush sweet aur feminine hai. Vanilla aur amber ka combination accha hai. Daily wear ke liye perfect. Good value for money."
  },
  {
    productId: null,
    userName: "Gaurav Shah",
    rating: 5,
    comment: "Whisky Smoke perfume ka naam perfect hai! Whisky ka authentic smell aata hai. Office mein sab log puchte hain. Highly recommend!"
  },
  {
    productId: null,
    userName: "Maya Reddy",
    rating: 5,
    comment: "Vanilla Noir ka scent bohot sophisticated hai. Vanilla, woody aur powdery notes perfect blend hain. Long lasting hai, love it!"
  },
  {
    productId: null,
    userName: "Yash Agarwal",
    rating: 4,
    comment: "Beardo Don perfume try kiya, strong hai. Special occasions ke liye perfect hai. Price thoda kam hota toh aur better hota but quality good hai."
  },
  {
    productId: null,
    userName: "Kavya Menon",
    rating: 5,
    comment: "Oud Dubai perfume se Dubai ki yaad aati hai! Oud ka authentic smell, rose aur saffron ka perfect blend. Luxury feel deta hai."
  },
  {
    productId: null,
    userName: "Rishabh Desai",
    rating: 4,
    comment: "Vanilla Rush ladies perfume hai, sister ko gift diya. Unhe bahut pasand aaya. Vanilla ka sweet smell hai, long lasting hai."
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/perfume-shop', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`Inserted ${createdProducts.length} products`);

    // Distribute available reviews across all products in round-robin.
    const reviewPromises = reviews.map((review, index) => {
      const product = createdProducts[index % createdProducts.length];
      return Review.create({
        ...review,
        productId: product._id
      });
    });

    await Promise.all(reviewPromises);
    console.log('Inserted reviews');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

