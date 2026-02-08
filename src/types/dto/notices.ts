import type { CommonResponse } from './common';

// 공지사항 아이템 타입
export interface NoticeItem {
  id: number;
  title: string;
  summary: string | null;
  createdAt: string;
}

// 공지사항 목록 API 응답 타입
export interface NoticesSuccess {
  items: NoticeItem[];
}

export type NoticesResponse = CommonResponse<NoticesSuccess>;
