import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import * as authServices from '../services/authServices';

export default function User() {
  const { user, token, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    // If we have token but no user, fetch the profile
    if (!user && token) {
      (async () => {
        try {
          setFetching(true);
          setFetchError(null);
          const decodeJwt = (jwt) => {
            try {
              const [, payload] = jwt.split('.');
              const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
              const padded = base64.padEnd(base64.length + (4 - (base64.length % 4 || 4)) % 4, '=');
              const json = atob(padded);
              return JSON.parse(json);
            } catch (e) {
              return null;
            }
          };
          const payload = decodeJwt(token);
          const id = payload?.id;
          if (!id) throw new Error('Tidak bisa membaca ID pengguna dari token');
          const res = await authServices.getUserById(id, token);
          const profile = res?.data || res;
          if (profile) setUser(profile);
        } catch (e) {
          console.error('Fetch user error:', e);
          setFetchError(e?.message || 'Gagal memuat data pengguna');
          // Optional: force re-login on auth error
          // logout(); navigate('/login');
        } finally {
          setFetching(false);
        }
      })();
    }
  }, [user, token, navigate, setUser, logout]);

  if (!token) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-amber-800 mb-4">Profil Pengguna</h1>
        {fetching && (
          <div className="mb-3 text-sm text-gray-600">Memuat data pengguna...</div>
        )}
        {fetchError && (
          <div className="mb-3 text-sm text-red-600">{fetchError}</div>
        )}
        <div className="space-y-2 text-gray-700">
          <div>
            <span className="font-semibold">Nama:</span> {user?.name || '—'}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user?.email || '—'}
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Kembali
          </button>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
