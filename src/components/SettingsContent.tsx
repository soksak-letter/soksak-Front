interface SettingsContentProps {
  onClose: () => void;
}

export default function SettingsContent({ onClose }: SettingsContentProps) {
  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b">
          <span className="text-gray-800">알림 설정</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>
        <div className="flex items-center justify-between py-3 border-b">
          <span className="text-gray-800">다크 모드</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>
        <div className="flex items-center justify-between py-3 border-b">
          <span className="text-gray-800">자동 재생</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        저장
      </button>
    </div>
  );
}
