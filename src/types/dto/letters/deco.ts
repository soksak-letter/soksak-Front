import type { ApiError } from '../common';

export type FontOptionDto = {
  id: number;
  font: string;
};

export type PaperOptionDto = {
  id: number;
  color: string;
};

export type StampOptionDto = {
  id: number;
  name: string;
  assetUrl: string;
};

export type LetterStyleOptionsSuccess = {
  fonts: FontOptionDto[];
  papers: PaperOptionDto[];
  stamps: StampOptionDto[];
};

export type LetterStyleOptionsResponse =
  | { resultType: 'SUCCESS'; error: null; success: LetterStyleOptionsSuccess }
  | { resultType: 'FAIL'; error: ApiError; success: null };
