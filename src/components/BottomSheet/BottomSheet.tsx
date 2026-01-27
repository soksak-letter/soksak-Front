import React, { useEffect, useMemo, useRef, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;

  overlay?: boolean;
  closeOnOutside?: boolean;
  height?: number;
  draggable?: boolean;
  minHeight?: number;
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
  minHeight = 100,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  const HANDLE_H = 10;
  const TITLE_H = title ? 52 : 0;

  const hasFixedHeight = typeof height === 'number';

  // 고정 높이 모드에서 max는 height 자체
  const maxHeightPx = useMemo(() => (hasFixedHeight ? height : 0), [hasFixedHeight, height]);
  // currentHeight는 height를 props로 받았을 때 의미 있다.
  const [currentHeight, setCurrentHeight] = useState<number>(() => (hasFixedHeight ? height : 0));
  const [isDragging, setIsDragging] = useState(false);

  // 꾸미기 페이지 첫 진입시 바텀시트는 최대 높이로 열린다.
  useEffect(() => {
    if (!isOpen) return;
    if (!hasFixedHeight) return;

    setCurrentHeight(height);
  }, [isOpen, hasFixedHeight, height]);

  // 바깥 클릭 닫기
  useEffect(() => {
    if (!isOpen) return;
    if (!closeOnOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnOutside, onClose]);

  // 드래그 핸들러
  const dragRef = useRef<{ startY: number; startH: number } | null>(null);

  const onPointerDownHandle = (e: React.PointerEvent) => {
    if (!draggable || !hasFixedHeight) return;

    setIsDragging(true);
    dragRef.current = { startY: e.clientY, startH: currentHeight };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMoveHandle = (e: React.PointerEvent) => {
    if (!draggable || !hasFixedHeight) return;
    if (!dragRef.current) return;

    const dy = dragRef.current.startY - e.clientY; // 위로 드래그하면 +
    const next = dragRef.current.startH + dy;

    const clamped = Math.max(minHeight, Math.min(maxHeightPx, next));
    setCurrentHeight(clamped);
  };

  const onPointerUpHandle = (e: React.PointerEvent) => {
    if (!draggable || !hasFixedHeight) return;

    setIsDragging(false);
    dragRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  if (!isOpen) return null;

  const contentHeight = hasFixedHeight
    ? Math.max(0, currentHeight - HANDLE_H - TITLE_H)
    : undefined;

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
          height: hasFixedHeight ? currentHeight : 'auto',
          maxHeight: hasFixedHeight ? currentHeight : undefined,
          animation: 'slideUp 0.3s ease-out',
          boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* 드래그 핸들 */}
        <div
          className='flex justify-center py-3 cursor-grab'
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
            height: contentHeight,
            overflow: isDragging ? 'hidden' : 'auto',
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
