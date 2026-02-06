import BackHeader from '@/components/common/headers/BackHeader';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { HiPaperAirplane } from 'react-icons/hi2';
import { HiEnvelope } from 'react-icons/hi2';
import { HiClock } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import { useActivityStore } from '@/stores/activityStore';
import { useMyProfile } from '@/hooks/useMyProfile';
import { ROUTES } from '@/routes/paths';

const MyPage = () => {
  const navigate = useNavigate();
  const handleProfilEedit = () => {
    return navigate(ROUTES.auth.profile);
  };

  // 관심사 조회 (enabled는 true로 두면 됨)
  const { data: response, isLoading, isError } = useMyProfile();

  const totalSeconds = useActivityStore((s) => s.totalSeconds);
  const totalUsageMinutes = Math.floor(totalSeconds / 60);

  // 2. 로딩 및 에러 처리 (필수)
  if (isLoading) return <div className='w-[375px] mx-auto py-20 text-center'>로딩 중...</div>;
  if (isError || !response)
    return <div className='w-[375px] mx-auto py-20 text-center'>데이터를 가져오지 못했습니다.</div>;
  // 온도값을 0~100으로 clamp
  const safeTemp = Math.max(0, Math.min(100, response.temperatureAvg));

  return (
    <div className='w-[375px] min-h-screen mx-auto bg-[var(--color-bg-500)]'>
      {/* Header */}
      <div className='bg-white'>
        <BackHeader title='마이페이지' onBack={() => navigate('/home/main')} />
      </div>

      {/* Content */}
      <div className='px-4 py-4 flex flex-col gap-4'>
        {/* Profile Section */}
        <section className='pb-4 flex items-end gap-2'>
          {/* Avatar */}
          <div className='w-[90px] h-[90px] rounded-full bg-[var(--color-primary-100)] flex-shrink-0' />

          {/* User Info */}
          <div className='flex-1 min-w-0 pb-1'>
            <p className='ty-body4 text-[var(--color-text-normal)]'>{response.nickname}</p>
            <p className='ty-body5 text-[var(--color-text-assistive)] truncate'>{response.email}</p>
          </div>

          {/* Edit Button */}
          <button
            type='button'
            className='flex-shrink-0 px-3 py-2 border border-[var(--color-line-normal)] rounded-xl ty-body5 text-[var(--color-text-normal)]'
            onClick={handleProfilEedit}
          >
            프로필 수정
          </button>
        </section>

        {/* Interests Section */}
        <section className='bg-white rounded-xl p-4 shadow-[0_0_10px_rgba(0,0,0,0.1)]'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='ty-body2 text-[var(--color-text-normal)]'>현재 나의 관심사</h2>
            <button
              type='button'
              onClick={() => navigate('/onboarding/profile-select?mode=edit')}
              className='flex items-center gap-1 ty-body5 text-[var(--color-text-assistive)]'
            >
              수정
              <IoChevronForwardSharp className='w-4 h-4' />
            </button>
          </div>

          <div className='flex gap-2 flex-wrap justify-center'>
            {response.interests.map((item) => (
              <span
                key={item.id}
                className='px-5 py-2 rounded-full border border-[var(--color-line-normal)] ty-body3 text-[var(--color-text-normal)]'
              >
                {item.name}
              </span>
            ))}
          </div>
        </section>

        {/* Temperature Section */}
        <section className='bg-white rounded-xl p-4 shadow-[0_0_10px_rgba(0,0,0,0.1)]'>
          <h2 className='ty-body2 text-[var(--color-text-normal)] mb-8'>현재 나의 온도</h2>

          {/* Temperature Gauge */}
          <div className='mb-8'>
            <div className='relative h-2 bg-[var(--color-primary-100)] rounded-full'>
              {/* Filled portion */}
              <div
                className='absolute left-0 top-0 h-full bg-[var(--color-primary-400)] rounded-full'
                style={{ width: `${safeTemp}%` }}
              />
              {/* Indicator circle */}
              <div
                className='absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[var(--color-primary-400)] rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.1)]'
                style={{ left: `calc(${safeTemp}% - 10px)` }}
              />
            </div>

            {/* Labels */}
            <div className='relative flex justify-between mt-2'>
              <span className='ty-body5 text-[var(--color-text-normal)]'>0도</span>
              <span
                className='absolute ty-body5 text-[var(--color-primary-400)] -translate-x-1/2'
                style={{ left: `${safeTemp}%` }}
              >
                {safeTemp}도
              </span>
              <span className='ty-body5 text-[var(--color-text-normal)]'>100도</span>
            </div>
          </div>

          {/* Stats */}
          <div className='flex flex-col gap-4 mt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <HiPaperAirplane className='w-5 h-5 text-[var(--color-primary-400)] rotate-[-45deg]' />
                <span className='ty-body5 text-[var(--color-text-normal)]'>내가 보낸 편지</span>
              </div>
              <span className='ty-body4 text-[var(--color-text-normal)]'>
                {response.sentLettersCount}통
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <HiEnvelope className='w-5 h-5 text-[var(--color-primary-400)]' />
                <span className='ty-body5 text-[var(--color-text-normal)]'>내가 받은 편지</span>
              </div>
              <span className='ty-body4 text-[var(--color-text-normal)]'>
                {response.receivedLettersCount}통
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <HiClock className='w-5 h-5 text-[var(--color-primary-400)]' />
                <span className='ty-body5 text-[var(--color-text-normal)]'>서비스 총 이용시간</span>
              </div>
              <span className='ty-body4 text-[var(--color-text-normal)]'>
                {totalUsageMinutes}분
              </span>
            </div>
          </div>
        </section>

        {/* 1:1 Support Section */}
        <button
          type='button'
          onClick={() => navigate('/my/inquiry')}
          className='bg-white rounded-xl p-4 shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full text-left ty-body5 text-[var(--color-text-normal)]'
        >
          1:1 문의
        </button>
      </div>
    </div>
  );
};

export default MyPage;
