/**
 * 랜덤 닉네임 생성 유틸리티
 * 형용사와 명사를 조합하여 독특한 닉네임을 생성합니다.
 */

// 형용사 목록
const adjectives = [
  '파란',
  '노란',
  '분홍',
  '초록',
  '보라',
  '하얀',
  '까만',
  '말랑한',
  '폭신한',
  '동글한',
  '납작한',
  '조그만',
  '커다란',
  '귀여운',
  '졸린',
  '배고픈',
  '행복한',
  '심심한',
  '화난',
  '지친',
  '느긋한',
  '게으른',
  '부지런한',
  '엉뚱한',
  '수줍은',
  '용감한',
  '겁많은',
  '빠른',
  '느린',
  '조용한',
  '시끄러운',
  '차가운',
  '따뜻한',
  '반짝이는',
  '흔들리는',
  '춤추는',
  '뛰어다니는',
  '미끄러지는',
  '헤엄치는',
];

// 동물 명사
const animalNouns = [
  '고양이',
  '강아지',
  '햄스터',
  '토끼',
  '여우',
  '곰',
  '판다',
  '다람쥐',
  '고슴도치',
  '수달',
  '너구리',
  '펭귄',
  '오리',
  '병아리',
  '참새',
  '독수리',
  '거북이',
  '악어',
  '도마뱀',
  '개구리',
  '고래',
  '돌고래',
  '상어',
  '문어',
  '해파리',
  '나비',
  '벌',
  '거미',
  '기린',
  '코끼리',
  '사자',
  '호랑이',
];

// 과일 명사
const fruitNouns = [
  '수박',
  '딸기',
  '포도',
  '사과',
  '배',
  '복숭아',
  '자두',
  '망고',
  '바나나',
  '파인애플',
  '키위',
  '귤',
  '오렌지',
  '레몬',
  '체리',
  '블루베리',
  '라즈베리',
  '멜론',
  '코코넛',
];

const nouns = [...animalNouns, ...fruitNouns];

/**
 * 랜덤 닉네임을 생성합니다.
 * @returns {string} 형용사와 명사가 조합된 랜덤 닉네임
 */
export const createRandomName = (): string => {
  // 랜덤 형용사 선택
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  // 랜덤 명사 선택
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  // 형용사와 명사 조합
  return `${randomAdjective}${randomNoun}`;
};

/**
 * 숫자를 포함한 랜덤 닉네임을 생성합니다.
 * @param {boolean} includeNumber 숫자 포함 여부 (기본값 : false)
 * @returns {string} 랜덤 닉네임 (선택적으로 숫자 포함)
 */
export const createRandomNameWithNumber = (): string => {
  const baseName = createRandomName();
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  return `${baseName}${randomNumber}`;
};

export default createRandomName;
