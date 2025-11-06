import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authServices from '../services/authServices';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      // Optionally fetch user info with token
      // If backend returns user inside token or on /api/user/me, implement here.
      // For now, store token and keep user null until login/register populates it.
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  async function login({ email, password }) {
    setLoading(true);
    try {
      const data = await authServices.loginService({ email, password });
      // Expect data: { message, data: user, token }
      if (data?.token) {
        setToken(data.token);
      }
      if (data?.data) setUser(data.data);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  async function register({ name, email, password }) {
    setLoading(true);
    try {
      const data = await authServices.registerService({ name, email, password });
      // After registration, do not auto-login; ask user to login explicitly
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
