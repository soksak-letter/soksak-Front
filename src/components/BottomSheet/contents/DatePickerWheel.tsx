import React, { useEffect, useMemo, useRef, useState } from 'react';

interface DatePickerWheelProps {
  value?: { month: number; day: number; year: number };
  // eslint-disable-next-line no-unused-vars
  onDateChange?: (date: { month: number; day: number; year: number }) => void;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ITEM_HEIGHT = 44; // 각 항목의 높이 (픽셀)

// 해당 월의 일수 가져오기
// 컴포넌트 밖으로 빼서 의존성 경고/재생성 방지
const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

export default function DatePickerWheel({ value, onDateChange }: DatePickerWheelProps) {
  const currentDate = useMemo(() => new Date(), []);

  // value 있으면 value로 초기화, 없으면 오늘 날짜
  const initial = value ?? {
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
    year: currentDate.getFullYear(),
  };

  const [selectedMonth, setSelectedMonth] = useState(initial.month);
  const [selectedDay, setSelectedDay] = useState(initial.day);
  const [selectedYear, setSelectedYear] = useState(initial.year);

  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const onDateChangeRef = useRef(onDateChange);

  // Keep the ref updated with the latest callback
  useEffect(() => {
    onDateChangeRef.current = onDateChange;
  }, [onDateChange]);

  // years는 렌더마다 새로 만들지 말고 ref로 1회 고정 (useMemo 추가 없이)
  const yearsRef = useRef<number[]>([]);
  if (yearsRef.current.length === 0) {
    const base = currentDate.getFullYear() - 5;
    yearsRef.current = Array.from({ length: 16 }, (_, i) => base + i);
  }
  const years = yearsRef.current;

  // value 사용: 외부에서 값 내려오면 내부 상태 동기화
  useEffect(() => {
    if (!value) return;
    setSelectedMonth(value.month);
    setSelectedDay(value.day);
    setSelectedYear(value.year);
  }, [value]);

  const days = Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);

  useEffect(() => {
    onDateChangeRef.current?.({ month: selectedMonth, day: selectedDay, year: selectedYear });
  }, [selectedMonth, selectedDay, selectedYear]);

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    // eslint-disable-next-line no-unused-vars
    setter: (value: number) => void,
    offset: number = 0,
  ) => {
    if (!ref.current) return;

    const scrollTop = ref.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    setter(index + offset);
  };

  const scrollToIndex = (ref: React.RefObject<HTMLDivElement | null>, index: number) => {
    if (!ref.current) return;
    ref.current.scrollTop = index * ITEM_HEIGHT;
  };

  useEffect(() => {
    scrollToIndex(monthRef, selectedMonth);
    scrollToIndex(dayRef, selectedDay - 1);
    scrollToIndex(yearRef, years.indexOf(selectedYear));
  }, [selectedMonth, selectedDay, selectedYear, years]);

  useEffect(() => {
    // 선택한 월의 일수를 초과하는 경우 일자 조정
    const maxDays = getDaysInMonth(selectedMonth, selectedYear);
    if (selectedDay > maxDays) {
      setSelectedDay(maxDays);
      scrollToIndex(dayRef, maxDays - 1);
    }
  }, [selectedMonth, selectedYear, selectedDay]);

  const getItemClass = (isSelected: boolean, position: 'above' | 'selected' | 'below') => {
    if (isSelected) {
      return 'text-[#F43E3A] font-medium text-[20px]';
    }
    if (position === 'above' || position === 'below') {
      return 'text-[#595959] font-medium text-[20px]';
    }
    return 'text-[#171717] font-medium text-[20px]';
  };

  return (
    <div className='relative'>
      {/* 선택 강조 바 */}
      <div
        className='absolute left-0 right-0 bg-[#FEE8E7] pointer-events-none z-0'
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: `${ITEM_HEIGHT}px`,
        }}
      />

      <div className='flex justify-center gap-4 relative z-10'>
        {/* 월 선택기 */}
        <div
          className='relative overflow-hidden'
          style={{ height: `${ITEM_HEIGHT * 5}px`, width: '140px' }}
        >
          <div
            ref={monthRef}
            className='overflow-y-scroll scrollbar-hide'
            style={{
              height: `${ITEM_HEIGHT * 5}px`,
              scrollSnapType: 'y mandatory',
              paddingTop: `${ITEM_HEIGHT * 2}px`,
              paddingBottom: `${ITEM_HEIGHT * 2}px`,
            }}
            onScroll={() => handleScroll(monthRef, setSelectedMonth)}
          >
            {MONTHS.map((month, index) => {
              const offset = index - selectedMonth;
              const position = offset < 0 ? 'above' : offset > 0 ? 'below' : 'selected';
              return (
                <div
                  key={month}
                  className={`flex items-center justify-center cursor-pointer transition-colors ${getItemClass(index === selectedMonth, position)}`}
                  style={{
                    height: `${ITEM_HEIGHT}px`,
                    scrollSnapAlign: 'center',
                  }}
                  onClick={() => {
                    setSelectedMonth(index);
                    scrollToIndex(monthRef, index);
                  }}
                >
                  {month}
                </div>
              );
            })}
          </div>
        </div>

        {/* 일 선택기 */}
        <div
          className='relative overflow-hidden'
          style={{ height: `${ITEM_HEIGHT * 5}px`, width: '60px' }}
        >
          <div
            ref={dayRef}
            className='overflow-y-scroll scrollbar-hide'
            style={{
              height: `${ITEM_HEIGHT * 5}px`,
              scrollSnapType: 'y mandatory',
              paddingTop: `${ITEM_HEIGHT * 2}px`,
              paddingBottom: `${ITEM_HEIGHT * 2}px`,
            }}
            onScroll={() => handleScroll(dayRef, setSelectedDay, 1)}
          >
            {days.map((day) => {
              const offset = day - selectedDay;
              const position = offset < 0 ? 'above' : offset > 0 ? 'below' : 'selected';
              return (
                <div
                  key={day}
                  className={`flex items-center justify-center cursor-pointer transition-colors ${getItemClass(day === selectedDay, position)}`}
                  style={{
                    height: `${ITEM_HEIGHT}px`,
                    scrollSnapAlign: 'center',
                  }}
                  onClick={() => {
                    setSelectedDay(day);
                    scrollToIndex(dayRef, day - 1);
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* 연도 선택기 */}
        <div
          className='relative overflow-hidden'
          style={{ height: `${ITEM_HEIGHT * 5}px`, width: '80px' }}
        >
          <div
            ref={yearRef}
            className='overflow-y-scroll scrollbar-hide'
            style={{
              height: `${ITEM_HEIGHT * 5}px`,
              scrollSnapType: 'y mandatory',
              paddingTop: `${ITEM_HEIGHT * 2}px`,
              paddingBottom: `${ITEM_HEIGHT * 2}px`,
            }}
            onScroll={() => handleScroll(yearRef, (index) => setSelectedYear(years[index]))}
          >
            {years.map((year, index) => {
              const offset = year - selectedYear;
              const position = offset < 0 ? 'above' : offset > 0 ? 'below' : 'selected';
              return (
                <div
                  key={year}
                  className={`flex items-center justify-center cursor-pointer transition-colors ${getItemClass(year === selectedYear, position)}`}
                  style={{
                    height: `${ITEM_HEIGHT}px`,
                    scrollSnapAlign: 'center',
                  }}
                  onClick={() => {
                    setSelectedYear(year);
                    scrollToIndex(yearRef, index);
                  }}
                >
                  {year}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
