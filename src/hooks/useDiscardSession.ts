import { useMutation } from '@tanstack/react-query';
import { patchSessionStatus } from '@/api/stopConversation';

type Vars = { threadId: number };

export function useDiscardSession() {
  return useMutation({
    mutationFn: ({ threadId }: Vars) => patchSessionStatus(threadId),
  });
}
