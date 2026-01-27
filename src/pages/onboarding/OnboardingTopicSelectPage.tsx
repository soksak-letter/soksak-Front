import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { SelectButton } from '@/components/common/SelectButton';
import { Button } from '@/components/common/Button';
import CautionIcon from '@/assets/icons/CautionIcon.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAllInterests } from '@/hooks/onboarding/useAllInterests';
import { useMyInterests } from '@/hooks/onboarding/useMyInterests';
import { useSaveInterests } from '@/hooks/onboarding/useSaveInterests';
import { getInterestEmoji } from '@/constants/interestUiMap';

export default function OnboardingTopicSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // mode: onboarding(default) | edit
  const mode = new URLSearchParams(location.search).get('mode') === 'edit' ? 'edit' : 'onboarding';
  const isEdit = mode === 'edit';

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const { data: allItems } = useAllInterests();

  // 재진입 프리셋(로그인 상태면 true)
  const { data: myItems } = useMyInterests(true);

  const saveInterests = useSaveInterests();

  // 내 관심사 프리셋 적용
  useEffect(() => {
    if (!myItems) return;
    setSelectedIds(new Set(myItems.map((x) => x.id)));
  }, [myItems]);

  const selectedCount = selectedIds.size;
  const isNextEnabled = selectedCount >= 3 && !saveInterests.isPending;

  const toggleTopic = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // 다음 버튼 클릭 시 서버/스토어로 넘길 payload 형태
  const selectedArray = useMemo(() => Array.from(selectedIds), [selectedIds]);

  const handleNext = () => {
    if (!isNextEnabled) return;

    saveInterests.mutate(
      { interestIds: selectedArray },
      {
        onSuccess: (res) => {
          if (res.resultType === 'SUCCESS') {
            if (isEdit) {
              navigate('/my/my-page', { replace: true });
            } else {
              navigate('/onboarding/letter-intro');
            }
            return;
          }

          // 이미 온보딩 완료 사용자
          if (res.error.errorCode === '409') {
            // TODO: 에러코드 화이트리스트 필요(자유 문자열로 들어옴)
            if (isEdit) {
              navigate('/my/my-page', { replace: true });
            } else {
              navigate('/', { replace: true });
            }
            return;
          }

          // TODO: 프로젝트 토스트 방식으로 교체
          console.log(res.error.reason);
        },
      },
    );
  };

  return (
    <div className='flex min-h-dvh flex-col px-5 pt-6'>
      <h1 className='mb-2 ty-title2'>
        <span className='block'>요즘 어떤 고민이 있나요?</span>
        <span className='block'>관련 주제로 질문을 보내드려요.</span>
      </h1>
      <p className='mb-6 flex items-center gap-1.5 ty-detail text-[var(--color-text-assistive)]'>
        <CautionIcon className='h-[14px] w-[14px] shrink-0' />
        제공한 정보는 오늘의 질문 개인화를 위해서만 활용됩니다.
      </p>

      <div className='flex flex-wrap gap-2'>
        {(allItems ?? []).map((it) => {
          const selected = selectedIds.has(it.id);
          const emoji = getInterestEmoji(it.id);

          return (
            <SelectButton
              key={it.id}
              selected={selected}
              size='large'
              onClick={() => toggleTopic(it.id)}
              className={clsx('gap-1 px-3')}
            >
              <span>{it.name}</span>
              <span aria-hidden>{emoji}</span>
            </SelectButton>
          );
        })}
      </div>

      <div className='mt-auto mb-6 flex justify-center'>
        <Button color='primary' size='large' disabled={!isNextEnabled} onClick={handleNext}>
          {isNextEnabled ? '다음으로' : '3개 이상 선택해주세요.'}
          {/* TODO: 버튼 색 바뀌는 거 다시 체크하기 */}
        </Button>
      </div>
    </div>
  );
}
