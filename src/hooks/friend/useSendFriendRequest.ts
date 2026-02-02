/**
 * 역할
 * - "친구 요청 보내기" Mutation 훅
 * - 특정 유저(targetUserId)에게 친구 요청을 생성(PENDING)한다.
 *
 * 사용하는 API
 * - POST /friends/requests (sendFriendRequest)
 *   body: { targetUserId, sessionId }
 *
 * 성공 시
 * - 보낸 요청 목록(outgoing)에 반영되므로 outgoing query invalidate
 *
 * 실패 시(예: 중복/이미 친구 등)
 * - 훅 내부에서 UI(토스트 등)를 직접 띄우지 않는 방향 권장
 * - 호출한 페이지에서 errorCode를 보고 토스트/모달 처리
 *
 * 캐시 정책
 * - onSuccess → friendKeys.outgoing() invalidate
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { sendFriendRequest } from '@/api/friend';
import { friendKeys } from './keys';
import type { SendFriendRequestBody } from '@/types/dto/friend';
import type { CommonResponse } from '@/types/dto/common';

type ServerFail = CommonResponse<unknown> & { resultType: 'FAIL' };

export const getErrorCode = (e: unknown) => {
  const err = e as AxiosError<ServerFail>;
  return err.response?.data?.error?.errorCode;
};

export const useSendFriendRequest = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: SendFriendRequestBody) => sendFriendRequest(body),

    onSuccess: async (res) => {
      const data = res.data;

      if (data.resultType === 'SUCCESS') {
        await qc.invalidateQueries({ queryKey: friendKeys.outgoing() });
        return;
      }

      // 200인데 FAIL인 케이스 방어: 여기서 에러로 전환해서 onError로 흐르게
      const fakeAxiosErr = new Error(data.error.reason) as Error & { code?: string };
      fakeAxiosErr.code = data.error.errorCode;
      throw fakeAxiosErr;
    },

    onError: async (e) => {
      void getErrorCode(e);
    },
  });
};
