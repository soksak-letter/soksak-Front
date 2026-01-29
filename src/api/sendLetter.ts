import { axiosInstance } from '@/api/axios';
import type { CommonResponse } from '@/types/dto/common';
import type { CreateLetterBody, CreateLetterResult } from '@/types/dto/sendLetter';

export async function postCreateLetter(body: CreateLetterBody): Promise<CreateLetterResult> {
  console.log('[API] postCreateLetter body', body);

  const res = await axiosInstance.post('/letter/other', body);

  console.log('[API] raw response', res.status, res.data);

  const data = res.data as CommonResponse<CreateLetterResult>;
  console.log('[API] parsed', data);

  if (data.resultType !== 'SUCCESS' || !data.success) {
    console.log('[API] throwing because business fail', data);
    throw (
      data.error ?? {
        errorCode: 'LETTER_CREATE_FAIL',
        reason: '편지 전송에 실패했어요. 잠시 후 다시 시도해주세요.',
        data: null,
      }
    );
  }

  return data.success;
}
