import type { CommonResponse } from './common';

export type SessionData = {
  id: number;
  questionId: number;
  status: string;
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

export type PatchSessionStatusResponse = CommonResponse<PatchSessionStatusSuccess>;
