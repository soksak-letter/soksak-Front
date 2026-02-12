import beige from '@/assets/papers/beige.svg?url';
import blue from '@/assets/papers/blue.svg?url';
import grey from '@/assets/papers/grey.svg?url';
import mint from '@/assets/papers/mint.svg?url';
import paper from '@/assets/papers/paper.svg?url';
import pink from '@/assets/papers/pink.svg?url';
import purple from '@/assets/papers/purple.svg?url';
import vintage from '@/assets/papers/vintage.svg?url';
import yellow from '@/assets/papers/yellow.svg?url';

export type PaperAsset = {
  label: string;
  src: string;
  envelopeColor: string;
};

export const DEFAULT_PAPER_ID = 1;

export const PAPER_ASSET_MAP: Record<number, PaperAsset> = {
  1: { label: 'Mint', src: mint, envelopeColor: '#D8F3EE' },
  2: { label: 'Purple', src: purple, envelopeColor: '#E8E4F3' },
  3: { label: 'Blue', src: blue, envelopeColor: '#E1F3FE' },
  4: { label: 'Yellow', src: yellow, envelopeColor: '#FFF9E2' },
  5: { label: 'Pink', src: pink, envelopeColor: '#FFF7FF' },
  6: { label: 'Paper', src: paper, envelopeColor: '#E4DAC4' },
  7: { label: 'Beige', src: beige, envelopeColor: '#F5F0E7' },
  8: { label: 'Vintage', src: vintage, envelopeColor: '#F5F0E8' },
  9: { label: 'Grey', src: grey, envelopeColor: '#F0F0F0' },
};
