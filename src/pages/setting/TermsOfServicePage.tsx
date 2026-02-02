import { useNavigate } from 'react-router-dom';

export default function TermsOfServicePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* 헤더 */}
      <header
        className='fixed top-0 left-1/2 z-50 flex items-center justify-center px-[21px] py-[13px]'
        style={{
          backgroundColor: '#FAFAFA',
          height: '50px',
          width: '375px',
          transform: 'translateX(-50%)',
        }}
      >
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className='absolute left-[21px] flex items-center justify-center'
          aria-label='뒤로가기'
          style={{
            width: '18px',
            height: '18px',
          }}
        >
          <svg width='9' height='15' viewBox='0 0 9 15' fill='none'>
            <path
              d='M7.5 13.5L1.5 7.5L7.5 1.5'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        {/* 제목 */}
        <h1
          className='text-center'
          style={{
            fontFamily: 'Pretendard',
            fontWeight: 400,
            fontSize: '16.41px',
            lineHeight: '20px',
            color: '#000000',
          }}
        >
          서비스 이용약관
        </h1>
      </header>

      {/* 헤더 높이만큼 여백 */}
      <div style={{ height: '50px' }} />

      {/* 메인 컨텐츠 */}
      <main className='mx-auto w-full max-w-[375px] pb-8'>
        <div style={{ marginTop: '8px' }} className='px-9'>
          {/* 제1조 */}
          <div style={{ marginBottom: '20px' }}>
            <p className='font-pretendard font-bold text-xs leading-[19.2px] text-black mb-2'>
              <strong>제1조(목적)</strong>
            </p>
            <p className='font-pretendard font-normal text-xs leading-[19.2px] text-black'>
              이 약관은 속삭편지 팀(이하 "개발자 팀"이라 합니다)이 제공하는 제반 서비스의 이용과
              관련하여 개발자 팀과 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을
              목적으로 합니다.
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p className='font-pretendard font-bold text-xs leading-[19.2px] text-black mb-2'>
              <strong>제2조(정의)</strong>
            </p>
            <p className='font-pretendard font-normal text-xs leading-[19.2px] text-black mb-2'>
              이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            </p>
            <p className='font-pretendard font-normal text-xs leading-[19.2px] text-black mb-1'>
              1. "서비스"란 구현되는 단말기(PC, 휴대용 단말기 등 각종 유무선 장치를 포함)와 상관없이
              이용자가 이용할 수 있는 속삭편지 관련 제반 서비스를 의미합니다.
            </p>
            <p className='font-pretendard font-normal text-xs leading-[19.2px] text-black mb-1'>
              2. "이용자"란 이 약관에 따라 개발자 팀이 제공하는 서비스를 이용하는 자로, 회원 및
              비회원을 포함합니다.
            </p>
            <p className='font-pretendard font-normal text-xs leading-[19.2px] text-black mb-1'>
              3. "회원"이란 개발자 팀에 개인정보를 제공하여 회원등록을 하고, 개발자 팀으로부터
              지속적으로 정보를 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
            </p>
            <p className='font-pretendard font-normal text-xs leading-[19.2px] text-black mb-1'>
              4. "비회원"이란 회원가입 없이 개발자 팀이 제공하는 서비스를 이용하는 자를 말합니다.
            </p>
            <p className='font-pretendard font-normal text-xs leading-[19.2px] text-black mb-1'>
              5. "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 개발자 팀이
              승인하는 문자 또는 문자와 숫자의 조합을 의미합니다.
            </p>
            <p className='font-pretendard font-normal text-xs leading-[19.2px] text-black'>
              6. "비밀번호"란 회원이 부여받은 아이디와 일치되는 회원임을 확인하고 비밀을 보호하기
              위하여 회원이 정한 문자(특수문자 포함)와 숫자의 조합을 의미합니다.
            </p>
          </div>

          {/* 제3조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제3조(약관 외 준칙)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              이 약관에서 정하지 아니한 사항은 관련 법령 또는 개발자 팀이 정한 서비스의 개별 약관,
              운영정책 및 규칙 등(이하 "세부지침")에 따릅니다. 세부지침과 본 약관이 충돌하는
              경우에는 세부지침이 우선합니다.
            </p>
          </div>

          {/* 제4조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제4조(약관의 효력과 변경)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 이 약관은 개발자 팀이 운영하는 인터넷서비스에 게시하여 공지함으로써 효력이
              발생합니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              2. 개발자 팀은 관계 법령에 위배되지 않는 범위에서 이 약관을 변경할 수 있으며, 약관을
              변경하는 경우 변경 내용과 시행일을 정하여 시행일 7일 전(이용자에게 불리하거나 중대한
              변경은 30일 전)부터 공지합니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              3. 개발자 팀은 기존 이용자에게 변경된 약관, 적용일자 및 주요 변경사항을 전자우편,
              문자메시지, 서비스 내 알림 등 전자적 수단으로 개별 통지할 수 있습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              4. 개발자 팀이 변경 약관을 공지·통지하면서 "변경에 동의하지 않는 경우 일정 기간 내
              계약을 해지할 수 있으며, 기간 내 의사표시가 없으면 변경에 동의한 것으로 본다"는 취지를
              안내하고, 이용자가 그 기간 내 명시적으로 거절하지 않은 경우 변경에 동의한 것으로
              봅니다.
            </p>
          </div>

          {/* 제5조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제5조(이용자에 대한 통지)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 개발자 팀은 이 약관에 별도 규정이 없는 한 이용자에게 전자우편, 문자메시지(SMS),
              서비스 내 알림, 푸시 알림 등의 전자적 수단으로 통지할 수 있습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              2. 이용자 전체에 대한 통지는 7일 이상 서비스 내 게시판 또는 공지사항 화면에
              게시함으로써 제1항의 통지에 갈음할 수 있습니다. 다만 개별 이용자의 거래나 권리·의무에
              중대한 영향을 미치는 사항은 개별 통지를 합니다.
            </p>
          </div>

          {/* 제6조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제6조(이용계약의 체결)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 이용자가 회원으로 가입하고자 하는 경우, 약관에 동의한 후 회원가입 신청을 하고
              개발자 팀이 이를 승낙함으로써 이용계약이 체결됩니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              2. 비회원은 별도의 가입 절차 없이 개발자 팀이 정한 범위 내에서 서비스를 이용할 수
              있습니다.
            </p>
          </div>

          {/* 제7조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제7조(회원가입에 대한 승낙과 제한)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 개발자 팀은 원칙적으로 이용자의 신청을 승낙합니다. 다만 서비스 설비 여유가 없거나
              기술상·업무상 지장이 있는 경우 승낙을 유보할 수 있습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              2. 개발자 팀은 필요한 경우 본인인증 등 절차를 요청할 수 있습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              3. 승낙을 유보하거나 거절한 경우, 개발자 팀은 가능한 범위에서 신청자에게 그 사실을
              알립니다.
            </p>
          </div>

          {/* 제8조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제8조(회원정보의 변경)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 회원은 서비스 내 개인정보 관리 화면을 통하여 본인의 정보를 열람·수정할 수 있습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              2. 회원은 가입 시 기재한 내용이 변경된 경우, 온라인 수정 또는 기타 방법으로 지체 없이
              변경사항을 알려야 하며, 알리지 않아 발생한 불이익에 대해서는 책임을 부담합니다.
            </p>
          </div>

          {/* 제9조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제9조(회원정보의 관리 및 보호)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 아이디와 비밀번호에 대한 관리 책임은 회원에게 있으며, 제3자에게 사용을 허용해서는
              안 됩니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              2. 아이디·비밀번호가 도용되거나 제3자가 사용하고 있음을 인지한 경우, 회원은 즉시
              개발자 팀에 통지하고 안내에 따라야 합니다.
            </p>
          </div>

          {/* 제10조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제10조(개발자 팀의 의무)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 개발자 팀은 관련 법령과 이 약관에 따라 계속적이고 안정적인 서비스 제공을 위해
              노력합니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              2. 시스템 점검, 설비 장애, 기타 불가피한 사유가 있는 경우 서비스 제공을 일시 중지할 수
              있으며, 이 경우 사후에 그 사유와 중지 기간을 공지합니다.
            </p>
          </div>

          {/* 제11조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제11조(개인정보보호)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 개발자 팀은 관련 법령을 준수하고, 개인정보처리방침을 통하여 이용자의 개인정보
              수집·이용 목적 및 보호조치를 안내합니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              2. 개인정보처리방침은 서비스 내 별도 화면을 통해 확인할 수 있습니다.
            </p>
          </div>

          {/* 제12조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제12조(이용자의 의무)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 이용자는 회원가입 시 사실에 근거하여 정보를 기재해야 하며, 허위 정보 또는 타인의
              정보를 사용한 경우 발생하는 불이익에 대하여 개발자 팀은 책임을 지지 않습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              2. 이용자는 약관, 운영정책, 공지사항 등 개발자 팀이 정한 규정을 준수해야 합니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              3. 이용자는 서비스 이용과 관련하여 다음 각 호의 행위를 해서는 안 됩니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              4. 다른 이용자의 계정·정보를 도용하는 행위
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              5. 서비스 운영자를 사칭하거나 혼란을 주는 행위
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              6. 욕설, 혐오 표현, 폭력·성적 표현 등 타인에게 불쾌감을 주는 내용을 전송·게시하는 행위
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              7. 스팸·광고성 메시지를 반복적으로 전송하는 행위
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              8. 기타 관계 법령 또는 공서양속에 반하는 행위
            </p>
          </div>

          {/* 제13조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제13조(서비스의 제공 내용)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 개발자 팀이 제공하는 서비스는 다음과 같습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              2. 익명 편지 송수신 서비스
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              3. 나에게 보내는 편지 기능(미래의 나에게 편지 등 포함)
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              4. AI 기반 편지 리포트 및 회고 기능
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              5. 편지에 대한 온도 및 후기(평가) 서비스 제공
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              6. 서비스는 원칙적으로 연중무휴, 1일 24시간 제공됩니다. 다만 시스템 점검 등 불가피한
              경우 일시 중단될 수 있습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              7. 본 서비스는 현재 무료로 제공되며, 유료 전환 또는 유료 기능 추가 시에는 사전에 그
              내용을 고지하고 동의를 받습니다.
            </p>
          </div>

          {/* 제14조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제14조(서비스의 변경 및 중단)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 개발자 팀은 운영상, 기술상 필요에 따라 서비스의 전부 또는 일부를 변경할 수 있으며,
              중요한 변경인 경우 사전에 공지합니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              2. 천재지변, 정전, 통신 장애 등 불가항력적인 사유로 서비스 제공이 어려운 경우 서비스
              제공이 일시 중단될 수 있습니다.
            </p>
          </div>

          {/* 제15조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제15조(이용계약의 해지 및 탈퇴)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 회원은 언제든지 서비스 내 탈퇴 기능을 통해 이용계약을 해지할 수 있습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              2. 개발자 팀은 이용자가 약관 및 운영정책을 위반하는 등 부정 이용이 확인된 경우, 사전
              통지 후 이용계약을 해지하거나 서비스 이용을 제한할 수 있습니다.
            </p>
          </div>

          {/* 제16조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제16조(손해배상 및 면책)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 개발자 팀 또는 이용자는 상대방의 귀책사유로 손해가 발생한 경우 손해배상을 청구할 수
              있습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              2. 다만, 개발자 팀은 무료로 제공되는 서비스와 관련하여, 고의 또는 중대한 과실이 없는
              한 서비스 장애, 자료 삭제·변경 등으로 인한 손해에 대하여 책임을 부담하지 않습니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              3. 개발자 팀은 이용자 상호 간, 또는 이용자와 제3자 간 분쟁에 개입하지 않으며, 그로
              인한 손해에 대하여 책임을 지지 않습니다.
            </p>
          </div>

          {/* 제17조 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제17조(권리의 귀속)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              1. 서비스 및 그에 필요한 소프트웨어, 디자인, 로고, 문자, 그래픽 등과 관련된 저작권 및
              지식재산권은 개발자 팀에 귀속됩니다.
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              2. 개발자 팀은 이용자에게 서비스 이용에 필요한 범위 내에서만 이용 권한을 부여하며,
              이용자는 이를 양도, 판매, 담보 제공 등 처분 행위를 할 수 없습니다.
            </p>
          </div>

          {/* 부칙 */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>부칙</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              <strong>제1조(시행일)</strong>
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '19.2px',
                color: '#000000',
              }}
            >
              본 약관은 2026.2.1부터 시행합니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
