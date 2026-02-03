import { axiosInstance } from '@/api/axios';
import type { PatchSessionStatusResponse } from '@/types/dto/stopConversation';

export const patchSessionStatus = async (threadId: number) => {
  const { data } = await axiosInstance.patch<PatchSessionStatusResponse>(
    `/matching/sessions/${threadId}/discards`,
  );
  return data;
};
