import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Example login/logout (replace with real API calls)
  const login = async (username, password) => {
    setLoading(true);
    // ...API call here
    setUser({ username });
    setLoading(false);
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
