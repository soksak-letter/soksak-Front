//유효성검사
// 1. 정규식 모음 (상수)
export const REGEX = {
  // 이메일: 계정@도메인.최상위도메인
  EMAIL: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

  // 비밀번호: 영문, 숫자 포함 8~16자 (필요에 따라 특수문자 추가 가능)
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d).{8,16}$/,

  // 닉네임: 한글, 영문, 숫자만 허용 (자음/모음만 있는 것도 허용하려면 ㄱ-ㅎ 포함)
  NICKNAME: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/,

  // 전화번호: 숫자만
  PHONE: /^[0-9]+$/,
};

// 2. 검증 함수 모음
export const validate = {
  /**
   * 이메일 형식 검사
   */
  email: (email: string) => {
    return REGEX.EMAIL.test(email);
  },

  /**
   * 비밀번호 검사 (영문+숫자, 8~16자)
   */
  password: (password: string) => {
    return REGEX.PASSWORD.test(password);
  },

  /**
   * 닉네임 검사
   * @returns { isValidFormat, isValidLength, errorMessage }
   */
  nickname: (nickname: string) => {
    const isFormatValid = REGEX.NICKNAME.test(nickname);
    const isLengthValid = nickname.length >= 1 && nickname.length <= 16;

    if (nickname.length === 0) return { success: false, message: '닉네임을 입력해주세요.' };
    if (!isLengthValid) return { success: false, message: '닉네임은 1~16자로 입력해주세요.' };
    if (!isFormatValid) return { success: false, message: '특수문자나 공백은 사용할 수 없습니다.' };

    return { success: true, message: '' };
  },
};
