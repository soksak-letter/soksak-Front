interface WriteLetterButtonsProps {
  onWriteToSelf: () => void;
  onWriteToOther: () => void;
}

export default function WriteLetterButtons({
  onWriteToSelf,
  onWriteToOther,
}: WriteLetterButtonsProps) {
  return (
    <div className="w-full flex gap-3 px-4 py-2.5">
      {/* 나에게 편지 보내기 */}
      <button
        onClick={onWriteToSelf}
        className="relative flex-1 rounded-lg overflow-hidden"
        style={{
          width: '160px',
          height: '160px',
          backgroundColor: '#F55449', // rgb(245, 84, 73) - 피그마: rgb(0.960, 0.331, 0.300)
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 상단 태그 */}
        <div
          className="absolute top-3.5 left-0 right-0 flex justify-center"
        >
          <div
            className="px-2.5 py-1 rounded-lg"
            style={{
              backgroundColor: '#FFFFFF',
            }}
          >
            <span
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: '14px',
                color: '#F55449',
              }}
            >
              나에게 편지 보내기
            </span>
          </div>
        </div>

        {/* 이모지 일러스트 */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="rotate-180">
            <EmojiIllustration />
          </div>
        </div>

        {/* 화살표 아이콘 (우측 하단) */}
        <div className="absolute bottom-4 right-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M6.75 13.5L11.25 9L6.75 4.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* 상대에게 편지 보내기 */}
      <button
        onClick={onWriteToOther}
        className="relative flex-1 rounded-lg overflow-hidden"
        style={{
          width: '160px',
          height: '160px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 상단 태그 */}
        <div
          className="absolute top-3 left-0 right-0 flex justify-center"
        >
          <div
            className="px-2.5 py-1 rounded-lg"
            style={{
              backgroundColor: '#F55449',
            }}
          >
            <span
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              상대에게 편지 보내기
            </span>
          </div>
        </div>

        {/* 이모지 일러스트 */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="rotate-180">
            <EmojiIllustration />
          </div>
        </div>

        {/* SOKSAK 텍스트 (우측 하단) */}
        <div className="absolute bottom-11 right-4">
          <span
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: '12px',
              color: '#FFFFFF',
              transform: 'rotate(-0.122rad)',
            }}
          >
            SOKSAK
          </span>
        </div>

        {/* 화살표 아이콘 (우측 하단) */}
        <div className="absolute bottom-6 right-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M6.75 13.5L11.25 9L6.75 4.5"
              stroke="#F55449"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}

// 이모지 일러스트 컴포넌트
function EmojiIllustration() {
  return (
    <svg
      width="101"
      height="98"
      viewBox="0 0 101 98"
      fill="none"
    >
      {/* 큰 원 (얼굴) */}
      <ellipse
        cx="50.5"
        cy="49"
        rx="50.5"
        ry="49"
        fill="#AEDEFA"
        style={{
          filter: 'url(#noise)',
        }}
      />

      {/* 왼쪽 볼 */}
      <ellipse
        cx="24.3"
        cy="61.7"
        rx="12.1"
        ry="12.6"
        fill="#F55449"
        fillOpacity="0.25"
        transform="rotate(180 24.3 61.7)"
        style={{
          filter: 'url(#noise)',
        }}
      />

      {/* 오른쪽 볼 */}
      <ellipse
        cx="76.6"
        cy="68"
        rx="12.1"
        ry="12.6"
        fill="#F55449"
        fillOpacity="0.25"
        transform="rotate(180 76.6 68)"
        style={{
          filter: 'url(#noise)',
        }}
      />

      {/* 왼쪽 눈 */}
      <ellipse
        cx="32.5"
        cy="39"
        rx="5.8"
        ry="5.8"
        fill="#000000"
        transform="rotate(-147.5 32.5 39)"
        style={{
          filter: 'url(#noise)',
        }}
      />

      {/* 오른쪽 눈 */}
      <ellipse
        cx="64.7"
        cy="42.2"
        rx="5.3"
        ry="5.5"
        fill="#000000"
        transform="rotate(-20.6 64.7 42.2)"
        style={{
          filter: 'url(#noise)',
        }}
      />

      {/* 입 (곡선) */}
      <path
        d="M38.5 58.5C42 62 48 62 51.5 58.5"
        stroke="#000000"
        strokeWidth="4.2"
        strokeLinecap="round"
        style={{
          filter: 'url(#noise)',
        }}
      />

      {/* 노이즈 필터 정의 */}
      <defs>
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="saturate"
            values="0"
            result="desaturatedNoise"
          />
          <feBlend
            in="SourceGraphic"
            in2="desaturatedNoise"
            mode="multiply"
          />
        </filter>
      </defs>
    </svg>
  );
}
