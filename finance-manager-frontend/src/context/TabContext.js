import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export function TabProvider({ initial = 0, children }) {
  const [activeTab, setActiveTab] = useState(initial);
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  return useContext(TabContext);
}
