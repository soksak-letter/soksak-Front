import React, { useMemo } from 'react';

import TitleHeader from '@/components/common/headers/TitleHeader';
import { Button } from '@/components/common/Button';
import { useModalStore } from '@/stores/modalStore';
import { useNavigate } from 'react-router-dom';
import FriendTopTabs from '@/components/FriendTopTabs';
import { useIncomingFriendRequests } from '@/hooks/friend/useIncomingFriendRequests';
import { useOutgoingFriendRequests } from '@/hooks/friend/useOutgoingFriendRequests';
import { useAcceptFriendRequest } from '@/hooks/friend/useAcceptFriendRequest';
import { useRejectFriendRequest } from '@/hooks/friend/useRejectFriendRequest';
import { useCancelFriendRequest } from '@/hooks/friend/useCancelFriendRequest';

type RequestUser = {
  id: number;
  name: string;
};

export default function FriendRequestPage() {
  const navigate = useNavigate();
  const openModal = useModalStore((s) => s.openModal);

  const { data: incoming = [] } = useIncomingFriendRequests();
  const { data: outgoing = [] } = useOutgoingFriendRequests();

  const acceptMutation = useAcceptFriendRequest();
  const rejectMutation = useRejectFriendRequest();
  const cancelMutation = useCancelFriendRequest();

  const received = useMemo<RequestUser[]>(
    () =>
      incoming.map((r) => ({
        id: r.requesterUserId,
        name: String(r.requesterUserId), // TODO: nickname 내려오면 교체
      })),
    [incoming],
  );

  const sent = useMemo<RequestUser[]>(
    () =>
      outgoing.map((r) => ({
        id: r.receiverUserId,
        name: String(r.receiverUserId), // TODO: nickname 내려오면 교체
      })),
    [outgoing],
  );

  const handleAccept = (user: RequestUser) => {
    acceptMutation.mutate(user.id, {
      onSuccess: () => {
        openModal('friendAdded', {
          friendName: user.name,
          onConfirm: () => {},
          onWriteLetter: () => {
            // TODO: letterId 연결
          },
        });
      },
    });
  };

  const handleReject = (user: RequestUser) => {
    rejectMutation.mutate(user.id);
    console.log('reject:', user);
  };

  const handleCancel = (user: RequestUser) => {
    cancelMutation.mutate(user.id);
  };

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      <TitleHeader title='친구' />

      <main className='px-5 pb-24'>
        <div className='mx-auto w-full max-w-[343px]'>
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
                        <div className='flex gap-[8px] '>
                          <Button color='grey' size='small3' onClick={() => handleReject(u)}>
                            거절
                          </Button>
                          <Button color='primary' size='small2' onClick={() => handleAccept(u)}>
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
                <div className='space-y-2'>
                  {sent.map((u) => (
                    <RequestRow
                      key={u.id}
                      name={u.name}
                      right={
                        <Button color='black' size='small3' onClick={() => handleReject(u)}>
                          거절
                        </Button>
                      }
                    />
                  ))}
                </div>
              )}
            </Section>
          </div>
        </div>
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
      <h2 className='mb-3 ty-body2'>{title}</h2>
      {children}
    </section>
  );
}

function RequestRow({ name, right }: { name: string; right: React.ReactNode }) {
  return (
    <div className='w-[343px] h-[80px] flex items-center justify-between rounded-xl  bg-white px-4 py-4 shadow-[0_0_10px_rgba(0,0,0,0.04)] '>
      <p className='ty-body2'>{name}</p>
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
