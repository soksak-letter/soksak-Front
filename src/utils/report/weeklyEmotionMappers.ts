import type { WeeklyReportEmotions, WeeklyReportEmotionItem } from '@/types/dto/weeklyReport';

export type DonutSegment = {
  emotion: string;
  ratio: number; // 0~1
};

// 요일 라벨(컴포넌트에 '월'~'일'로 내려주기 위함)
const WEEK_DAYS: Array<{ key: keyof Omit<WeeklyReportEmotions, 'TOTAL'>; label: string }> = [
  { key: 'MON', label: '월' },
  { key: 'TUE', label: '화' },
  { key: 'WED', label: '수' },
  { key: 'THU', label: '목' },
  { key: 'FRI', label: '금' },
  { key: 'SAT', label: '토' },
  { key: 'SUN', label: '일' },
];

const sortDesc = (list: WeeklyReportEmotionItem[]) => [...list].sort((a, b) => b.ratio - a.ratio);

/** 도넛: TOTAL -> 상위3 + 기타(나머지 합) */
export function buildWeeklyDonutSegments(
  emotions?: WeeklyReportEmotions | null,
  topN: number = 3,
): DonutSegment[] {
  const total = emotions?.TOTAL ?? [];
  if (total.length === 0) return [];

  const sorted = sortDesc(total);
  const top = sorted.slice(0, topN).map((x) => ({ emotion: x.emotion, ratio: x.ratio }));
  const otherRatio = sorted.slice(topN).reduce((acc, cur) => acc + cur.ratio, 0);

  if (otherRatio > 0) top.push({ emotion: '기타', ratio: otherRatio });
  return top;
}

/**
 * 막대: 요일별 top3 스택
 * - 반환 타입은 네 WeeklyEmotionFlowCard가 원하는 형태로 마지막 map에서 맞추면 됨.
 * - 여기서는 'day'와 'segments'를 만들고, segments에 emotion/ratio를 넣는다.
 */
export type WeeklyFlowSegment = { emotion: string; ratio: number };
export type WeeklyFlowItem = { day: string; segments: WeeklyFlowSegment[] };

export function buildWeeklyFlowItems(
  emotions?: WeeklyReportEmotions | null,
  topN: number = 3,
): WeeklyFlowItem[] {
  return WEEK_DAYS.map(({ key, label }) => {
    const list = emotions?.[key] ?? [];
    const top = sortDesc(list).slice(0, topN);

    return {
      day: label,
      segments: top.map((x) => ({ emotion: x.emotion, ratio: x.ratio })),
    };
  });
}
