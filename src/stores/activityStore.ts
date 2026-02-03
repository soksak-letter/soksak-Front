import { create } from 'zustand';

type ActivityState = {
  totalSeconds: number;
  addSeconds: (sec: number) => void;
  hydrate: (sec: number) => void;
};

export const useActivityStore = create<ActivityState>((set) => ({
  totalSeconds: 0,
  addSeconds: (sec) => set((s) => ({ totalSeconds: s.totalSeconds + sec })),
  hydrate: (sec) => set({ totalSeconds: sec }),
}));
