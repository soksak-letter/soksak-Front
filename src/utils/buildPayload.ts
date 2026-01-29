const payload = useMemo(() => {
  if (!safeMode) return null;
  if (!draft.title?.trim() || !draft.content?.trim()) return null;
  if (style.paperId == null || style.fontId == null || style.stampId == null) return null;

  const base = {
    title: draft.title.trim(),
    content: draft.content.trim(),
    isPublic: draft.isPublic,
    paperId: style.paperId,
    fontId: style.fontId,
    stampId: style.stampId,
    ...(draft.questionId != null && { questionId: draft.questionId }),
  };

  switch (safeMode) {
    case 'anon':
      // receiverUserId 금지
      return base;

    case 'other':
      // receiverUserId 필수
      if (draft.receiverUserId == null) return null; // or throw/토스트 정책
      return { ...base, receiverUserId: draft.receiverUserId };

    case 'friend':
      // 규칙 미정이면 일단 other처럼(또는 anon처럼) "명시" 해두기
      if (draft.receiverUserId == null) return null;
      return { ...base, receiverUserId: draft.receiverUserId };

    case 'self':
      // self면 receiverUserId 금지(보통은 본인이라 서버가 알거나 별도 플래그)
      return base;

    default:
      return null;
  }
}, [safeMode, draft, style]);
