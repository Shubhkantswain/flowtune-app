// store/useAuthStore.ts
import { create } from 'zustand';

type AuthStore = {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  authenticated: true, // Default value
  setAuthenticated: (value) => set({ authenticated: value }),
}));