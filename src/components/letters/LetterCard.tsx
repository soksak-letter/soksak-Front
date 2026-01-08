import type { CSSProperties } from 'react';

// TODO :
// 임의로 만든 letter
// 디자인 확정 후 수정 필요

const paperStyle: CSSProperties = {
  // 종이 배경색
  backgroundColor: '#E6E2F2',
  // 줄(가로) 반복
  backgroundImage: `repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25) 0px,
    rgba(0, 0, 0, 0.25) 1px,
    transparent 1px,
    transparent 14px
  )`,
  // 위에서부터 줄 시작 위치(위쪽 여백 느낌)
  backgroundPosition: '0 18px',
};

const LetterCard = () => {
  return (
    <div className='flex justify-center'>
      <div
        className='absolute inset-0 rounded-[2px] shadow-sm ring-1 ring-black/10'
        style={paperStyle}
      />
    </div>
  );
};

export default LetterCard;
