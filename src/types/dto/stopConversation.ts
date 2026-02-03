import type { CommonResponse } from './common';

export type SessionStatus = 'FRIENDS' | 'DISCARDED';

export type SessionData = {
  id: number;
  questionId: number;
  status: SessionStatus;
  maxTurns: number;
  startedAt: string; // ISO
  endedAt: string | null; // ISO or null
};

export type PatchSessionStatusSuccess = {
  message: string;
  result: {
    data: SessionData;
  };
};

export type PatchSessionStatusResponse = CommonResponse<S>;
