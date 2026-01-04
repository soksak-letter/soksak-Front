import { useState } from 'react';
import LetterCarousel from '../components/LetterCarousel';
import type { Letter } from '../types/letter';

export default function LetterCarouselTestPage() {
  const [testCase, setTestCase] = useState<'empty' | 'single' | 'multiple' | 'mixed'>('multiple');

  // 테스트 데이터
  const emptyLetters: Letter[] = [];

  const singleLetter: Letter[] = [
    {
      id: '1',
      title: '첫 번째 편지',
      date: '2024.01.15',
      variant: 'blue',
      link: '/letter/1',
    },
  ];

  const multipleLetters: Letter[] = [
    {
      id: '1',
      title: '새해 인사',
      date: '2024.01.01',
      variant: 'blue',
      link: '/letter/1',
    },
    {
      id: '2',
      title: '생일 축하 편지',
      date: '2024.01.15',
      variant: 'pink',
      link: '/letter/2',
    },
    {
      id: '3',
      title: '감사의 마음을 전합니다',
      date: '2024.02.01',
      variant: 'yellow',
      link: '/letter/3',
    },
    {
      id: '4',
      title: '응원의 메시지',
      date: '2024.02.14',
      variant: 'blue',
      link: '/letter/4',
    },
    {
      id: '5',
      title: '오랜만에 안부 전해요',
      date: '2024.03.01',
      variant: 'pink',
      link: '/letter/5',
    },
  ];

  const mixedLetters: Letter[] = [
    {
      id: '1',
      title: '파란색 편지봉투',
      date: '2024.01.01',
      variant: 'blue',
      link: '/letter/1',
    },
    {
      id: '2',
      title: '분홍색 편지봉투',
      date: '2024.01.15',
      variant: 'pink',
      link: '/letter/2',
    },
    {
      id: '3',
      title: '노란색 편지봉투',
      date: '2024.02.01',
      variant: 'yellow',
      link: '/letter/3',
    },
    {
      id: '4',
      title: '다시 파란색',
      date: '2024.02.14',
      variant: 'blue',
      link: '/letter/4',
    },
    {
      id: '5',
      title: '다시 분홍색',
      date: '2024.03.01',
      variant: 'pink',
      link: '/letter/5',
    },
    {
      id: '6',
      title: '다시 노란색',
      date: '2024.03.15',
      variant: 'yellow',
      link: '/letter/6',
    },
    {
      id: '7',
      title: '긴 제목 테스트: 이것은 아주 긴 제목을 가진 편지입니다. 제목이 너무 길면 어떻게 표시될까요?',
      date: '2024.04.01',
      variant: 'blue',
      link: '/letter/7',
    },
  ];

  const getCurrentLetters = () => {
    switch (testCase) {
      case 'empty':
        return emptyLetters;
      case 'single':
        return singleLetter;
      case 'multiple':
        return multipleLetters;
      case 'mixed':
        return mixedLetters;
      default:
        return emptyLetters;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* 375px 고정 너비 컨테이너 */}
      <div className="w-[375px] bg-white min-h-screen">
        {/* 헤더 */}
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold text-gray-800 mb-1">
            편지 캐러셀 테스트
          </h1>
        </div>

        {/* 테스트 케이스 선택 */}
        <div className="p-4 border-b">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            테스트 케이스
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTestCase('empty')}
              className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                testCase === 'empty'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              빈 상태 (0개)
            </button>
            <button
              onClick={() => setTestCase('single')}
              className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                testCase === 'single'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              단일 (1개)
            </button>
            <button
              onClick={() => setTestCase('multiple')}
              className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                testCase === 'multiple'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              여러 개 (5개)
            </button>
            <button
              onClick={() => setTestCase('mixed')}
              className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                testCase === 'mixed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              혼합 (7개)
            </button>
          </div>
        </div>

        {/* 캐러셀 */}
        <div>
          <LetterCarousel
            letters={getCurrentLetters()}
            emptyMessage="아직 작성된 편지가 없습니다."
          />
        </div>
      </div>
    </div>
  );
}
