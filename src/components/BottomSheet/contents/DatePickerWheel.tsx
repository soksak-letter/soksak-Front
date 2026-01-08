import { useEffect, useRef, useState } from 'react';

interface DatePickerWheelProps {
  onDateChange?: (date: { month: number; day: number; year: number }) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const ITEM_HEIGHT = 44; // 각 항목의 높이 (픽셀)

export default function DatePickerWheel({ onDateChange }: DatePickerWheelProps) {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const onDateChangeRef = useRef(onDateChange);

  // Keep the ref updated with the latest callback
  useEffect(() => {
    onDateChangeRef.current = onDateChange;
  }, [onDateChange]);

  // 연도 생성 (현재 연도 - 5년부터 현재 연도 + 10년까지)
  const years = Array.from({ length: 16 }, (_, i) => currentDate.getFullYear() - 5 + i);

  // 해당 월의 일수 가져오기
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);

  useEffect(() => {
    onDateChangeRef.current?.({ month: selectedMonth, day: selectedDay, year: selectedYear });
  }, [selectedMonth, selectedDay, selectedYear]);

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setter: (value: number) => void,
    offset: number = 0
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
  }, []);

  useEffect(() => {
    // 선택한 월의 일수를 초과하는 경우 일자 조정
    const maxDays = getDaysInMonth(selectedMonth, selectedYear);
    if (selectedDay > maxDays) {
      setSelectedDay(maxDays);
      scrollToIndex(dayRef, maxDays - 1);
    }
  }, [selectedMonth, selectedYear]);

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
    <div className="relative">
      {/* 선택 강조 바 */}
      <div
        className="absolute left-0 right-0 bg-[#FEE8E7] pointer-events-none z-0"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: `${ITEM_HEIGHT}px`
        }}
      />

      <div className="flex justify-center gap-4 relative z-10">
        {/* 월 선택기 */}
        <div className="relative overflow-hidden" style={{ height: `${ITEM_HEIGHT * 5}px`, width: '140px' }}>
          <div
            ref={monthRef}
            className="overflow-y-scroll scrollbar-hide"
            style={{
              height: `${ITEM_HEIGHT * 5}px`,
              scrollSnapType: 'y mandatory',
              paddingTop: `${ITEM_HEIGHT * 2}px`,
              paddingBottom: `${ITEM_HEIGHT * 2}px`
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
                    scrollSnapAlign: 'center'
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
        <div className="relative overflow-hidden" style={{ height: `${ITEM_HEIGHT * 5}px`, width: '60px' }}>
          <div
            ref={dayRef}
            className="overflow-y-scroll scrollbar-hide"
            style={{
              height: `${ITEM_HEIGHT * 5}px`,
              scrollSnapType: 'y mandatory',
              paddingTop: `${ITEM_HEIGHT * 2}px`,
              paddingBottom: `${ITEM_HEIGHT * 2}px`
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
                    scrollSnapAlign: 'center'
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
        <div className="relative overflow-hidden" style={{ height: `${ITEM_HEIGHT * 5}px`, width: '80px' }}>
          <div
            ref={yearRef}
            className="overflow-y-scroll scrollbar-hide"
            style={{
              height: `${ITEM_HEIGHT * 5}px`,
              scrollSnapType: 'y mandatory',
              paddingTop: `${ITEM_HEIGHT * 2}px`,
              paddingBottom: `${ITEM_HEIGHT * 2}px`
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
                    scrollSnapAlign: 'center'
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
