import { useState } from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import SurpriseLetterContent from '../components/BottomSheet/contents/SurpriseLetterContent';
import LetterStyleContent from '../components/LetterStyleContent';

type ContentType = 'surprise' | 'basic' | 'settings' | 'terms' | 'style' | null;

export default function BottomSheetTestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<ContentType>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const openBottomSheet = (content: ContentType, sheetTitle?: string) => {
    setCurrentContent(content);
    setTitle(sheetTitle);
    setIsOpen(true);
  };

  const closeBottomSheet = () => {
    setIsOpen(false);
  };

  const renderContent = () => {
    switch (currentContent) {
      case 'surprise':
        return <SurpriseLetterContent />;
      case 'style':
        return <LetterStyleContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          BottomSheet 테스트
        </h1>

        <div className="space-y-4">
          {/* 깜짝편지 바텀시트 */}
          <button
            onClick={() => openBottomSheet('surprise')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            깜짝편지 BottomSheet 열기
          </button>

          {/* 편지 스타일 선택 바텀시트 */}
          <button
            onClick={() => openBottomSheet('style')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            편지 스타일 선택 BottomSheet 열기
          </button>
        </div>

        {/* 단일 바텀시트 - 내용만 교체 */}
        <BottomSheet isOpen={isOpen} onClose={closeBottomSheet} title={title}>
          {renderContent()}
        </BottomSheet>
      </div>
    </div>
  );
}
