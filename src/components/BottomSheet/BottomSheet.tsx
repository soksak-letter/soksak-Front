import { useEffect, useMemo, useRef, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;

  overlay?: boolean;
  closeOnOutside?: boolean;
  height?: number | string;
  draggable?: boolean;
  minHeight?: number | string;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  overlay = true,
  closeOnOutside = true,
  height,
  draggable = false,
  minHeight = 180,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

  const HANDLE_H = 10;
  const TITLE_H = title ? 52 : 0;

  const maxHeightPx = useMemo(() => {
    if (typeof height === 'number') return height;

    if (typeof height === 'string') {
      // px
      const match = height.match(/^(\d+)px$/);
      if (match) return Number(match[1]);
    }

    // 드래그 가능한 최대값, height가 명시되어있지 않으면 90vh
    return Math.floor(window.innerHeight * 0.9);
  }, [height]);

  const [currentHeight, setCurrentHeight] = useState<number>(Math.min(maxHeightPx, height));

  // 꾸미기 페이지 첫 진입시 바텀시트는 최대 높이로 열린다.
  useEffect(() => {
    if (!isOpen) return;
    setCurrentHeight(maxHeightPx);
  }, [isOpen, maxHeightPx]);

  // 바깥 클릭 닫기
  useEffect(() => {
    if (!isOpen) return;
    if (!closeOnOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnOutside, onClose]);

  // 드래그 핸들러
  const dragRef = useRef<{ startY: number; startH: number } | null>(null);

  const onPointerDownHandle = (e: React.PointerEvent) => {
    if (!draggable) return;

    dragRef.current = { startY: e.clientY, startH: currentHeight };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMoveHandle = (e: React.PointerEvent) => {
    if (!draggable) return;
    if (!dragRef.current) return;

    const dy = dragRef.current.startY - e.clientY; // 위로 드래그하면 +
    const next = dragRef.current.startH + dy;

    const clamped = Math.max(minHeight, Math.min(maxHeightPx, next));
    setCurrentHeight(clamped);
  };

  const onPointerUpHandle = (e: React.PointerEvent) => {
    if (!draggable) return;
    dragRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 옵션 */}
      {overlay && (
        <div
          className='fixed inset-0 bg-black/70 z-40 transition-opacity'
          onClick={closeOnOutside ? onClose : undefined}
        />
      )}
      {/* BottomSheet */}
      <div
        ref={sheetRef}
        className='fixed bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-t-2xl z-50 transform transition-transform duration-300 ease-out'
        style={{
          width: '375px',
          maxWidth: '100vw',
          height: currentHeight,
          maxHeight: resolvedHeight ? resolvedHeight : '90vh',
          animation: 'slideUp 0.3s ease-out',
          boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* 드래그 핸들 */}
        <div
          className='flex justify-center pt-3 pb-1'
          onPointerDown={onPointerDownHandle}
          onPointerMove={onPointerMoveHandle}
          onPointerUp={onPointerUpHandle}
        >
          <div className='w-14 h-1 bg-[var(--color-text-assistive)] rounded-full' />
        </div>

        {/* 헤더 */}
        {title && (
          <div className='px-4 pb-3 border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
          </div>
        )}

        {/* 컨텐츠 */}
        <div
          className='overflow-y-auto'
          style={{
            height: resolvedHeight
              ? `calc(${resolvedHeight} - ${HANDLE_H}px - ${TITLE_H}px)`
              : 'auto',
            maxHeight: resolvedHeight ? undefined : 'calc(90vh - 80px)',
          }}
        >
          {children}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
