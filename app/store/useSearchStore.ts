import { Track } from 'gql/graphql';
import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  searchResults: Track[];
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Track[]) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  page: 1,
  searchResults: [],

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
}));

export default useSearchStore;
