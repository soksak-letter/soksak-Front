interface QuestionCardProps {
  question: string;
  timeLeft: string;
  profileImageUrl?: string;
}

export default function QuestionCard({ question, timeLeft, profileImageUrl }: QuestionCardProps) {
  return (
    <div
      className='w-full px-4 py-2.5'
      style={{
        backgroundColor: '#FAFAFA', // rgb(250, 250, 250) - 피그마: rgb(0.98, 0.98, 0.98)
      }}
    >
      <div className='flex items-center gap-10'>
        {/* 질문 텍스트 영역 */}
        <div className='flex-1 flex flex-col gap-2'>
          {/* 질문 */}
          <h2
            className='whitespace-pre-line'
            style={{
              fontFamily: 'Hallym Gothic',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000',
            }}
          >
            {question}
          </h2>

          {/* 타이머 */}
          <p
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '25.6px',
              color: '#000000',
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: '#F22619', // rgb(242, 38, 25) - 피그마: rgb(0.950, 0.150, 0.110)
              }}
            >
              {timeLeft}
            </span>{' '}
            후에 질문이 사라져요.
          </p>
        </div>

        {/* 프로필 이미지 */}
        {profileImageUrl && (
          <div
            className='flex-shrink-0 rounded-full overflow-hidden'
            style={{
              width: '47px',
              height: '48px',
              border: '0.5px solid #E2E2E2',
            }}
          >
            <img src={profileImageUrl} alt='프로필' className='w-full h-full object-cover' />
          </div>
        )}
      </div>
    </div>
  );
}
