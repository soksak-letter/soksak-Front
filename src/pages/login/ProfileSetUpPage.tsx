import { Button } from '@/components/common/Button';
import BackHeader from '@/components/common/headers/BackHeader';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Question from '@/assets/icons/Question.svg?react';
import { FaCamera } from 'react-icons/fa';
import { validate } from '@/utils/validate';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { patchNickname, postProfileImage } from '@/api/auth';
import { useGlobalToast } from '@/components/toast/ToastProvider';
import { useMyProfile } from '@/hooks/useMyProfile';
import { useQueryClient } from '@tanstack/react-query';

const ProfileSetUpPage = () => {
  const { data: existingProfile, isPending: isProfileLoading } = useMyProfile();
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();
  const queryClient = useQueryClient();
  //  닉네임 입력 상태 관리
  const [nickname, setNickname] = useState('');

  // 툴팁(말풍선) 보임 여부 상태 관리
  const [showTooltip, setShowTooltip] = useState(false);
  //프로필 사진 업로드 상태 관리
  const [profileImage, setProfileImage] = useState<File | null>(null); // 업로드할 파일 객체
  const [previewUrl, setPreviewUrl] = useState<string>(''); // 화면에 보여줄 미리보기 URL
  const cacheBuster = useMemo(() => Date.now(), []);

  //프로필 수정인지 프로필입력인지 확인
  const isEditMode = !!(
    existingProfile?.nickname?.trim() || existingProfile?.profileImageUrl?.trim()
  );

  // 파일 인풋 제어를 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  //닉네임이 성공했는지 기록하는 상태
  const [isNicknameSaved, setIsNicknameSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 유효성 검사 결과 객체 받기
  const validationResult = validate.nickname(nickname);
  const isValid = validationResult.success;

  // 2. 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      // 미리보기 URL 생성
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setProfileImage(file); // 실제 파일 저장하기
    }
  };

  // 카메라 버튼 클릭 시 hidden input 실행
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // 3. 완료 버튼 핸들러 (API 연동)
  const handleOnboarding = async () => {
    if (!isValid || isLoading) return;

    setIsLoading(true);
    try {
      // Step 1: 닉네임 변경 (성공한 적이 없을 때만 실행)
      if (!isNicknameSaved) {
        await patchNickname({ nickname });
        setIsNicknameSaved(true); // 성공 기록
      }

      // Step 2: 이미지 업로드
      if (profileImage) {
        await postProfileImage(profileImage);
      }
      await queryClient.invalidateQueries({ queryKey: ['myProfile'] });

      // ✅ 조건에 따른 페이지 이동
      if (isEditMode) {
        navigate(ROUTES.my.mypage); // 기존 유저는 마이페이지로
      } else {
        navigate(ROUTES.onboarding.start); // 신규 유저는 온보딩으로
      }
    } catch (error: unknown) {
      // 상세한 에러 피드백
      showToast('설정 중 에러가 발생했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 테두리 색상 결정
  const getBorderColor = () => {
    if (nickname.length === 0) return 'border-[var(--color-grey-100)]';
    if (!isValid)
      return 'border-[var(--color-status-alert)] focus:border-[var(--color-status-alert)]'; // 실패: 빨강
    return 'border-[var(--color-secondary-800)] focus:border-[var(--color-grey-800)]'; // 성공: 파란
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 입력 길이 제한 (UX용)
    if (value.length <= 16) {
      setNickname(value);
      // 닉네임을 수정하면 다시 저장해야 하므로 상태 초기화
      setIsNicknameSaved(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  useEffect(() => {
    if (existingProfile) {
      setNickname(existingProfile.nickname || '');
      setPreviewUrl(existingProfile.profileImageUrl || '');
      // 이미지는 파일 객체가 아니므로 profileImage는 null 유지 (수정할 때만 담김)
    }
  }, [existingProfile]);
  return (
    <div className='w-[375px] h-screen bg-[#FAFAFA]! mx-auto flex flex-col '>
      <div className='[&>*]:!bg-[#FAFAFA]'>
        <BackHeader title='프로필 설정' />
      </div>
      {/* 프로필 영역 */}
      <div className='flex flex-col items-center mt-10 mb-[16px]'>
        <div className='relative'>
          <div className='w-[128px] h-[128px] bg-[var(--color-primary-100)] rounded-full mb-3 overflow-hidden'>
            {previewUrl ? (
              <img
                src={previewUrl.startsWith('blob:') ? previewUrl : `${previewUrl}?t=${cacheBuster}`}
                alt='프로필 미리보기'
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-[var(--color-primary-100)]' />
            )}
          </div>
          {/* 숨겨진 파일 input */}
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageChange}
            className='hidden'
          />
          <button
            type='button'
            onClick={handleCameraClick}
            className='absolute bottom-2 right-3 w-8 h-8 bg-[var(--color-primary-500)] rounded-full flex items-center justify-center border-2 border-[#FAFAFA] text-white'
            aria-label='프로필 사진 변경'
          >
            <FaCamera size={14} />
          </button>
        </div>
      </div>

      {/*  닉네임 입력 영역 */}
      <div className='flex flex-col gap-2 px-[16px]'>
        <label className='ty-body4'>닉네임</label>
        <input
          type='text'
          value={nickname}
          onChange={handleNicknameChange}
          placeholder='닉네임'
          className={`w-full h-[48px] px-4 rounded-lg border 
          bg-white text-[16px] text-[var(--color-text-normal)] placeholder-[var(--color-text-assistive)] 
          outline-none
          ${getBorderColor()}`}
          // 스페이스바(Space) 키가 눌리면 동작 취소(preventDefault)
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
            }
          }}
        />
        <p className='ty-detail text-[var(--color-text-assistive)] mt-1'>
          닉네임은 최대 16자리까지 입력 가능합니다.
        </p>

        {/* 닉네임 규칙 툴팁 */}
        <div className='relative w-fit mt-2'>
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className='flex items-center gap-[8px] mt-2'
          >
            {/*튤팁 */}
            <Question />
            <span className='ty-detailMedium'>닉네임 규칙이 궁금하신가요?</span>
          </button>

          {/* 말풍선 (조건부 렌더링) */}
          {showTooltip && (
            <div className='absolute top-8 left-[-4px] z-10'>
              {/* 말풍선 꼬리 (삼각형) */}
              <div
                className='absolute -top-[8px] left-[5px] w-0 h-2.5
                border-l-[6px] border-r-[6px] border-b-[8px]
                border-l-transparent border-r-transparent border-b-[var(--color-grey-100)] '
              ></div>

              {/* 말풍선 본문 */}
              <div className='bg-[var(--color-grey-100)] px-2.5 py-1.5 rounded-lg w-max '>
                <p className='ty-detail'>지금 정한 닉네임은 나와 친구에게만 보입니다!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='fixed bottom-[40px] left-0 right-0 mx-auto w-full max-w-[375px] px-4'>
        <Button onClick={handleOnboarding} disabled={!isValid || isLoading || isProfileLoading}>
          {isEditMode ? '완료' : '시작하기'}
        </Button>
      </div>
    </div>
  );
};
export default ProfileSetUpPage;
