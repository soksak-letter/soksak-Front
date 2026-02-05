import { useNavigate } from 'react-router-dom';
import SettingHeader from '@/components/common/SettingHeader';
import {
  HEADER_HEIGHT,
  PAGE_MAX_WIDTH,
  PAGE_PADDING_X,
  PAGE_PADDING_TOP,
} from '@/constants/settingLayout';
import { useNotices } from '@/hooks/setting/useNotices';
import { formatDate } from '@/utils/date';

// 공지사항 아이템 컴포넌트
interface NoticeItemProps {
  title: string;
  summary: string | null;
  createdAt: string;
  isLast?: boolean;
}

function NoticeItem({ title, summary, createdAt, isLast }: NoticeItemProps) {
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
          {summary && (
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '23.8px',
                color: '#000000',
              }}
            >
              {summary}
            </p>
          )}
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
          {formatDate(createdAt)}
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
  const { data, isLoading, isError } = useNotices();

  const handleBack = () => {
    navigate(-1);
  };

  const notices = data?.items ?? [];

  return (
    <div className='min-h-dvh bg-[#FAFAFA]'>
      <SettingHeader title='공지사항' onBack={handleBack} />
      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: HEADER_HEIGHT }} />

      {/* 메인 컨텐츠 */}
      <main
        className='mx-auto w-full'
        style={{
          maxWidth: PAGE_MAX_WIDTH,
          paddingLeft: PAGE_PADDING_X,
          paddingRight: PAGE_PADDING_X,
          paddingTop: PAGE_PADDING_TOP,
        }}
      >
        {isLoading && (
          <p style={{ fontFamily: 'Pretendard', fontSize: '14px', color: '#595959' }}>
            불러오는 중...
          </p>
        )}
        {isError && (
          <p style={{ fontFamily: 'Pretendard', fontSize: '14px', color: '#595959' }}>
            공지사항을 불러오지 못했습니다.
          </p>
        )}
        {!isLoading && !isError && notices.length === 0 && (
          <p style={{ fontFamily: 'Pretendard', fontSize: '14px', color: '#595959' }}>
            공지사항이 없습니다.
          </p>
        )}
        {notices.map((notice, index) => (
          <NoticeItem
            key={notice.id}
            title={notice.title}
            summary={notice.summary}
            createdAt={notice.createdAt}
            isLast={index === notices.length - 1}
          />
        ))}
      </main>
    </div>
  );
}
