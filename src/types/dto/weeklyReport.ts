// src/types/dto/weeklyReport.ts

export type WeeklyReportKeyword = {
  keyword: string;
  count: number;
};

export type WeeklyReportEmotionItem = {
  emotion: string;
  ratio: number; // 0~1
};

export type WeeklyReportEmotions = {
  TOTAL: WeeklyReportEmotionItem[];
  MON: WeeklyReportEmotionItem[];
  TUE: WeeklyReportEmotionItem[];
  WED: WeeklyReportEmotionItem[];
  THU: WeeklyReportEmotionItem[];
  FRI: WeeklyReportEmotionItem[];
  SAT: WeeklyReportEmotionItem[];
  SUN: WeeklyReportEmotionItem[];
};

export type WeeklyReportHighlight = {
  letterId: number;
};

export type WeeklyReport = {
  id: number;
  userId: number;
  nickname: string;
  month: number;
  week: number;
  summaryText: string;
  generatedAt: string; // ISO
};

export type WeeklyReportData = {
  report: WeeklyReport;
  keywords: WeeklyReportKeyword[];
  emotions: WeeklyReportEmotions;
  highlights: WeeklyReportHighlight[];
};

/** GET /weekly/reports success payload (success 내부) */
export type WeeklyReportSuccessPayload = {
  message: string;
  result: { data: WeeklyReportData };
};

/** ✅ GET /letters/{id} success payload (디자인 포함 상세) */
export type GetLetterSuccess = {
  id: number;
  senderUserId?: number;
  receiverUserId?: number;

  title: string;
  content: string;
  deliveredAt: string | null;
  createdAt?: string;

  isPublic?: boolean;
  status?: string;

  aiKeywords?: Array<{
    keyword?: string;
    name?: string;
  }>;

  design: {
    paper: { id: number; color?: string; name?: string; assetUrl?: string };
    stamp?: { id: number; name?: string; assetUrl?: string };
    font?: { id: number; font?: string; name?: string; assetUrl?: string };
  };
};

/**
 * ✅ GET /letters/keywords/{aiKeyword}
 * 서버가 "목록에 무엇을 담아주느냐"가 불확실하니까
 * 1) 최소: id만 오는 케이스
 * 2) 풍부: title/deliveredAt/design까지 오는 케이스
 * 둘 다 대응 가능하게 유연 DTO로 둔다.
 */
export type LettersByKeywordItem = {
  // 최소
  id: number;

  // 있을 수도
  title?: string;
  deliveredAt?: string | null;
  createdAt?: string;

  // 디자인이 목록에 올 수도/안 올 수도
  design?: {
    paper?: { id: number; color?: string; name?: string; assetUrl?: string };
    stamp?: { id: number; name?: string; assetUrl?: string };
    font?: { id: number; font?: string; name?: string; assetUrl?: string };
  };

  // 혹시 paperId만 오는 변형 대응
  paperId?: number;
};

export type LettersByKeywordSuccessPayload = {
  message: string;
  result: { data: LettersByKeywordItem[] };
};
