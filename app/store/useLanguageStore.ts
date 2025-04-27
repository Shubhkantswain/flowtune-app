// useCurrentActivePageStore.ts
import { create } from 'zustand';

interface LanguageStoreState {
    language: string
    setLanguage: (language: string) => void

}

export const useLanguageStore = create<LanguageStoreState>((set) => ({
    language: "",
    setLanguage: (language) => set({ language })
}));
