import type { WeeklyReportEmotions } from '@/types/dto/weeklyReport';
import type {
  WeeklyEmotionFlowItem,
  DayKey,
} from '@/components/WeeklyReport/WeeklyEmotionFlowCard';

type ColorToken =
  | 'var(--color-primary-500)'
  | 'var(--color-primary-300)'
  | 'var(--color-grey-300)'
  | 'var(--color-grey-100)';

const DAY_MAP: Array<{ key: keyof Omit<WeeklyReportEmotions, 'TOTAL'>; day: DayKey }> = [
  { key: 'MON', day: '월' },
  { key: 'TUE', day: '화' },
  { key: 'WED', day: '수' },
  { key: 'THU', day: '목' },
  { key: 'FRI', day: '금' },
  { key: 'SAT', day: '토' },
  { key: 'SUN', day: '일' },
];

const TOP_COLORS: ColorToken[] = [
  'var(--color-primary-500)',
  'var(--color-primary-300)',
  'var(--color-grey-300)',
];

function normalizeRatioToUnit(v: number): number {
  if (!Number.isFinite(v) || v <= 0) return 0;
  return v <= 1 ? v : v / 100;
}

// function toPercent(ratio: number) {
//   const unit = normalizeRatioToUnit(ratio);
//   return Math.round(unit * 100);
// }

export function mapWeeklyEmotionFlow(
  emotions?: WeeklyReportEmotions | null,
): WeeklyEmotionFlowItem[] {
  return DAY_MAP.map(({ key, day }) => {
    const list = emotions?.[key] ?? [];

    const top3 = [...list]
      .map((x) => ({ emotion: x.emotion, ratio: normalizeRatioToUnit(x.ratio) }))
      .filter((x) => x.ratio > 0)
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 3);

    const segments = top3
      .map((e, idx) => ({
        percent: Math.min(100, Math.max(0, Math.round(e.ratio * 100))),
        color: TOP_COLORS[idx] ?? 'var(--color-grey-100)',
      }))
      .filter((s) => s.percent > 0);

    return { day, segments };
  });
}
