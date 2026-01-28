export type FontAsset = {
  label: string; // 화면 표시용
  fontFamily: string; // CSS에서 등록된 font-family 이름
  sampleKo: string;
  sampleEn: string;
};

export const DEFAULT_FONT_ID = 1;

export const FONT_ASSET_MAP: Record<number, FontAsset> = {
  1: {
    label: 'Pretendard',
    fontFamily: 'Pretendard, sans-serif',
    sampleKo: '3개월 후 나에게 보내보세요.',
    sampleEn: 'Try using Soksak letters',
  },
  2: {
    label: '나눔 비상체',
    fontFamily: 'NanumBiSang, sans-serif',
    sampleKo: '혹은 익명으로 편지를 나눠보세요.',
    sampleEn: 'Try using Soksak letters',
  },
  3: {
    label: '나눔 배은혜체',
    fontFamily: 'NanumBaeEunHye, cursive',
    sampleKo: '편지로 새로운 인연을 만나보세요.',
    sampleEn: 'Try using Soksak letters',
  },
  4: {
    label: '나눔 느릿느릿체',
    fontFamily: 'NanumNeuritNeurit, handwriting',
    sampleKo: '편지로 새로운 인연을 만나보세요.',
    sampleEn: 'Try using Soksak letters',
  },
};
