type PaperTheme = { bg: string; title: string };

export const PAPER_THEME: Record<number, PaperTheme> = {
  1: { bg: '#D8F3EE', title: '#171717' },
  2: { bg: '#E8E4F3', title: '#171717' },
  3: { bg: '#E1F3FE', title: '#171717' },
  4: { bg: '#FFF9E2', title: '#171717' },
  5: { bg: '#FFF7FF', title: '#171717' },
  6: { bg: '#E4DAC4', title: '#171717' },
  7: { bg: '#F5F0E7', title: '#171717' },
  8: { bg: '#F5F0E8', title: '#171717' },
  9: { bg: '#E6E6E6', title: '#171717' },
};

export const DEFAULT_THEME: PaperTheme = { bg: '#D8F3EE', title: '#171717' };
