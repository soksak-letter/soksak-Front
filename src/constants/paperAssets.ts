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
  Preview: React.ComponentType<{ className?: string }>;
  envelopeColor: string;
};

export const DEFAULT_KEY = 'mint';

export const PAPER_ASSET_MAP: Record<string | number, PaperAsset> = {
  beige: { Preview: beige, envelopeColor: '#F5F0E7' },
  blue: { Preview: blue, envelopeColor: '#E1F3FE' },
  grey: { Preview: grey, envelopeColor: '#F0F0F0' },
  mint: { Preview: mint, envelopeColor: '#D8F3EE' },
  paper: { Preview: paper, envelopeColor: '#E4DAC4' },
  pink: { Preview: pink, envelopeColor: '#FFF7FF' },
  purple: { Preview: purple, envelopeColor: '#E8E4F3' },
  vintage: { Preview: vintage, envelopeColor: '#F5F0E8' },
  yellow: { Preview: yellow, envelopeColor: '#FFF9E2' },
};
