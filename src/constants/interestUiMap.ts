export const INTEREST_UI_MAP: Record<number, { emoji: string }> = {
  1: { emoji: '✏️' }, // 공부
  2: { emoji: '🎵' }, // 음악
  3: { emoji: '🎥' }, // 영화
  4: { emoji: '💰' }, // 돈
  5: { emoji: '💗' }, // 사랑
  6: { emoji: '🧑‍🤝‍🧑' }, // 인간관계
  7: { emoji: '🏥' }, // 건강
  8: { emoji: '📖' }, // 독서
  9: { emoji: '👜' }, // 직장
  10: { emoji: '🏢' }, // 취업
  11: { emoji: '🏫' }, // 학교
  12: { emoji: '🥦' }, // 다이어트
  13: { emoji: '💭' }, // 감정
  14: { emoji: '🏈' }, // 취미
  15: { emoji: '✈️' }, // 여행
  16: { emoji: '👨‍👩‍👦' }, // 가족
  17: { emoji: '💄' }, // 미용
};

export const getInterestEmoji = (interestId: number) => INTEREST_UI_MAP[interestId]?.emoji ?? '';
