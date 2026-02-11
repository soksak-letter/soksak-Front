import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg';

interface WriteLetterButtonsProps {
  onWriteToSelf: () => void;
  onWriteToOther: () => void;
}

export default function WriteLetterButtons({
  onWriteToSelf,
  onWriteToOther,
}: WriteLetterButtonsProps) {
  return (
    <div className='w-full flex gap-3 px-4 py-2.5'>
      {/* 나에게 편지 보내기 */}
      <button
        onClick={onWriteToSelf}
        className='relative flex-1 rounded-lg overflow-hidden'
        style={{
          width: '160px',
          height: '160px',
          backgroundColor: '#F55449', // rgb(245, 84, 73) - 피그마: rgb(0.960, 0.331, 0.300)
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 상단 태그 */}
        <div className='absolute top-3.5 left-5 right-0 flex justify-center'>
          <div
            className='px-3 py-1 rounded-2xl'
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
        <div className='absolute' style={{ left: '-15px', bottom: '-20px' }}>
          <img
            src={HappyModalIcon}
            alt='Character'
            style={{
              width: '101px',
              height: '98px',
              transform: 'rotate(-0.2rad)',
            }}
          />
        </div>

        {/* 화살표 아이콘 (우측 하단) */}
        <div className='absolute bottom-4 right-4'>
          <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <path
              d='M6.75 13.5L11.25 9L6.75 4.5'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </button>

      {/* 상대에게 편지 보내기 */}
      <button
        onClick={onWriteToOther}
        className='relative flex-1 rounded-lg overflow-hidden'
        style={{
          width: '160px',
          height: '160px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 상단 태그 */}
        <div className='absolute top-3 left-3 right-0 flex justify-center'>
          <div
            className='px-3 py-1.5 rounded-2xl'
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
        <div className='absolute' style={{ left: '-15px', bottom: '-20px' }}>
          <img
            src={HappyModalIcon}
            alt='Character'
            style={{
              width: '101px',
              height: '98px',
              transform: 'rotate(-0.2rad)',
            }}
          />
        </div>

        {/* 화살표 아이콘 (우측 하단) */}
        <div className='absolute bottom-4 right-4'>
          <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <path
              d='M6.75 13.5L11.25 9L6.75 4.5'
              stroke='#F55449'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
