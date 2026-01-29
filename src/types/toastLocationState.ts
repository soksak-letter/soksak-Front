// 토스트 팝업이 다음 페이지에서 생겼을 때
// 발송한 편지 정보를 reset 하기 위함
import type { ToastPopupProps } from '@/components/ToastPopup';

export type ToastLocationState = {
  toast?: {
    status: ToastPopupProps['status'];
    message: string;
  };
};
