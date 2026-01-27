/**
 * 온보딩(관심사/프로필) 도메인에서 사용하는 React Query 캐시 키 모음
 *
 * - queryKey는 React Query가 데이터를 캐싱/동기화할 때 사용하는 "주소" 역할을 함
 * - key를 한 곳에서 관리하면:
 *   1) 오타/중복을 줄이고
 *   2) invalidateQueries / setQueryData 등 캐시 조작을 안전하게 할 수 있음
 *
 * 규칙:
 * - allInterests: 전체 관심사 사전(공개 목록)
 * - myInterests: 내가 선택한 관심사 목록(인증 필요, 편집/재진입 프리셋에 사용)
 */

export const onboardingKeys = {
  allInterests: ['interests', 'all'] as const,
  myInterests: ['interests', 'me'] as const,
};
