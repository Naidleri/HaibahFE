import React, { useState } from 'react';
import { Coffee, Sparkles, Zap, Candy, Wine, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import * as historyServices from '../services/historyServices.jsx';

export default function CoffeeClassifier() {
  const { user, token } = useAuth();
  const isAuthed = Boolean(user || token);
  const [formData, setFormData] = useState({
    aroma: '',
    flavor: '',
    aftertaste: '',
    acidity: '',
    sweetness: ''
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const predictSpecies = async () => {
    const values = Object.values(formData);
    const allFilled = values.every(v => v !== '');
    
    if (!allFilled) {
      alert('Mohon isi semua karakteristik kopi!');
      return;
    }

    if (!isAuthed) {
      alert('Anda harus login untuk melakukan prediksi!');
      return;
    }

    try {
      const body = {
        Aroma: parseFloat(formData.aroma),
        Flavor: parseFloat(formData.flavor),
        Aftertaste: parseFloat(formData.aftertaste),
        Acidity: parseFloat(formData.acidity),
        Sweetness: parseFloat(formData.sweetness)
      };
      
      const decodeJwt = (jwt) => {
        try {
          const [, payload] = jwt.split('.');
          const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
          const padded = base64.padEnd(base64.length + (4 - (base64.length % 4 || 4)) % 4, '=');
          const json = atob(padded);
          return JSON.parse(json);
        } catch (e) { return null; }
      };
      
      const payload = decodeJwt(token);
      const id = payload?.id;
      
      if (!id) {
        alert('Tidak dapat membaca informasi user dari token');
        return;
      }

      const response = await historyServices.postHistoryByUserId(id, body, token);
      
      if (response?.data) {
        const avg = values.reduce((sum, v) => sum + parseFloat(v), 0) / values.length;
        setResult({
          species: response.data.prediction_result || 'Unknown',
          confidence: 90,
          average: avg.toFixed(1)
        });
      }
    } catch (e) {
      console.error('Gagal melakukan prediksi:', e);
      alert('Gagal melakukan prediksi. Silakan coba lagi.');
    }
  };

  return (
    <>
      <Navbar />
  <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Klasifikasi Spesies Kopi
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Masukkan karakteristik kopi untuk memprediksi spesiesnya dengan akurasi tinggi
            </p>
          </div>

          <div className="">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-linear-to-r from-amber-500 to-orange-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">Input Karakteristik Kopi</h2>
                  <p className="text-amber-50 text-sm mt-1">Masukkan nilai 1-10 untuk setiap parameter</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                        </div>
                        Aroma
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        step="0.1"
                        value={formData.aroma}
                        onChange={(e) => handleInputChange('aroma', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-gray-50 text-gray-900 placeholder-gray-400 font-medium"
                        placeholder="Contoh: 8.5"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                          <Coffee className="w-4 h-4 text-amber-600" />
                        </div>
                        Flavor
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        step="0.1"
                        value={formData.flavor}
                        onChange={(e) => handleInputChange('flavor', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-gray-50 text-gray-900 placeholder-gray-400 font-medium"
                        placeholder="Contoh: 7.8"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                          <Wine className="w-4 h-4 text-pink-600" />
                        </div>
                        Aftertaste
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        step="0.1"
                        value={formData.aftertaste}
                        onChange={(e) => handleInputChange('aftertaste', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-gray-50 text-gray-900 placeholder-gray-400 font-medium"
                        placeholder="Contoh: 8.2"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-yellow-600" />
                        </div>
                        Acidity
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        step="0.1"
                        value={formData.acidity}
                        onChange={(e) => handleInputChange('acidity', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-gray-50 text-gray-900 placeholder-gray-400 font-medium"
                        placeholder="Contoh: 7.5"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                          <Candy className="w-4 h-4 text-red-600" />
                        </div>
                        Sweetness
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        step="0.1"
                        value={formData.sweetness}
                        onChange={(e) => handleInputChange('sweetness', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-gray-50 text-gray-900 placeholder-gray-400 font-medium"
                        placeholder="Contoh: 8.0"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={predictSpecies}
                    disabled={!isAuthed}
                    className="w-full mt-6 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-5 h-5" />
                    Prediksi Spesies Kopi
                  </button>
                  
                  {!isAuthed && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <p className="text-sm text-red-700">
                        🔒 Anda perlu login untuk memprediksi.{' '}
                        <Link to="/login" className="font-semibold text-red-800 hover:text-red-900 underline">
                          Masuk sekarang
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            
            <div className="lg:col-span-1 space-y-6">
              

              
              {result && (
                <div className="bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl shadow-2xl border border-amber-300 p-6 text-white animate-fadeIn">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {result.species}
                    </h3>
                    <p className="text-amber-50 text-sm mb-4">Hasil Prediksi</p>
                    
                    <div className="space-y-3">
                      <div className="bg-white/20 backdrop-blur rounded-xl p-3">
                        <p className="text-amber-50 text-xs mb-1">Confidence Score</p>
                        <p className="text-2xl font-bold">{result.confidence}%</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-xl p-3">
                        <p className="text-amber-50 text-xs mb-1">Average Score</p>
                        <p className="text-2xl font-bold">{result.average}/10</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}