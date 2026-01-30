import React from 'react';

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
