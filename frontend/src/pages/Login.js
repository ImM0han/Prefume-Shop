import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('perfume_shop_users') || '[]');
    const foundUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (!foundUser) {
      setError('Invalid email or password.');
      return;
    }

    onAuthSuccess({ name: foundUser.name, email: foundUser.email });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form className="bg-white w-full max-w-md rounded-2xl shadow-md p-8" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-semibold hover:opacity-90"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 mt-4">
          New user?{' '}
          <Link className="text-primary font-medium" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
