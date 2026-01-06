interface TermsContentProps {
  onClose: () => void;
}

export default function TermsContent({ onClose }: TermsContentProps) {
  return (
    <div className="p-6">
      <div className="space-y-4 mb-6">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="py-2">
            <h4 className="font-semibold mb-2">제{index + 1}조</h4>
            <p className="text-gray-600 text-sm">
              이것은 긴 컨텐츠를 테스트하기 위한 샘플 텍스트입니다. 스크롤이
              정상적으로 작동하는지 확인할 수 있습니다.
            </p>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 bg-white pt-4 border-t">
        <button
          onClick={onClose}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          모두 동의
        </button>
      </div>
    </div>
  );
}
