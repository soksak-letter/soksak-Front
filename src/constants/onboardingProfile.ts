export type GenderOption = { id: 'MALE' | 'FEMALE' | 'UNKNOWN'; label: string };
export type JobOption = {
  id: 'WORKER' | 'STUDENT' | 'HOUSEWIFE' | 'FREELANCER' | 'UNEMPLOYED' | 'OTHER';
  label: string;
};

export const ONBOARDING_GENDERS: GenderOption[] = [
  { id: 'MALE', label: '남성' },
  { id: 'FEMALE', label: '여성' },
  { id: 'UNKNOWN', label: '비공개' },
];

export const ONBOARDING_JOBS: JobOption[] = [
  { id: 'WORKER', label: '직장인' },
  { id: 'STUDENT', label: '학생' },
  { id: 'HOUSEWIFE', label: '주부' },
  { id: 'FREELANCER', label: '프리랜서' },
  { id: 'UNEMPLOYED', label: '무직' },
  { id: 'OTHER', label: '기타' },
];
