import { IoPlanet } from 'react-icons/io5';
import StampIcon from '@/assets/icons/StampIcon.svg';

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
      <div className='flex items-center justify-between mb-3 ty-body2 text-[var(--color-text-normal)]'>
        {userName}의 편지 여행
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
          <div className='inline-block px-2.5 py-0.5 rounded-2xl bg-[var(--color-primary-500)]'>
            <span className='ty-detailMedium text-white'>{weekLabel}</span>
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
              <span className='ty-detailMedium text-[var(--color-text-normal)]'>
                내가 받은 편지
              </span>
              <span className='ty-body4 text-[var(--color-primary-500)]'>{receivedCount}통</span>
            </div>

            {/* 내가 보낸 편지 */}
            <div className='flex items-center gap-1.5'>
              <span className='ty-detailMedium text-[var(--color-text-normal)]'>
                내가 보낸 편지
              </span>
              <span className='ty-body4 text-[var(--color-primary-500)]'>{sentCount}통</span>
            </div>
          </div>

          {/* 총 편지 수 */}
          <div className='flex items-center justify-center gap-1.5 py-1 mt-1'>
            <span className='ty-body4 text-[var(--color-text-normal)]'>그동안 내가 보낸 편지</span>
            <span className='ty-body2 text-[var(--color-primary-500)]'>총 {totalCount}통</span>
          </div>
        </div>

        {/* 진행 메시지 */}
        <div className='flex items-center justify-center gap-2 mt-1'>
          <p
            className='text-center ty-detailMedium text-[var(--color-text-alternative)]'
            style={{
              maxWidth: '219px',
              whiteSpace: 'pre-line',
            }}
          >
            {progressMessage}
          </p>
          <div className='flex-shrink-0'>
            <IoPlanet className='w-6 h-6 text-[var(--color-primary-500)]' />
          </div>
        </div>
      </div>
    </div>
  );
}
