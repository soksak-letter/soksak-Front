import BackHeader from '@/components/common/headers/BackHeader';
import { SelectButton } from '@/components/common/SelectButton';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SleepIcon from '@/assets/icons/SleepIcon.svg?react';
import useToast from '@/hooks/useToast';
import ToastPopup from '@/components/ToastPopup';
import { useBlockUser } from '@/hooks/useModeration';
import {
  REPORT_REASONS,
  type LetterReportRequest,
  type ReportReason,
} from '@/types/dto/letterReport';
import { postLetterReport } from '@/api/letterReport';
import { useThreadFlowStore } from '@/stores/letterContextStore';

const LetterReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // state에서 letterId와 stamp 꺼내기
  const letterId = location.state?.letterId as number | undefined;
  const stampUrl = location.state?.stampUrl;
  const senderName = useThreadFlowStore((s) => s.senderName ?? '익명');

  // store에서 senderId 가져오기 (fallback용)
  const senderIdFromStore = useThreadFlowStore((s) => s.senderId);

  // targetUserId 파싱 및 유효성 검사 (차단용)
  // 우선순위: query param > state > store
  const rawTargetUserIdFromQuery = searchParams.get('targetUserId');
  const targetUserIdFromState = location.state?.targetUserId as number | undefined;
  const parsedTargetUserId =
    rawTargetUserIdFromQuery !== null
      ? Number(rawTargetUserIdFromQuery)
      : typeof targetUserIdFromState === 'number'
        ? targetUserIdFromState
        : typeof senderIdFromStore === 'number'
          ? senderIdFromStore
          : NaN;
  const isValidTargetUserId = !Number.isNaN(parsedTargetUserId) && parsedTargetUserId > 0;

  // 차단 훅
  const { mutateAsync: block, isPending: isBlocking } = useBlockUser();

  // 선택된 신고 사유들을 관리하는 상태 (배열)
  const [selectedReasons, setSelectedReasons] = useState<ReportReason[]>([]);
  // 차단하기 토글 상태 (boolean)
  const [isBlocked, setIsBlocked] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //토스트 상태 관리
  const { toast, visible, showToast, closeToast } = useToast();

  //신고 사유 배열
  const reasons = REPORT_REASONS;

  // 잘못된 접근 처리 (URL로 직접 접속했거나 letterId 없이 온 경우)
  // 1.유효성 검사 (잘못된 접근 처리)
  useEffect(() => {
    // letterId가 없으면 경고 띄우고 뒤로가기
    if (!letterId) {
      showToast('잘못된 접근입니다.', 'error');
      const timer = setTimeout(() => navigate(-1), 1500);
      return () => clearTimeout(timer); // cleanup
    }
  }, [letterId, navigate, showToast]);

  // 2️. 신고 완료 후 처리
  useEffect(() => {
    // 완료 상태(isCompleted)가 true가 되면 메인으로 이동
    if (isCompleted) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [isCompleted, navigate]);

  // 사유 선택 토글 핸들러
  const handleReasonToggle = (reason: ReportReason) => {
    setSelectedReasons((prev) => {
      const newReasons = prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason];

      if (newReasons.length === 0) setIsBlocked(false);
      return newReasons;
    });
  };

  //  차단하기 토글 핸들러
  const handleBlockToggle = (nextState: boolean) => {
    // console.log('[LetterReportPage] 차단 토글 변경:', nextState);
    // console.log('[LetterReportPage] 현재 선택된 사유:', selectedReasons);
    // console.log('[LetterReportPage] targetUserId:', targetUserId);

    // 켜려고 하는데(nextState === true) && 사유가 하나도 없으면
    if (nextState && selectedReasons.length === 0) {
      // console.log('[LetterReportPage] 사유 없이 차단 시도 - 차단됨');
      showToast('신고 사유를 선택해주세요.', 'error');
      return; // 상태 변경 안 하고 함수 종료
    }
    // 사유가 있으면 정상적으로 토글 상태 변경
    // console.log('[LetterReportPage] 차단 상태 변경:', nextState);
    setIsBlocked(nextState);
  };

  const handleSubmit = async () => {
    // 이미 제출 중이면 중복 실행 방지
    if (isSubmitting) {
      return;
    }

    // 선택된 사유가 0개이면 안내창 띄우기
    if (selectedReasons.length === 0) {
      showToast('신고 사유를 선택해주세요.', 'error');
      return;
    }

    // letterId 유효성 체크
    if (!letterId) {
      showToast('신고 대상을 찾을 수 없습니다.', 'error');
      return;
    }

    // Body에 담을 데이터 구성
    const requestBody: LetterReportRequest = {
      letterId,
      reasons: selectedReasons,
    };

    setIsSubmitting(true);
    try {
      const response = await postLetterReport(requestBody);

      if (response.resultType === 'SUCCESS') {
        // 차단하기가 활성화된 경우 차단 API 호출
        if (isBlocked) {
          if (!isValidTargetUserId) {
            showToast('차단 대상을 찾을 수 없습니다.', 'error');
            return;
          }

          try {
            await block(parsedTargetUserId);
          } catch (blockError) {
            const errorMessage =
              blockError instanceof Error ? blockError.message : '차단에 실패했습니다.';
            showToast(errorMessage, 'error');
            return;
          }
        }

        setIsCompleted(true); // 완료화면으로 전환
      } else {
        const errorMessage = response.error?.reason || '신고 처리에 실패했습니다.';
        showToast(errorMessage, 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('서버 연결에 실패했습니다.', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
          <BackHeader
            title='신고'
            rightElement={
              <button onClick={handleSubmit} disabled={isBlocking || isSubmitting}>
                {isSubmitting || isBlocking ? '처리중...' : '완료'}
              </button>
            }
          />{' '}
          {/*  헤더 */}
        </div>
        <div>
          {' '}
          {/* 프로필 영역 */}
          <div className='flex flex-col items-center mt-10 mb-8'>
            <div className='w-[100px] h-[100px] bg-[#FFC8C6] rounded-full mb-3 overflow-hidden'>
              <div className='w-full h-full flex items-center justify-center'>
                {stampUrl ? (
                  <img
                    src={stampUrl}
                    alt='우편 이미지'
                    className='object-contain max-w-[65%] max-h-[65%] rotate-6 '
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
            <span className='ty-body2'>{senderName}님</span>
          </div>
        </div>

        <div className='px-4'>
          {/* 안내 문구 */}
          <div className='mb-6'>
            {/*TTODO:내 닉네임 불러오기 API*/}
            <h2 className='ty-body2 mb-1'>개굴님, 신고 사유를 선택해주세요.</h2>
            <p className='ty-body5 text-[#595959]'>
              해당 내역은 마이페이지 - 신고 내역에서 확인할 수 있습니다.
            </p>
          </div>
          {/* 신고 사유 버튼 그리드 */}
          <div className='flex flex-col justify-left gap-y-[12px] gap-x-[8px] mb-8 '>
            {[
              reasons.slice(0, 3), // 첫 번째 줄 (0, 1, 2)
              reasons.slice(3, 5), // 두 번째 줄 (3, 4)
              reasons.slice(5, 7), // 세 번째 줄 (5, 6)
              reasons.slice(7, 8), // 네 번째 줄 (7)
            ].map((row, rowIndex) => (
              <div key={rowIndex} className='flex justify-left gap-x-[8px] w-full'>
                {row.map((reason) => {
                  const isSelected = selectedReasons.includes(reason);
                  return (
                    <SelectButton
                      key={reason}
                      selected={isSelected}
                      onClick={() => handleReasonToggle(reason)}
                      // 이미지의 비율을 맞추기 위해 너비를 고정하거나 min-width를 설정합니다.
                      className='w-auto! h-[44px]! text-[13px]! px-[24px]! rounded-full'
                    >
                      {reason}
                    </SelectButton>
                  );
                })}
              </div>
            ))}
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
      {toast && (
        <div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50'>
          <ToastPopup
            status={toast.status} // 'error' | 'success'
            message={toast.message} // '신고 사유를 선택해주세요.'
            visible={visible} // 애니메이션 제어
            onClose={closeToast} // 즉시 닫기
          />
        </div>
      )}
    </div>
  );
};
export default LetterReportPage;
