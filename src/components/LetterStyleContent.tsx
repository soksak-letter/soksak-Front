import { useState } from 'react';

type StyleTab = 'font' | 'paper' | 'stamp';

interface FontOption {
  id: string;
  name: string;
  fontFamily: string;
  koreanSample: string;
  englishSample: string;
}

interface PaperOption {
  id: string;
  preview: React.ReactNode;
}

interface StampOption {
  id: string;
  preview: React.ReactNode;
}

const fontOptions: FontOption[] = [
  {
    id: 'font1',
    name: 'Pretendard',
    fontFamily: 'Pretendard, sans-serif',
    koreanSample: '3개월 후 나에게 보내보세요.',
    englishSample: 'Try using Soksak letters'
  },
  {
    id: 'font2',
    name: '나눔 배은혜체',
    fontFamily: 'NanumBaeEunHyeCe, cursive',
    koreanSample: '좋은 의미으로 편지를 나눠보세요.',
    englishSample: 'Try using Soksak letters'
  },
  {
    id: 'font3',
    name: '나눔 비상체',
    fontFamily: 'NanumBiSangCe, sans-serif',
    koreanSample: '편지로 내용을 인연을 만나보세요.',
    englishSample: 'Try using Soksak letters'
  },
  {
    id: 'font4',
    name: '나눔 강인한 위로체',
    fontFamily: 'NanumGangInHanWiRo, handwriting',
    koreanSample: '혹은 익명으로 편지를 나눠보세요.',
    englishSample: 'Try using Soksak letters'
  },
  {
    id: 'font5',
    name: '나눔 아빠글씨체',
    fontFamily: 'NanumABbaGeurSsi, handwriting',
    koreanSample: '편지로 새로운 인연을 만나보세요.',
    englishSample: 'Try using Soksak letters'
  },
];

const paperOptions: PaperOption[] = [
  { id: 'paper1', preview: <PaperPreview color="cream" lines={true} /> },
  { id: 'paper2', preview: <PaperPreview color="white" lines={true} /> },
  { id: 'paper3', preview: <PaperPreview color="lightBlue" lines={true} /> },
  { id: 'paper4', preview: <PaperPreview color="black" lines={true} /> },
  { id: 'paper5', preview: <PaperPreview color="gray" lines={true} /> },
  { id: 'paper6', preview: <PaperPreview color="lightGreen" lines={false} gradient={true} /> },
];

const stampOptions: StampOption[] = [
  { id: 'stamp1', preview: <StampPreview type="santa" color="#E53935" /> },
  { id: 'stamp2', preview: <StampPreview type="bunny" color="#64B5F6" /> },
  { id: 'stamp3', preview: <StampPreview type="bird" color="#81C784" /> },
  { id: 'stamp4', preview: <StampPreview type="cafe" color="#FFF3E0" /> },
  { id: 'stamp5', preview: <StampPreview type="flower" color="#F8BBD0" /> },
  { id: 'stamp6', preview: <StampPreview type="snowman" color="#90CAF9" /> },
  { id: 'stamp7', preview: <StampPreview type="winter" color="#B3E5FC" /> },
  { id: 'stamp8', preview: <StampPreview type="tree" color="#66BB6A" /> },
  { id: 'stamp9', preview: <StampPreview type="plant" color="#C5E1A5" /> },
];

