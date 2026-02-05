import { useMutation } from '@tanstack/react-query';
import { patchSessionStatus } from '@/api/stopConversation';

type Vars = { sessionId: number };

export function useDiscardSession() {
  return useMutation({
    mutationFn: ({ sessionId }: Vars) => patchSessionStatus(sessionId),
  });
}
