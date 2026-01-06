interface LetterJourneyProps {
  userName: string;
  weekLabel: string;
  receivedCount: number;
  sentCount: number;
  totalCount: number;
  progressMessage: string;
}

export default function LetterJourney({
  userName,
  weekLabel,
  receivedCount,
  sentCount,
  totalCount,
  progressMessage,
}: LetterJourneyProps) {
  return (
    <div className="w-full px-4 py-2.5">
      {/* 전체 컨테이너 */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          backgroundColor: '#FFF9F6', // rgb(255, 249, 246) - 피그마: rgb(0.999, 0.976, 0.966)
        }}
      >
        {/* 우표 스탬프 (오른쪽 상단) */}
        <div className="absolute top-3 right-3 z-10">
          <StampIcon />
        </div>

        <div className="px-4 py-2.5">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-3">
            <h3
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '25.6px',
                color: '#000000',
              }}
            >
              {userName}의 편지 여행
            </h3>
          </div>

          {/* 기간 태그 */}
          <div className="mb-3">
            <div
              className="inline-block px-2.5 py-0.5 rounded-lg"
              style={{
                backgroundColor: '#F55449', // rgb(245, 84, 73)
              }}
            >
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '19.2px',
                  color: '#FFFFFF',
                }}
              >
                {weekLabel}
              </span>
            </div>
          </div>

          {/* 통계 섹션 */}
          <div className="mb-1">
            {/* 받은/보낸 편지 */}
            <div
              className="flex items-center gap-4 py-1.5"
              style={{
                borderBottom: '1px solid #8C8C8C',
              }}
            >
              {/* 내가 받은 편지 */}
              <div className="flex items-center gap-1.5">
                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '19.2px',
                    color: '#000000',
                  }}
                >
                  내가 받은 편지
                </span>
                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '23.8px',
                    color: '#F55449',
                  }}
                >
                  {receivedCount}통
                </span>
              </div>

              {/* 내가 보낸 편지 */}
              <div className="flex items-center gap-1.5">
                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '19.2px',
                    color: '#000000',
                  }}
                >
                  내가 보낸 편지
                </span>
                <span
                  style={{
                    fontFamily: 'Pretendard',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '23.8px',
                    color: '#F55449',
                  }}
                >
                  {sentCount}통
                </span>
              </div>
            </div>

            {/* 총 편지 수 */}
            <div className="flex items-center justify-center gap-1.5 py-1 mt-1">
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '23.8px',
                  color: '#000000',
                }}
              >
                그동안 내가 보낸 편지
              </span>
              <span
                style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#F55449',
                }}
              >
                총 {totalCount}통
              </span>
            </div>
          </div>

          {/* 진행 메시지 */}
          <div className="flex items-center justify-center gap-2 mt-1">
            <p
              className="text-center"
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#595959',
                maxWidth: '219px',
              }}
            >
              {progressMessage}
            </p>
            <div className="flex-shrink-0">
              <PlanetIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 우표 아이콘 컴포넌트
function StampIcon() {
  return (
    <svg
      width="84"
      height="91"
      viewBox="0 0 84 91"
      fill="none"
      style={{
        transform: 'rotate(0.194rad)',
      }}
    >
      {/* 우표 테두리 */}
      <rect
        x="2"
        y="2"
        width="80"
        height="87"
        rx="4"
        stroke="#F55449"
        strokeWidth="6.87"
        fill="none"
      />

      {/* 흰색 삼각형들 */}
      <g opacity="1">
        <rect
          x="20"
          y="41"
          width="38"
          height="26"
          fill="white"
        />
        <polygon
          points="20,33 41,44 62,33"
          fill="white"
        />
      </g>

      {/* SOKSAK 텍스트 */}
      <text
        x="28"
        y="38"
        fill="#F55449"
        fontFamily="Pretendard"
        fontWeight="600"
        fontSize="17"
        transform="rotate(-15.6 28 38)"
      >
        S
      </text>
      <text
        x="39"
        y="35"
        fill="#F55449"
        fontFamily="Pretendard"
        fontWeight="600"
        fontSize="17"
        transform="rotate(-4.3 39 35)"
      >
        O
      </text>
      <text
        x="50"
        y="34"
        fill="#F55449"
        fontFamily="Pretendard"
        fontWeight="600"
        fontSize="17"
        transform="rotate(4.8 50 34)"
      >
        K
      </text>
      <text
        x="28"
        y="53"
        fill="#F55449"
        fontFamily="Pretendard"
        fontWeight="600"
        fontSize="17"
        transform="rotate(-8.6 28 53)"
      >
        S
      </text>
      <text
        x="39"
        y="51"
        fill="#F55449"
        fontFamily="Pretendard"
        fontWeight="600"
        fontSize="17"
        transform="rotate(-1.2 39 51)"
      >
        A
      </text>
      <text
        x="50"
        y="50"
        fill="#F55449"
        fontFamily="Pretendard"
        fontWeight="600"
        fontSize="17"
        transform="rotate(6.4 50 50)"
      >
        K
      </text>
    </svg>
  );
}

// 행성 아이콘 컴포넌트
function PlanetIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
        fill="#F55449"
      />
    </svg>
  );
}
