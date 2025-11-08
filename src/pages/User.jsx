import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import * as authServices from '../services/authServices';
import * as historyServices from '../services/historyServices.jsx';
import Navbar from '../components/Navbar.jsx';

export default function User() {
  const { user, token, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [uid, setUid] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (token) {
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
          setUid(id);
          if (!user) {
            const res = await authServices.getUserById(id, token);
            const profile = res?.data || res;
            if (profile) setUser(profile);
          }
        } catch (e) {
          console.error('Fetch user error:', e);
          setFetchError(e?.message || 'Gagal memuat data pengguna');
          
        } finally {
          setFetching(false);
        }
      })();
    }
  }, [user, token, navigate, setUser, logout]);

  useEffect(() => {
    if (!token || !uid) return;
    (async () => {
      setHistoryLoading(true);
      setHistoryError(null);
      try {
        const res = await historyServices.getHistoryByUserId(uid, token);
        const list = (res?.data || res || []).map((item) => ({
          id: item.id,
          species: item.prediction_result || item.hasil || item.result || 'unknown',
          number: item.number_prediction ?? null,
          createdAt: item.createdAt || new Date().toISOString(),
        }));
        setHistory(list.reverse().slice(0, 50));
      } catch (e) {
        setHistory([]);
        setHistoryError(e?.message || 'Gagal memuat riwayat');
      } finally {
        setHistoryLoading(false);
      }
    })();
  }, [token, uid]);

  if (!token) return null;

  const clearAllCookies = () => {
    try {
      const cookies = document.cookie.split(';');
      for (const c of cookies) {
        const eqPos = c.indexOf('=');
        const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
        if (!name) continue;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        const domain = window.location.hostname;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${domain}`;
      }
    } catch (e) {
    }
  };

  const handleLogout = () => {
    const ok = window.confirm('Apa Anda yakin ingin keluar?');
    if (!ok) return;
    clearAllCookies();
    logout();
    navigate('/');
  };

  return (
    <>
    <Navbar />
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 pt-20">
      
  <div className="relative h-32 bg-linear-to-r from-gray-700 via-gray-600 to-gray-700">
        
        <div className="absolute -bottom-12 left-8">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
            <div className="w-full h-full bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <span className="text-3xl font-bold text-amber-700">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        <div className="mb-6">
          {fetching && (
            <div className="mb-2 text-sm text-gray-600">Memuat data pengguna...</div>
          )}
          {fetchError && (
            <div className="mb-2 text-sm text-red-600">{fetchError}</div>
          )}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {user?.name || 'Pengguna'}
          </h1>
          <p className="text-gray-600 text-sm">{user?.email || '—'}</p>
        </div>

        
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6 text-sm">
            <button className="pb-3 border-b-2 border-amber-600 text-amber-600 font-medium">
              Riwayat Prediksi
            </button>
            
          </div>
        </div>

        
        <div className="bg-white rounded-lg shadow">
          
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Riwayat Prediksi Kopi</h2>
            <p className="text-sm text-gray-500 mt-1">Kelola riwayat prediksi kopi Anda</p>
          </div>

          
          {historyLoading && (
            <div className="p-6 text-sm text-gray-600">Memuat riwayat prediksi...</div>
          )}
          {historyError && (
            <div className="mx-6 mt-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              {historyError}
            </div>
          )}

          
          {!historyLoading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Prediksi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spesies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skor Prediksi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((h, idx) => (
                    <tr key={`${h.id}-${idx}`} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{h.id || idx + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(h.createdAt).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${String(h.species).toLowerCase() === 'arabica' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}`}>
                          {String(h.species).toLowerCase() === 'arabica' ? 'Arabica' : 'Robusta'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {h.number ?? '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                          Selesai
                        </span>
                      </td>
                    </tr>
                  ))}
                  {history.length === 0 && !historyLoading && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <svg className="mx-auto h-12 w-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-sm font-medium text-gray-500">Belum ada riwayat prediksi</p>
                          <p className="text-xs text-gray-400 mt-1">Prediksi Anda akan muncul di sini</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
          >
            Kembali
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
    </>
  );
}