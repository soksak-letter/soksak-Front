import { useState } from 'react';
import BottomSheet from '../components/BottomSheet';
import SurpriseLetterContent from '../components/SurpriseLetterContent';
import BasicContent from '../components/BasicContent';
import SettingsContent from '../components/SettingsContent';
import TermsContent from '../components/TermsContent';

type ContentType = 'surprise' | 'basic' | 'settings' | 'terms' | null;

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
      case 'basic':
        return <BasicContent onClose={closeBottomSheet} />;
      case 'settings':
        return <SettingsContent onClose={closeBottomSheet} />;
      case 'terms':
        return <TermsContent onClose={closeBottomSheet} />;
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
          {/* 깜짝편지 BottomSheet */}
          <button
            onClick={() => openBottomSheet('surprise')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            깜짝편지 BottomSheet 열기
          </button>

          {/* 기본 BottomSheet */}
          <button
            onClick={() => openBottomSheet('basic')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            기본 BottomSheet 열기
          </button>

          {/* 제목 있는 BottomSheet */}
          <button
            onClick={() => openBottomSheet('settings', '설정')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            제목 있는 BottomSheet 열기
          </button>

          {/* 긴 컨텐츠 BottomSheet */}
          <button
            onClick={() => openBottomSheet('terms', '약관 동의')}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            긴 컨텐츠 BottomSheet 열기
          </button>
        </div>

        {/* 단일 BottomSheet - 내용만 교체 */}
        <BottomSheet isOpen={isOpen} onClose={closeBottomSheet} title={title}>
          {renderContent()}
        </BottomSheet>
      </div>
    </div>
  );
}
