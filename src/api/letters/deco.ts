import type {
  LetterStyleOptionsResponse,
  LetterStyleOptionsSuccess,
} from '@/types/dto/letters/deco';
import { axiosInstance } from '../axios';

export async function getLetterStyleOptions(): Promise<LetterStyleOptionsSuccess> {
  const { data } = await axiosInstance.get<LetterStyleOptionsResponse>('/letter-assets');

  if (data.resultType !== 'SUCCESS' || !data.success) {
    throw (
      data.error ?? {
        errorCode: 'LETTER_STYLE_FAIL',
        reason: '꾸미기 옵션을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
        data: {},
      }
    );
  }
  return data.success;
}
