import { useMemo } from 'react';

type ColorToken =
  | 'var(--color-primary-500)'
  | 'var(--color-primary-300)'
  | 'var(--color-grey-300)'
  | 'var(--color-grey-100)';

export type DayKey = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export type DaySegment = {
  percent: number;
  color: ColorToken;
};

export type WeeklyEmotionFlowItem = {
  day: DayKey;
  segments?: DaySegment[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalizeSegments(segments?: DaySegment[]) {
  const safe = Array.isArray(segments) ? segments : [];

  const order: Record<ColorToken, number> = {
    'var(--color-primary-500)': 0,
    'var(--color-primary-300)': 1,
    'var(--color-grey-300)': 2,
    'var(--color-grey-100)': 3,
  };

  const filtered = safe
    .filter((s) => (s?.percent ?? 0) > 0)
    .sort((a, b) => (order[a.color] ?? 999) - (order[b.color] ?? 999));

  let remain = 100;
  const out: DaySegment[] = [];
  for (const s of filtered) {
    if (remain <= 0) break;
    const use = Math.min(clamp(s.percent, 0, 100), remain);
    out.push({ ...s, percent: use });
    remain -= use;
  }
  return out;
}

const DAYS: DayKey[] = ['월', '화', '수', '목', '금', '토', '일'];

// 픽셀 높이 맞추는 유틸 함수
function calcSegmentHeights(
  segments: DaySegment[],
  maxBarH: number,
  gapPx: number,
  targetTotalPx = maxBarH - 1, // 꽉 찼을 때 119
) {
  const n = segments.length;
  if (n === 0) return [];

  // gap이 차지하는 높이만큼 실제 세그먼트가 쓸 수 있는 높이
  const available = Math.max(targetTotalPx - gapPx * (n - 1), 0);

  // 퍼센트 합 (정규화 때문에 보통 100이지만, 혹시 몰라)
  const sumPercent = segments.reduce((acc, s) => acc + (s.percent ?? 0), 0);
  if (sumPercent <= 0 || available <= 0) return new Array(n).fill(0);

  // 1) 각 세그먼트의 "실수 높이"
  const raws = segments.map((s) => (s.percent / sumPercent) * available);

  // 2) 일단 내림으로 픽셀 배정
  const base = raws.map((x) => Math.floor(x));

  // 3) 남은 픽셀을 소수점 큰 순서대로 분배
  let remaining = available - base.reduce((a, b) => a + b, 0);

  const fracIdx = raws
    .map((x, i) => ({ i, frac: x - Math.floor(x) }))
    .sort((a, b) => b.frac - a.frac);

  let p = 0;
  while (remaining > 0) {
    base[fracIdx[p % fracIdx.length].i] += 1;
    remaining -= 1;
    p += 1;
  }

  // 0% 아닌데 0px 되어버리는 애 최소 1px 보장 (가능하면)
  // 단, available이 아주 작을 때는 과할 수 있으니 안전 처리
  for (let i = 0; i < n; i++) {
    if (segments[i].percent > 0 && base[i] === 0 && available >= n) base[i] = 1;
  }

  // 만약 최소 1px 보정으로 합이 넘치면 다시 줄여서 맞춤
  let over = base.reduce((a, b) => a + b, 0) - available;
  if (over > 0) {
    // 큰 애부터 줄이기
    const idxBySize = base.map((h, i) => ({ i, h })).sort((a, b) => b.h - a.h);

    for (const { i } of idxBySize) {
      while (over > 0 && base[i] > 1) {
        base[i] -= 1;
        over -= 1;
      }
      if (over <= 0) break;
    }
  }

  return base;
}

export function WeeklyEmotionFlowCard({
  title = '주간 감정 흐름',
  subtitle = '요일별 감정 변화를 확인하세요',
  data,
  emptyText = '이번 주 감정 흐름 데이터가 아직 없어요',
}: {
  title?: string;
  subtitle?: string;
  data?: WeeklyEmotionFlowItem[];
  emptyText?: string;
}) {
  const map = useMemo(() => {
    const m = new Map<DayKey, DaySegment[]>();
    const safeData = Array.isArray(data) ? data : [];
    for (const item of safeData) {
      m.set(item.day, normalizeSegments(item.segments));
    }
    return m;
  }, [data]);

  const isAllEmpty = useMemo(() => {
    return DAYS.every((day) => {
      const segs = map.get(day) ?? [];
      return segs.reduce((acc, s) => acc + s.percent, 0) === 0;
    });
  }, [DAYS, map]);

  const MAX_BAR_H = 120;
  const BAR_W = 16;
  const R = 4;

  return (
    <section className='w-[343px] rounded-xl bg-[var(--color-bg-500)] p-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.06)]'>
      <header className='mb-3'>
        <h3 className='ty-title3 leading-[150%]'>{title}</h3>
        <p className='mt-1 ty-body5 leading-[150%] text-[var(--color-text-alternative)]'>
          {subtitle}
        </p>
      </header>

      {isAllEmpty ? (
        <div className='flex items-center justify-center' style={{ height: 120 }}>
          <p className='ty-body5 leading-[150%] text-[var(--color-text-alternative)]'>
            {emptyText}
          </p>
        </div>
      ) : (
        <div className='pt-2'>
          <div className='grid grid-cols-7 justify-items-center'>
            {DAYS.map((day) => {
              const segments = map.get(day) ?? [];
              const total = segments.reduce((acc, s) => acc + s.percent, 0);
              const hasData = total > 0;

              const GAP = 2;
              const pixelHeights = calcSegmentHeights(segments, MAX_BAR_H, GAP, MAX_BAR_H - 1);

              return (
                <div key={day} className='flex flex-col items-center'>
                  <div
                    className='relative flex flex-col-reverse justify-start gap-[2px]'
                    style={{ height: MAX_BAR_H, width: BAR_W }}
                  >
                    {segments.map((seg, idx) => {
                      const isBottom = idx === 0;
                      const isTop = idx === segments.length - 1;
                      const h = pixelHeights[idx];

                      const radius =
                        segments.length === 1
                          ? `${R}px`
                          : isTop
                            ? `${R}px ${R}px 0 0`
                            : isBottom
                              ? `0 0 ${R}px ${R}px`
                              : `0`;

                      return (
                        <div
                          key={`${day}-${idx}`}
                          style={{
                            height: h,
                            width: BAR_W,
                            backgroundColor: seg.color,
                            borderRadius: radius,
                          }}
                        />
                      );
                    })}
                  </div>

                  <div
                    className='mt-3 ty-body5'
                    style={{
                      color: hasData ? 'var(--color-text-default)' : 'var(--color-text-assistive)',
                    }}
                  >
                    {day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
