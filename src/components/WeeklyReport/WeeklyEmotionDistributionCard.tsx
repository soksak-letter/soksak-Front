import { useMemo } from 'react';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';

import { EmotionStatusIcon, type EmotionStatusKey } from './EmotionStatusIcon';

export type EmotionSlice = {
  key: string;
  label: string;
  value: number;
  color: string;
};

function toPercent(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}

const COLOR_TOKENS = [
  'var(--color-primary-500)',
  'var(--color-primary-300)',
  'var(--color-grey-300)',
  'var(--color-grey-100)',
] as const;

export function WeeklyEmotionDistributionCard({
  title = '주간 감정 분포',
  subtitle = '이번 주 가장 많이 느낀 감정이에요',
  data,
  emotionStatus = 'neutral',
  emptyText = '데이터가 아직 없어요',
}: {
  title?: string;
  subtitle?: string;
  data: readonly EmotionSlice[];
  emotionStatus?: EmotionStatusKey;
  emptyText?: string;
}) {
  const hasData = (data?.length ?? 0) > 0;

  const total = useMemo(() => data.reduce((acc, cur) => acc + cur.value, 0), [data]);

  const sorted = useMemo(() => {
    const arr = [...data].sort((a, b) => b.value - a.value);
    return arr.map((d, idx) => ({
      ...d,
      _fill: COLOR_TOKENS[idx] ?? COLOR_TOKENS[COLOR_TOKENS.length - 1],
    }));
  }, [data]);

  return (
    <section className='w-[343px] rounded-xl bg-[var(--color-bg-500)] p-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.06)]'>
      <header className='mb-[17px]'>
        <h3 className='ty-title3 leading-[150%] text-black'>{title}</h3>
        <p className='mt-1 ty-body5 leading-[150%] text-[var(--color-text-alternative)]'>
          {subtitle}
        </p>
      </header>

      <div className='grid grid-cols-[100px_1fr] items-center gap-[32px]'>
        {/* 도넛 */}
        <div className='relative h-[100px] w-[100px]'>
          {hasData ? (
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={sorted}
                  dataKey='value'
                  innerRadius={40}
                  outerRadius={50}
                  paddingAngle={4}
                  cornerRadius={999}
                  stroke='transparent'
                  isAnimationActive={false}
                >
                  {sorted.map((d) => (
                    <Cell key={d.key} fill={d._fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            // ✅ 빈 상태: Recharts 대신 CSS 링으로 100% 보장
            <div className='absolute inset-0 grid place-items-center'>
              <div
                className='h-[100px] w-[100px] rounded-full'
                style={{
                  // 링 두께 10px 느낌(outerRadius 50 - innerRadius 40)
                  border: '10px solid var(--color-grey-100)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {/* 가운데 감정 상태 이모지 */}
          <div className='absolute inset-0 grid place-items-center'>
            <div className='grid h-[60px] w-[60px] place-items-center rounded-full bg-[#F6F6F6]'>
              <EmotionStatusIcon status={emotionStatus} size={60} className='h-[60px] w-[60px]' />
            </div>
          </div>
        </div>

        {/* 레전드 / 빈 안내 */}
        {hasData ? (
          <ul className='space-y-2'>
            {sorted.map((d) => {
              const pct = toPercent(d.value, total);
              return (
                <li key={d.key} className='flex items-center justify-between ty-body4'>
                  <div className='flex items-center gap-2'>
                    <span
                      className='h-[14px] w-[14px] rounded-full'
                      style={{ backgroundColor: d._fill }}
                    />
                    <span className='text-black'>{d.label}</span>
                  </div>
                  <span className='tabular-nums'>{pct}%</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className='ty-body5 leading-[150%] text-[var(--color-text-alternative)]'>
            {emptyText}
          </p>
        )}
      </div>
    </section>
  );
}
