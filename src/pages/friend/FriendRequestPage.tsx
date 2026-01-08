import React, { useMemo, useState } from 'react';

import TitleHeader from '@/components/common/headers/TitleHeader';
import { Button } from '@/components/common/Button';
import { useModalStore } from '@/stores/modalStore';
import { useNavigate } from 'react-router-dom';
import FriendTopTabs from '@/components/FriendTopTabs';

type TabKey = 'inbox' | 'request';

type RequestUser = {
  id: number;
  name: string;
};

export default function FriendRequestPage() {
  const [tab, setTab] = useState<TabKey>('request');

  // 더미 데이터 (API 붙일 때만 교체)
  const received = useMemo<RequestUser[]>(
    () => [
      { id: 1, name: '파란수박' },
      { id: 2, name: '강아지' },
      { id: 3, name: '키위새' },
      { id: 4, name: '키위새' },
    ],
    [],
  );

  const sent = useMemo<RequestUser[]>(() => [{ id: 10, name: '파란수박' }], []);

  const openModal = useModalStore((s) => s.openModal);
  const navigate = useNavigate();

  const handleAccept = async (user: RequestUser) => {
    console.log('accept:', user);
    // TODO: accept API 호출
    // await acceptFriendRequest(user.id);

    // 친구 추가 성공 모달 오픈
    openModal('friendAdded', {
      friendName: user.name,

      // 확인 버튼
      onConfirm: () => {},

      // 친구에게 편지 쓰기 버튼
      onWriteLetter: () => {
        // navigate(`/friend/${user.id}/posts`);
      },
    });
  };

  const handleReject = (user: RequestUser) => {
    // TODO: reject/cancel API
    console.log('reject:', user);
  };

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      <TitleHeader title='친구' />

      <main className='px-5 pb-24'>
        {/* 상단 탭(친구 목록 / 친구 신청) */}
        <FriendTopTabs
          value='request'
          onChange={(tab) => {
            if (tab === 'inbox') {
              navigate('/friend/inbox');
            }
          }}
        />

        {/* 본문 */}
        {tab === 'request' ? (
          <div className='mt-5 space-y-8 '>
            <Section title='받은 신청'>
              {received.length === 0 ? (
                <EmptyState text='받은 신청이 없어요' />
              ) : (
                <div className='w-[343px] rounded-xl space-y-2'>
                  {received.map((u) => (
                    <RequestRow
                      key={u.id}
                      name={u.name}
                      right={
                        <div className='flex gap-2 '>
                          <Button
                            color='grey'
                            size='small3'
                            onClick={() => handleReject(u)}
                            className='min-w-[72px]'
                          >
                            거절
                          </Button>
                          <Button
                            color='primary'
                            size='small2'
                            onClick={() => handleAccept(u)}
                            className='min-w-[88px]'
                          >
                            친구 추가
                          </Button>
                        </div>
                      }
                    />
                  ))}
                </div>
              )}
            </Section>

            <Section title='보낸 신청'>
              {sent.length === 0 ? (
                <EmptyState text='보낸 신청이 없어요' />
              ) : (
                <div className='space-y-3'>
                  {sent.map((u) => (
                    <RequestRow
                      key={u.id}
                      name={u.name}
                      right={
                        <Button
                          color='black'
                          size='small3'
                          onClick={() => handleReject(u)}
                          className='min-w-[72px]'
                        >
                          거절
                        </Button>
                      }
                    />
                  ))}
                </div>
              )}
            </Section>
          </div>
        ) : (
          <div className='mt-10'>todo</div>
        )}
      </main>
    </div>
  );
}

/** -----------------------------
 * 내부 컴포넌트들
 * ----------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className='mb-3 text-sm font-semibold text-[#171717]'>{title}</h2>
      {children}
    </section>
  );
}

function RequestRow({ name, right }: { name: string; right: React.ReactNode }) {
  return (
    <div className='w-[343px] h-[80px] flex items-center justify-between rounded-xl  bg-white px-4 py-4 shadow-[0_0_10px_rgba(0,0,0,0.04)] '>
      <p className='text-sm font-semibold text-[#171717]'>{name}</p>
      {right}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className='rounded-2xl border border-dashed border-[#E6E6E6] bg-[#FAFAFA] px-4 py-8 text-center text-sm text-[#9B9B9B]'>
      {text}
    </div>
  );
}
