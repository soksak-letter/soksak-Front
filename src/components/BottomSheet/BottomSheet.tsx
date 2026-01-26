import { useEffect, useRef } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;

  overlay?: boolean;
  closeOnOutside?: boolean;
  height?: number | string;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  overlay = true,
  closeOnOutside = true,
  height,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

  const HANDLE_H = 44;
  const TITLE_H = title ? 52 : 0;

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
          height: resolvedHeight ?? 'auto',
          maxHeight: resolvedHeight ? resolvedHeight : '90vh',
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        {/* 드래그 핸들 */}
        <div className='flex justify-center pt-3 pb-2'>
          <div className='w-10 h-1 bg-gray-300 rounded-full' />
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
