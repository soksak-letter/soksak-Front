interface EmptyStateCardProps {
  message?: string;
}

export default function EmptyStateCard({
  message = '아직 작성된 편지가 없습니다.',
}: EmptyStateCardProps) {
  return (
    <div className="w-full" style={{ aspectRatio: '1.5 / 1' }}>
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center w-full h-full flex flex-col items-center justify-center p-4">
        {/* 빈 편지봉투 아이콘 */}
        <div className="mb-2 flex justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* 안내 문구 */}
        <p className="text-gray-500 text-xs">{message}</p>
      </div>
    </div>
  );
}
