import { Track } from 'gql/graphql';
import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  page: number;
  searchResults: Track[];
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setSearchResults: (results: Track[]) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  page: 1,
  searchResults: [],

  setSearchQuery: (query) => set({ searchQuery: query }),
  setPage: (page) => set({ page }),
  setSearchResults: (results) => set({ searchResults: results }),
}));

export default useSearchStore;
