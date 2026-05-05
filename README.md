# Perfume Shop - Full Stack E-Commerce Application

A modern, responsive perfume e-commerce website built with React (frontend) and Node.js with MongoDB (backend).

## Features

### Homepage
- **Responsive Navbar**: Sticky navigation bar with mobile hamburger menu
- **Call to Action Banner**: Eye-catching banner with gradient overlay and smooth animations
- **Product Cards**: Display 5 perfume products with:
  - Product images
  - Product names and descriptions
  - Prices
  - Interactive hover effects
  - Click to navigate to product detail page

### Product Detail Page
- **Product Information**: Full description, price, and available sizes
- **Image Gallery**: Multiple product images with thumbnail navigation
- **Reviews Section**: 
  - View existing customer reviews with ratings
  - Add new reviews with star ratings
  - Average rating display
- **Share Button**: Share products on social media platforms (Facebook, Twitter, WhatsApp) or copy link

## Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.20.1
- Axios for API calls
- Tailwind CSS 3.3.6 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

## Styling

This project uses **Tailwind CSS** for all styling. All components use Tailwind utility classes instead of custom CSS files. The Tailwind configuration is set up in `frontend/tailwind.config.js`.

## Installation & Setup

### 1. Clone the repository
```bash
cd perfum
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already created, but verify)
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/perfume-shop

# Make sure MongoDB is running
# For Windows: Start MongoDB service
# For Mac/Linux: mongod

# Seed the database with sample data
npm run seed

# Start the backend server
npm start
# Or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
perfum/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── products.js
│   │   └── reviews.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProductCard.js
│   │   │   ├── ImageGallery.js
│   │   │   ├── ShareButton.js
│   │   │   └── ReviewSection.js
│   │   ├── pages/
│   │   │   ├── Homepage.js
│   │   │   └── ProductDetail.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID

### Reviews
- `GET /api/reviews/product/:productId` - Get all reviews for a product
- `POST /api/reviews` - Create a new review
  ```json
  {
    "productId": "product_id",
    "userName": "John Doe",
    "rating": 5,
    "comment": "Great product!"
  }
  ```

## Database Models

### Product
- name (String)
- description (String)
- shortDescription (String)
- price (Number)
- images (Array of Strings)
- sizes (Array of Strings)
- category (String)
- brand (String)
- inStock (Boolean)

### Review
- productId (ObjectId reference to Product)
- userName (String)
- rating (Number, 1-5)
- comment (String)
- createdAt (Date)

## Features Implementation

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and mobile devices
- Hamburger menu for mobile navigation

### Interactive Elements
- Smooth hover effects on product cards
- Image gallery with thumbnail selection
- Star rating system for reviews
- Social media sharing functionality

### Data Management
- All data fetched from MongoDB database
- No static values used
- Real-time review submission

## Development Notes

- The application uses MongoDB for data persistence
- Sample data is seeded using `npm run seed` in the backend directory
- The frontend proxies API requests to the backend (configured in package.json)
- All images use Unsplash placeholder URLs - replace with actual product images in production

## Production Build

To create a production build:

```bash
cd frontend
npm run build
```

This creates an optimized build in the `frontend/build` directory.

## Troubleshooting

1. **MongoDB Connection Error**: 
   - Ensure MongoDB is running locally
   - Or update MONGODB_URI in backend/.env to your MongoDB Atlas connection string

2. **Port Already in Use**:
   - Change PORT in backend/.env
   - Update proxy in frontend/package.json if needed

3. **CORS Issues**:
   - CORS is enabled in the backend for all origins
   - For production, configure specific origins

## License

This project is created for evaluation purposes.

