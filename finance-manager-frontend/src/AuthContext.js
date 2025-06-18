import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { api } from './utils/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Use environment variable for API base URL
  // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (token) {
      // Fetch user profile from backend for latest info (including profileImage)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/profile')
        .then(res => setUser(res))
        .catch(() => setUser(null));
    } else {
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    const res = await api.post('/login', { username, password });
    setToken(res.token);
    localStorage.setItem('token', res.token);
    setUser(res.user); // user includes username, role, profileImage
  };

  const register = async (username, password, role = 'user') => {
    await api.post('/register', { username, password, role });
  };

  const updateProfileImage = async (file) => {
    if (!user) return;
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('username', user.username);
    const res = await api.post('/profile/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setUser(prev => ({ ...prev, profileImage: res.profileImage }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, updateProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
}
