import React, { createContext, useContext } from 'react';

const PermissionContext = createContext();

export function PermissionProvider({ user, children }) {
  // Example: user = { role: 'admin', permissions: ['view_dashboard', 'edit_invoice'] }
  const hasPermission = (perm) => user?.role === 'admin' || user?.permissions?.includes(perm);
  return (
    <PermissionContext.Provider value={{ hasPermission }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermission() {
  return useContext(PermissionContext);
}
