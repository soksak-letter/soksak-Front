interface BasicContentProps {
  onClose: () => void;
}

export default function BasicContent({ onClose }: BasicContentProps) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">기본 BottomSheet</h3>
      <p className="text-gray-600 mb-4">
        이것은 기본적인 BottomSheet입니다. 드래그 핸들을 드래그하거나 외부를
        클릭하여 닫을 수 있습니다.
      </p>
      <button
        onClick={onClose}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        닫기
      </button>
    </div>
  );
}
