import { IoPlanet } from 'react-icons/io5';
import StampIcon from '../../assets/icons/StampIcon.svg';

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
    <div className='w-full px-4 py-2.5'>
      {/* 헤더 */}
      <div className='flex items-center justify-between mb-3'>
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

      {/* 전체 컨테이너 */}
      <div
        className='relative rounded-lg overflow-hidden px-4 py-4'
        style={{
          backgroundColor: '#FFF9F6', // rgb(255, 249, 246) - 피그마: rgb(0.999, 0.976, 0.966)
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 첫 번째 우표 스탬프 (오른쪽 상단) */}
        <div className='absolute z-10' style={{ top: '-15px', right: '-40px' }}>
          <img
            src={StampIcon}
            alt='Stamp'
            style={{
              width: '84px',
              height: '91px',
              transform: 'rotate(0.194rad)',
              opacity: 0.2,
            }}
          />
        </div>

        {/* 두 번째 우표 스탬프 (왼쪽 하단) */}
        <div className='absolute z-10' style={{ bottom: '20px', left: '-50px' }}>
          <img
            src={StampIcon}
            alt='Stamp'
            style={{
              width: '84px',
              height: '91px',
              transform: 'rotate(-0.4rad)',
              opacity: 0.2,
            }}
          />
        </div>

        {/* 기간 태그 */}
        <div className='mb-[5px]'>
          <div
            className='inline-block px-2.5 py-0.5 rounded-2xl'
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
        <div className='mb-1 flex flex-col items-center'>
          {/* 받은/보낸 편지 */}
          <div
            className='flex items-center gap-4 py-1.5'
            style={{
              borderBottom: '1px solid #FFC9C6',
            }}
          >
            {/* 내가 받은 편지 */}
            <div className='flex items-center gap-1.5'>
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
            <div className='flex items-center gap-1.5'>
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
          <div className='flex items-center justify-center gap-1.5 py-1 mt-1'>
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
        <div className='flex items-center justify-center gap-2 mt-1'>
          <p
            className='text-center'
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '19.2px',
              color: '#595959',
              maxWidth: '219px',
              whiteSpace: 'pre-line',
            }}
          >
            {progressMessage}
          </p>
          <div className='flex-shrink-0'>
            <IoPlanet size={24} color='#F55449' />
          </div>
        </div>
      </div>
    </div>
  );
}
