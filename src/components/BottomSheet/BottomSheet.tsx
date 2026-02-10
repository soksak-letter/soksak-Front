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
  const dragRef = useRef<{
    startY: number;
    startHeight: number;
  } | null>(null);
  const onPointerDownHandle = (e: React.PointerEvent) => {
    if (!draggable || !hasFixedHeight) return;

    setIsDragging(true);
    dragRef.current = { startY: e.clientY, startHeight: currentHeight };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMoveHandle = (e: React.PointerEvent) => {
    if (!draggable || !hasFixedHeight) return;
    if (!dragRef.current) return;

    const { startY, startHeight } = dragRef.current;

    const deltaY = e.clientY - startY; // 아래로 +, 위로 -
    const nextHeight = startHeight - deltaY;

    const clamped = Math.max(minHeight, Math.min(height!, nextHeight));
    setCurrentHeight(clamped);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!draggable || !hasFixedHeight) return;

    setIsDragging(false);
    dragRef.current = null;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
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
        className={[
          'fixed bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-t-2xl z-50',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        ].join(' ')}
        style={{
          width: '375px',
          maxWidth: '100vw',
          height: hasFixedHeight ? currentHeight : 'auto',
          maxHeight: hasFixedHeight ? maxHeightPx : undefined,

          boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.12)',

          willChange: 'transform',
        }}
      >
        {/* 드래그 핸들 */}
        <div
          className='flex justify-center py-3 cursor-grab'
          style={{
            // pointer 이벤트는 드래그에 집중 (핸들에서만)
            touchAction: 'none',
          }}
          onPointerDown={onPointerDownHandle}
          onPointerMove={onPointerMoveHandle}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
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

            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
