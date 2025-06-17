import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  // Example global state
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);

  // Example: add notification
  const addNotification = (message, type = 'info') => {
    setNotifications((prev) => [...prev, { message, type, id: Date.now() }]);
  };
  // Example: remove notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      theme, setTheme,
      notifications, addNotification, removeNotification
    }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for easy access
export function useAppContext() {
  return useContext(AppContext);
}
