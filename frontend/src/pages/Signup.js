import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('perfume_shop_users') || '[]');
    const alreadyExists = users.some((user) => user.email.toLowerCase() === form.email.toLowerCase());

    if (alreadyExists) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    localStorage.setItem('perfume_shop_users', JSON.stringify([...users, newUser]));
    onAuthSuccess({ name: newUser.name, email: newUser.email });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form className="bg-white w-full max-w-md rounded-2xl shadow-md p-8" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create account</h1>

        <input
          type="text"
          placeholder="Full name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          required
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-semibold hover:opacity-90"
        >
          Signup
        </button>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link className="text-primary font-medium" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
