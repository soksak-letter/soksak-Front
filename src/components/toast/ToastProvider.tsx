import React, { createContext, useContext } from 'react';
import useToast from '@/hooks/useToast';

const ToastContext = createContext<ReturnType<typeof useToast> | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastState = useToast({
    duration: 3000,
    exitMs: 300,
  });

  return <ToastContext.Provider value={toastState}>{children}</ToastContext.Provider>;
}

export function useGlobalToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useGlobalToast must be used within ToastProvider');
  return ctx;
}
