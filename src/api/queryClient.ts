import { QueryClient } from '@tanstack/react-query';

// 인스턴스를 밖으로 내보냄(export)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: false,
    },
  },
});
