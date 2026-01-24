import type { RefreshTokenResponse } from '@/types/dto/auth';
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// 1. 토큰 재발급 관리 변수
let isRefreshing = false;
let refreshSubscribers: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

// 2. 대기 중인 요청들을 처리하는 함수
const onRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach(({ resolve }) => resolve(accessToken));
  refreshSubscribers = [];
};
const onRefreshFailed = (error: unknown) => {
  refreshSubscribers.forEach(({ reject }) => reject(error));
  refreshSubscribers = [];
};
export const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error(
    '[axiosInstance] VITE_API_BASE_URL 이 설정되어 있지 않습니다. .env.local 을 확인하세요.',
  );
}

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
// 1. Request Interceptor (요청 보내기 전 가로채기)-모든 요청 헤더에 토큰 심기
// 이게 없으면 로그인을 해도 서버는 토큰 없다고 생각하고 401을 뱉음
axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에 저장된 토큰을 꺼냄
    const accessToken = localStorage.getItem('accessToken');

    // 토큰이 있다면 헤더에 'Bearer 토큰값' 형태로 붙임
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/// 4. [Response Interceptor] 에러 처리 및 토큰 재발급 (Code B의 장점 + 헤더 수정)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // 에러난 요청의 설정값(url, headers 등)을 가져옵니다.
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response) {
      const { status } = error.response;

      //  401 에러 처리 로직
      if (status === 401) {
        // Case A: 리프레시 요청 자체가 401이 뜬 경우 (갱신도 실패)
        // ->  온보딩으로 쫓아냅니다.
        if (originalRequest.url?.includes('/auth/refresh')) {
          localStorage.clear();
          onRefreshFailed(error);
          if (window.location.pathname !== '/onboarding') {
            window.location.href = '/onboarding';
          }
          return Promise.reject(error);
        }

        // Case B: 이미 다른 요청이 리프레시를 하고 있는 경우
        // -> 대기열(subscribers)에 줄 서게 함 (동시성 제어)
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            refreshSubscribers.push({
              resolve: (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axiosInstance(originalRequest));
              },
              reject,
            });
          });
        }

        // Case C: 토큰 만료 후 첫 401 발생 (갱신 시도)
        originalRequest._retry = true; // 무한루프 방지용 플래그
        isRefreshing = true;

        try {
          const storedRefreshToken = localStorage.getItem('refreshToken');
          // 토큰이 없으면 로그아웃 처리
          if (!storedRefreshToken) {
            throw new Error('No Refresh Token');
          }

          // 2. 헤더에 리프레시 토큰을 담아서 요청
          const { data } = await axios.post<RefreshTokenResponse>(
            `${baseURL}/auth/refresh`,
            {}, // Body는 비워둠 (Swagger에 바디 내용이 없음)
            {
              withCredentials: true,
              headers: {
                // 여기서 AccessToken 대신 RefreshToken을 꽂아서 보냄
                Authorization: `Bearer ${storedRefreshToken}`,
              },
            },
          );

          // 성공 시 로직
          if (data.resultType === 'SUCCESS' && data.success) {
            const newAccessToken = data.success.jwtAccessToken;

            // 1. 새 토큰 저장
            localStorage.setItem('accessToken', newAccessToken);

            // 2. 대기열 해소 (기다리던 요청들 재실행)
            isRefreshing = false;
            onRefreshed(newAccessToken);

            // 3. 현재 실패했던 요청 헤더 갈아끼우고 재실행
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } else {
            // [수정 2] 200 OK지만 비즈니스 로직상 실패(FAIL)인 경우 -> 로그아웃 처리
            // 이걸 안 하면 isRefreshing이 true로 남아서 무한 대기 걸림
            throw new Error('Refresh Token Invalid');
          }
        } catch (refreshError) {
          // 갱신 실패 시 (네트워크 에러 or 위에서 throw한 에러) -> [기존 코드]처럼 온보딩으로 이동
          isRefreshing = false; // [중요] 상태 초기화
          onRefreshFailed(refreshError);
          localStorage.clear();

          if (window.location.pathname !== '/onboarding') {
            window.location.href = '/onboarding';
          }
          return Promise.reject(refreshError);
        }
      }
    }

    // 401 아닌 다른 에러는 그대로 반환 (기존과 동일)
    return Promise.reject(error);
  },
);
