import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Fetch user profile from backend for latest info (including profileImage)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${API_BASE_URL}/profile`)
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    const res = await axios.post(`${API_BASE_URL}/login`, { username, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user); // user includes username, role, profileImage
  };

  const register = async (username, password, role = 'user', email) => {
  await axios.post(`${API_BASE_URL}/register`, { username, password, role, email });
  };

  const updateProfileImage = async (file) => {
    if (!user) return;
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('username', user.username);
    const res = await axios.post(`${API_BASE_URL}/profile/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setUser(prev => ({ ...prev, profileImage: res.data.profileImage }));
    return res.data;
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
