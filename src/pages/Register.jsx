import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Nama harus diisi';
    }
    if (!email) {
      errors.email = 'Email harus diisi';
    } else if (!email.includes('@')) {
      errors.email = 'Email tidak valid';
    }
    if (!password) {
      errors.password = 'Password harus diisi';
    } else if (password.length < 8) {
      errors.password = 'Password minimal 8 karakter';
    }
    if (!passwordConfirmation) {
      errors.passwordConfirmation = 'Konfirmasi password harus diisi';
    } else if (password !== passwordConfirmation) {
      errors.passwordConfirmation = 'Konfirmasi password tidak sama';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isDisabled =
    loading ||
    !name ||
    !email ||
    !password ||
    !passwordConfirmation ||
    Object.values(fieldErrors).some((v) => Boolean(v));

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-linear-to-r from-amber-600 to-orange-600 p-4 rounded-full shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Haibah Coffe</h2>
          <p className="text-lg text-gray-600">Buat akun baru Anda</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
      <input id="name" type="text"
        value={name}
        onChange={(e) => {
          const v = e.target.value;
          setName(v);
          setFieldErrors(prev => ({
            ...prev,
            name: v ? '' : 'Nama harus diisi',
          }));
        }}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
        placeholder="John Doe"
        autoComplete="name"/>
              </div>
              {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
      <input id="email" type="email"
        value={email}
        onChange={(e) => {
          const v = e.target.value;
          setEmail(v);
          setFieldErrors(prev => ({
            ...prev,
            email: !v ? 'Email harus diisi' : (v.includes('@') ? '' : 'Email tidak valid'),
          }));
        }}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
        placeholder="john@example.com"
        autoComplete="email"/>
              </div>
              {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
      <input id="password" type="password"
        value={password}
        onChange={(e) => {
          const v = e.target.value;
          setPassword(v);
          setFieldErrors(prev => ({
            ...prev,
            password: !v ? 'Password harus diisi' : (v.length >= 8 ? '' : 'Password minimal 8 karakter'),
            ...(passwordConfirmation !== '' ? {
              passwordConfirmation: !passwordConfirmation
                ? 'Konfirmasi password harus diisi'
                : (v === passwordConfirmation ? '' : 'Konfirmasi password tidak sama')
            } : {})
          }));
        }}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
        placeholder="Minimal 8 karakter"
        autoComplete="new-password"/>
              </div>
              <p className="text-xs text-gray-500 mt-1">Password harus minimal 8 karakter</p>
              {fieldErrors.password && <p className="text-sm text-red-600 mt-1">{fieldErrors.password}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-700">Konfirmasi Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <input id="password_confirmation" type="password"
                       value={passwordConfirmation}
                       onChange={(e) => {
                         const v = e.target.value;
                         setPasswordConfirmation(v);
                         setFieldErrors(prev => ({
                           ...prev,
                           passwordConfirmation: !v ? 'Konfirmasi password harus diisi' : (v === password ? '' : 'Konfirmasi password tidak sama'),
                         }));
                       }}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                       placeholder="Ulangi password"
                       autoComplete="new-password"/>
              </div>
              {fieldErrors.passwordConfirmation && <p className="text-sm text-red-600 mt-1">{fieldErrors.passwordConfirmation}</p>}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="terms" type="checkbox"
                       className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded transition duration-200"/>
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  Saya menyetujui{' '}
                  <a href="#" className="font-medium text-amber-600 hover:text-amber-500 transition duration-200">Syarat & Ketentuan</a>{' '}
                  dan{' '}
                  <a href="#" className="font-medium text-amber-600 hover:text-amber-500 transition duration-200">Kebijakan Privasi</a>
                </label>
              </div>
            </div>
            <div>
              <button type="button"
                      disabled={isDisabled}
                      onClick={async () => {
                        if (!validateFields()) return;
                        setError(null);
                        console.log('Register attempt:', { name, email, password });
                        try {
                          const res = await register({ name, email, password });
                          console.log('Register success:', res);
                          navigate('/login', { state: { justRegistered: true, email } });
                        } catch (err) {
                          console.error('Register error:', err);
                          setError(err?.message || 'Registrasi gagal');
                        }
                      }}
                      className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-200 transform hover:scale-105 shadow-lg ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-amber-300 group-hover:text-amber-200 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                </span>
                {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
              </button>
              {isDisabled && (
                <p className="mt-2 text-sm text-red-600 text-center">Lengkapi semua field dengan benar untuk melanjutkan</p>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500 transition duration-200">Masuk di sini</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
