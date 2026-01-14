//유효성검사

// 1. 정규식 모음 (상수)
export const REGEX = {
  // 이메일: 계정@도메인.최상위도메인
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // 아이디: 영문 대소문자 + 숫자 (특수문자 제외)
  USERNAME: /^[a-zA-Z0-9]+$/,

  // 비밀번호: 영문, 숫자 포함 8~16자 (필요에 따라 특수문자 추가 가능)
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d).{8,16}$/,

  // 이름: 한글, 영문만 허용 (자음/모음 낱자 제외, 완성형 한글 + 영문)
  NAME: /^[가-힣a-zA-Z]+$/,

  // 전화번호: 숫자만
  PHONE: /^01[016789][0-9]{3,4}[0-9]{4}$/,

  // 닉네임: 한글, 영문, 숫자만 허용 (자음/모음만 있는 것도 허용하려면 ㄱ-ㅎ 포함)
  NICKNAME: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/,
};

// 2. 검증 함수 모음
export const validate = {
  /**
   * 이메일 형식 검사
   */
  email: (email: string) => {
    if (email.trim().length === 0) {
      return { success: false, message: '이메일을 입력해주세요.' };
    }
    if (!REGEX.EMAIL.test(email)) {
      return { success: false, message: '올바른 이메일 형식이 아닙니다.' };
    }
    return { success: true, message: '' };
    // 중복 확인은 서버에서 받으면 처리 필요
  },

  /**
   * [추가] 아이디 검사
   * 조건: 필수값, 6~16자, 영문/숫자만 허용
   */
  username: (username: string) => {
    // 필수값 체크
    if (username.length === 0) {
      return { success: false, message: '아이디를 입력해주세요.' };
    }

    // 길이 체크 (6~16자)
    if (username.length < 6 || username.length > 16) {
      return { success: false, message: '아이디는 6자 이상 16자 이하로 입력해주세요.' };
    }

    // 형식 체크 (영문+숫자)
    if (!REGEX.USERNAME.test(username)) {
      return { success: false, message: '아이디는 영문과 숫자만 사용 가능합니다.' };
    }

    return { success: true, message: '사용 가능한 아이디입니다.' };
  },

  /**
   * 비밀번호 검사 (영문+숫자, 8~16자)
   */
  password: (password: string) => {
    if (password.length === 0) {
      return { success: false, message: '비밀번호를 입력해주세요.' };
    }
    // 길이 검사 (8~16자) - 정규식에 포함되어 있지만 명시적 메시지를 위해 분리 가능
    if (password.length < 8 || password.length > 16) {
      return { success: false, message: '비밀번호는 8~16자리여야 합니다.' };
    }
    // 형식 검사 (영문+숫자 조합)
    if (!REGEX.PASSWORD.test(password)) {
      return { success: false, message: '영문, 숫자를 포함해야 합니다.' };
    }
    return { success: true, message: '사용 가능한 비밀번호입니다.' };
  },

  /**
   * 비밀번호 확인 검사
   * 조건: 비밀번호 필드 값과 일치 여부
   */
  passwordConfirm: (password: string, passwordConfirm: string) => {
    if (passwordConfirm.length === 0) {
      return { success: false, message: '비밀번호를 다시 입력해주세요.' };
    }
    if (password !== passwordConfirm) {
      return { success: false, message: '비밀번호가 일치하지 않습니다.' };
    }
    return { success: true, message: '비밀번호가 일치합니다.' };
  },

  /**
   * 이름 검사
   * 조건: 필수값, 한글/영문
   */
  name: (name: string) => {
    if (name.trim().length === 0) {
      return { success: false, message: '이름을 입력해주세요.' };
    }
    if (!REGEX.NAME.test(name)) {
      return { success: false, message: '이름은 한글 또는 영문만 입력 가능합니다.' };
    }
    return { success: true, message: '' };
  },

  /**
   * 휴대폰 번호 검사
   * 조건: 필수값, 숫자만, 10~11자리
   */
  phone: (phone: string) => {
    if (phone.length === 0) {
      return { success: false, message: '휴대폰 번호는 ‘-’ 없이 숫자만 입력해 주세요.' };
    }

    if (!REGEX.PHONE.test(phone)) {
      return {
        success: false,
        message: '휴대폰 번호는 ‘-’ 없이 숫자만 입력해 주세요.',
      };
    }

    // 4. 통과
    return { success: true, message: '' };
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
