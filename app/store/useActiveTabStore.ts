// store/useAuthStore.ts
import { create } from 'zustand';

type ActiveTabStore = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const useActiveTabStore = create<ActiveTabStore>((set) => ({
  activeTab: "Tracks", // Default value
  setActiveTab: (tab) => set({ activeTab: tab }),
}));