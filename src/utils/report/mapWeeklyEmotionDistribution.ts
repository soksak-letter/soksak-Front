import type { WeeklyReportEmotions } from '@/types/dto/weeklyReport';
import type { EmotionSlice } from '@/components/WeeklyReport/WeeklyEmotionDistributionCard';

function normalizeRatioToUnit(v: number): number {
  if (!Number.isFinite(v) || v <= 0) return 0;
  // 0~1이면 그대로, 1보다 크면 0~100로 간주하고 /100
  return v <= 1 ? v : v / 100;
}

export function mapWeeklyEmotionDistribution(
  emotions?: WeeklyReportEmotions | null,
): EmotionSlice[] {
  const total = emotions?.TOTAL ?? [];
  if (total.length === 0) return [];

  const normalized = total
    .map((x) => ({ emotion: x.emotion, ratio: normalizeRatioToUnit(x.ratio) }))
    .filter((x) => x.ratio > 0);

  if (normalized.length === 0) return [];

  const sorted = [...normalized].sort((a, b) => b.ratio - a.ratio);

  const top3 = sorted.slice(0, 3);
  const otherSum = sorted.slice(3).reduce((acc, cur) => acc + cur.ratio, 0);

  const out: EmotionSlice[] = top3.map((x) => ({
    key: x.emotion,
    label: x.emotion,
    value: x.ratio,
    color: '',
  }));

  if (otherSum > 0) {
    out.push({ key: 'OTHER', label: '기타', value: otherSum, color: '' });
  }

  // 혹시 합이 0.000... 같은 케이스 방지
  const sum = out.reduce((acc, cur) => acc + cur.value, 0);
  return sum > 0 ? out : [];
}
