export type GenderOption = { id: 'male' | 'female' | 'private'; label: string };
export type JobOption = {
  id: 'worker' | 'student' | 'housewife' | 'freelancer' | 'unemployed' | 'other';
  label: string;
};

export const ONBOARDING_GENDERS: GenderOption[] = [
  { id: 'male', label: '남성' },
  { id: 'female', label: '여성' },
  { id: 'private', label: '비공개' },
];

export const ONBOARDING_JOBS: JobOption[] = [
  { id: 'worker', label: '직장인' },
  { id: 'student', label: '학생' },
  { id: 'housewife', label: '주부' },
  { id: 'freelancer', label: '프리랜서' },
  { id: 'unemployed', label: '무직' },
  { id: 'other', label: '기타' },
];
