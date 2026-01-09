import BackHeader from '@/components/common/headers/BackHeader';
import { SelectButton } from '@/components/common/SelectButton';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SleepIcon from '@/assets/icons/SleepIcon.svg?react';
import Toast from '@/components/common/Toast';

const LetterReportPage = () => {
  const navigate = useNavigate();

  // 선택된 신고 사유들을 관리하는 상태 (배열)
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  // 차단하기 토글 상태 (boolean)
  const [isBlocked, setIsBlocked] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

  //토스트 상태 관리 (Toast 파일 수정 필요..?)
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const reasons = [
    '욕설/비하',
    '혐오 표현',
    '성적 불쾌감',
    '스팸/광고',
    '도배/반복',
    '폭력/학대표현',
    '불법 행위 유도',
    '사칭/허위정보',
  ];

  // 사유 선택 토글 핸들러
  const handleReasonToggle = (reason: string) => {
    setSelectedReasons((prev) => {
      const newReasons = prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason];

      if (newReasons.length === 0) setIsBlocked(false);
      return newReasons;
    });
  };
  // 3초 뒤 메인으로 이동
  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [isCompleted, navigate]);

  //  차단하기 토글 핸들러
  const handleBlockToggle = (nextState: boolean) => {
    // 켜려고 하는데(nextState === true) && 사유가 하나도 없으면
    if (nextState && selectedReasons.length === 0) {
      setToastMessage('신고 사유를 선택해주세요.');
      setIsToastVisible(true); // 토스트 띄우기
      return; // 상태 변경 안 하고 함수 종료
    }

    // 사유가 있으면 정상적으로 토글 상태 변경
    setIsBlocked(nextState);
  };

  const handleSubmit = () => {
    // 선택된 사유가 0개이면 안내창 띄우기
    if (selectedReasons.length === 0) {
      setToastMessage('신고 사유를 선택해주세요.');
      setIsToastVisible(true); // 토스트 띄우기
      return;
    }
    setIsCompleted(true); // 완료 화면으로 전환
  };
  if (isCompleted) {
    return (
      <div className='w-[375px] h-screen mx-auto  flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center text-center gap-6'>
          <p className='ty-title2 text-medium text-[var(--color-dim)] mb-4'>신고가 완료됐어요.</p>
          <SleepIcon className='mb-8 ml-[30px]' />
          <p className='ty-body3 text-regular text-[#595959] mb-2'>
            상세 내용은 마이페이지에서 확인 가능합니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-[375px] h-screen relative mx-auto'>
      <div>
        <div className='flex justify-center items-center h-[77px]'>
          <BackHeader title='신고' rightElement={<button onClick={handleSubmit}>완료</button>} />{' '}
          {/*  헤더 */}
        </div>
        <div>
          {' '}
          {/* 프로필 영역 */}
          <div className='flex flex-col items-center mt-10 mb-8'>
            <div className='w-24 h-24 bg-[#FFC8C6] rounded-full mb-3'></div>
            <span className='ty-body2'>파란수박님</span>
          </div>
        </div>

        <div className='px-4'>
          {/* 안내 문구 */}
          <div className='mb-6'>
            <h2 className='ty-body2 mb-1'>개굴님, 신고 사유를 선택해주세요.</h2>
            <p className='ty-body5 text-[#595959]'>
              해당 내역은 마이페이지 - 신고 내역에서 확인할 수 있습니다.
            </p>
          </div>
          {/* 신고 사유 버튼 그리드 */}
          <div className='grid grid-cols-3 gap-y-[12px] gap-x-[8px] mb-8 place-items-center'>
            {reasons.map((reason) => {
              const isSelected = selectedReasons.includes(reason);
              return (
                <SelectButton
                  key={reason}
                  selected={isSelected}
                  onClick={() => handleReasonToggle(reason)}
                  className='w-full! h-[34px]! text-[13px]! px-3! '
                >
                  {reason}
                </SelectButton>
              );
            })}
          </div>
        </div>
      </div>

      <div className='absolute bottom-3 right-4 flex items-center mb-3'>
        <span className='mr-3 ty-body5 text-[#171717]'>차단하기</span>
        <ToggleSwitch
          checked={isBlocked}
          onCheckedChange={handleBlockToggle}
          className={!isBlocked ? '!bg-[#CBCCCD] [&>span]:!bg-[#E5E6E6]' : ''}
        />
      </div>
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
};
export default LetterReportPage;
