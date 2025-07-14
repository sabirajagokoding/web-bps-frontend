// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import bpslogo from '../assets/bps-logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAction, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Email dan Password wajib diisi!');
      return;
    }

    try {
      await loginAction(email, password);
      navigate('/publications');
    } catch (err) {
      console.error('Login gagal:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faf5] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center relative">
        {/* Logo */}
        <img src={bpslogo} alt="Logo BPS" className="w-24 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a883f]"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a883f]"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-2 px-6 rounded-lg transition-colors duration-300 ${
              loading
                ? 'bg-green-300 text-white cursor-not-allowed'
                : 'bg-[#3a883f] hover:bg-[#2e6b32] text-white'
            }`}
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-20">
            <p className="text-[#3a883f] font-semibold text-lg animate-pulse">
              Sedang memproses login...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
