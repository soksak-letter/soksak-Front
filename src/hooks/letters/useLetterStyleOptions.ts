import { getLetterStyleOptions } from '@/api/letters/deco';
import { useQuery } from '@tanstack/react-query';

export const letterStylekeys = {
  options: ['letterStyle', 'options'] as const,
};

export function useLetterStyleOptions() {
  return useQuery({
    queryKey: letterStylekeys.options,
    queryFn: getLetterStyleOptions,
  });
}
