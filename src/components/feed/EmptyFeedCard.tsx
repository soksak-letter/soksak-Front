export default function EmptyFeedCard() {
  return (
    <div
      className='w-full rounded-lg'
      style={{
        backgroundColor: '#E5E6E7',
        padding: '39px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'Pretendard',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '23.8px',
          color: '#8C8C8C',
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}
      >
        더 이상 작성된 편지가 없어요.{'\n'}나도 편지를 작성하고 공개해봐요.
      </p>
    </div>
  );
}
