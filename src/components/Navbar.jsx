import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

export default function Navbar() {
  const { user, token } = useAuth();
  const isAuthed = Boolean(user || token);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur border-b border-gray-200 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left brand */}
        <Link to="/" className="text-amber-700 font-semibold tracking-wide">
          Haibah
        </Link>

        {/* Right user/login action */}
        {isAuthed ? (
          <Link
            to="/user"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            User
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-white bg-amber-700 hover:bg-amber-800 transition shadow"
          >
            Masuk
          </Link>
        )}
      </div>
    </nav>
  );
}
