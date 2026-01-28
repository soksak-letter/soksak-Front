import React from 'react';

import beige from '@/assets/papers/beige.svg?react';
import blue from '@/assets/papers/blue.svg?react';
import grey from '@/assets/papers/grey.svg?react';
import mint from '@/assets/papers/mint.svg?react';
import paper from '@/assets/papers/paper.svg?react';
import pink from '@/assets/papers/pink.svg?react';
import purple from '@/assets/papers/purple.svg?react';
import vintage from '@/assets/papers/vintage.svg?react';
import yellow from '@/assets/papers/yellow.svg?react';

export type PaperAsset = {
  label: string;
  Preview: React.ComponentType<{ className?: string }>;
  envelopeColor: string;
};

export const DEFAULT_PAPER_ID = 4;

export const PAPER_ASSET_MAP: Record<number, PaperAsset> = {
  1: { label: 'Beige', Preview: beige, envelopeColor: '#F5F0E7' },
  2: { label: 'Blue', Preview: blue, envelopeColor: '#E1F3FE' },
  3: { label: 'Grey', Preview: grey, envelopeColor: '#F0F0F0' },
  4: { label: 'Mint', Preview: mint, envelopeColor: '#D8F3EE' },
  5: { label: 'Paper', Preview: paper, envelopeColor: '#E4DAC4' },
  6: { label: 'Pink', Preview: pink, envelopeColor: '#FFF7FF' },
  7: { label: 'Purple', Preview: purple, envelopeColor: '#E8E4F3' },
  8: { label: 'Vintage', Preview: vintage, envelopeColor: '#F5F0E8' },
  9: { label: 'Yellow', Preview: yellow, envelopeColor: '#FFF9E2' },
};
