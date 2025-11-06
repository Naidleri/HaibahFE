import React, { useState } from 'react';
import { Coffee, Sparkles, Zap, Candy, Wine } from 'lucide-react';
import { useAuth } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

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

  const predictSpecies = () => {
    // Simulasi prediksi berdasarkan input
    const values = Object.values(formData);
    const allFilled = values.every(v => v !== '');
    
    if (!allFilled) {
      alert('Mohon isi semua karakteristik kopi!');
      return;
    }

    const avg = values.reduce((sum, v) => sum + parseFloat(v), 0) / values.length;
    
    let species = '';
    let confidence = 0;
    
    if (avg >= 8) {
      species = 'Arabica Premium';
      confidence = 95;
    } else if (avg >= 6.5) {
      species = 'Arabica';
      confidence = 88;
    } else if (avg >= 5) {
      species = 'Robusta';
      confidence = 82;
    } else {
      species = 'Liberica';
      confidence = 75;
    }
    
    setResult({ species, confidence, average: avg.toFixed(1) });
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center p-4 pt-20" style={{
      background: 'linear-gradient(135deg, #c9a884 0%, #d4a574 50%, #b8956a 100%)'
    }}>
      <div className="w-full max-w-2xl bg-gradient-to-br from-amber-700 to-amber-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600/50 rounded-full mb-4">
            <Coffee className="w-8 h-8 text-amber-100" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Klasifikasi Spesies Kopi
          </h1>
          <p className="text-amber-100 text-sm max-w-lg mx-auto">
            Masukkan karakteristik kopi untuk memprediksi spesiesnya dengan akurasi tinggi dengan menggunakan angka 1 - 10
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-t-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Aroma
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={formData.aroma}
                onChange={(e) => handleInputChange('aroma', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-gray-900 placeholder-gray-500"
                placeholder="1-10"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Coffee className="w-4 h-4 text-amber-600" />
                Flavor
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={formData.flavor}
                onChange={(e) => handleInputChange('flavor', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-gray-900 placeholder-gray-500"
                placeholder="1-10"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Wine className="w-4 h-4 text-pink-500" />
                Aftertaste
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={formData.aftertaste}
                onChange={(e) => handleInputChange('aftertaste', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-gray-900 placeholder-gray-500"
                placeholder="1-10"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Acidity
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={formData.acidity}
                onChange={(e) => handleInputChange('acidity', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-gray-900 placeholder-gray-500"
                placeholder="1-10"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Candy className="w-4 h-4 text-red-500" />
                Sweetness
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={formData.sweetness}
                onChange={(e) => handleInputChange('sweetness', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-gray-900 placeholder-gray-500"
                placeholder="1-10"
              />
            </div>
          </div>
          <button
            onClick={predictSpecies}
            disabled={!isAuthed}
            className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-amber-600/70 disabled:cursor-not-allowed disabled:hover:bg-amber-600/70 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            Prediksi Spesies Kopi
          </button>
          {!isAuthed && (
            <p className="mt-2 text-sm text-red-600 text-center">
              Anda perlu login untuk memprediksi.{' '}
              <Link to="/login" className="text-amber-700 hover:text-amber-800 underline">Masuk</Link>
            </p>
          )}
          {result && (
            <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 animate-fadeIn">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-600 rounded-full mb-3">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">
                  {result.species}
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span className="bg-white px-3 py-1 rounded-full">
                    Confidence: <strong>{result.confidence}%</strong>
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full">
                    Average Score: <strong>{result.average}</strong>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}