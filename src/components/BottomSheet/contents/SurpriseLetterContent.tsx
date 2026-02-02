import { useState, useEffect } from 'react';
import DatePickerWheel from './DatePickerWheel';

type TabType = 'surprise' | 'manual';
type TimePeriod = '3days' | '1week' | '1month' | '3months' | '6months' | '1year';

interface TimePeriodOption {
  id: TimePeriod;
  label: string;
}

interface SurpriseLetterContentProps {
  onSelectionChange?: (selection: {
    type: 'surprise' | 'manual';
    period?: TimePeriod;
    date?: { month: number; day: number; year: number };
  }) => void;
}

const timePeriodOptions: TimePeriodOption[] = [
  { id: '3days', label: '3일 후' },
  { id: '1week', label: '일주일 후' },
  { id: '1month', label: '한달 후' },
  { id: '3months', label: '세달 후' },
  { id: '6months', label: '반년 후' },
  { id: '1year', label: '1년 후' },
];

export default function SurpriseLetterContent({
  onSelectionChange,
}: SurpriseLetterContentProps = {}) {
  const [selectedTab, setSelectedTab] = useState<TabType>('surprise');
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('3months');
  const [selectedDate, setSelectedDate] = useState<{ month: number; day: number; year: number }>(
    () => {
      const now = new Date();
      return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
    },
  );

  useEffect(() => {
    if (selectedTab === 'surprise') {
      onSelectionChange?.({ type: 'manual', date: selectedDate });
      return;
    }

    onSelectionChange?.({ type: 'surprise', period: selectedPeriod });
  }, [selectedTab, selectedPeriod, selectedDate, onSelectionChange]);

  return (
    <div className='p-4 mb-3'>
      {/* 탭 선택 */}
      <div className='flex items-center gap-2 rounded-lg bg-[var(--color-grey-100)] p-0.5'>
        <button
          type='button'
          onClick={() => setSelectedTab('surprise')}
          className={[
            'flex-1 h-[44px] rounded-[10px] ty-body4 transition-all',
            selectedTab === 'surprise'
              ? 'bg-white text-[var(--color-primary-500)] border border-[var(--color-primary-500)]'
              : 'bg-transparent text-[var(--color-text-assistive)] border border-transparent',
          ].join(' ')}
        >
          깜짝 편지로 받기
        </button>

        <button
          type='button'
          onClick={() => setSelectedTab('manual')}
          className={[
            'flex-1 h-[44px] rounded-[10px] ty-body4 transition-all',
            selectedTab === 'manual'
              ? 'bg-white text-[var(--color-primary-500)] border border-[var(--color-primary-500)]'
              : 'bg-transparent text-[var(--color-text-assistive)] border border-transparent',
          ].join(' ')}
        >
          직접 선택하기
        </button>
      </div>

      {/* 시간 선택 - '깜짝편지로 받기' 탭이 선택되었을 때만 표시 */}
      {selectedTab === 'surprise' && (
        <div className='py-4'>
          <DatePickerWheel onDateChange={setSelectedDate} />
        </div>
      )}

      {/* 직접 선택 내용 - '직접 선택하기' 탭이 선택되었을 때 표시 */}
      {selectedTab === 'manual' && (
        <div className='grid grid-cols-2 gap-x-1 gap-y-1 mt-5'>
          {timePeriodOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedPeriod(option.id)}
              className={`py-2.5 px-2.5 rounded ty-body5 transition-all ${
                selectedPeriod === option.id
                  ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-500)]'
                  : 'bg-white text-[var(--color-text-normal)] border border-[var(--color-grey-100)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
