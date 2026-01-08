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

export default function SurpriseLetterContent({ onSelectionChange }: SurpriseLetterContentProps = {}) {
  const [selectedTab, setSelectedTab] = useState<TabType>('surprise');
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('3months');
  const [selectedDate, setSelectedDate] = useState<{ month: number; day: number; year: number } | null>(null);

  useEffect(() => {
    if (selectedTab === 'surprise') {
      onSelectionChange?.({ type: 'surprise', period: selectedPeriod });
    } else if (selectedDate) {
      onSelectionChange?.({ type: 'manual', date: selectedDate });
    }
  }, [selectedTab, selectedPeriod, selectedDate, onSelectionChange]);

  return (
    <div className="p-4">
      {/* 탭 선택 */}
      <div className="flex gap-1 mb-4">
        <button
          onClick={() => setSelectedTab('surprise')}
          className={`flex-1 py-2.5 px-2.5 rounded-lg text-[15px] font-medium transition-all ${
            selectedTab === 'surprise'
              ? 'bg-white text-[#F55454] border border-[#F55454]'
              : 'bg-[#F0F0F0] text-[#8C8C8C] border border-transparent'
          }`}
        >
          깜짝 편지로 받기
        </button>
        <button
          onClick={() => setSelectedTab('manual')}
          className={`flex-1 py-2.5 px-2.5 rounded-lg text-[15px] font-medium transition-all ${
            selectedTab === 'manual'
              ? 'bg-white text-[#F55454] border border-[#F55454]'
              : 'bg-[#F0F0F0] text-[#8C8C8C] border border-transparent'
          }`}
        >
          직접 선택하기
        </button>
      </div>

      {/* 시간 선택 - '깜짝편지로 받기' 탭이 선택되었을 때만 표시 */}
      {selectedTab === 'surprise' && (
        <div className="grid grid-cols-2 gap-x-1 gap-y-2">
          {timePeriodOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedPeriod(option.id)}
              className={`py-2.5 px-2.5 rounded text-[15px] font-medium transition-all ${
                selectedPeriod === option.id
                  ? 'bg-[#FEE8E7] text-[#F43E3A] border border-[#FEE8E7]'
                  : 'bg-white text-[#171717] border border-[#DEDEDE]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* 직접 선택 내용 - '직접 선택하기' 탭이 선택되었을 때 표시 */}
      {selectedTab === 'manual' && (
        <div className="py-4">
          <DatePickerWheel onDateChange={setSelectedDate} />
        </div>
      )}
    </div>
  );
}
