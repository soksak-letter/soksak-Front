import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Letter } from '../types/letter';
import LetterCard from './LetterCard';
import EmptyStateCard from './EmptyStateCard';

interface LetterCarouselProps {
  letters: Letter[];
  emptyMessage?: string;
}

export default function LetterCarousel({
  letters,
  emptyMessage,
}: LetterCarouselProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const prevTranslateRef = useRef(0);
  const dragResetTimeoutRef = useRef<number | null>(null);


  // 카드 크기: 피그마 디자인 기준 130px
  const CARD_WIDTH = 130;
  const CARD_GAP = 13; // 피그마에서 확인한 간격
  const CARD_WITH_GAP = CARD_WIDTH + CARD_GAP;

  // currentIndex 변경 시 transform 업데이트
  useEffect(() => {
    if (containerRef.current) {
      const targetTranslate = -currentIndex * CARD_WITH_GAP;
      containerRef.current.style.transform = `translateX(${targetTranslate}px)`;
      prevTranslateRef.current = targetTranslate;
      currentTranslateRef.current = targetTranslate;
    }
  }, [currentIndex, CARD_WITH_GAP]);

  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (dragResetTimeoutRef.current) {
        clearTimeout(dragResetTimeoutRef.current);
      }
    };
  }, []);

  const handleCardClick = useCallback(
    (letter: Letter) => {
      // 드래그 중이었다면 클릭 이벤트 무시
      if (isDraggingRef.current) {
        return;
      }
      navigate(letter.link);
    },
    [navigate]
  );

  // 드래그 시작
  const handleDragStart = (clientX: number) => {
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    startXRef.current = clientX;
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  // 드래그 중
  const handleDragMove = (clientX: number) => {
    const currentX = clientX;
    const diff = currentX - startXRef.current;

    // 5px 이상 움직였을 때만 드래그로 간주
    if (Math.abs(diff) > 5) {
      isDraggingRef.current = true;
    }

    currentTranslateRef.current = prevTranslateRef.current + diff;

    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${currentTranslateRef.current}px)`;
    }
  };

  // 드래그 종료
  const handleDragEnd = () => {
    if (!isPointerDownRef.current) return;

    const movedBy = currentTranslateRef.current - prevTranslateRef.current;
    const threshold = 50; // 최소 드래그 거리

    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.3s ease-out';
    }

    // 오른쪽으로 드래그 (이전)
    if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    // 왼쪽으로 드래그 (다음)
    else if (movedBy < -threshold && currentIndex < letters.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    // 이동하지 않는 경우 원위치로
    else {
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${prevTranslateRef.current}px)`;
      }
    }

    // 포인터 다운 플래그 리셋
    isPointerDownRef.current = false;
    startXRef.current = 0;

    // 드래그 플래그를 약간 지연 후 리셋 (클릭 이벤트 방지)
    // 기존 타임아웃이 있으면 먼저 제거
    if (dragResetTimeoutRef.current) {
      clearTimeout(dragResetTimeoutRef.current);
    }
    // 새 타임아웃 설정 및 ID 저장
    dragResetTimeoutRef.current = setTimeout(() => {
      isDraggingRef.current = false;
      dragResetTimeoutRef.current = null;
    }, 100);
  };

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPointerDownRef.current) {
      handleDragMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (isPointerDownRef.current) {
      handleDragEnd();
    }
  };

  const handleMouseLeave = () => {
    if (isPointerDownRef.current) {
      handleDragEnd();
    }
  };

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPointerDownRef.current) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (isPointerDownRef.current) {
      handleDragEnd();
    }
  };

  // 빈 상태
  if (letters.length === 0) {
    return (
      <div className="w-full py-1.5">
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div style={{ width: `${CARD_WIDTH}px`, marginLeft: `16px` }}>
              <EmptyStateCard message={emptyMessage} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-1.5">
      <div className="relative w-full">
        {/* 캐러셀 컨테이너 */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={containerRef}
            className="flex transition-transform duration-300 ease-out"
            style={{
              gap: `${CARD_GAP}px`,
              paddingLeft: `16px`,
            }}
          >
            {letters.map((letter) => (
              <div
                key={letter.id}
                className="flex-shrink-0"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <LetterCard
                  letter={letter}
                  onClick={() => handleCardClick(letter)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 인디케이터 */}
        {/* {letters.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {letters.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  prevTranslateRef.current = -index * CARD_WITH_GAP;
                  currentTranslateRef.current = prevTranslateRef.current;
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-500 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${index + 1}번째 페이지로 이동`}
              />
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
