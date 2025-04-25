// useCurrentActivePageStore.ts
import { create } from 'zustand';

interface CurrentActivePageStore {
    currentPage: number;
    flag: boolean;
    setCurrentPage: (page: number) => void;
    setFlag: (flag: boolean) => void;

}

export const useCurrentActivePageStore = create<CurrentActivePageStore>((set) => ({
    currentPage: -1,
    flag: true,
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setFlag: (flag: boolean) => set({ flag })
}));
