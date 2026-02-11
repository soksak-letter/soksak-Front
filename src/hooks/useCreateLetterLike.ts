import { deleteLetterLike, postLetterLike } from '@/api/like';
import type { PublicFeedDetail } from '@/types/dto/feed';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const FEED_KEYS = ['other-public-feed', 'friend-public-feed'] as const;

type LikeContext = {
  snapshots: [readonly unknown[], PublicFeedDetail[] | undefined][];
};

function useOptimisticLike(
  mutationFn: (letterId: number) => Promise<unknown>,
  applyUpdate: (letter: PublicFeedDetail, letterId: number) => PublicFeedDetail,
) {
  const qc = useQueryClient();

  return useMutation<unknown, unknown, number, LikeContext>({
    mutationFn,
    onMutate: async (letterId) => {
      const snapshots: LikeContext['snapshots'] = [];

      for (const key of FEED_KEYS) {
        await qc.cancelQueries({ queryKey: [key] });

        const queries = qc.getQueriesData<PublicFeedDetail[]>({ queryKey: [key] });

        for (const [queryKey, data] of queries) {
          snapshots.push([queryKey, data]);

          if (data) {
            qc.setQueryData<PublicFeedDetail[]>(
              queryKey,
              data.map((l) => (l.id === letterId ? applyUpdate(l, letterId) : l)),
            );
          }
        }
      }

      return { snapshots };
    },
    onError: (_err, _letterId, ctx) => {
      if (!ctx) return;
      for (const [queryKey, data] of ctx.snapshots) {
        qc.setQueryData(queryKey, data);
      }
    },
    onSettled: () => {
      for (const key of FEED_KEYS) {
        qc.invalidateQueries({ queryKey: [key] });
      }
    },
  });
}

export function useCreateLike() {
  return useOptimisticLike(postLetterLike, (letter) => ({
    ...letter,
    isLiked: true,
    likes: letter.likes + 1,
  }));
}

export function useDeleteLike() {
  return useOptimisticLike(deleteLetterLike, (letter) => ({
    ...letter,
    isLiked: false,
    likes: Math.max(0, letter.likes - 1),
  }));
}
