import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoShareOutline } from 'react-icons/io5';
import iosGuideImage from '@/assets/img_ios_guide.png';

export default function IosNotificationGuideModal() {
  const navigate = useNavigate();
  const close = () => navigate(-1);

  const guideText = 'ty-body3 leading-[150%] tracking-[-0.01em] text-white';

  // 배경 스크롤 완전 차단 (body + touchmove)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const preventTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    // iOS에서 특히 필요: passive:false
    document.addEventListener('touchmove', preventTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
      document.removeEventListener('touchmove', preventTouchMove);
    };
  }, []);

  return (
    <div className='fixed inset-0 z-[9999]'>
      {/* ✅ dim + blur (피그마 느낌) */}
      <button
        type='button'
        onClick={close}
        className='absolute inset-0 bg-black/72 backdrop-blur-[6px]'
      />

      {/* content wrapper: AppShell과 동일한 375px */}
      <div className='relative mx-auto h-full w-[375px] overflow-hidden px-5 pt-[86px]'>
        <div className='h-full overflow-y-auto overscroll-contain'>
          {/* 콘텐츠 */}
          <div className='text-center'>
            <p className={guideText}>
              알림을 받기 전, 홈 화면에 추가해야 해요.
              <br />
              아래의 안내에 따라주세요!
            </p>
            {/* 숫자 박스 아래로 텍스트 오게 + 가운데 정렬 */}
            <div className='mt-10 space-y-6'>
              {[
                'Safari 혹은 Chrome 환경에서 하단의 공유 아이콘을 선택해주세요.',
                '홈 화면에 추가를 선택해주세요.',
                '핸드폰 화면에서 앱 아이콘 클릭!',
                '안내에 따라 알림을 허용해주세요.\n3일 뒤, 내가 보낸 편지 알림이 도착합니다!',
              ].map((t, idx) => (
                <div
                  key={idx}
                  className={`${guideText} flex flex-col items-center text-center whitespace-pre-line`}
                >
                  <span className='inline-flex items-center justify-center w-[30px] h-[30px] rounded-md bg-[#F5544C] text-white font-bold text-[14px] leading-none'>
                    {idx + 1}
                  </span>
                  {/* 텍스트 영역 */}
                  <div className='mt-[8px]'>
                    {idx === 0 ? (
                      <>
                        {/* 첫 줄 */}
                        <div>Safari 혹은 Chrome 환경에서 하단의</div>
                        {/* 둘째 줄: 아이콘 + 텍스트 */}
                        <div className='mt-[4px] flex items-center justify-center gap-[6px]'>
                          <IoShareOutline className='w-[21px] h-[21px]' />
                          <span>공유 아이콘을 선택해주세요.</span>
                        </div>
                      </>
                    ) : (
                      <span>{t}</span>
                    )}
                  </div>
                  {idx === 1 && (
                    <img
                      src={iosGuideImage}
                      alt='iOS 홈 화면에 추가 가이드'
                      className='mt-4 w-[203px] h-[141px] rounded-md'
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type='button'
            onClick={close}
            className='mt-[34px] mb-[62px] block w-full text-center ty-body1 leading-[150%] tracking-[-0.01em] text-white underline underline-offset-2'
          >
            이해했어요
          </button>
        </div>
      </div>
    </div>
  );
}
