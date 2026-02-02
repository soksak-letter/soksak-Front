const LIMIT = {
  TITLE: { MIN: 3, MAX: 20 },
  CONTENT: { MIN: 1, MAX: 500 },
} as const;

export const validateLetter = (title: string, content: string) => {
  if (title.length < LIMIT.TITLE.MIN) return `제목을 ${LIMIT.TITLE.MIN}자 이상 입력해주세요.`;
  if (title.length > LIMIT.TITLE.MAX)
    return `제목은 최대 ${LIMIT.TITLE.MAX}자까지 입력할 수 있어요.`;
  if (content.length < LIMIT.CONTENT.MIN) return '내용을 작성해 주세요!';
  if (content.length > LIMIT.CONTENT.MAX)
    return `내용은 최대 ${LIMIT.CONTENT.MAX}자까지 입력할 수 있어요.`;

  return null;
};
