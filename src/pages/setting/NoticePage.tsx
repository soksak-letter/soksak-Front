import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';

// 목업 데이터
const MOCK_NOTICES = [
  {
    id: 1,
    title: '오늘의 질문 업데이트 안내',
    content:
      '이번 주부터 오늘의 질문이 새롭게 개편되었습니다. 온보딩에서 선택해 주신 관심사와 최근 이용 패턴을 반영해, 조금 더 내 상황에 맞는 질문이 도착할 예정입니다. 질문이 너무 어렵게 느껴지거나, 받고 싶은 질문 톤이 있다면 의견을 남겨주세요. 앞으로도 계속 다듬어 나가겠습니다.',
    date: '2026.2.20',
  },
  {
    id: 2,
    title: '서비스 베타 오픈 안내',
    content:
      '안녕하세요, 속삭편지 팀입니다. 속삭편지가 베타 버전으로 오픈되었습니다. 아직은 부족한 부분이 많지만, 여러분의 일상과 마음을 함께 걸어갈 수 있는 서비스를 만들고 싶어요. 사용 중 불편한 점이나 개선 아이디어가 있다면 언제든지 문의하기를 통해 편하게 알려주세요.',
    date: '2026.2.15',
  },
];

// 공지사항 아이템 컴포넌트
interface NoticeItemProps {
  title: string;
  content: string;
  date: string;
  isLast?: boolean;
}

function NoticeItem({ title, content, date, isLast }: NoticeItemProps) {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 제목 + 내용 */}
        <div>
          <h3
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '25.6px',
              color: '#000000',
              marginBottom: '4px',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: 'Pretendard',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '23.8px',
              color: '#000000',
            }}
          >
            {content}
          </p>
        </div>

        {/* 날짜 */}
        <span
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '19.2px',
            color: '#595959',
          }}
        >
          {date}
        </span>
      </div>

      {/* 구분선 */}
      {!isLast && (
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#DEDEDE',
            margin: '16px 0',
          }}
        />
      )}
    </div>
  );
}

export default function NoticePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      <SettingHeader title='공지사항' onBack={handleBack} />
      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] px-[16px] pt-[36px]'>
        {MOCK_NOTICES.map((notice, index) => (
          <NoticeItem
            key={notice.id}
            title={notice.title}
            content={notice.content}
            date={notice.date}
            isLast={index === MOCK_NOTICES.length - 1}
          />
        ))}
      </main>
    </div>
  );
}
