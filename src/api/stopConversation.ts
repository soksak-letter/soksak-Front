import { axiosInstance } from '@/api/axios';

export const patchSessionStatus = async (threadId: number) => {
  const { data } = await axiosInstance.patch(`/matching/sessions/${threadId}/discards`);
  return data;
};
