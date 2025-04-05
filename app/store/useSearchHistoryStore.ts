// store/useAuthStore.ts
import { create } from 'zustand';

type SearchHistoryStore = {
    history: string[];
    setHistory: (data: string[]) => void;
};

export const useSearchHistoryStore = create<SearchHistoryStore>((set) => ({
    history: [], // Default value
    setHistory: (data) => set({ history: data }),
}));