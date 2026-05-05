import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import ProductDetail from './pages/ProductDetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Collections from './pages/Collections';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('perfume_shop_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (!currentUser?.email) {
      setCartItems([]);
      return;
    }

    const userCartKey = `perfume_shop_cart_${currentUser.email}`;
    const savedUserCart = localStorage.getItem(userCartKey);
    setCartItems(savedUserCart ? JSON.parse(savedUserCart) : []);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser?.email) {
      return;
    }

    const userCartKey = `perfume_shop_cart_${currentUser.email}`;
    localStorage.setItem(userCartKey, JSON.stringify(cartItems));
  }, [cartItems, currentUser]);

  const addToCart = (product) => {
    if (!currentUser?.email) {
      return false;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.productId && item.size === product.size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.productId && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
    return true;
  };

  const updateCartQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => !(item.productId === productId && item.size === size))
      );
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('perfume_shop_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]);
    localStorage.removeItem('perfume_shop_current_user');
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar cartCount={cartCount} currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={<Homepage addToCart={addToCart} isLoggedIn={Boolean(currentUser)} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} isLoggedIn={Boolean(currentUser)} />}
          />
          <Route
            path="/collections"
            element={<Collections addToCart={addToCart} isLoggedIn={Boolean(currentUser)} />}
          />
          <Route path="/signup" element={<Signup onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                updateCartQuantity={updateCartQuantity}
                clearCart={clearCart}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

