import React, { createContext, useContext, useRef } from 'react';

const DataCacheContext = createContext();

export function DataCacheProvider({ children }) {
  const cache = useRef({});
  const get = (key) => cache.current[key];
  const set = (key, value) => { cache.current[key] = value; };
  const clear = () => { cache.current = {}; };
  return (
    <DataCacheContext.Provider value={{ get, set, clear }}>
      {children}
    </DataCacheContext.Provider>
  );
}

export function useDataCache() {
  return useContext(DataCacheContext);
}
