import { axiosInstance } from '@/api/axios';
import type { CommonResponse } from '@/types/dto/common';
import type {
  CreateSelfLetterBody,
  CreateSelfLetterResult,
} from '@/types/dto/letters/sendSelfLetter';

export async function postCreateSelfLetter(
  body: CreateSelfLetterBody,
): Promise<CreateSelfLetterResult> {
  const res = await axiosInstance.post('/letter/me', body);

  const data = res.data as CommonResponse<CreateSelfLetterResult>;

  if (data.resultType !== 'SUCCESS') {
    throw (
      data.error ?? {
        errorCode: 'SELF_LETTER_CREATE_FAIL',
        reason: '편지 전송에 실패했어요. 잠시 후 다시 시도해주세요.',
        data: null,
      }
    );
  }

  return data.success;
}
