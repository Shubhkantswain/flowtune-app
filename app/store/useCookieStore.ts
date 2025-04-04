// stores/useCookieStore.ts
import { create } from 'zustand';

type CookieState = {
  cookie: string;
  updateCookie: (cookie: string) => void;
};

export const useCookieStore = create<CookieState>((set) => ({
  cookie: '',
  updateCookie: (cookie) => set({ cookie }),
}));
