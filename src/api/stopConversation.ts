import { axiosInstance } from '@/api/axios';
import type { PatchSessionStatusResponse } from '@/types/dto/stopConversation';

export const patchSessionStatus = async (sessionId: number) => {
  const { data } = await axiosInstance.patch<PatchSessionStatusResponse>(
    `/matching/sessions/${sessionId}/discards`,
  );
  return data;
};
