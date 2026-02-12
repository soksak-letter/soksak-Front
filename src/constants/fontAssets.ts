export type FontStyle = {
  titleSize: number;
  bodySize: number;
  lineHeight: number;
  letterSpacing?: number;
};

export type FontAsset = {
  label: string; // 화면 표시용
  fontFamily: string; // CSS에서 등록된 font-family 이름
  sampleKo: string;
  sampleEn: string;
  style: FontStyle;
};

export const DEFAULT_FONT_ID = 1;

export const FONT_ASSET_MAP: Record<number, FontAsset> = {
  1: {
    label: 'Pretendard',
    fontFamily: 'Pretendard',
    sampleKo: '3개월 후 나에게 보내보세요.',
    sampleEn: 'Try using Soksak letters',
    style: {
      titleSize: 13,
      bodySize: 11,
      lineHeight: 1.8,
    },
  },
  2: {
    label: '나눔 비상체',
    fontFamily: 'NanumBiSang',
    sampleKo: '혹은 익명으로 편지를 나눠보세요.',
    sampleEn: 'Try using Soksak letters',
    style: {
      titleSize: 18,
      bodySize: 15,
      lineHeight: 1.5,
    },
  },
  3: {
    label: '나눔 배은혜체',
    fontFamily: 'NanumBaeEunHye',
    sampleKo: '편지로 새로운 인연을 만나보세요.',
    sampleEn: 'Try using Soksak letters',
    style: {
      titleSize: 17,
      bodySize: 15,
      lineHeight: 1.55,
    },
  },
  4: {
    label: '나눔 바른히피체',
    fontFamily: 'NanumBarunHipi',
    sampleKo: '3개월 후 나에게 보내보세요.',
    sampleEn: 'Try using Soksak letters',
    style: {
      titleSize: 15,
      bodySize: 13,
      lineHeight: 1.7,
    },
  },
  5: {
    label: '나눔 아빠글씨체',
    fontFamily: 'NanumAbbaGeulsi',
    sampleKo: '혹은 익명으로 편지를 나눠보세요.',
    sampleEn: 'Try using Soksak letters',
    style: {
      titleSize: 16,
      bodySize: 14,
      lineHeight: 1.6,
    },
  },
  6: {
    label: '나눔 바른펜체',
    fontFamily: 'NanumBarunpen',
    sampleKo: '편지로 새로운 인연을 만나보세요.',
    sampleEn: 'Try using Soksak letters',
    style: {
      titleSize: 13,
      bodySize: 11,
      lineHeight: 1.8,
    },
  },
  7: {
    label: '나눔 손글씨 다행체',
    fontFamily: 'NanumDaheng',
    sampleKo: '3개월 후 나에게 보내보세요.',
    sampleEn: 'Try using Soksak letters',
    style: {
      titleSize: 15,
      bodySize: 13,
      lineHeight: 1.6,
    },
  },
  8: {
    label: '나눔 손글씨 느릿느릿체',
    fontFamily: 'NanumNeuritNeurit',
    sampleKo: '혹은 익명으로 편지를 나눠보세요.',
    sampleEn: 'Try using Soksak letters',
    style: {
      titleSize: 18,
      bodySize: 15,
      lineHeight: 1.5,
    },
  },
};
