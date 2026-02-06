import React from 'react';

export function PaperPreview({
  Preview,
  name,
}: {
  Preview: React.ComponentType<{ className?: string }>;
  name: string;
}) {
  return (
    <div className='w-full h-full overflow-hidden' aria-label={name}>
      {/* name 사용하실 거면 추후에 수정해주세요 */}
      <Preview className='w-full h-full' />
    </div>
  );
}

export function StampPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className='w-full h-full overflow-hidden'>
      <img src={src} alt={alt} className='w-full h-full object-cover' />
    </div>
  );
}
