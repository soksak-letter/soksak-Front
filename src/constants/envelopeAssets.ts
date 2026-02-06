import React from 'react';
import mint from '@/assets/letter_envelope/Mint.svg?react';
import purple from '@/assets/letter_envelope/Purple.svg?react';
import blue from '@/assets/letter_envelope/Blue.svg?react';
import yellow from '@/assets/letter_envelope/Yellow.svg?react';
import pink from '@/assets/letter_envelope/Pink.svg?react';
import paper from '@/assets/letter_envelope/Paper.svg?react';
import beige from '@/assets/letter_envelope/Beige.svg?react';
import vintage from '@/assets/letter_envelope/Vintage.svg?react';
import grey from '@/assets/letter_envelope/Grey.svg?react';

export type EnvelopeAsset = {
  label: string;
  Preview: React.ComponentType<{ className?: string }>;
};

export const ENVELOPE_ASSET_MAP: Record<number, EnvelopeAsset> = {
  1: { label: 'Mint', Preview: mint },
  2: { label: 'Purple', Preview: purple },
  3: { label: 'Blue', Preview: blue },
  4: { label: 'Yellow', Preview: yellow },
  5: { label: 'Pink', Preview: pink },
  6: { label: 'Paper', Preview: paper },
  7: { label: 'Beige', Preview: beige },
  8: { label: 'Vintage', Preview: vintage },
  9: { label: 'Grey', Preview: grey },
};
