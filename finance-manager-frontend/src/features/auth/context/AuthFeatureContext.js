import React, { createContext, useContext, useState } from 'react';

const AuthFeatureContext = createContext();

export function AuthFeatureProvider({ children }) {
  const [authState, setAuthState] = useState({ user: null, loading: false });
  // Add feature-specific logic here
  return (
    <AuthFeatureContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthFeatureContext.Provider>
  );
}

export function useAuthFeature() {
  return useContext(AuthFeatureContext);
}
