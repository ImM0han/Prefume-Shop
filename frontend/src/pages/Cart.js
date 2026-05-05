import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/priceCalculator';

const Cart = ({ cartItems, updateCartQuantity, clearCart, currentUser }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleMockPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentSuccess(true);
      clearCart();
    }, 1300);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Login required</h1>
          <p className="text-gray-600 mb-6">Please login first to access your cart.</p>
          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-semibold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add products to your cart and they will appear here.</p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-semibold"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-50"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-primary font-semibold">{formatPrice(item.price)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="w-9 h-9 rounded-md border border-gray-300 text-lg"
                  onClick={() => updateCartQuantity(item.productId, item.size, item.quantity - 1)}
                >
                  -
                </button>
                <span className="min-w-8 text-center font-medium">{item.quantity}</span>
                <button
                  className="w-9 h-9 rounded-md border border-gray-300 text-lg"
                  onClick={() => updateCartQuantity(item.productId, item.size, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg text-gray-700">Total</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(totalAmount)}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold"
              onClick={clearCart}
            >
              Clear cart
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-semibold"
              onClick={() => {
                setIsCheckoutOpen(true);
                setIsPaymentSuccess(false);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Mock Checkout</h2>
            <p className="text-gray-600 text-sm mb-5">
              This is a demo payment flow for {currentUser.email}.
            </p>

            {isPaymentSuccess ? (
              <div className="text-center">
                <p className="text-green-600 font-semibold mb-4">
                  Payment successful! Your mock order has been placed.
                </p>
                <button
                  className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-semibold"
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <label className="block text-sm text-gray-700 mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="cod">Cash on Delivery</option>
                </select>

                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">Payable amount</p>
                  <p className="text-xl font-bold text-primary">{formatPrice(totalAmount)}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold"
                    onClick={() => setIsCheckoutOpen(false)}
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-semibold disabled:opacity-60"
                    onClick={handleMockPayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay with ${paymentMethod.toUpperCase()}`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
