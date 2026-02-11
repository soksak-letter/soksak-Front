export const ROUTES = {
  onboarding: {
    start: '/onboarding/topic-select-1',
  },
  auth: {
    welcome: '/auth/welcome',
    signin: '/auth/signin',
    signup: '/auth/signup',
    terms: '/auth/terms',
    profile: '/auth/profile-setup',
  },
  report: {
    keyword: '/report/keyword-letter', // TODO: 수정 필요
  },
  setting: {
    setting: '/setting',
  },
  my: {
    mypage: '/my/my-page',
  },
} as const;
