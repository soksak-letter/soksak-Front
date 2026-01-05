import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { SelectButton } from '@/components/common/SelectButton';
import { ONBOARDING_TOPICS } from '@/constants/onboardingTopics';
import { Button } from '@/components/common/Button';
import CautionIcon from '@/assets/icons/CautionIcon.svg?react';

export default function OnboardingTopicSelectPage() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const selectedCount = selectedIds.size;
  const isNextEnabled = selectedCount >= 3;

  const toggleTopic = (id: string) => {
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

    console.log('선택된 토픽:', selectedArray);
    // TODO: 다음 화면 이동 or store 저장
    // navigate('/onboarding/next')
  };

  return (
    <div className='flex min-h-dvh flex-col px-5 pt-6'>
      <h1 className='mb-2 text-xl font-semibold'>
        <span className='block'>요즘 어떤 고민이 있나요?</span>
        <span className='block'>관련 주제로 질문을 보내드려요.</span>
      </h1>
      <p className='mb-6 flex items-center gap-1.5 text-[12px] text-gray-400'>
        <CautionIcon className='h-[14px] w-[14px] shrink-0' />
        제공한 정보는 오늘의 질문 개인화를 위해서만 활용됩니다.
      </p>

      <div className='flex flex-wrap gap-2'>
        {ONBOARDING_TOPICS.map((topic) => {
          const selected = selectedIds.has(topic.id);

          return (
            <SelectButton
              key={topic.id}
              selected={selected}
              size='large'
              onClick={() => toggleTopic(topic.id)}
              className={clsx('gap-1 px-3')}
            >
              <span>{topic.label}</span>
              <span aria-hidden>{topic.emoji}</span>
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
