import { useMemo } from 'react';
import { useQueries, type UseQueryResult } from '@tanstack/react-query';

import { useLettersByKeyword } from './useLettersByKeyword';
import { getLetterDetail } from '@/api/weeklyReport';

import type { ApiError } from '@/types/dto/common';
import type { GetLetterSuccess, LettersByKeywordItem } from '@/types/dto/weeklyReport';
import type { CommonResponse } from '@/types/dto/common';

import { formatDate } from '@/utils/date';

export type KeywordLetterCardVM = {
  letterId: number;
  title: string;
  dateText: string; // 렌더용(YYYY.MM.DD 같은)
  deliveredAt: string | null;

  paper: { id: number; color?: string; assetUrl?: string; name?: string };
  stamp?: { id: number; assetUrl?: string; name?: string };
  font?: { id: number; assetUrl?: string; name?: string };

  senderUserId?: number;
};

/** useLettersByKeyword가 list를 unknown[]로 줄 때를 대비한 타입가드 */
function isLettersByKeywordItem(v: unknown): v is LettersByKeywordItem {
  if (!v || typeof v !== 'object') return false;
  const r = v as Record<string, unknown>;
  return typeof r.id === 'number' && Number.isFinite(r.id) && r.id > 0;
}

function hasFullDesign(item: LettersByKeywordItem) {
  const paperId = item.design?.paper?.id ?? item.paperId;
  const hasPaper = typeof paperId === 'number' && paperId > 0;

  const hasStamp = Boolean(item.design?.stamp?.id);
  const hasFont = Boolean(item.design?.font?.id);
  const hasTitle = Boolean(item.title);
  const hasDate = Boolean(item.deliveredAt ?? item.createdAt);

  return hasPaper && hasStamp && hasFont && hasTitle && hasDate;
}

function toVMFromListItem(item: LettersByKeywordItem): KeywordLetterCardVM {
  const deliveredAt = item.deliveredAt ?? null;
  const dateText = formatDate(deliveredAt ?? item.createdAt ?? null);

  const paperId = item.design?.paper?.id ?? item.paperId ?? 1;

  return {
    letterId: item.id,
    title: item.title ?? '편지',
    deliveredAt,
    dateText,
    paper: {
      id: paperId,
      color: item.design?.paper?.color,
      assetUrl: item.design?.paper?.assetUrl,
      name: item.design?.paper?.name,
    },
    stamp: item.design?.stamp
      ? {
          id: item.design.stamp.id,
          assetUrl: item.design.stamp.assetUrl,
          name: item.design.stamp.name,
        }
      : undefined,
    font: item.design?.font
      ? {
          id: item.design.font.id,
          assetUrl: item.design.font.assetUrl,
          name: item.design.font.name,
        }
      : undefined,
  };
}

function toVMFromDetail(detail: GetLetterSuccess): KeywordLetterCardVM {
  const deliveredAt = detail.deliveredAt ?? null;
  const dateText = formatDate(deliveredAt ?? detail.createdAt ?? null);

  return {
    letterId: detail.id,
    title: detail.title ?? '편지',
    deliveredAt,
    dateText,
    paper: {
      id: detail.design.paper.id ?? 1,
      color: detail.design.paper.color,
      assetUrl: detail.design.paper.assetUrl,
      name: detail.design.paper.name,
    },
    stamp: detail.design.stamp
      ? {
          id: detail.design.stamp.id,
          assetUrl: detail.design.stamp.assetUrl,
          name: detail.design.stamp.name,
        }
      : undefined,
    font: detail.design.font
      ? {
          id: detail.design.font.id,
          assetUrl: detail.design.font.assetUrl,
          name: detail.design.font.name,
        }
      : undefined,
    senderUserId: detail.senderUserId,
  };
}

export function useKeywordLettersForPage(aiKeyword: string) {
  const listQuery = useLettersByKeyword(aiKeyword);

  const listItems = useMemo<LettersByKeywordItem[]>(() => {
    const rawList = listQuery.data?.list ?? [];
    return rawList.filter(isLettersByKeywordItem);
  }, [listQuery.data?.list]);

  // 1) 목록에서 완성 가능한 것 / 2) 상세가 필요한 것 분리
  const { ready, needDetailIds } = useMemo(() => {
    const readyItems: LettersByKeywordItem[] = [];
    const needIds: number[] = [];

    for (const item of listItems) {
      if (hasFullDesign(item)) readyItems.push(item);
      else needIds.push(item.id);
    }

    return {
      ready: readyItems,
      needDetailIds: Array.from(new Set(needIds)).filter((n) => Number.isFinite(n) && n > 0),
    };
  }, [listItems]);

  const detailQueries = useQueries({
    queries: needDetailIds.map((id) => ({
      queryKey: ['letterDetail', id] as const,
      queryFn: () => getLetterDetail(id),
      enabled: Boolean(aiKeyword) && id > 0,
      staleTime: 60_000,
      retry: 0,
    })),
  }) as UseQueryResult<CommonResponse<GetLetterSuccess>, ApiError>[];

  const details = useMemo<GetLetterSuccess[]>(() => {
    return detailQueries
      .map((q) => (q.data?.resultType === 'SUCCESS' ? q.data.success : undefined))
      .filter((x): x is GetLetterSuccess => Boolean(x));
  }, [detailQueries]);

  // 최종 카드 VM(목록 ready + 상세 채운 것 합치기)
  const cards = useMemo<KeywordLetterCardVM[]>(() => {
    const a = ready.map(toVMFromListItem);
    const b = details.map(toVMFromDetail);

    const map = new Map<number, KeywordLetterCardVM>();
    for (const x of [...a, ...b]) map.set(x.letterId, x);

    return Array.from(map.values()).sort((x, y) => {
      const ax = x.deliveredAt ?? '';
      const ay = y.deliveredAt ?? '';
      return ay.localeCompare(ax);
    });
  }, [ready, details]);

  const isLoading = listQuery.isLoading || detailQueries.some((q) => q.isLoading);
  const isError = Boolean(listQuery.isError || detailQueries.some((q) => q.isError));

  const detailError = detailQueries.find((q) => q.isError)?.error;
  const error = listQuery.error ?? detailError ?? null;

  return {
    cards,
    isLoading,
    isError,
    error,
  };
}
