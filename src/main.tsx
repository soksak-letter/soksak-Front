import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { ToastProvider } from './components/toast/ToastProvider';
import GlobalToast from './components/toast/GlobalToast';
import { queryClient } from './api/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalToast />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ToastProvider>
  </StrictMode>,
);
