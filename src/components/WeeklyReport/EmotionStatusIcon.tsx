import React from 'react';

import SadIcon from '@/assets/icons/SadIcon.svg?react';
import HappyModalIcon from '@/assets/icons/HappyModalIcon.svg?react';
import LoveIcon from '@/assets/icons/LoveIcon.svg?react';
import TiredIcon from '@/assets/icons/TiredIcon.svg?react';
import QuestionEmotionIcon from '@/assets/icons/QuestionEmotionIcon.svg?react';

// 백엔드가 내려주는 5개 감정 상태 key
export type EmotionStatusKey = 'sad' | 'happy' | 'neutral' | 'love' | 'tired';

const ICON_MAP: Record<EmotionStatusKey, React.ComponentType<{ className?: string }>> = {
  sad: SadIcon, // 슬픈/우울
  happy: HappyModalIcon, // 행복
  neutral: QuestionEmotionIcon, // 여러 키워드 / 정의 어려움 (대체 아이콘)
  love: LoveIcon, // 사랑
  tired: TiredIcon, // 피곤/지침
};

export function EmotionStatusIcon({
  status,
  size = 60,
  className,
}: {
  status: EmotionStatusKey;
  size?: number;
  className?: string;
}) {
  const Icon = ICON_MAP[status] ?? HappyModalIcon;

  return <Icon className={className} width={size} height={size} />;
}
