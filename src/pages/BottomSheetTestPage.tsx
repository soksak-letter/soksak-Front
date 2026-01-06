import { useState } from 'react';
import BottomSheet from '../components/BottomSheet';

export default function BottomSheetTestPage() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          BottomSheet 테스트
        </h1>

        <div className="space-y-4">
          {/* 기본 BottomSheet */}
          <button
            onClick={() => setIsOpen1(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            기본 BottomSheet 열기
          </button>

          {/* 제목 있는 BottomSheet */}
          <button
            onClick={() => setIsOpen2(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            제목 있는 BottomSheet 열기
          </button>

          {/* 긴 컨텐츠 BottomSheet */}
          <button
            onClick={() => setIsOpen3(true)}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            긴 컨텐츠 BottomSheet 열기
          </button>
        </div>

        {/* 기본 BottomSheet */}
        <BottomSheet isOpen={isOpen1} onClose={() => setIsOpen1(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">기본 BottomSheet</h3>
            <p className="text-gray-600 mb-4">
              이것은 기본적인 BottomSheet입니다. 드래그 핸들을 드래그하거나 외부를
              클릭하여 닫을 수 있습니다.
            </p>
            <button
              onClick={() => setIsOpen1(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              닫기
            </button>
          </div>
        </BottomSheet>

        {/* 제목 있는 BottomSheet */}
        <BottomSheet
          isOpen={isOpen2}
          onClose={() => setIsOpen2(false)}
          title="설정"
        >
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-800">알림 설정</span>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-800">다크 모드</span>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-800">자동 재생</span>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
            <button
              onClick={() => setIsOpen2(false)}
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              저장
            </button>
          </div>
        </BottomSheet>

        {/* 긴 컨텐츠 BottomSheet */}
        <BottomSheet
          isOpen={isOpen3}
          onClose={() => setIsOpen3(false)}
          title="약관 동의"
        >
          <div className="p-6">
            <div className="space-y-4 mb-6">
              {[...Array(20)].map((_, index) => (
                <div key={index} className="py-2">
                  <h4 className="font-semibold mb-2">제{index + 1}조</h4>
                  <p className="text-gray-600 text-sm">
                    이것은 긴 컨텐츠를 테스트하기 위한 샘플 텍스트입니다. 스크롤이
                    정상적으로 작동하는지 확인할 수 있습니다.
                  </p>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 bg-white pt-4 border-t">
              <button
                onClick={() => setIsOpen3(false)}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                모두 동의
              </button>
            </div>
          </div>
        </BottomSheet>
      </div>
    </div>
  );
}
