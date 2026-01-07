import BackHeader from "@/components/common/headers/BackHeader";
import { SelectButton } from "@/components/common/SelectButton";
import ToggleSwitch from "@/components/common/ToggleSwitch";
import { useState } from "react";

const LetterReportPage=()=>{
    // 선택된 신고 사유들을 관리하는 상태 (배열)
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  // 차단하기 토글 상태 (boolean)
  const [isBlocked, setIsBlocked] = useState(false);
    const reasons = [
    "욕설/비하", "혐오 표현", "성적 불쾌감",
    "스팸/광고", "도배/반복", "폭력/학대표현",
    "불법 행위 유도", "사칭/허위정보"
  ];
  // 사유 선택 토글 핸들러
  const handleReasonToggle = (reason: string) => {
    setSelectedReasons((prev) => 
      prev.includes(reason) 
        ? prev.filter((r) => r !== reason) // 이미 있으면 제거
        : [...prev, reason] // 없으면 추가
    );
  };
  
    return(
        <div className="w-[375px] h-screen relative mx-auto">
            <div>
                <div className="flex justify-center items-center h-[77px]" >
                    <BackHeader title='신고' rightElement='완료'/>  {/*  헤더 */}
                </div>
                <div>  {/* 프로필 영역 */}
                    <div className="flex flex-col items-center mt-10 mb-8">
                        <div className="w-24 h-24 bg-[#FFC8C6] rounded-full mb-3"></div>
                        <span className="ty-body2">파란수박님</span>
                    </div>
                </div>


                <div className="px-4">
                                        {/* 안내 문구 */}
                    <div className="mb-6">
                        <h2 className="ty-body2 mb-1">개굴님, 신고 사유를 선택해주세요.</h2>
                        <p className="ty-body5 text-[#595959]">
                        해당 내역은 마이페이지 - 신고 내역에서 확인할 수 있습니다.
                        </p>
                    </div>
                    {/* 신고 사유 버튼 그리드 */}
                    <div className="grid grid-cols-3 gap-y-3 gap-x-2 mb-8 place-items-center">
                        {reasons.map((reason) => {
                            const isSelected = selectedReasons.includes(reason);
                            return (
                            <SelectButton 
                                key={reason}
                                selected={isSelected}
                                onClick={() => handleReasonToggle(reason)}
                                className="!w-full !h-[34px] !text-[13px] !px-3 " // 그리드 칸에 꽉 차게 하려면 추가, 아니면 제거
                            >
                                {reason}
                            </SelectButton>
                            );
                        })}
                    </div>
                </div>

            </div>




            <div className="absolute bottom-3 right-4 flex items-center mb-3">
                <span className="mr-3 ty-body5 text-[#171717]">차단하기</span>
                <ToggleSwitch 
                checked={isBlocked} 
                onCheckedChange={setIsBlocked} 
        className={!isBlocked ? "!bg-[#CBCCCD] [&>span]:!bg-[#E5E6E6]" : ""}
                />
            </div>
            
            
        </div>

    );

}
export default LetterReportPage