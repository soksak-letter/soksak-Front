import QuestionCard from '../../pages/main/QuestionCard';

interface QuestionSectionProps {
  question: string;
  timeLeft: string;
  profileImageUrl?: string;
  showGuidance?: boolean;
}

export default function QuestionSection({
  question,
  timeLeft,
  profileImageUrl,
  showGuidance = false,
}: QuestionSectionProps) {
  return (
    <section>
      {/* 질문 카드 */}
      <QuestionCard question={question} timeLeft={timeLeft} profileImageUrl={profileImageUrl} />

      {/* 안내 메시지 (피드 페이지에서만 표시) */}
      {showGuidance && (
        <div
          className='px-4 py-2'
          style={{
            backgroundColor: '#FAFAFA',
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '23.8px',
              color: '#595959',
            }}
          >
            공개된 편지 내용에 마음을 남기고, 공감을 나눠보세요.
          </p>
        </div>
      )}
    </section>
  );
}
