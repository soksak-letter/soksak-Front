import { createRandomName } from '@/utils/nicknameGenerator';

const STORAGE_KEY = 'anon_nickname_map_v1';

type NickMap = Record<string, string>;

const loadMap = (): NickMap => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as NickMap) : {};
  } catch {
    return {};
  }
};

const saveMap = (map: NickMap) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
};

/**
 * 동일 key(senderId)에 대해 항상 같은 익명 닉네임 반환
 */
export const getAnonNickname = (key: number | string): string => {
  const k = String(key);
  const map = loadMap();

  if (map[k]) return map[k];

  const name = createRandomName();
  map[k] = name;
  saveMap(map);

  return name;
};
