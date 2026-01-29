import { axiosInstance } from '@/api/axios';
import type { CommonResponse } from '@/types/dto/common';
import type { CreateLetterBody, CreateLetterResult } from '@/types/dto/sendLetter';

export async function postCreateLetter(body: CreateLetterBody): Promise<CreateLetterResult> {
  const res = await axiosInstance.post('/letter/other', body);

  const data = res.data as CommonResponse<CreateLetterResult>;

  if (data.resultType !== 'SUCCESS') {
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
