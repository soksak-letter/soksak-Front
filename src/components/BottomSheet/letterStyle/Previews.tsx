import React from 'react';

export function PaperPreview({
  Preview,
  name,
}: {
  Preview: React.ComponentType<{ className?: string }>;
  name: string;
}) {
  return (
    <div className='w-full h-full overflow-hidden'>
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
