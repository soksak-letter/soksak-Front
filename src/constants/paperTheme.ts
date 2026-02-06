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

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const hexToRgb = (hex: string): RGB => {
  const v = hex.replace('#', '');
  const n = parseInt(
    v.length === 3
      ? v
          .split('')
          .map((c) => c + c)
          .join('')
      : v,
    16,
  );
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

const rgbToHex = ({ r, g, b }: RGB) =>
  `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`.toUpperCase();

const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      case bn:
        h = ((rn - gn) / d + 4) / 6;
        break;
    }
  }

  return { h, s, l };
};

const hslToRgb = ({ h, s, l }: HSL): RGB => {
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - C / 2;

  let rp = 0,
    gp = 0,
    bp = 0;

  const hh = h * 6;
  if (0 <= hh && hh < 1) [rp, gp, bp] = [C, X, 0];
  else if (1 <= hh && hh < 2) [rp, gp, bp] = [X, C, 0];
  else if (2 <= hh && hh < 3) [rp, gp, bp] = [0, C, X];
  else if (3 <= hh && hh < 4) [rp, gp, bp] = [0, X, C];
  else if (4 <= hh && hh < 5) [rp, gp, bp] = [X, 0, C];
  else [rp, gp, bp] = [C, 0, X];

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
};

/**
 * 피그마 봉투 라인 느낌:
 */
export const makeEnvelopeLineColor = (bgHex: string) => {
  const hsl = rgbToHsl(hexToRgb(bgHex));
  const tuned: HSL = {
    h: hsl.h,
    s: clamp01(hsl.s * 1.12), // 채도 +12%
    l: clamp01(hsl.l * 0.86), // 명도 -14%
  };
  return rgbToHex(hslToRgb(tuned));
};
