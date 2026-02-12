import { getLettersByKeyword } from '@/api/weeklyReport';
import { useQuery } from '@tanstack/react-query';

type UnknownRecord = Record<string, unknown>;

const isRecord = (v: unknown): v is UnknownRecord => typeof v === 'object' && v !== null;

const isArray = <T = unknown>(v: unknown): v is T[] => Array.isArray(v);

function extractKeywordList<T = unknown>(res: unknown): T[] {
  if (!isRecord(res)) return [];

  const success = res.success;
  if (isRecord(success)) {
    const data = success.data;

    // 케이스1: success.data.letters
    if (isRecord(data) && isArray<T>(data.letters)) return data.letters;

    // 케이스2: success.data 자체가 배열
    if (isArray<T>(data)) return data;
  }

  // 케이스3: res.data.letters
  const data = res.data;
  if (isRecord(data) && isArray<T>(data.letters)) return data.letters;

  // 케이스4: res.data 자체가 배열
  if (isArray<T>(data)) return data;

  return [];
}

export function useLettersByKeyword(aiKeyword: string) {
  return useQuery({
    queryKey: ['lettersByKeyword', aiKeyword],
    queryFn: async () => {
      const res = await getLettersByKeyword(aiKeyword);

      const list = extractKeywordList(res);
      return { raw: res, list };
    },
    enabled: Boolean(aiKeyword),
    staleTime: 1000 * 60,
    retry: 0,
  });
}
