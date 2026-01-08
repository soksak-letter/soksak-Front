// src/pages/friend/FriendDraftPage.tsx
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import BackHeader from '@/components/common/headers/BackHeader'; // 경로 맞춰줘
import ToggleSwitch from '@/components/common/ToggleSwitch'; // 이미 있다고 했던 토글

export default function FriendDraftPage() {
  const params = useParams();
  const friendId = params.friendId ?? '1';

  // TODO: friendName은 실제 데이터로 교체
  const friendName = useMemo(() => '파란수박', []);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const count = content.length;
  const max = 500;

  return (
    <div className='min-h-screen bg-[#FFFFFF]'>
      <BackHeader
        title={`${friendName}님에게 보내는 편지`}
        rightElement={<button className='text-[14px] font-medium'>꾸미기</button>}
      />

      <main className='px-5 pb-[120px]'>
        {/* 상단 안내 바 */}
        <div className='mt-4 flex items-center justify-between rounded-2xl bg-[#F2F2F2] px-4 py-3'>
          <div className='flex items-center gap-2 text-[13px] text-[#6F6F6F]'>
            <span className='inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#CFCFCF] text-[12px]'>
              ?
            </span>
            오늘의 질문이 궁금하다면?
          </div>

          {/* 프로필 원형 (나중에 이미지) */}
          <div className='h-10 w-10 rounded-full bg-[#7A4DFF] text-white flex items-center justify-center font-bold'>
            조
          </div>
        </div>

        {/* 작성 카드 */}
        <div className='mt-4 rounded-2xl bg-[#F2F2F2] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]'>
          {/* 제목 */}
          <div className='px-4 pt-4'>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='제목'
              className='w-full rounded-xl bg-[#EDEDED] px-4 py-3 text-[14px] outline-none placeholder:text-[#9B9B9B]'
            />
          </div>

          {/* 본문 */}
          <div className='px-4 pb-4 pt-3'>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, max))}
              placeholder={`편지를 읽고 이어서 얘기해보고 싶은 내용이나 주제가 있나요?\n없다면 오늘의 질문을 확인하고, 질문에 대해 새롭게 대화를\n나눠보세요.`}
              className='h-[320px] w-full resize-none rounded-xl bg-[#EDEDED] px-4 py-4 text-[14px] leading-[22px] outline-none placeholder:text-[#9B9B9B]'
            />
          </div>
        </div>

        {/* 글자수 */}
        <div className='mt-2 text-right text-[12px] text-[#6F6F6F]'>
          {count}/{max}
        </div>

        {/* 공개 토글 */}
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-[14px] font-medium text-[#171717]'>오늘 하루 동안 편지 공개하기</p>
          <ToggleSwitch checked={isPublic} onChange={setIsPublic} />
        </div>

        {/* 안내 문구 */}
        <p className='mt-4 text-[12px] leading-[18px] text-[#6F6F6F]'>
          비방의 언어가 담기면 자동으로 필터링 돼요.
          <br />
          상대방에 대한 존중이 담긴 언어로 따뜻한 편지를 전달해주세요.
        </p>

        {/* 저장/전송 버튼은 디자인 확정되면 하단 고정으로 추가하면 됨 */}
      </main>
    </div>
  );
}
