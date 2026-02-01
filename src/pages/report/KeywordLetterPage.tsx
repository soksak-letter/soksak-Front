import BackHeader from '@/components/common/headers/BackHeader';
import TitleHeader from '@/components/common/headers/TitleHeader';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SortOrder = 'latest' | 'oldest';

type InboxSelfLetterItem = {
  letterId: number;
  // self(나에게 받은 편지)는 "스레드"로 묶어서 보여주는 화면이 아닐 수 있어서 threadId는 옵션으로
  threadId?: number;

  question: string;
  senderName: string;
  receivedAt: string;
};
const parseDotDate = (s: string) => {
  const [y, m, d] = s.split('.').map((v) => Number(v));
  return new Date(y, (m ?? 1) - 1, d ?? 1).getTime();
};

export default function KeywordLetterPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');

  // mock data (나에게 받은 편지)
  const items = useMemo<InboxSelfLetterItem[]>(
    () => [
      {
        letterId: 11,
        question: '당신의 인생에 가장 큰 영감을 주는 사람은 누구인가요?',
        senderName: '파란수박',
        receivedAt: '2026.1.3',
        isUnread: true,
      },
      {
        letterId: 12,
        question: '당신의 인생에 가장 큰 영감을 주는 사람은 누구인가요?',
        senderName: '파란수박',
        receivedAt: '2026.1.4',
        isUnread: true,
      },
    ],
    [],
  );
  const filtered = useMemo(() => {
    const k = keyword.trim();

    const result = !k
      ? items
      : items.filter((x) => x.question.includes(k) || x.senderName.includes(k));

    return [...result].sort((a, b) => {
      const ta = parseDotDate(a.receivedAt);
      const tb = parseDotDate(b.receivedAt);
      return sortOrder === 'latest' ? tb - ta : ta - tb;
    });
  }, [items, keyword, sortOrder]);

  return (
    <div className='min-h-screen bg-[var(--color-bg-500)]'>
      <BackHeader title='키워드별 편지 조각' />
    </div>
  );
}