export default function LetterStyleContent() {
  const [selectedTab, setSelectedTab] = useState<StyleTab>('font');
  const [selectedFont, setSelectedFont] = useState('font1');
  const [selectedPaper, setSelectedPaper] = useState('paper2');
  const [selectedStamp, setSelectedStamp] = useState('stamp1');

  return (
    <div className="p-4">
      {/* 탭 선택 */}
      <div className="flex justify-center gap-24 mb-6">
        <button
          onClick={() => setSelectedTab('font')}
          className={`text-[16px] font-medium pb-2 transition-colors ${
            selectedTab === 'font'
              ? 'text-black border-b-2 border-black'
              : 'text-black opacity-40'
          }`}
        >
          글씨체
        </button>
        <button
          onClick={() => setSelectedTab('paper')}
          className={`text-[16px] font-medium pb-2 transition-colors ${
            selectedTab === 'paper'
              ? 'text-black border-b-2 border-black'
              : 'text-black opacity-50'
          }`}
        >
          편지지
        </button>
        <button
          onClick={() => setSelectedTab('stamp')}
          className={`text-[16px] font-medium pb-2 transition-colors ${
            selectedTab === 'stamp'
              ? 'text-black border-b-2 border-black'
              : 'text-black opacity-50'
          }`}
        >
          우표
        </button>
      </div>

      {/* 글씨체 목록 뷰 */}
      {selectedTab === 'font' && (
        <div className="space-y-0">
          {fontOptions.map((font) => (
            <button
              key={font.id}
              onClick={() => setSelectedFont(font.id)}
              className="w-full py-4 px-4 flex items-center justify-between border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left flex-shrink-0 w-32">
                <p className="text-[15px] font-medium text-black" style={{ fontFamily: font.fontFamily }}>{font.name}</p>
              </div>
              <div className="flex-1 text-center px-4">
                <p
                  className="text-[14px] text-gray-700 mb-1"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {font.koreanSample}
                </p>
                <p
                  className="text-[13px] text-gray-500"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {font.englishSample}
                </p>
              </div>
              <div className="flex-shrink-0 w-8 flex justify-end">
                {selectedFont === font.id && (
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 편지지 그리드 뷰 */}
      {selectedTab === 'paper' && (
        <div className="grid grid-cols-3 gap-3">
          {paperOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedPaper(option.id)}
              className={`aspect-[3/4] rounded-lg transition-all ${
                selectedPaper === option.id
                  ? 'ring-2 ring-[#F43E3A] ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              {option.preview}
            </button>
          ))}
        </div>
      )}

      {/* 우표 그리드 뷰 */}
      {selectedTab === 'stamp' && (
        <div className="grid grid-cols-3 gap-3">
          {stampOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedStamp(option.id)}
              className={`aspect-[3/4] rounded-lg transition-all ${
                selectedStamp === option.id
                  ? 'ring-2 ring-[#F43E3A] ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              {option.preview}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 편지지 미리보기 컴포넌트
function PaperPreview({ color, lines, gradient }: { color: string; lines?: boolean; gradient?: boolean }) {
  const backgrounds: Record<string, string> = {
    cream: 'bg-[#FAF9EE]',
    white: 'bg-white',
    lightBlue: 'bg-blue-50',
    black: 'bg-[#181818]',
    gray: 'bg-gray-100',
    lightGreen: gradient ? 'bg-gradient-to-b from-green-50 to-blue-100' : 'bg-green-50',
  };

  const lineColors: Record<string, string> = {
    cream: 'border-gray-400',
    white: 'border-gray-300',
    lightBlue: 'border-blue-300',
    black: 'border-gray-500',
    gray: 'border-gray-300',
    lightGreen: 'border-green-200',
  };

  return (
    <div className={`w-full h-full ${backgrounds[color]} rounded-lg p-2 flex flex-col justify-between overflow-hidden`}>
      {lines && [...Array(17)].map((_, i) => (
        <div key={i} className={`border-b ${lineColors[color]} opacity-50`} style={{ height: '1px' }} />
      ))}
      {gradient && !lines && (
        <div className="h-full" />
      )}
    </div>
  );
}

// 우표 미리보기 컴포넌트
function StampPreview({ type, color }: { type: string; color: string }) {
  const stampIcons: Record<string, string> = {
    santa: '🎅',
    bunny: '🐰',
    bird: '🕊️',
    cafe: '☕',
    flower: '🌸',
    snowman: '⛄',
    winter: '❄️',
    tree: '🌲',
    plant: '🌿',
  };

  return (
    <div
      className="w-full h-full rounded-lg border-2 border-gray-300 flex items-center justify-center text-4xl shadow-sm"
      style={{ backgroundColor: color }}
    >
      <span>{stampIcons[type] || '📮'}</span>
    </div>
  );
}
