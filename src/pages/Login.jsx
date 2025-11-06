import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (location.state?.justRegistered) {
      if (location.state?.email) setEmail(location.state.email);
    }
  }, [location.state]);

  const validateFields = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email harus diisi';
    } else if (!email.includes('@')) {
      errors.email = 'Email tidak valid';
    }
    if (!password) {
      errors.password = 'Password harus diisi';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isDisabled = loading || !email || !password || Object.keys(fieldErrors).length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-linear-to-r from-amber-600 to-orange-600 p-4 rounded-full shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.5 2.5L19 5M15 19l-2.5-2.5L9 19M21 12c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM12 12c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Coffee Detect</h2>
          <p className="text-lg text-gray-600">Masuk ke akun Anda</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {location.state?.justRegistered && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
              Registrasi berhasil. Silakan masuk menggunakan email dan password Anda.
            </div>
          )}
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                  placeholder="nama@email.com"
                  autoComplete="email"
                />
              </div>
              {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                />
              </div>
              {fieldErrors.password && <p className="text-sm text-red-600 mt-1">{fieldErrors.password}</p>}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember" 
                  type="checkbox" 
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded transition duration-200"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-amber-600 hover:text-amber-500 transition duration-200">
                  Lupa password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="button"
                disabled={isDisabled}
                onClick={async () => {
                  if (!validateFields()) return;
                  setError(null);
                  console.log('Login attempt:', { email, password });
                  try {
                    const res = await login({ email, password });
                    console.log('Login success:', res);
                    navigate('/');
                  } catch (err) {
                    console.error('Login error:', err);
                    setError(err?.message || 'Login gagal');
                  }
                }}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-200 transform hover:scale-105 shadow-lg ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-amber-300 group-hover:text-amber-200 transition duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {loading ? 'Masuk...' : 'Masuk'}
              </button>
            </div>
            {isDisabled && (
              <p className="mt-2 text-sm text-red-600 text-center">Lengkapi email dan password yang valid untuk melanjutkan</p>
            )}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link to="/register" className="font-medium text-amber-600 hover:text-amber-500 transition duration-200">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
