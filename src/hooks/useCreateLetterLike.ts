import { deleteLetterLike, postLetterLike } from '@/api/like';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (letterId: number) => postLetterLike(letterId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['other-public-feed'] });
      qc.invalidateQueries({ queryKey: ['friend-public-feed'] });
    },
  });
}

export function useDeleteLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (letterId: number) => deleteLetterLike(letterId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['other-public-feed'] });
      qc.invalidateQueries({ queryKey: ['friend-public-feed'] });
    },
  });
}
