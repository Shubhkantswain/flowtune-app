import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  page: number;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  page: 1,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setPage: (page) => set({ page }),
}));

export default useSearchStore;