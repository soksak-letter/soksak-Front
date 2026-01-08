export type OnboardingTopic = {
  id: string;
  label: string;
  emoji: string;
};

export const ONBOARDING_TOPICS: OnboardingTopic[] = [
  { id: 'study', label: '공부', emoji: '✏️' },
  { id: 'music', label: '음악', emoji: '🎵' },
  { id: 'movie', label: '영화', emoji: '🎥' },
  { id: 'money', label: '돈', emoji: '💰' },
  { id: 'love', label: '사랑', emoji: '💗' },
  { id: 'relationship', label: '인간관계', emoji: '🧑‍🤝‍🧑' },
  { id: 'health', label: '건강', emoji: '🏥' },
  { id: 'reading', label: '독서', emoji: '📖' },
  { id: 'job', label: '직장', emoji: '👜' },
  { id: 'job-search', label: '취업', emoji: '🏢' },
  { id: 'school', label: '학교', emoji: '🏫' },
  { id: 'diet', label: '다이어트', emoji: '🥦' },
  { id: 'emotion', label: '감정', emoji: '💭' },
  { id: 'hobby', label: '취미', emoji: '🏈' },
  { id: 'travel', label: '여행', emoji: '✈️' },
  { id: 'family', label: '가족', emoji: '👨‍👩‍👦' }, // 피그마랑 같은 이모지 X
  { id: 'beauty', label: '미용', emoji: '💄' },
];
