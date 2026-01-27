import { useMemo } from 'react';

type ColorToken =
  | 'var(--color-primary-500)'
  | 'var(--color-primary-300)'
  | 'var(--color-grey-300)'
  | 'var(--color-grey-100)';

export type DayKey = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export type DaySegment = {
  /** 0~100 */
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

  // 색상 우선순위: 아래(바닥)로 갈수록 우선순위 높음
  const order: Record<ColorToken, number> = {
    'var(--color-primary-500)': 0, // 항상 아래
    'var(--color-primary-300)': 1,
    'var(--color-grey-300)': 2,
    'var(--color-grey-100)': 3, // 가장 위
  };

  // 1) 0 이하 제거
  const filtered = safe
    .filter((s) => (s?.percent ?? 0) > 0)
    // 아래→위로 쌓일 순서로 정렬 (primary-500 먼저)
    .sort((a, b) => (order[a.color] ?? 999) - (order[b.color] ?? 999));

  // 2) 합이 100 넘어가면 앞에서부터 100까지만 사용
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

export function WeeklyEmotionFlowCard({
  title = '주간 감정 흐름',
  subtitle = '요일별 감정 변화를 확인하세요',
  data,
}: {
  title?: string;
  subtitle?: string;
  data?: WeeklyEmotionFlowItem[]; // data 자체도 없을 수 있으니 optional
}) {
  const DAYS: DayKey[] = ['월', '화', '수', '목', '금', '토', '일'];

  const map = useMemo(() => {
    const m = new Map<DayKey, DaySegment[]>();
    const safeData = Array.isArray(data) ? data : [];

    for (const item of safeData) {
      m.set(item.day, normalizeSegments(item.segments));
    }
    return m;
  }, [data]);

  // 막대 영역 높이
  const MAX_BAR_H = 120;
  const BAR_W = 16;
  const R = 4;

  return (
    <section className='w-[343px] rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'>
      <header className='mb-3'>
        <h3 className='ty-title3 leading-[150%]'>{title}</h3>
        <p className='mt-1 ty-body5 leading-[150%] text-[var(--color-text-alternative)]'>
          {subtitle}
        </p>
      </header>

      <div className='pt-2'>
        <div className='grid grid-cols-7 justify-items-center'>
          {DAYS.map((day) => {
            const segments = map.get(day) ?? [];
            const total = segments.reduce((acc, s) => acc + s.percent, 0);
            const hasData = total > 0;

            return (
              <div key={day} className='flex flex-col items-center'>
                {/* 막대 프레임 */}
                <div
                  className='relative flex flex-col-reverse justify-start gap-[2px]'
                  style={{ height: MAX_BAR_H, width: BAR_W }}
                >
                  {segments.map((seg, idx) => {
                    const isBottom = idx === 0;
                    const isTop = idx === segments.length - 1;
                    const h = Math.round((clamp(seg.percent, 0, 100) / 100) * MAX_BAR_H);

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
    </section>
  );
}
