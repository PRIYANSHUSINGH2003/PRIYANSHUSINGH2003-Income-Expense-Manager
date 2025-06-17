import React, { createContext, useContext, useState, useEffect } from 'react';

const GuestAccessContext = createContext();

export function GuestAccessProvider({ children, isLoggedIn }) {
  const [interactions, setInteractions] = useState(() => Number(localStorage.getItem('guestInteractions')) || 0);
  const limit = isLoggedIn ? 5 : 3;

  useEffect(() => {
    localStorage.setItem('guestInteractions', interactions);
  }, [interactions]);

  const increment = () => setInteractions(i => i + 1);
  const reset = () => setInteractions(0);

  return (
    <GuestAccessContext.Provider value={{ interactions, limit, increment, reset }}>
      {children}
    </GuestAccessContext.Provider>
  );
}

export function useGuestAccess() {
  return useContext(GuestAccessContext);
}
